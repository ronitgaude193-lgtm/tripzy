import { useState } from "react";
import RideCard from "../components/RideCard";
import BackButton from "../components/BackButton";

const SearchRide = () => {

  const savedRides = JSON.parse(localStorage.getItem("rides")) || [];

  const [rides] = useState(savedRides);

  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredRides = rides.filter((ride) => {

    if (vehicleFilter !== "all" && ride.vehicle !== vehicleFilter)
      return false;

    if (priceFilter === "cheap" && ride.price > 200)
      return false;

    if (priceFilter === "expensive" && ride.price <= 200)
      return false;

    if (dateFilter && ride.date !== dateFilter)
      return false;

    return true;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">

      <BackButton />

      <h2 className="text-2xl font-bold mb-4">
        Available Rides
      </h2>

      {/* Filters */}

      <div className="grid md:grid-cols-3 gap-3 mb-6">

        <select
          value={vehicleFilter}
          onChange={(e) => setVehicleFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Vehicles</option>
          <option value="car">🚗 Car</option>
          <option value="bus">🚌 Bus</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Prices</option>
          <option value="cheap">Below ₹200</option>
          <option value="expensive">Above ₹200</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 rounded"
        />

      </div>

      {filteredRides.length === 0 ? (
        <p>No rides match your filters</p>
      ) : (
        filteredRides.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))
      )}

    </div>
  );
};

export default SearchRide;