import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      console.log("Sending login data:", formData);
      
      const response = await fetch("https://localhost:7084/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          userName: formData.username,
          password: formData.password
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
        setApiResponse({ success: true, message: "Login successful!" });
        
        // Use the AuthContext login function
        if (data.token) {
          login({
            username: data.userName,
            email: data.email,
            roles: data.roles
          }, data.token);
        }
        
        // Redirect to dashboard or home page after successful login
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        const errorMessage = data.message || 
                           (data.errors ? Object.values(data.errors).flat().join(", ") : null) ||
                           `Login failed (${response.status})`;
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
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Login
        </h2>
        
        {/* Response Message */}
        {showResponse && (
          <div className={`mb-6 p-4 rounded-lg ${apiResponse.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {apiResponse.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
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
              placeholder="Enter your username"
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
              value={formData.password}
              onChange={handleChange}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white py-3 text-lg font-semibold rounded-lg transition-colors`}
          >
            {isLoading ? "Logging in..." : "Login"}
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