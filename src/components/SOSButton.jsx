import { useState } from "react";
import API from "../services/api";

const SOSButton = () => {
  const [loading, setLoading] = useState(false);

  const sendSOS = async () => {
    const confirmSOS = window.confirm(
      "Send emergency alert with your location?"
    );

    if (!confirmSOS) return;

    setLoading(true);

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          await API.post("/emergency/sos", { location });

          alert("🚨 Emergency alert sent!");
        },
        async () => {
          // If location denied
          await API.post("/emergency/sos");

          alert("🚨 Emergency alert sent (location unavailable)");
        }
      );
    } catch (error) {
      console.error(error);
      alert("Failed to send SOS alert");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={sendSOS}
      disabled={loading}
      className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center text-xl transition"
    >
      {loading ? "..." : "SOS"}
    </button>
  );
};

export default SOSButton;