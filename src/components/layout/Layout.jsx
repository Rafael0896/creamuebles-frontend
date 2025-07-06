// src/components/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            <Header />
            {/* Outlet es el marcador de posición donde se renderizarán las páginas (HomePage, ProductsPage, etc.) */}
            <main className="main-content flex-grow-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
    