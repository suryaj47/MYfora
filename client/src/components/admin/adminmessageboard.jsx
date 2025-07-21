import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/messageboard.css";


function MessageBoard({ name , photo }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
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
    if (!name.trim() || !message.trim()) {
      alert("Both name and message are required.");
      return;
    }

    axios
      .post("https://myfora.onrender.com/api/addmessage", { name, message ,photo})
      .then(() => {
        setMessage(""); // clear message box
        fetchMessages(); // refresh messages
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
          <div
            key={msg._id}
            className="msg-row"
            onMouseDown={() => startPressTimer(msg._id)}
            onMouseUp={clearPressTimer}
            onMouseLeave={clearPressTimer}
            onTouchStart={() => startPressTimer(msg._id)}
            onTouchEnd={clearPressTimer}
          >
            <img
              src={msg.photo || "/images/avathar.png"}
              alt="profile"
              className="avatar"
            />
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
              <div className="msg-text">{msg.message}</div>
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
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageBoard;
