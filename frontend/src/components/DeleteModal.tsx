import {motion} from 'framer-motion'
interface DeleteModalProps {
  confirmDelete: () => void;
  setDeleteModalOpen: (isOpen: boolean) => void;
}

function DeleteModal({ confirmDelete, setDeleteModalOpen }: DeleteModalProps) {
return (
<div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 backdrop-blur-sm">
    <motion.div 
        initial= {{opacity:0,x:30}}
        animate={{opacity:1,x:0}}
        // transition={{duration:1}}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm relative">
      <h2 className="text-xl font-semibold mb-4 text-center">Confirm Delete</h2>
      <p className="text-gray-700 text-center mb-6">
        Are you sure you want to delete this user? This action cannot be undone.
      </p>
      <div className="flex justify-center space-x-4">
        <motion.button
           whileHover={{ scale: 1.06 }}
           whileTap={{ scale: 0.8 }}
          onClick={() => setDeleteModalOpen(false)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </motion.button>
        <motion.button
   whileHover={{ scale: 1.06 }}
   whileTap={{ scale: 0.8 }}
             onClick={confirmDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  </div>  )
}

export default DeleteModal