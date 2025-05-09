// Base API URL
 const API_URL = "https://localhost:7084/api/Auth";
export const BASE_URL = "https://localhost:7084";

// Function to handle API errors
const handleResponse = async (response) => {
  const responseText = await response.text();
  
  let data;
  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch (e) {
    console.error("Failed to parse JSON response:", e);
    throw new Error(responseText || "Unknown error");
  }
  
  if (!response.ok) {
    const errorMessage = data.message || 
                        (data.errors ? Object.values(data.errors).flat().join(", ") : null) ||
                        `Request failed (${response.status})`;
    throw new Error(errorMessage);
  }
  
  return data;
};

// Authentication service object
const AuthService = {
  // Register a new user
  register: async (userData) => {
    const response = await fetch(`$ {API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        userName: userData.username,
        email: userData.email,
        mobileNumber: userData.mobile,
        password: userData.password,
        address: userData.address
      })
    });
    
    return handleResponse(response);
  },
  
  // Login a user
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        userName: credentials.username,
        password: credentials.password
      })
    });
    
    return handleResponse(response);
  },
  
  // Get the current authentication token
  getToken: () => {
    return localStorage.getItem("authToken");
  },
  
  // Check if the user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem("authToken");
  },
  
  // Create authorization header
  getAuthHeader: () => {
    const token = AuthService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

export default AuthService;