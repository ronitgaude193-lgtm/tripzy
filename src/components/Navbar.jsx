import { Link } from "react-router-dom";
import logo from "../assets/tripzy-logo.jpg";

const Navbar = () => {

  const navItem =
    "relative px-4 py-2 font-semibold text-white transition-all duration-300 transform hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="bg-blue-600 text-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Tripzy"
            className="w-10 h-10 rounded-md shadow"
          />
          <span className="text-xl font-bold">
            tripzy
          </span>
        </Link>

        {/* Menu */}
        <div className="flex gap-6 text-lg">

          <Link to="/dashboard" className={navItem}>
            Dashboard
          </Link>

          <Link to="/create-ride" className={navItem}>
            Create Ride
          </Link>

          <Link to="/search-ride" className={navItem}>
            Find Ride
          </Link>

          <Link to="/profile" className={navItem}>
            Profile
          </Link>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;