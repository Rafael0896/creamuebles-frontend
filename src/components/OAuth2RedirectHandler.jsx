import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Este componente actúa como un intermediario silencioso.
 * No renderiza nada permanentemente, solo procesa la redirección de OAuth2.
 */
const OAuth2RedirectHandler = () => {
    // Hook para acceder a la información de la URL actual (incluyendo los parámetros de consulta)
    const location = useLocation();
    // Hook para redirigir al usuario a otra página de forma programática
    const navigate = useNavigate();

    useEffect(() => {
        // URLSearchParams es una utilidad del navegador para trabajar fácilmente con los parámetros de la URL.
        // Por ejemplo, si la URL es /oauth2/redirect?token=ABCDE, location.search será "?token=ABCDE".
        const params = new URLSearchParams(location.search);
        
        const token = params.get('token');
        const error = params.get('error');

        if (token) {
            // --- CASO DE ÉXITO ---
            // Si el backend nos envió un token, el login fue exitoso.
            console.log("Token de OAuth2 recibido. Guardando...");
            
            // Guardamos el token en el almacenamiento local del navegador.
            // Así, en las siguientes peticiones a la API, podremos leerlo y enviarlo.
            localStorage.setItem('authToken', token);

            // Redirigimos al usuario a la página de inicio (o a su perfil, etc.)
            // El 'replace: true' evita que el usuario pueda volver a esta página de redirección con el botón "atrás".
            navigate('/', { replace: true });

        } else {
            // --- CASO DE ERROR ---
            // Si el backend nos envió un error, algo salió mal.
            console.error("Error durante la autenticación OAuth2:", error);

            // Redirigimos al usuario de vuelta a la página de login para que pueda intentarlo de nuevo.
            navigate('/login', { replace: true });
        }

        // Este efecto se ejecuta solo una vez, cuando el componente se monta por primera vez.
    }, [location, navigate]);

    // Mientras el useEffect hace su trabajo, mostramos un mensaje de carga al usuario.
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="text-center">
                <h2>Procesando autenticación...</h2>
                <p>Por favor, espere.</p>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default OAuth2RedirectHandler;