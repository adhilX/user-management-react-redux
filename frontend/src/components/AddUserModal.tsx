import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify';
import axiosInstance from '../api/AdminAxos';
import User from '../types/User';
import { motion } from 'framer-motion'
interface AddUserModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUserFn: React.Dispatch<React.SetStateAction<User[]>>;
}
const AddUserModal: React.FC<AddUserModalProps> = ({ setModalOpen, setUserFn }) => {
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<Partial<User>>({});


  const handleAddUserSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateform()) return;

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
      setUserFn((prev) => [...prev, response.data.user]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add user.");
    }
  };
  const handleAddUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const validateform = (): boolean => {
    const newError: Partial<User> = {};

    if (!newUserData.name.trim()) {
      newError.name = 'Name is required';
    } else if (newUserData.name.length < 3) {
      newError.name = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newUserData.email.trim()) {
      newError.email = 'Email is required';
    } else if (!emailRegex.test(newUserData.email)) {
      newError.email = 'Invalid email format';
    }

    if (!newUserData.password.trim()) {
      newError.password = 'Password is required';
    } else if (newUserData.password.length < 6) {
      newError.password = 'Password must be at least 6 characters';
    }


    setError(newError);
    return Object.keys(newError).length === 0;
  };

  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
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
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}

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
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

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
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}

          </div>
        </form>
        <div className="flex justify-end mt-6 space-x-2">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.8 }}
            type="button"
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.8 }}
            type="button"
            onClick={handleAddUserSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add User
          </motion.button>
        </div>
      </motion.div>
    </div>)
}

export default AddUserModal