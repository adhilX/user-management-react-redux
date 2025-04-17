import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import User from '../../types/User';

type ValidationError = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const Signup = () => {
  const [error, setError] = useState<ValidationError>({});
  const [user, setUser] = useState<User>({
    _id: '',
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
const navigate = useNavigate()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateform = (): boolean => {
    const newError: ValidationError = {};

    if (!user.name.trim()) {
      newError.name = 'Name is required';
    } else if (user.name.length < 3) {
      newError.name = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email.trim()) {
      newError.email = 'Email is required';
    } else if (!emailRegex.test(user.email)) {
      newError.email = 'Invalid email format';
    }

    if (!user.password.trim()) {
      newError.password = 'Password is required';
    } else if (user.password.length < 6) {
      newError.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword.trim()) {
      newError.confirmPassword = 'Confirm Password is required';
    } else if (user.password !== confirmPassword) {
      newError.confirmPassword = 'Passwords do not match';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateform()) return;

    try {
      const response = await axiosInstance.post<User>('signup', user);
      console.log('Signup successful:', response.data);
      toast.success('Signup successfully')
      navigate('/',{replace:true})

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error.confirmPassword && <p className="text-red-500 text-sm">{error.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <span className="text-blue-500 hover:underline cursor-pointer"><Link to={'/login'}>Login</Link> </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;