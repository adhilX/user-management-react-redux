import React, { useState } from "react";

const AdminDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: "",
  });

  const dummyUsers = [
    {
      id: 1,
      name: "Adhil Muhammed",
      email: "adhil@example.com",
      phone: "9876543210",
      profilePic: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Fahad Nizar",
      email: "fahad@example.com",
      phone: "9123456780",
      profilePic: "https://i.pravatar.cc/150?img=2",
    },
  ];

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      profilePic: user.profilePic,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setFormData({ ...formData, profilePic: url });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = () => {
    console.log("Updated user data:", formData);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Profile</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user, idx) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{idx + 1}</td>
                <td className="p-4">
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.phone}</td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm relative">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <form className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={formData.profilePic}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <input
                placeholder="Profile pic"
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleChange}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700">Name</label>
                <input
                placeholder="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700">Email</label>
                <input
                placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700">Phone</label>
                <input
                placeholder="Phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </form>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
