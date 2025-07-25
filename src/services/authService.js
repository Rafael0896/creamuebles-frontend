import apiClient from './apiClient';

/**
 * Registra un nuevo usuario, incluyendo el token de reCAPTCHA.
 * @param {object} registrationData - Objeto con los datos del usuario, incluyendo:
 * { firstName, lastName, email, password, captchaToken }
 */
export const register = async (registrationData) => {
    try {
        // El objeto registrationData ya contiene todos los campos que el backend espera.
        const response = await apiClient.post('/auth/register', registrationData);

        // Si el registro es exitoso, el backend devuelve un token.
        // Lo guardamos para que el usuario ya esté "logueado".
        if (response.data && response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        return response.data;

    } catch (error) {
        console.error("Error en el servicio de registro:", error.response?.data?.message || error.message);
        // Lanzamos un error más claro para que el componente de React lo pueda mostrar al usuario.
        throw new Error(error.response?.data?.message || 'No se pudo completar el registro. Intente de nuevo.');
    }
};

/**
 * Envía las credenciales y el token de reCAPTCHA para iniciar sesión.
 * @param {string} email - El email del usuario.
 * @param {string} password - La contraseña del usuario.
 * @param {string} captchaToken - El token generado por reCAPTCHA.
 */
export const login = async (email, password, captchaToken) => {
    try {
        const response = await apiClient.post('/auth/login', {
            email,
            password,
            captchaToken: captchaToken // Añadimos el token de reCAPTCHA a la petición
        });

        if (response.data && response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        return response.data;

    } catch (error) {
        console.error("Error en el servicio de inicio de sesión:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Credenciales o reCAPTCHA incorrectos.');
    }
};

/**
 * Elimina el token de autenticación del almacenamiento local para cerrar la sesión.
 */
export const logout = () => {
    localStorage.removeItem('authToken');
    // Opcional: redirigir al usuario a la página de login o inicio.
    // window.location.href = '/login';
};

/**
 * Verifica si hay un token de autenticación guardado.
 * @returns {string|null} El token si existe, o null si no.
 */
export const getToken = () => {
    return localStorage.getItem('authToken');
};