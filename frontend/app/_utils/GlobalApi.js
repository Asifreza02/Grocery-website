
const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api'
})

const getCategory = () => axiosClient.get('/categories');
const getSliders = () => axiosClient.get('/sliders');
const getProducts = () => axiosClient.get('/products');
const getProductsByCategory = (category) => axiosClient.get('/products?category=' + encodeURIComponent(category));
const registerUser = (username, email, password) => axiosClient.post('/auth/register', {
    username,
    email,
    password
});
const loginUser = (email, password) => axiosClient.post('/auth/login', {
    email,
    password
});
const addToCart = (data, jwt) => axiosClient.post('/cart', data, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
});
const getCart = (email, jwt) => axiosClient.get('/cart?userEmail=' + email, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
});
const removeFromCart = (id, jwt) => axiosClient.delete('/cart/' + id, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
})

export default {
    getCategory,
    getSliders,
    getProducts,
    getProductsByCategory,
    registerUser,
    loginUser,
    addToCart,
    getCart,
    removeFromCart
}
