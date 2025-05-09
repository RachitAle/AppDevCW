import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  
  // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
    address: ""
  });
  
  // State for handling API response
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({ success: false, message: "" });
  const [showResponse, setShowResponse] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResponse(false);
    
    try {
      console.log("Sending data:", formData);
      
      const response = await fetch("https://localhost:7084/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          userName: formData.username,
          mobileNumber: formData.mobile,  // Updated to match backend parameter name
          email: formData.email,
          password: formData.password,
          address: formData.address
        })
      });
      
      // Get response text first, then try to parse as JSON
      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", responseText);
      
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        data = { message: responseText || "Unknown error" };
      }
      
      if (response.ok) {
        setApiResponse({ success: true, message: "Registration successful! Redirecting to login..." });
        // Reset form after successful registration
        setFormData({
          username: "",
          mobile: "",
          email: "",
          password: "",
          address: ""
        });
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const errorMessage = data.message || 
                            (data.errors ? Object.values(data.errors).flat().join(", ") : null) ||
                            `Registration failed (${response.status})`;
        setApiResponse({ success: false, message: errorMessage });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setApiResponse({ 
        success: false, 
        message: `Error: ${error.message || "Unknown error occurred"}`
      });
    } finally {
      setIsLoading(false);
      setShowResponse(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Register
        </h2>
        
        {/* Response Message */}
        {showResponse && (
          <div className={`mb-6 p-4 rounded-lg ${apiResponse.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {apiResponse.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
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
                value={formData.username}
                onChange={handleChange}
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
                value={formData.mobile}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className="w-full px-6 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Create a password"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="block text-gray-700 font-semibold mb-3 text-lg"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-6 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your address"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white py-3 mt-8 text-lg font-semibold rounded-lg transition-colors`}
          >
            {isLoading ? "Registering..." : "Register"}
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