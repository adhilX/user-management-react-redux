import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/authSlice";

const UserProfile = () => {
  const preUser = useSelector((state: RootState) => state.auth.user);
  const [user, setUserData] = useState({ ...preUser });
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  // console.log(user);

  const [disable , setDisable]= useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setDisable(true)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("cloud_name", "dnkdja8nb");
        formData.append("upload_preset", "USM --redux");

        const url = "https://api.cloudinary.com/v1_1/dtbxcjgyg/image/upload";
        const response = await axios.post(url, formData);
         
        const imageUrl = response.data.secure_url;
        console.log('fddddddddddddddddddd',imageUrl)
        setUserData((prev) => ({ ...prev, profilePic: imageUrl }));
        console.log(user)
        setDisable(false)
        // toast.success("Profile picture updated successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload profile picture.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('sdklfjsnkdjg')
      const response = await axiosInstance.put("/updateprofile", { ...user });
      console.log('response',response);
      toast.success('Profile updated ')
      dispatch(setUser(response.data.updatedUser))
      Navigate('/',{replace:true})
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.warning(error.response?.data?.message || error.message);
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
        toast.error("Error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
         Edit User Profile
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center">
            <img
              src={
                user.profilePic ||
                "https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg"
              }
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
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
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
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="text"
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
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone number"
              
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition"
            disabled={disable}
          >
           {disable? 'Uploading....': 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
