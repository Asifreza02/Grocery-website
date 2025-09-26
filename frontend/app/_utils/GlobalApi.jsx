import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:5000',
  timeout: 10000,
});

// ===== Helper: handle JWT expiration =====
const handleAuthError = (error) => {
  const status = error.response?.status;
  const message = error.response?.data?.message || error.message;

  // If token expired or unauthorized
  if (status === 401) {
    localStorage.removeItem("token");
    throw new Error(message.toLowerCase().includes("expired") 
      ? "Session expired. Please log in again." 
      : "Unauthorized. Please log in.");
  }

  throw error;
};

// ===== Category & Product APIs =====
export const getCategory = async () => {
  const res = await axiosClient.get('/api/categories');
  return res.data;
};

export const getSlider = async () => {
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
    console.error("Error fetching products:", error.response?.data || error.message);
    throw error;
  }
};

// ===== Auth APIs =====
export const createAccount = async (username, email, password) => {
  try {
    const res = await axiosClient.post("/api/register", { username, email, password });
    return res.data;
  } catch (error) {
    console.error("Error creating account:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const res = await axiosClient.post("/api/login", { email, password });
    return res.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

// ===== Cart APIs =====
export const addToCart = async (data, token) => {
  if (!token) throw new Error("No token found. Please log in.");
  try {
    const res = await axiosClient.post("/api/cart", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const getCartItems = async (token) => {
  if (!token) throw new Error("No token found. Please log in.");
  try {
    const res = await axiosClient.get("/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const removeFromCart = async (cartItemId, token) => {
  if (!token) throw new Error("No token found. Please log in.");
  try {
    const res = await axiosClient.delete(`/api/cart/${cartItemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const updateCartItemQuantity = async (itemId, quantity, token) => {
  if (!token) throw new Error("No token found. Please log in.");
  try {
    const res = await axiosClient.put(
      `/api/cart/${itemId}`,
      { quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    handleAuthError(error);
  }
};
