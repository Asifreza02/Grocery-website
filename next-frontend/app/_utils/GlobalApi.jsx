
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:5000', 
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export const getCategory = async () => {
  const res = await axiosClient.get('/api/categories');
  return res.data;
};

export const getSlider = async () => {
  // Assuming you have a slider endpoint in your new backend
  // If not, you might need to remove this or adapt it
  const res = await axiosClient.get('/api/sliders');
  return res.data;
};

export const getProducts = async () => {
  const res = await axiosClient.get('/api/products');
  return res.data;
};

export const getProductsByCategory = async (category) => {
  try {
    const res = await axiosClient.get(`/api/products?category=${category}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createAccount = async (username, email, password) => {
  try {
    const res = await axiosClient.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const res = await axiosClient.post("/api/auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const addToCart = async (data, token) => {
  try {
    const res = await axiosClient.post("/api/cart", data, {
      headers: {
        'x-auth-token': token,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
