import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

const RideDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const rides = JSON.parse(localStorage.getItem("rides")) || [];
  const joinedRides = JSON.parse(localStorage.getItem("joinedRides")) || [];

  const ride = rides.find(
    (r) => String(r.id) === String(id)
  );

  const alreadyJoined = joinedRides.some(
    (r) => String(r.id) === String(id)
  );

  const handleJoinRide = () => {

    const ridesData = JSON.parse(localStorage.getItem("rides")) || [];
    const joined = JSON.parse(localStorage.getItem("joinedRides")) || [];

    const rideIndex = ridesData.findIndex(
      (r) => String(r.id) === String(id)
    );

    if (rideIndex === -1) {
      alert("Ride not found");
      return;
    }

    const selectedRide = ridesData[rideIndex];

    // prevent duplicate joining
    if (joined.some(r => String(r.id) === String(id))) {
      alert("You already joined this ride!");
      return;
    }

    // check seat availability
    if (selectedRide.seats <= 0) {
      alert("No seats available");
      return;
    }

    // decrement seat
    selectedRide.seats -= 1;

    ridesData[rideIndex] = selectedRide;

    localStorage.setItem("rides", JSON.stringify(ridesData));

    joined.push(selectedRide);

    localStorage.setItem("joinedRides", JSON.stringify(joined));

    window.dispatchEvent(new Event("rideCreated"));

    alert("Ride joined successfully 🚗");

    navigate("/dashboard");
  };

  const handleCancelRide = () => {

    const ridesData = JSON.parse(localStorage.getItem("rides")) || [];
    let joined = JSON.parse(localStorage.getItem("joinedRides")) || [];

    const rideIndex = ridesData.findIndex(
      (r) => String(r.id) === String(id)
    );

    if (rideIndex === -1) return;

    // restore seat
    ridesData[rideIndex].seats += 1;

    localStorage.setItem("rides", JSON.stringify(ridesData));

    // remove from joined list
    joined = joined.filter(r => String(r.id) !== String(id));

    localStorage.setItem("joinedRides", JSON.stringify(joined));

    window.dispatchEvent(new Event("rideCreated"));

    alert("Ride cancelled");

    navigate("/dashboard");
  };

  if (!ride) {
    return (
      <div className="text-center mt-20 text-red-500">
        Ride not found
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        <BackButton />

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-3">
            {ride.pickup} → {ride.destination}
          </h2>

          <p>🚘 Vehicle: {ride.vehicle === "bus" ? "🚌 Bus" : "🚗 Car"}</p>
          <p>📅 {ride.date}</p>
          <p>⏰ {ride.time}</p>
          <p>🪑 Seats: {ride.seats}</p>

          <p className="text-blue-600 font-semibold mt-2">
            ₹{ride.price} / seat
          </p>

          <div className="mt-4">

            {alreadyJoined ? (

              <button
                onClick={handleCancelRide}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
              >
                Cancel Ride
              </button>

            ) : (

              <button
                onClick={handleJoinRide}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Confirm Join Ride
              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default RideDetails;