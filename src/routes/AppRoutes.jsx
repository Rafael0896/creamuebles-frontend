import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductsPage from '../pages/ProductsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import OAuth2RedirectHandler from '../components/OAuth2RedirectHandler';
import CartPage from '../pages/CartPage';

const AppRoutes = () => {
    return (
        <Routes>
            {/* --- MEJORA --- */}
            {/* Ruta para el handler de OAuth2. La ponemos fuera del Layout */}
            {/* porque es una página transitoria que no necesita Navbar ni Footer. */}
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

            {/* Rutas que sí comparten el Layout (Header y Footer) */}
            <Route path="/" element={<Layout />}>
                
                {/* Ruta principal (landing page) */}
                <Route index element={<ProductsPage />} />

                {/* Ruta para el login */}
                <Route path="login" element={<LoginPage />} />

                {/* Ruta para el registro de nuevos usuarios */}
                <Route path="register" element={<RegisterPage />} />

                {/* Ruta para el carrito */}
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