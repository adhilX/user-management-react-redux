import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import User from "../../types/User";
import { toast } from "react-toastify";
import axios from "axios";
import AddUserModal from "../../components/AddUserModal";
import { logoutAdmin } from "../../store/adminTokenSlice";
import { useDispatch } from "react-redux";
interface AddUserModalProps {
    setAddUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AdminDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    _id:"",
    name: "",
    email: "",
    phone: "",
    profilePic: "",
  });

  useEffect(() => {
    axiosInstance
      .get("/admin/getusers")
      .then((data) => {
        setUsers([...data.data.Users]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = (user: User) => {
    setFormData({
       _id: user._id || "",
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      profilePic: user.profilePic || "",
    });
    setModalOpen(true);
  };
  
  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setDeleteModalOpen(true);
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

  const handleUpdate = async() => {
    console.log(formData)
    try {
      const response = await axiosInstance.put("/updateprofile", { ...formData });
      console.log('response',response);
      toast.success('Profile updated ') 
      const refreshed = await axiosInstance.get("/admin/getusers");
      setUsers([...refreshed.data.Users]);
      setModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.warning(error.response?.data?.message ||error.message)
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error)
        toast.error('Error')
      }
    }
  };
  const confirmDelete = async () => {
    if (!selectedUserId) return;
  
    try {
      await axiosInstance.delete(`/admin/deleteuser/${selectedUserId}`);
      toast.success("User deleted successfully");
      setUsers(users.filter(user => user._id !== selectedUserId));
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    } finally {
      setDeleteModalOpen(false);
      setSelectedUserId(null);
    }
  };
  
  return (
    <div className="relative bg-gray-50 min-h-screen">
      <div className="container mx-auto p-8">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          onClick={()=>setAddUserModalOpen(true)}>
            Add user
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          onClick={()=>dispatch(logoutAdmin())}>
            Logout
          </button>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
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
              {users.map((user: User, idx: number) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{idx + 1}</td>
                  <td className="p-4">
                    <img
                      src={
                        user.profilePic ||
                        "https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg"
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phone || "N/A"}</td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={()=> handleDeleteClick(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {deleteModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm relative">
      <h2 className="text-xl font-semibold mb-4 text-center">Confirm Delete</h2>
      <p className="text-gray-700 text-center mb-6">
        Are you sure you want to delete this user? This action cannot be undone.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setDeleteModalOpen(false)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

{addUserModalOpen && (
  <AddUserModal setModalOpen={setAddUserModalOpen} setUserFn={setUsers} />
)}        {/* Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm relative">
              <h2 className="text-xl font-semibold mb-4">Edit User</h2>
              <form className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      formData.profilePic ||
                      "https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg"
                    }
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
                  type="button"
                  onClick={()=>setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
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
    </div>
  );
};

export default AdminDashboard;
