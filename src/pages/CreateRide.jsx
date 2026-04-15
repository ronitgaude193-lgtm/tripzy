import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapRouteComponent from "../components/MapRouteComponent";
import BackButton from "../components/BackButton";

const CreateRide = () => {

  const navigate = useNavigate();

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [vehicle, setVehicle] = useState("car"); // NEW

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickup || !destination || !date || !time || !seats || !price) {
      alert("Please fill all fields");
      return;
    }

    const newRide = {
      id: Date.now(),
      pickup,
      destination,
      vehicle, // NEW FIELD
      date,
      time,
      seats: Number(seats),
      price: Number(price),
      createdAt: new Date().toISOString()
    };

    const rides = JSON.parse(localStorage.getItem("rides")) || [];

    rides.push(newRide);

    localStorage.setItem("rides", JSON.stringify(rides));

    window.dispatchEvent(new Event("rideCreated"));

    alert("Ride Created Successfully 🚗");

    navigate("/search-ride");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">

      <BackButton />

      <h2 className="text-2xl font-bold mb-4">
        Create Ride
      </h2>

      <MapRouteComponent
        setPickup={setPickup}
        setDestination={setDestination}
      />

      <form onSubmit={handleSubmit} className="space-y-3 mt-4">

        {/* Pickup */}
        <input
          type="text"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          placeholder="Pickup Location"
          className="w-full border p-3 rounded"
        />

        {/* Destination */}
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          className="w-full border p-3 rounded"
        />

        {/* VEHICLE TYPE */}
        <select
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option value="car">🚗 Car</option>
          <option value="bus">🚌 Bus</option>
        </select>

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-3 rounded"
        />

        {/* Time */}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border p-3 rounded"
        />

        {/* Seats */}
        <input
          type="number"
          placeholder="Seats Available"
          value={seats}
          min="1"
          onChange={(e) => setSeats(e.target.value)}
          className="w-full border p-3 rounded"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price per seat"
          value={price}
          min="0"
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Create Ride
        </button>

      </form>

    </div>
  );
};

export default CreateRide;