import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import BackButton from "../components/BackButton";
import { SocketContext } from "../context/SocketContext";

const Chat = () => {

  const { rideId } = useParams();
  const { joinRideRoom } = useContext(SocketContext);

  useEffect(() => {
    if (rideId) {
      joinRideRoom(rideId);
    }
  }, [rideId, joinRideRoom]);

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-3xl mx-auto p-6">

        <BackButton />

        <div className="bg-white rounded-xl shadow p-4">

          <h2 className="text-xl font-semibold mb-4">
            Ride Chat
          </h2>

          <div className="h-[500px]">
            <ChatBox rideId={rideId} />
          </div>

        </div>

      </div>

    </div>
  );
};

export default Chat;