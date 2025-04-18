import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import {motion} from 'framer-motion'

const UserHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const user = useSelector((state:RootState)=>state.auth.user)


  console.log(user)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
        <div
          onClick={() => navigate("/userprofile")}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
        <img
  src={user?.profilePic || 'https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg'}
  alt="User"
  className="w-8 h-8 rounded-full object-cover"
/>
          <span>Profile</span>
            <motion.button
        whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={()=>dispatch(logout())}>
                    Logout
                  </motion.button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Welcome, {user?.name.split(" ")[0]}! 👋
        </h2>
        <p className="text-gray-600">
          Glad to see you back. You can view or edit your profile anytime.
        </p>
      </div>
    </div>
  );
};

export default UserHome;
