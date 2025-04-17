import { useEffect, useState } from "react";
import axiosInstance from "../../api/AdminAxos";
import User from "../../types/User";
import { toast } from "react-toastify";
import AddUserModal from "../../components/AddUserModal";
import EditUserModal from "../../components/EditUserModal";
import DeleteModal from "../../components/DeleteModal";
import NavBar from "../../components/AdminNavBar";
import TableBody from "../../components/TableBody";

const AdminDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
const [addUserModalOpen, setAddUserModalOpen] = useState(false);
const [query , setQuery] =useState('')

const filteredList = users.filter((user) => {
  const searchQuery = query.toLowerCase();
  const name = user?.name?.toLowerCase() || "";
  const email = user?.email?.toLowerCase() || "";

  return name.includes(searchQuery) || email.includes(searchQuery);
});

     const [formData, setFormData] = useState({
        _id:"",
        name: "",
        email: "",
        phone: "",
        profilePic: "",
      });
  useEffect(() => {
    axiosInstance.get("/admin/getusers")
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
      <>
    <div className="relative bg-gray-50 min-h-screen">
      <div className="container mx-auto p-8">
        {/* Navbar */}
           <NavBar  setQuery={setQuery}  setAddUserModalOpen={setAddUserModalOpen}/>

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
          <TableBody filteredList={filteredList} handleDeleteClick={handleDeleteClick} handleEdit={handleEdit} />
          </table>
        </div>


      </div>
        {deleteModalOpen && (
    <DeleteModal  setDeleteModalOpen={setDeleteModalOpen}  confirmDelete={confirmDelete}/>
)}
    </div>
{addUserModalOpen && (
  <AddUserModal setModalOpen={setAddUserModalOpen} setUserFn={setUsers} />
)}    
    {/* Edit Modal */}
        {modalOpen && (
                 <EditUserModal setFormData={setFormData} formData={formData} setUsers={setUsers} setModalOpen={setModalOpen} />
        )}
    </>
  );
};

export default AdminDashboard;
