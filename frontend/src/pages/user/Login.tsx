
function Login() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-600 text-sm mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"

                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-600 text-sm mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  
             
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Don’t have an account? <span className="text-blue-500 hover:underline cursor-pointer">Register</span>
            </p>
          </div>
        </div>
      );
}

export default Login