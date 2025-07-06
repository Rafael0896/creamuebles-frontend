// src/services/authService.js
import apiClient from './apiClient';

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