import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/tripzy-logo.jpg";

const Home = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState({
    from: "",
    to: "",
    date: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(
      `/search-ride?from=${search.from}&to=${search.to}&date=${search.date}`
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO SECTION */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">

        {/* Logo */}
        <img
          src={logo}
          alt="Tripzy"
          className="mx-auto w-50 h-28 mb-4 rounded-xl shadow-lg"
        />

        {/* App Name */}
        <h2 className="text-3xl font-bold mb-6">
          tripzy
        </h2>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Share Rides. Save Money. Travel Smarter.
        </h1>

        <p className="text-lg mb-8">
          Find affordable rides or offer empty seats on your journey.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/search-ride")}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            Find a Ride
          </button>

          <button
            onClick={() => navigate("/create-ride")}
            className="bg-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-900"
          >
            Offer a Ride
          </button>
        </div>
      </section>

      {/* QUICK SEARCH FORM */}
      <section className="max-w-5xl mx-auto mt-12 bg-white shadow-md rounded-xl p-6">

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Quick Ride Search
        </h2>

        <form
          onSubmit={handleSearch}
          className="grid md:grid-cols-4 gap-4"
        >
          <input
            type="text"
            placeholder="From"
            required
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setSearch({ ...search, from: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="To"
            required
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setSearch({ ...search, to: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setSearch({ ...search, date: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto mt-16 px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Platform?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold mb-3">
              💰 Save Travel Costs
            </h3>
            <p className="text-gray-600">
              Share rides with others and split fuel costs for affordable travel.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold mb-3">
              🌍 Eco Friendly
            </h3>
            <p className="text-gray-600">
              Reduce traffic and carbon emissions by sharing rides.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold mb-3">
              🔒 Safe & Verified
            </h3>
            <p className="text-gray-600">
              Travel confidently with verified drivers and passengers.
            </p>
          </div>

        </div>

      </section>

      {/* CALL TO ACTION */}
      <section className="bg-blue-600 text-white mt-20 py-16 text-center">

        <h2 className="text-3xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>

        <p className="mb-8">
          Join thousands of users sharing rides every day.
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={() => navigate("/register")}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            Create Account
          </button>

          <button
            onClick={() => navigate("/search-ride")}
            className="bg-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-900"
          >
            Explore Rides
          </button>

        </div>

      </section>

    </div>
  );
};

export default Home;