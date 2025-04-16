import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import User from '../types/User';

interface AddUserModalProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setUserFn: React.Dispatch<React.SetStateAction<User>>;
  }
  const AddUserModal = ({  setModalOpen , setUserFn}: AddUserModalProps) => {
    const [newUserData, setNewUserData] = useState({
  name: "",
  email: "",
  password: "",
});

    const handleAddUserSubmit = async () => {
        try {
          const response = await axiosInstance.post("/signup", newUserData);
          toast.success("User added successfully!");
          console.log(response.data)
          setModalOpen(false);
          setNewUserData({
            name: "",
            email: "",
            password: "",
          });
          setUserFn((prev) => [...prev, response.data.user]); // Optionally re-fetch users
        } catch (err) {
          console.error(err);
          toast.error("Failed to add user.");
        }
      };
      const handleAddUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });
      };
      
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={newUserData.name}
            onChange={handleAddUserChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            placeholder="Name"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={newUserData.email}
            onChange={handleAddUserChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            placeholder="Email"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={newUserData.password}
            onChange={handleAddUserChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            placeholder="Password"
          />
        </div>
      </form>
      <div className="flex justify-end mt-6 space-x-2">
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleAddUserSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add User
        </button>
      </div>
    </div>
  </div>  )
}

export default AddUserModal