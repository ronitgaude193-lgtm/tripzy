import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RideCard from "../components/RideCard";

const Dashboard = () => {

  const getRides = () => {
    return JSON.parse(localStorage.getItem("rides")) || [];
  };

  const [createdRides, setCreatedRides] = useState(getRides());
  const [upcomingRides, setUpcomingRides] = useState(() => {
    const rides = getRides();
    const today = new Date();

    return rides.filter((ride) => {
      if (!ride.date) return false;
      return new Date(ride.date) >= today;
    });
  });

  useEffect(() => {

    const handleRideCreated = () => {
      const rides = getRides();

      setCreatedRides(rides);

      const today = new Date();

      const upcoming = rides.filter((ride) => {
        if (!ride.date) return false;
        return new Date(ride.date) >= today;
      });

      setUpcomingRides(upcoming);
    };

    window.addEventListener("rideCreated", handleRideCreated);

    return () => {
      window.removeEventListener("rideCreated", handleRideCreated);
    };

  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6 space-y-10">

        {/* Upcoming Rides */}
        <section>

          <h2 className="text-2xl font-bold mb-4">
            Upcoming Rides
          </h2>

          {upcomingRides.length === 0 ? (
            <p className="text-gray-500">
              No upcoming rides.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          )}

        </section>

        {/* Created Rides */}
        <section>

          <h2 className="text-2xl font-bold mb-4">
            Rides You Created
          </h2>

          {createdRides.length === 0 ? (
            <p className="text-gray-500">
              You haven't created any rides.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          )}

        </section>

      </div>

    </div>
  );
};

export default Dashboard;