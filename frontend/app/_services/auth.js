
import { createAccount, login } from "../_utils/GlobalApi";

export const registerUser = async (username, email, password) => {
  try {
    const data = await createAccount(username, email, password);
    // Handle successful registration, e.g., by storing the token
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    // Handle registration error
    console.error("Registration failed:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const data = await login(email, password);
    // Handle successful login
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    // Handle login error
    console.error("Login failed:", error);
    throw error;
  }
};

export const logoutUser = () => {
  // Handle logout
  localStorage.removeItem('token');
};
