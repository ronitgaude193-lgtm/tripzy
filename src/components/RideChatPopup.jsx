import { useState } from "react";

const RideChatPopup = ({ rideId }) => {

  const [open, setOpen] = useState(false);

  // Load previous messages safely
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem(`rideChat_${rideId}`)) || [];
  });

  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;

    const newMessage = {
      text,
      sender: "user",
      time: new Date().toLocaleTimeString()
    };

    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);

    localStorage.setItem(
      `rideChat_${rideId}`,
      JSON.stringify(updatedMessages)
    );

    setText("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "120px", // increased spacing above SOS
        right: "20px",
        zIndex: 999
      }}
    >

      {/* Chat Icon Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="chat-breathe"
          style={{
            background: "#2563eb",
            color: "white",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "22px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
            transition: "transform 0.3s ease"
          }}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          style={{
            width: "320px",
            height: "380px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0px 6px 18px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column"
          }}
        >

          {/* Header */}
          <div
            style={{
              background: "#2563eb",
              color: "white",
              padding: "10px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>Chat with Driver</span>

            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              ✖
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              background: "#f8fafc"
            }}
          >
            {messages.length === 0 && (
              <p style={{ fontSize: "12px", color: "#666" }}>
                Start a conversation with the driver
              </p>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "8px",
                  textAlign: msg.sender === "user" ? "right" : "left"
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background:
                      msg.sender === "user"
                        ? "#2563eb"
                        : "#e5e7eb",
                    color:
                      msg.sender === "user"
                        ? "white"
                        : "black",
                    padding: "6px 10px",
                    borderRadius: "10px",
                    maxWidth: "70%",
                    fontSize: "14px"
                  }}
                >
                  {msg.text}
                </div>

                <div
                  style={{
                    fontSize: "10px",
                    color: "#888",
                    marginTop: "2px"
                  }}
                >
                  {msg.time}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div
            style={{
              display: "flex",
              padding: "8px",
              borderTop: "1px solid #eee",
              background: "white"
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type message..."
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "6px",
                fontSize: "14px"
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                marginLeft: "6px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "6px 10px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default RideChatPopup;