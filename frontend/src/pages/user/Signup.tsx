import axios from 'axios'
import  { ChangeEvent, FormEvent, useState } from 'react'

type  User={
    name: string
    email: string
    password :string
}

type ValidationError ={
    name?: string
    email?: string
    password?: string
    conformPassword?: string
}
const  Signup=()=> {
    const [error, setError]= useState <ValidationError>({})
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        password: '',
      });
      
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setUser((p)=>({...p ,[e.target.name]:e.target.value }))
        console.log(user)
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
           e.preventDefault();
           try {
               const response = await axios.post<User>('http://localhost:3000/signup',user)

               console.log(user)
               console.log('Signup successful:', response.data);
           }catch (error) {
            if (axios.isAxiosError(error)) {
              console.error('Axios error:', error.response?.data || error.message);
            } else {
              console.error('Unexpected error:', error);
            }
    }
}
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
                  required
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
  
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account? <span className="text-blue-500 hover:underline cursor-pointer">Login</span>
            </p>
          </div>
        </div>
      );

}

export default Signup