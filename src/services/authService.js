// src/services/authService.js
import apiClient from './apiClient';

/**
 * Registra un nuevo usuario.
 * Asume que el endpoint es POST /api/auth/register en tu backend.
 * @param {object} userData - Los datos del usuario { firstname, lastname, email, password }.
 */
export const registerUser = async (userData) => {
    try {
        // La URL base ya está en apiClient, solo añadimos la ruta específica.
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error("Error al registrar el usuario:", error.response?.data || error.message);
        // Lanzamos el error de nuevo para que el componente que llama (RegisterPage) pueda manejarlo.
        throw error;
    }
};

/**
 * Envía las credenciales al backend para iniciar sesión.
 */
export const login = async (email, password) => { // Cambiamos el nombre del parámetro para más claridad
    try {
        // CAMBIO CLAVE: Enviamos 'email' en lugar de 'username' para que coincida con el DTO de Spring.
        const response = await apiClient.post('/auth/login', {
            email,
            password
        });

        if (response.data && response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        throw error;
    }
};

/**
 * Elimina el token de autenticación del almacenamiento local.
 */
export const logout = () => {
    localStorage.removeItem('authToken');
};