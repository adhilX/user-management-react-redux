import axiosInstance from '../api/AdminAxos';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import {motion} from 'framer-motion'

interface EditUserModalProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: {
    profilePic?: string;
    name: string;
    email: string;
    phone: string;
  };
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}


function EditUserModal({ setFormData, formData, setModalOpen, setUsers }: EditUserModalProps) {
  
    const [disable , setDisable]= useState(false)
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('ddddddddddddddddddddddddddddddd')
        const file = e.target.files?.[0];
        if (file) {
          try {
            setDisable(true)
            const formData = new FormData();
            formData.append("file", file);
            formData.append("cloud_name", "dnkdja8nb");
            formData.append("upload_preset", "USM --redux");
      //  console.log('ffffffffffffffffffffffffffff')
            const url = "https://api.cloudinary.com/v1_1/dtbxcjgyg/image/upload";
            const response = await axios.post(url, formData);
             
            const imageUrl = response.data.secure_url;
            console.log('fddddddddddddddddddd',imageUrl)
            setFormData((prev: typeof formData) => ({ ...prev, profilePic: imageUrl }));
            console.log(formData)
            setDisable(false)
            // toast.success("Profile picture updated successfully!");
          } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload profile picture.");
          }
        }
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
    
     
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('sdklfjsnkdjg')
      const response = await axiosInstance.put("/updateprofile", { ...formData });
      console.log('response',response);
      toast.success('Profile updated ')
      const refreshed = await axiosInstance.get("/admin/getusers");
      setUsers([...refreshed.data.Users]);
      setModalOpen(false)
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
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 backdrop-blur-sm">

    <motion.div
        initial= {{opacity:0,x:30}}
        animate={{opacity:1,x:0}}
     className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm relative">
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
            onChange={handleImageChange}
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
        <motion.button
   whileHover={{ scale: 1.06 }}
   whileTap={{ scale: 0.8 }}
             type="button"
          onClick={()=>setModalOpen(false)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </motion.button>
        <motion.button
   whileHover={{ scale: 1.06 }}
   whileTap={{ scale: 0.8 }}
             type="button"
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
         disabled={disable}>
         {disable? 'Please wait.....':'Update'}
        </motion.button>
      </div>
    </motion.div>
  </div>  )
}

export default EditUserModal