import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { setToken, setUser } from "../../store/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const navigate  = useNavigate()
    const dispatch = useDispatch()
    const formValidation =():boolean=>{
      const validationErrors: { email?: string; password?: string } = {};
  
      if (!email) {
        validationErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        validationErrors.email = "Email is invalid.";
      }
  
      if (!password) {
        validationErrors.password = "Password is required.";
      } else if (password.length < 6) {
        validationErrors.password = "Password must be at least 6 characters.";
      }
  
      setErrors(validationErrors);
  
      return Object.keys(errors).length === 0
    }
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formValidation()) return;
  
      try {
        const response = await axiosInstance.post("/login", { email, password });
        console.log("Form submitted:", response.data);
        toast.success('logged in successfully');
        // dispatch(setToken(response.data.token));
        // dispatch(setUser(response.data.user))
        navigate ('/admin', { replace: true });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.warning(error.response?.data?.message ||error.message)
          console.error('Axios error:', error.response?.data || error.message);
        } else {
          console.error('Unexpected error:', error)
          // toast.error(.?)
        }
      }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full h-90 max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                errors.email ? "border-red-500" : ""
                            }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                errors.password ? "border-red-500" : ""
                            }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>
                
            </div>
        </div>
    );
}

export default AdminLogin;