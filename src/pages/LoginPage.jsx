// 1. Importa 'Link' junto a los otros hooks de react-router-dom
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { login } from '../services/authService';
import ReCAPTCHA from "react-google-recaptcha";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const GOOGLE_AUTH_URL = 'http://localhost:8080/oauth2/authorization/google';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!recaptchaToken) {
            setError('Por favor, verifica que no eres un robot.');
            return;
        }

        try {
            await login(email, password, recaptchaToken);
            console.log('¡Login exitoso!');
            navigate('/');
        } catch (err) {
            console.error('Error en el login:', err);
            setError(err.message || 'Credenciales o reCAPTCHA incorrectos.');
            if (window.grecaptcha) {
                window.grecaptcha.reset();
                setRecaptchaToken(null);
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                
                <form onSubmit={handleSubmit}>
                    {/* ... tus inputs de email y password ... */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="d-flex justify-content-center mb-3">
                        <ReCAPTCHA
                            sitekey="6Lf9ZY4rAAAAADflTQzsu26KuSZeT4rrgK4yZo1W"
                            onChange={(token) => setRecaptchaToken(token)}
                        />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    <button type="submit" className="btn btn-primary w-100" disabled={!recaptchaToken}>
                        Entrar
                    </button>
                </form>

                <div className="d-flex align-items-center my-3">
                    <hr className="flex-grow-1" />
                    <span className="px-2 text-muted small">O</span>
                    <hr className="flex-grow-1" />
                </div>

                <a href={GOOGLE_AUTH_URL} className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center">
                    {/* ... tu SVG de Google ... */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.25C2.806 7.655 2.5 8.5 2.5 9.5c0 1 .306 1.845.808 2.584C3.96 13.592 5.713 15 8 15c1.453 0 2.746-.52 3.72-1.397l.002.002 2.284-2.284c.596.596 1.389.996 2.284 1.286V9.5h-2.086z"/>
                    </svg>
                    <span className="ms-2">Iniciar sesión con Google</span>
                </a>

                {/* 2. AÑADIR ESTE BLOQUE DE CÓDIGO */}
                <div className="text-center mt-3">
                    <span className="text-muted">¿Aún no tienes cuenta? </span>
                    <Link to="/register">Regístrate</Link>
                </div>
                {/* FIN DEL BLOQUE AÑADIDO */}

            </div>
        </div>
    );
};

export default LoginPage;