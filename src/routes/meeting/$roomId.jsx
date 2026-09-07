import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mic, MicOff, PhoneOff, Video as VideoIcon, VideoOff, Phone } from "lucide-react";
import { Button } from "@/components/ui-kit";
import { getSocket } from "@/lib/api";

export const Route = createFileRoute("/meeting/$roomId")({
  head: () => ({
    meta: [
      { title: "Meeting room — Video Calling" },
      { name: "description", content: "Live meeting room with HD video, audio controls and one-tap call ending." },
      { property: "og:title", content: "Meeting room — Video Calling" },
      { property: "og:description", content: "Live HD meeting room with audio and video controls." },
    ],
  }),
  component: MeetingRoom,
});

function MeetingRoom() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);

  const senderId = "user1";
  const receiverId = "user2";
  const roomId = [senderId, receiverId].sort().join("_");
  const navigate = useNavigate();

  const [localStream, setLocalStream] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [callActive, setCallActive] = useState(false);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("joinRoom", { senderId, receiverId });

    const onOffer = async ({ offer }) => {
      if (!pcRef.current) createPeerConnection();

      if (!localStream) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => pcRef.current.addTrack(track, stream));
      }

      await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      socket.emit("answer", { answer, roomId });
      setCallActive(true);
    };

    const onAnswer = async ({ answer }) => {
      if (pcRef.current)
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const onIce = async ({ candidate }) => {
      if (pcRef.current) {
        try {
          await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error("Error adding ICE candidate:", err);
        }
      }
    };

    const onEnd = () => endCall(false);

    socket.on("offer", onOffer);
    socket.on("answer", onAnswer);
    socket.on("ice-candidate", onIce);
    socket.on("end-call", onEnd);

    return () => {
      socket.off("offer", onOffer);
      socket.off("answer", onAnswer);
      socket.off("ice-candidate", onIce);
      socket.off("end-call", onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStream]);

  const createPeerConnection = () => {
    const socket = getSocket();
    pcRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) socket.emit("ice-candidate", { candidate: event.candidate, roomId });
    };

    pcRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };
  };

  const startCall = async () => {
    const socket = getSocket();
    createPeerConnection();

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    stream.getTracks().forEach((track) => pcRef.current.addTrack(track, stream));

    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);
    socket.emit("offer", { offer, roomId });
    setCallActive(true);
  };

  const endCall = (notifyRemote = true) => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }

    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    if (pcRef.current) {
      pcRef.current.getSenders().forEach((sender) => pcRef.current.removeTrack(sender));
      pcRef.current.close();
      pcRef.current = null;
    }

    setCallActive(false);
    setAudioEnabled(true);
    setVideoEnabled(true);

    if (notifyRemote) getSocket()?.emit("end-call", { roomId });
    navigate({ to: "/" });
  };

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setAudioEnabled(!audioEnabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      setVideoEnabled(!videoEnabled);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-background px-4 py-6">
      <div className="mx-auto mb-5 flex w-full max-w-6xl items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <span
            className={`size-2 rounded-full ${callActive ? "bg-success animate-pulse" : "bg-muted-foreground/50"}`}
          />
          {callActive ? "Call in progress" : "Ready to connect"}
        </div>
        <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
          {Route.useParams().roomId}
        </span>
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-4 md:grid-cols-2">
        {[
          { ref: localVideoRef, label: "You", muted: true },
          { ref: remoteVideoRef, label: "Guest", muted: false },
        ].map((v) => (
          <div
            key={v.label}
            className="relative overflow-hidden rounded-3xl border border-border bg-surface/60"
          >
            <video
              ref={v.ref}
              autoPlay
              muted={v.muted}
              playsInline
              className="h-full min-h-[240px] w-full object-cover"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur">
              {v.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-6xl flex-wrap items-center justify-center gap-3 rounded-full border border-border bg-surface/70 p-3 backdrop-blur">
        {!callActive ? (
          <Button variant="success" onClick={startCall}>
            <Phone className="size-4" /> Start call
          </Button>
        ) : (
          <Button variant="danger" onClick={() => endCall()}>
            <PhoneOff className="size-4" /> End call
          </Button>
        )}
        <Button variant="outline" onClick={toggleAudio}>
          {audioEnabled ? <Mic className="size-4" /> : <MicOff className="size-4" />}
          {audioEnabled ? "Mute" : "Unmute"}
        </Button>
        <Button variant="outline" onClick={toggleVideo}>
          {videoEnabled ? <VideoIcon className="size-4" /> : <VideoOff className="size-4" />}
          {videoEnabled ? "Camera off" : "Camera on"}
        </Button>
      </div>
    </div>
  );
}
