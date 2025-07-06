// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        // 1. Hemos quitado "bg-dark", "text-white", etc.
        // 2. Lo hemos reemplazado por nuestra propia clase: "app-footer".
        <footer className="app-footer">
            <div className="container">
                <p className="mb-0">&copy; {new Date().getFullYear()} CreaMuebles. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;