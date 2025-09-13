import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./MeetingRoom.css";
import { useNavigate } from "react-router";

const socket = io("https://video-backend-zt5v.onrender.com");
function MeetingRoom() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);

  const senderId = "user1"; // change per user
  const receiverId = "user2"; // change per user
  const roomId = [senderId, receiverId].sort().join("_");
  const navigate = useNavigate();

  const [localStream, setLocalStream] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [callActive, setCallActive] = useState(false);

  useEffect(() => {
    socket.emit("joinRoom", { senderId, receiverId });

    socket.on("offer", async ({ offer }) => {
      if (!pcRef.current) createPeerConnection();

      if (!localStream) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) =>
          pcRef.current.addTrack(track, stream)
        );
      }

      await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      socket.emit("answer", { answer, roomId });
      setCallActive(true);
    });

    socket.on("answer", async ({ answer }) => {
      if (pcRef.current)
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (pcRef.current) {
        try {
          await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error("Error adding ICE candidate:", err);
        }
      }
    });

    socket.on("end-call", () => {
      endCall(false);
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("end-call");
    };
  }, [localStream]);

  const createPeerConnection = () => {
    pcRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate, roomId });
      }
    };

    pcRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };
  };

  const startCall = async () => {
    createPeerConnection();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    stream.getTracks().forEach((track) => pcRef.current.addTrack(track, stream));

    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);
    socket.emit("offer", { offer, roomId });
    setCallActive(true);
  };

  const endCall = (notifyRemote = true) => {
    // Stop all local tracks
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }

    // Stop remote video
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    // Close peer connection
    if (pcRef.current) {
      // Remove all senders from peer connection
      pcRef.current.getSenders().forEach((sender) => pcRef.current.removeTrack(sender));
      pcRef.current.close();
      pcRef.current = null;
    }

    setCallActive(false);
    setAudioEnabled(true);
    setVideoEnabled(true);

    if (notifyRemote) socket.emit("end-call", { roomId });
    navigate('/');
  };

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  return (
    <div className="container-fluid vh-100 bg-dark text-white d-flex flex-column">
      <div className="row flex-grow-1">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-2">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-100 rounded shadow-lg object-fit-cover"
          />
        </div>

        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-2">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-100 rounded shadow-lg object-fit-cover"
          />
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-3">
        {!callActive ? (
          <button className="btn btn-danger px-4 btn-sm" onClick={startCall}>
            Start Call
          </button>
        ) : (
          <button className="btn btn-danger px-4 btn-sm" onClick={() => endCall()}>
            End Call
          </button>
        )}
        <button className="btn btn-secondary px-4 btn-sm" onClick={toggleAudio}>
          {audioEnabled ? "Mute" : "Unmute"}
        </button>
        <button className="btn btn-secondary px-4 btn-sm" onClick={toggleVideo}>
          {videoEnabled ? "Camera Off" : "Camera On"}
        </button>
      </div>
    </div>
  );
}

export default MeetingRoom;
