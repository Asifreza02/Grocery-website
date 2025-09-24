import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:5000/api/auth";

// REGISTER
export const registerUser = async (username, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, { username, email, password });
    if (res.data.token) localStorage.setItem("token", res.data.token);
    console.log("Registration response data:", res.data);
    console.log("Token:", res.data.token);
    return res.data;
  } catch (error) {
    console.error("Error creating account:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    if (res.data.token) localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

