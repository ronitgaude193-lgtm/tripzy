import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CreateRide from "../pages/CreateRide";
import SearchRide from "../pages/SearchRide";
import RideDetails from "../pages/RideDetails";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";

/* Protected Route */

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/* App Routes */

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-ride"
          element={
            <ProtectedRoute>
              <CreateRide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search-ride"
          element={
            <ProtectedRoute>
              <SearchRide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ride/:id"
          element={
            <ProtectedRoute>
              <RideDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:rideId"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;