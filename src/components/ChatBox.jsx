import { useState, useEffect, useRef, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";

const ChatBox = ({ rideId }) => {
  const { messages, sendMessage, joinRideRoom } = useContext(SocketContext);
  const { user } = useContext(AuthContext);

  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  /* Join ride chat room */

  useEffect(() => {
    if (rideId) {
      joinRideRoom(rideId);
    }
  }, [rideId,joinRideRoom]);

  /* Scroll to latest message */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Send message */

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(rideId, {
      sender: user?.name,
      message: text,
      time: new Date().toLocaleTimeString(),
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-full bg-white border rounded-lg shadow">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs p-2 rounded-lg ${
              msg.sender === user?.name
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <p className="text-sm font-medium">{msg.sender}</p>
            <p>{msg.message}</p>
            <span className="text-xs opacity-70">{msg.time}</span>
          </div>
        ))}

        <div ref={bottomRef}></div>

      </div>

      {/* Input */}
      <div className="flex border-t p-3">

        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default ChatBox;