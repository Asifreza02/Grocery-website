
const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export const getCategory = async () => {
  const res = await axiosClient.get('/categories?populate=*');
  return res.data;
};

export const getSlider = async () => {
  const res = await axiosClient.get('/sliders?populate=*');
  return res.data;
};

export const getProducts = async () => {
  const res = await axiosClient.get('/products?populate=*');
  return res.data;
};

export const getProductsByCategory = async (category) => {
  try {
    const res = await axiosClient.get(`/products?filters[categories][name][$in]=${category}&populate=*`);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getCreateAccount = async (username, email, password) => {
  try {
  

    const res = await axiosClient.post("/auth/local/register", {
      username: username,
      email: email,
      password: password,
    });

    return res.data;
  }
   catch (error) {
    console.error("Error creating account:", error); // Use console.error
    throw error; // Re-throw to handle at the call site
  }
};
export const getLoginAccount = async (email, password) => {
  try {
  

    const res = await axiosClient.post("/auth/local/", {
      identifier: email,
      password: password
    });

    return res.data;
  }
   catch (error) {
    console.error("Error creating account:", error); // Use console.error
    throw error; // Re-throw to handle at the call site
  }
};
export const handleAddToCart = async (data)=>{
  try{
      const res = await axiosClient.post("/user-carts", data,{
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BACKEND_TOKEN}`,
          'Content-Type': 'application/json' 
        }
      })
      return res.data;
  }
  catch(error){
    console.error(error);
  }

}