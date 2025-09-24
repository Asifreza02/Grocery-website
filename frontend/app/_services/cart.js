
import { addToCart } from "../_utils/GlobalApi";

export const addItemToCart = async (item) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error("No token found");
    }
    const data = await addToCart(item, token);
    return data;
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    throw error;
  }
};
