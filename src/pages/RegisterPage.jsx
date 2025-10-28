// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import ReCAPTCHA from "react-google-recaptcha";
import Swal from 'sweetalert2'; // ✅ Importamos SweetAlert2

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        documentType: 'CC',
        documentNumber: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [captchaToken, setCaptchaToken] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (!captchaToken) {
            setError("Por favor, verifica que no eres un robot.");
            return;
        }

        try {
            const dataToSend = {
                ...formData,
                captchaToken: captchaToken
            };

            await register(dataToSend);

            // ✅ SweetAlert2: mensaje de éxito visual
            Swal.fire({
                icon: 'success',
                title: '¡Cuenta creada con éxito!',
                text: 'Tu registro fue exitoso. Serás redirigido al inicio de sesión.',
                showConfirmButton: false,
                timer: 2500, // 2.5 segundos
                timerProgressBar: true,
            });

            // 🔄 Redirigir al login después del tiempo del alert
            setTimeout(() => navigate('/login'), 2500);

        } catch (err) {
            // ⚠️ Mensaje visual de error con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar',
                text: err.message || 'Ocurrió un error al crear tu cuenta. Inténtalo de nuevo.',
            });

            if (window.grecaptcha) {
                window.grecaptcha.reset();
                setCaptchaToken(null);
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card p-4" style={{ width: '100%', maxWidth: '500px' }}>
                <h2 className="text-center mb-4">Crear Cuenta</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nombres</label>
                            <input type="text" name="firstName" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Apellidos</label>
                            <input type="text" name="lastName" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Tipo de Documento</label>
                            <select name="documentType" className="form-select" onChange={handleChange} value={formData.documentType}>
                                <option value="CC">Cédula de Ciudadanía</option>
                                <option value="CE">Cédula de Extranjería</option>
                                <option value="TI">Tarjeta de Identidad</option>
                                <option value="PAS">Pasaporte</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Número de Documento</label>
                            <input type="text" name="documentNumber" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Celular</label>
                        <input type="tel" name="phoneNumber" className="form-control" onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirmar Contraseña</label>
                        <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="d-flex justify-content-center mb-3">
                        <ReCAPTCHA
                            sitekey="6Lf9ZY4rAAAAADflTQzsu26KuSZeT4rrgK4yZo1W"
                            onChange={(token) => setCaptchaToken(token)}
                        />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <button type="submit" className="btn btn-primary w-100" disabled={!captchaToken}>
                        Registrarse
                    </button>

                    <div className="text-center mt-3">
                        <span className="text-muted">¿Ya tienes cuenta? </span>
                        <Link to="/login">Iniciar sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
