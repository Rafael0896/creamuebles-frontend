// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
// 1. Eliminamos la importación de HomePage que ya no se usará
// import HomePage from '../pages/HomePage'; 
import ProductsPage from '../pages/ProductsPage';
import LoginPage from '../pages/LoginPage';
import ProductDetailPage from '../pages/ProductDetailPage';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Todas las rutas dentro de esta Route usarán el componente Layout */}
            <Route path="/" element={<Layout />}>
                
                {/* 2. CAMBIO CLAVE: La ruta principal (index) ahora muestra la página de productos */}
                <Route index element={<ProductsPage />} />

                {/* 3. Esta ruta es ahora redundante, la eliminamos para mayor claridad */}
                {/* <Route path="products" element={<ProductsPage />} /> */}

                {/* La ruta para el login se mantiene igual */}
                <Route path="login" element={<LoginPage />} />

                {/* Aquí puedes añadir más rutas como /register, /cart, etc. */}

                {/* El ":productId" es un parámetro que cambiará según el producto */}
                <Route path="product/:productId" element={<ProductDetailPage />} />

                {/* Una ruta "catch-all" para páginas no encontradas */}
                <Route path="*" element={<div className="text-center py-5"><h2>404 - Página no encontrada</h2></div>} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;