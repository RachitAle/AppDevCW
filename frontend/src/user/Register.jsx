import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] px-4">
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Register
        </h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 font-semibold mb-3 text-lg"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Choose a username"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-semibold mb-3 text-lg"
                htmlFor="mobile"
              >
                Mobile No.
              </label>
              <input
                type="tel"
                id="mobile"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your mobile number"
                required
              />
            </div>
            <div>
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
            <div>
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
                placeholder="Create a password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 mt-8 text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-6 text-base text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
