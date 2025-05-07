import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] px-4">
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Login
        </h2>
        <form>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-3 text-lg"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-6 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-3 text-lg"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-6 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-base text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-green-600 hover:underline font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
