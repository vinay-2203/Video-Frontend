import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import "./Meeting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faTelegram, faGoogle } from "@fortawesome/free-brands-svg-icons";
import MeetingAnimation from "../Animate/Anim";

function Meeting() {
  const [joinId, setjoinId] = useState("");
  const [newMeetingId, setnewMeetingId] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setShowAnimation(true);

      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  

  const handleCreate = () => {
    const newId = nanoid(10);
    setnewMeetingId(newId);
    // navigate(`/meeting/${newId}`);
  };

  const handleJOin = () => {
    if (joinId.trim() !== "") {
      navigate(`/meeting/${joinId}`);
    } else {
      alert("Please enter a valid Meeting ID");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(newMeetingId);
    alert("Meeting ID copied");
  };

  const handleShare = () => {
    const shareLink = `${window.location.origin}/meeting/${newMeetingId}`;
    navigator.clipboard.writeText(shareLink);
    alert("Meeting link Copied to clipboard");
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-overlay">
        <div className="auth-box">
          <p className="mb-3">Please Login to Join a Meeting</p>
          <button
            onClick={() => navigate("/login")}
            className="btn-modern btn-green"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/Signup")}
            className="btn-modern btn-blue"
          >
            Signup
          </button>
        </div>
      </div>
    );
  }

  if (showAnimation) {
    return <MeetingAnimation />;
  }

  return (
    <div className="meeting-container">
      <div className="meeting-card">
        <h2 className="text-center mb-4">🚀 Video Meeting</h2>

        <button className="btn-modern btn-green w-100" onClick={handleCreate}>
          Create New Meeting
        </button>

        <div className="divider">OR</div>

        <input
          type="text"
          className="form-control-modern"
          placeholder="Enter New Id OR Id"
          value={joinId}
          onChange={(e) => setjoinId(e.target.value)}
        />
        <button className="btn-modern btn-blue w-100 mt-3" onClick={handleJOin}>
          Join Meeting
        </button>

        {newMeetingId && (
          <div className="meeting-info">
            <h5>✅ Meeting Created</h5>
            <p>
              <strong>ID:</strong> {newMeetingId}
            </p>
            <p>
              <strong>Link:</strong>{" "}
              <a href={`/meeting/${newMeetingId}`} target="_blank" rel="noreferrer">
                {window.location.origin}/meeting/{newMeetingId}
              </a>
            </p>
            <div className="share-buttons">
              <button className="btn-modern btn-outline" onClick={handleCopy}>
                Copy ID
              </button>
              <button className="btn-modern btn-outline" onClick={handleShare}>
                Copy Link
              </button>
              <a
                href={`https://wa.me/?text=Join%20my%20meeting:%20${window.location.origin}/meeting/${newMeetingId}`}
                target="_blank"
                rel="noreferrer"
                className="btn-modern btn-wa"
              >
                <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&su=Join%20My%20Meeting&body=Join%20here:%20${window.location.origin}/meeting/${newMeetingId}`}
                target="_blank"
                rel="noreferrer"
                className="btn-modern btn-gmail"
              >
                <FontAwesomeIcon icon={faGoogle} /> Gmail
              </a>
              <a
                href={`https://t.me/share/url?url=${window.location.origin}/meeting/${newMeetingId}&text=Join%20My%20Meeting`}
                target="_blank"
                rel="noreferrer"
                className="btn-modern btn-telegram"
              >
                <FontAwesomeIcon icon={faTelegram} /> Telegram
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Meeting;
