import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/messageboard.css";
import { FaUpload } from "react-icons/fa";


function MessageBoard({ name , photo }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
   const [file, setFile] = useState(null);
  let pressTimer = null;

  const startPressTimer = (msgId) => {
    pressTimer = setTimeout(() => {
      const confirmDelete = window.confirm(
        "Do you want to delete this message?"
      );
      if (confirmDelete) {
        handleDelete(msgId);
      }
    }, 500); // long press duration: 500 ms
  };

  const clearPressTimer = () => {
    clearTimeout(pressTimer);
  };

  // Fetch messages
  const fetchMessages = () => {
    axios
      .get("https://myfora.onrender.com/api/showmessage")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const container = document.querySelector(".messages");
    container?.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Send new message
  const handleSend = () => {
    if (!message.trim() && !file) {
      alert("Type a message or choose a PDF to send.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo);
    if (message.trim()) formData.append("message", message);
    if (file) formData.append("pdf", file);

    axios
      .post("https://myfora.onrender.com/api/addmessage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setMessage("");
        setFile(null);
        fetchMessages();
      })
      .catch((err) => {
        console.error("Error sending message:", err);
        alert("Failed to send message.");
      });
  };

  const handleDelete = (msgId) => {
    axios
      .delete(`https://myfora.onrender.com/api/deletemessage/${msgId}`)
      .then(() => {
        setMessages((prev) => prev.filter((msg) => msg._id !== msgId));
      })
      .catch((err) => {
        console.error("Failed to delete message:", err);
      });
  };

  return (
    <div className="chat-container">
      {/* Logo and App Name */}
      <div className="logo-wrapper">
        <img src="/images/logo.jpg" alt="MYFora Logo" className="logo-image" />
        <h2 className="app-name">MYFora</h2>
      </div>

      <div className="chat-header">
        <h2 className="chat-title">Forum Chat</h2>
       
      </div>

   <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg._id} 
            className="msg-row"
            onMouseDown={() => startPressTimer(msg._id)}
            onMouseUp={clearPressTimer}
            onMouseLeave={clearPressTimer}
            onTouchStart={() => startPressTimer(msg._id)}
            onTouchEnd={clearPressTimer}>
            <img src={msg.photo} alt="profile" className="avatar" />
            <div className="msg-bubble">
              <div className="msg-header">
                <strong>{msg.name}</strong>
                <span className="timestamp">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {msg.message && <div className="msg-text">{msg.message}</div>}
              {msg.pdf && (
                <div className="msg-pdf">
                  <a
                    href={`https://myfora.onrender.com/api/getpdf/${msg._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

        <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
      
              {/* Upload Icon */}
              <label style={{ cursor: "pointer" }}>
                <FaUpload size={20} color="blue" />
                <input
                  type="file"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
      
              {file && <span style={{ marginLeft: "10px" }}>{file.name}</span>}
      
              <button onClick={handleSend} className="send-button">
                Send
              </button>
            </div>
    </div>
  );
}

export default MessageBoard;
