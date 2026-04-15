import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext();

const SOCKET_URL = import.meta.env.VITE_API_URL;

const SocketProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);

  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  /* Connect socket after login */

  useEffect(() => {
    if (user && token) {
      socketRef.current = io(SOCKET_URL, {
        auth: { token },
      });

      setSocket(socketRef.current);

      socketRef.current.on("receive_message", (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user, token]);

  /* Join ride room */

  const joinRideRoom = (rideId) => {
    socketRef.current?.emit("join_ride", rideId);
  };

  /* Send message */

  const sendMessage = (rideId, message) => {
    socketRef.current?.emit("send_message", {
      rideId,
      message,
    });
  };

  /* Disconnect */

  const disconnectSocket = () => {
    socketRef.current?.disconnect();
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        messages,
        joinRideRoom,
        sendMessage,
        disconnectSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;