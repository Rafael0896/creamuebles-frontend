// src/services/productService.js
import apiClient from './apiClient';

/**
 * Obtiene todos los productos del backend.
 * Se comunica con el endpoint GET /api/products de tu ProductController.
 */
export const getAllProducts = async () => {
    try {
        const response = await apiClient.get('/products');
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        // Es importante notificar que hubo un error para que la UI pueda reaccionar.
        // Lanzar el error es una buena práctica.
        throw error;
    }
};

/**
 * Obtiene un único producto por su ID.
 * Se comunica con el endpoint GET /api/products/{id}
 */
export const getProductById = async (id) => {
    try {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el producto con ID ${id}:`, error);
        throw error;
    }
};

// Aquí puedes añadir más funciones en el futuro, como:
// export const getProductsByCategory = async (categoryId) => { ... }