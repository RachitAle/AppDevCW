import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        try {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error parsing user data:", error);
          logout(); // Clear invalid data
        }
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  // Login function
  const login = (userData, authToken) => {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
    setIsLoggedIn(true);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("storage"));
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("storage"));
  };

  // Get auth header for API requests
  const getAuthHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Values to be provided to consumers of this context
  const contextValue = {
    isLoggedIn,
    user,
    token,
    loading,
    login,
    logout,
    getAuthHeader
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;