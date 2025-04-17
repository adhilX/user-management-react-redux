import User from "../types/User"
import { motion } from 'framer-motion'
interface TableBodyProps {
    filteredList: User[]
    handleEdit: (user: User) => void
    handleDeleteClick: (userId: string) => void
}
function TableBody({ filteredList, handleEdit, handleDeleteClick }: TableBodyProps) {
    return (
        <tbody>
            {filteredList.map((user: User, idx: number) => (
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
                        <motion.button
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => handleEdit(user)}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Edit
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.8 }}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                            onClick={() => handleDeleteClick(user._id)}>
                            Delete
                        </motion.button>
                    </td>
                </tr>
            ))}
        </tbody>)
}

export default TableBody