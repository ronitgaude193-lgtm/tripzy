import { useState } from "react";
import Navbar from "../components/Navbar";
import RideCard from "../components/RideCard";
import BackButton from "../components/BackButton";

const Profile = () => {

  const storedUser =
    JSON.parse(localStorage.getItem("user")) ||
    {
      name: "Demo User",
      email: "demo@carpool.com",
      phone: "9876543210"
    };

  const storedRides =
    JSON.parse(localStorage.getItem("rides")) || [];

  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);
  const [rideHistory] = useState(storedRides);

  const [form, setForm] = useState({
    name: storedUser.name,
    phone: storedUser.phone
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name: form.name,
      phone: form.phone
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setUser(updatedUser);
    setEditMode(false);

    alert("Profile updated successfully");
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-6xl mx-auto p-6 space-y-8">

        <BackButton />

        {/* PROFILE INFO */}
        <div className="bg-white p-6 rounded-xl shadow">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold">
              Profile
            </h2>

            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            )}

          </div>

          {!editMode ? (

            <div className="space-y-2">

              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>

            </div>

          ) : (

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
            >

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <div className="flex gap-3">

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

              </div>

            </form>

          )}

        </div>

        {/* RIDE HISTORY */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Ride History
          </h2>

          {rideHistory.length === 0 ? (
            <p className="text-gray-500">
              No ride history found.
            </p>
          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {rideHistory.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;