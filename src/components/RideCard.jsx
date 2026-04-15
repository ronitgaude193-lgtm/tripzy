import RideChatPopup from "./RideChatPopup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RideCard = ({ ride }) => {

  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const joinedRides =
    JSON.parse(localStorage.getItem("joinedRides")) || [];

  const alreadyJoined = joinedRides.some(
    (r) => String(r.id) === String(ride.id)
  );

  const handleJoin = () => {
    navigate(`/ride/${ride.id}`);
  };

  const handleCancel = () => {

    const confirmCancel = window.confirm(
      "Do you want to cancel the ride?"
    );

    if (!confirmCancel) return;

    let joined =
      JSON.parse(localStorage.getItem("joinedRides")) || [];

    let ridesData =
      JSON.parse(localStorage.getItem("rides")) || [];

    const rideIndex = ridesData.findIndex(
      (r) => String(r.id) === String(ride.id)
    );

    if (rideIndex !== -1) {
      ridesData[rideIndex].seats += 1;
      localStorage.setItem("rides", JSON.stringify(ridesData));
    }

    joined = joined.filter(
      (r) => String(r.id) !== String(ride.id)
    );

    localStorage.setItem("joinedRides", JSON.stringify(joined));

    // 🔴 CLEAR CHAT WHEN RIDE IS CANCELLED
    localStorage.removeItem(`rideChat_${ride.id}`);

    window.dispatchEvent(new Event("rideCreated"));

    setRefresh(!refresh);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border relative">

      <h3 className="font-semibold text-lg mb-2">
        {ride.pickup} → {ride.destination}
      </h3>

      <p>🚘 Vehicle: {ride.vehicle === "bus" ? "🚌 Bus" : "🚗 Car"}</p>
      <p>📅 {ride.date}</p>
      <p>⏰ {ride.time}</p>
      <p>🪑 Seats left: {ride.seats}</p>

      <p className="text-blue-600 font-semibold mt-2">
        ₹{ride.price} / seat
      </p>

      {/* JOIN BUTTON */}
      {!alreadyJoined && (
        <button
          onClick={handleJoin}
          disabled={ride.seats === 0}
          className={`mt-3 px-5 py-2 rounded-lg text-white transition
          ${ride.seats === 0
            ? "bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {ride.seats === 0 ? "Full" : "Join Ride"}
        </button>
      )}

      {/* JOINED BUTTON */}
      {alreadyJoined && (
        <>
          <button
            onClick={handleCancel}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`mt-3 px-5 py-2 rounded-lg text-white transition
            ${hover ? "bg-red-600 scale-105" : "bg-green-600"}
            `}
          >
            {hover ? "Cancel Ride" : "Joined ✓"}
          </button>

          {/* Chat Popup */}
          <RideChatPopup rideId={ride.id} />
        </>
      )}

    </div>
  );
};

export default RideCard;