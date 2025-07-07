// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductsPage from '../pages/ProductsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProductDetailPage from '../pages/ProductDetailPage';

// 1. Reemplazamos el placeholder con la importación real del componente
import CartPage from '../pages/CartPage';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Todas las rutas anidadas aquí compartirán el Layout (Header y Footer) */}
            <Route path="/" element={<Layout />}>
                
                {/* Ruta principal (landing page) */}
                <Route index element={<ProductsPage />} />

                {/* Ruta para el login */}
                <Route path="login" element={<LoginPage />} />

                {/* Ruta para el registro de nuevos usuarios */}
                <Route path="register" element={<RegisterPage />} />

                {/* 2. Dejamos una única y limpia ruta para el carrito */}
                <Route path="cart" element={<CartPage />} />

                {/* Ruta dinámica para los detalles de un producto específico */}
                <Route path="product/:productId" element={<ProductDetailPage />} />

                {/* Ruta "catch-all" para cualquier URL no encontrada */}
                <Route path="*" element={<div className="text-center py-5"><h2>404 - Página no encontrada</h2></div>} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;