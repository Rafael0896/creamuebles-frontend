import axios from 'axios'; // Usaremos axios para las llamadas a la API

const API_URL = 'http://localhost:8080/api/cart'; // Cambia esto por la URL de tu backend

// Función para añadir un producto al carrito en el backend
const addToCartAPI = async (productId, quantity, token) => {
    const config = {
        headers: {
            // El backend necesita saber quién hace la petición
            Authorization: `Bearer ${token}` 
        }
    };
    // El backend espera saber qué producto y qué cantidad se añade
    const response = await axios.post(`${API_URL}/add`, { productId, quantity }, config);
    return response.data;
};

// Aquí podrías añadir más funciones como:
// const getCartAPI = async (token) => { ... };
// const removeFromCartAPI = async (productId, token) => { ... };

export {
    addToCartAPI
};