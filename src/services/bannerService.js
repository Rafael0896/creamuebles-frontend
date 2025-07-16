// src/services/bannerService.js
import axios from 'axios';

const apiClient = axios.create({
    // Es una buena práctica usar variables de entorno para la URL base
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
});

/**
 * Obtiene todos los banners que están actualmente activos desde el backend.
 * 
 * @throws {Error} Si la petición a la API falla.
 * @returns {Promise<Array>} Una promesa que se resuelve con un array de banners.
 */
export const getActiveBanners = async () => {
    try {
        const response = await apiClient.get('/banners/active');
        return response.data;
    } catch (error) {
        // Logueamos el error para depuración
        console.error(
            "Error fetching active banners:", 
            error.response ? `Status ${error.response.status} - ${JSON.stringify(error.response.data)}` : error.message
        );
        
        // Relanzamos el error para que la capa de UI pueda manejarlo
        throw new Error("No se pudieron obtener los banners. Por favor, intenta más tarde.");
    }
};