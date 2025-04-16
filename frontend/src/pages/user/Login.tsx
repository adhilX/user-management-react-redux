import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";
import { setToken, setUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function Login() {
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
      toast.success('User logged in successfully');

      // localStorage.setItem("userToken", response.data.token);

      dispatch(setToken(response.data.token));
      console.log(response.data)
      dispatch(setUser(response.data.user))
      navigate ('/', { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.warning(error.response?.data?.message ||error.message)
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error)
        toast.error('Error')
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-600 text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-xl focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-400" : "focus:ring-blue-400"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-xl focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-400" : "focus:ring-blue-400"
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            <Link to={"/signup"}>Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;