import React, { useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Adhil Muhammed",
    email: "adhil@example.com",
    phone: "9876543210",
    profilePic: "https://i.pravatar.cc/150?img=1",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, profilePic: imageUrl }));
      // If you want to upload to server, use FormData and send the file here
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated user:", user);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Profile</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-500"
              placeholder="Upload your profile picture"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
