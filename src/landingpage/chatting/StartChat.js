import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'
import './StartChat.css'
import jwtDecode from "jwt-decode";

const socket = io("http://localhost:8000");

function StartChat() {
    const [FriendData, setFriendsData] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [friendOnline, setFriendOnline] = useState(false);
    const [chat, setChat] = useState([]);
    const chatEndRef = useRef(null);


    const Friend = localStorage.getItem('friendId');
    const receiverId = Friend;
    const token = localStorage.getItem('token');
    let senderId = null;

    if (token) {
        const decoded = jwtDecode(token);
        senderId = decoded.id || decoded.userId || decoded._id;
        console.log("userId : ", senderId);
    }

    const collectData = async () => {
        try {
            const response = await axios("https://video-backend-zt5v.onrender.com/User/friend-data", { params: { id: Friend } })
            setFriendsData(response.data)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        collectData();
        if (senderId && receiverId) {
            socket.emit("register", senderId);   // apna personal room
            socket.emit("joinRoom", { senderId, receiverId }); // common chat room
        }
        socket.on("receiveMessage", (msg) => {
            setChat((prev) => [...prev, msg]);
        });
        socket.on("friendTyping", () => setIsTyping(true));

        // Friend online/offline
        socket.on("userOnline", ({ userId, status }) => {
            if (userId === receiverId) setFriendOnline(status);
        });
        return () => {
            socket.off("receiveMessage");
            socket.off("friendTyping");
            socket.off("userOnline");
        };

    }, [senderId, receiverId]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chat]);

    const handleTyping = () => {
        socket.emit("typing", { senderId, receiverId });
    }

    const sendMessage = () => {
        if (newMessage.trim() !== "") {
            const messageObj = {
                senderId,
                receiverId,
                message: newMessage,
                time: new Date().toISOString()
            };
            socket.emit("sendMessage", messageObj);
            // setChat((prev) => [...prev, messageObj]);
            setNewMessage("");
        }
    }

    return (
        <div className='chat-wrapper' style={{ display: 'flex', flexDirection: 'column', height: '92vh', background: 'linear-gradient(135deg, #1e1e2f, #2c2c3e)', color: '#f5f5f5' }}>


            <header style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#2c2c3e', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>Let's Start Your Talk !</h1>
                <h2 style={{ margin: '0.3rem 0 0', fontSize: '1.2rem', color: '#cfcfcf' }}>Real-Time Chat</h2>
            </header>


            <div className='friend-header' style={{ padding: '0.8rem 1rem', backgroundColor: '#3a3a52', borderBottom: '1px solid #444' }}>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                    <span style={{ color: '#bbbbbb' }}>Chat with your Friend </span>
                    <span style={{ fontWeight: '600', marginLeft: '0.3rem' }}>{FriendData.Name}</span>
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#a0a0a0' }}>📳 {FriendData.Number}</span>
                </p>
            </div>


            <div className="chat-box" style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {chat.map((c, i) => (
                    <div key={i} className={`chat-message ${c.senderId === senderId ? "sent" : "received"}`} style={{ display: 'flex', justifyContent: c.senderId === senderId ? 'flex-end' : 'flex-start' }}>
                        <div className="message-bubble"  style={{ backgroundColor: c.senderId === senderId ? '#4f46e5' : '#f0f0f0', color: c.senderId === senderId ? '#fff' : '#000', padding: '0.6rem 1rem', borderRadius: '1rem', maxWidth: '60%', wordWrap: 'break-word', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                            <p style={{ margin: 0 }}>{c.message}</p>
                            <span style={{ fontSize: '0.7rem', color: c.senderId === senderId ? '#c0c0c0' : '#606060', display: 'block', marginTop: '0.2rem' }}>{new Date(c.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                     
                        </div>
                          
                    </div>
                ))}
               
            </div>


            <div className="input-box" style={{ display: 'flex', padding: '0.8rem 1rem', backgroundColor: '#2c2c3e', gap: '0.5rem', borderTop: '1px solid #444' }}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: '999px', border: '1px solid #555', backgroundColor: '#3a3a52', color: '#f5f5f5', outline: 'none' }}
                />
                <button onClick={sendMessage} style={{ padding: '0.6rem 1.2rem', borderRadius: '999px', backgroundColor: '#4f46e5', color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.3s' }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#6366f1'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#4f46e5'}
                >Send</button>
                
            </div>


        </div>
    )
}
export default StartChat;
