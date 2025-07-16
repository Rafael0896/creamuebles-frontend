// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';



// AHORA (Correcto): Importa la función específica que necesitas
import { registerUser } from '../services/authService'; // <-- CAMBIA ESTA LÍNEA

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        // ... (la lógica de validación de contraseña sigue igual)
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        setError(null);

        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        };

        try {
            // ANTES (Incorrecto):
            // const newUser = await authService.register(userData);

            // AHORA (Correcto): Llama a la función directamente
            const newUser = await registerUser(userData); // <-- CAMBIA ESTA LÍNEA
            
            setLoading(false);
            setSuccess(`¡Registro exitoso! Bienvenido, ${newUser.firstName}.`);
            
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Error en el registro. Inténtalo de nuevo.';
            setError(errorMessage);
        }
    };

    return (
        <div className="page-container">
            <RegisterForm 
                onRegister={handleRegister}
                loading={loading}
                error={error}
                success={success}
            />
        </div>
    );
};

export default RegisterPage;