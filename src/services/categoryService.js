// src/services/categoryService.js
import apiClient from './apiClient'; // 1. Importamos nuestro cliente central

/**
 * Obtiene todas las categorías del backend.
 * Corresponde al endpoint GET /api/categories en tu CategoryController.
 */
export const getAllCategories = async () => {
    try {
        // 2. Fíjate que ya no necesitamos la URL completa.
        // apiClient ya sabe que debe apuntar a 'http://localhost:8080/api'.
        const response = await apiClient.get('/categories');
        return response.data;
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        // Devolvemos un array vacío en caso de error para no romper la interfaz
        return [];
    }
};

// En el futuro, aquí podrías añadir más funciones como:
// export const getCategoryById = async (id) => { ... }estuduando