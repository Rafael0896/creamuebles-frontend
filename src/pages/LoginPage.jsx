// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService'; // 1. Importamos la función de login

const LoginPage = () => {
    // 2. Estados para guardar lo que el usuario escribe en los campos
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Estado para mostrar mensajes de error

    // 3. Hook para redirigir al usuario después de un login exitoso
    const navigate = useNavigate();

    // 4. Esta es la función CLAVE que se ejecuta al presionar "Entrar"
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene que la página se recargue
        setError(null); // Limpiamos cualquier error anterior

        try {
            // 5. Llamamos a la función 'login' del servicio con los datos del formulario
            console.log('Intentando iniciar sesión con:', email); // Para depuración
            await login(email, password);

            // 6. Si la línea anterior no da error, el login fue exitoso
            console.log('¡Login exitoso!');
            navigate('/'); // Redirigimos al usuario a la página de inicio

        } catch (err) {
            // 7. Si 'login' lanza un error (ej. 401, 404), lo capturamos aquí
            console.error('Error en el login:', err);
            setError('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                
                {/* 8. Conectamos la función handleSubmit al evento onSubmit del formulario */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado 'email'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado 'password'
                            required
                        />
                    </div>

                    {/* 9. Mostramos el mensaje de error si existe */}
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    <button type="submit" className="btn btn-primary w-100">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;