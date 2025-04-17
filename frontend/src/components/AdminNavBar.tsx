import { useDispatch } from "react-redux"
import { logoutAdmin } from "../store/adminTokenSlice"
import { Dispatch, SetStateAction } from "react"
import {motion} from 'framer-motion'

interface navbarPropTypes {
  setQuery: Dispatch<SetStateAction<string>>
  setAddUserModalOpen: Dispatch<SetStateAction<boolean>>
}
function NavBar({setAddUserModalOpen , setQuery}:navbarPropTypes) {

    const dispatch = useDispatch()
  return (
    <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
    <input
    placeholder="Search users"
    type="search"
    className="mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    onChange={(e)=>setQuery(e.target.value.trim())}
    />
  <motion.button
   whileHover={{ scale: 1.06 }}
   whileTap={{ scale: 0.8 }}

    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
  onClick={()=>setAddUserModalOpen(true)}>
    Add user
  </motion.button>
  <motion.button
   whileHover={{ scale: 1.06 }}
   whileTap={{ scale: 0.8 }}
 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
  onClick={()=>dispatch(logoutAdmin())}>
    Logout
  </motion.button>
</div>  )
}

export default NavBar