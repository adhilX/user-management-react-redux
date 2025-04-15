import React from "react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();

  // Dummy user data
  const user = {
    name: "Adhil Muhammed",
    profilePic: "https://i.pravatar.cc/150?img=1",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          <img
            src={user.profilePic}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>Profile</span>
        </button>
      </div>

      {/* Welcome Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Welcome, {user.name.split(" ")[0]}! 👋
        </h2>
        <p className="text-gray-600">
          Glad to see you back. You can view or edit your profile anytime.
        </p>
      </div>
    </div>
  );
};

export default UserHome;
