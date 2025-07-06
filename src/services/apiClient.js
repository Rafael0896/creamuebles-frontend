// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// ¡AQUÍ ESTÁ LA MAGIA!
// Creamos un interceptor de peticiones.
// Esta función se ejecutará ANTES de que cada petición sea enviada.
apiClient.interceptors.request.use(
    (config) => {
        // 1. Buscamos el token en el almacenamiento local.
        const token = localStorage.getItem('authToken');

        // 2. Si el token existe, lo añadimos a la cabecera de autorización.
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // 3. Devolvemos la configuración modificada para que la petición continúe.
        return config;
    },
    (error) => {
        // Si hay un error al configurar la petición, lo rechazamos.
        return Promise.reject(error);
    }
);

export default apiClient;