// src/pages/ProductsPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';


// --- SERVICIOS ---
// Importamos ambos servicios, el de productos y el de banners
import { getAllProducts } from '../services/productService';
import { getActiveBanners } from '../services/bannerService'; // Asegúrate que la ruta sea correcta

// --- COMPONENTES ---
// Importamos nuestro nuevo componente de carrusel
import BannerCarousel from '../components/BannerCarousel'; // Asegúrate que la ruta sea correcta

// --- UTILIDADES Y ESTILOS ---
import { formatColombianPrice } from '../utils/formatters';
import '../App.scss';

const ProductsPage = () => {
    // 1. OBTENER LOS BANNERS (PROMOCIONES) CON REACT QUERY
    const { data: banners, isLoading: isLoadingBanners } = useQuery({
        queryKey: ['activeBanners'],
        queryFn: getActiveBanners,
    });

    // 2. OBTENER LOS PRODUCTOS CON REACT QUERY (CÓDIGO REFACTORIZADO)
    const {
        data: productsData,
        isLoading: isLoadingProducts,
        error: errorProducts,
    } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
    });

    // Si tu API de Spring pagina los resultados, los datos vienen en la propiedad "content"
    const products = productsData?.content || productsData || [];

    // --- RENDERIZADO DE LA PÁGINA ---

    // Mostramos un estado de carga principal si los productos aún no han llegado
    if (isLoadingProducts) {
        return <div className="text-center py-5">Cargando...</div>;
    }

    // Mostramos un error si la carga de productos falla
    if (errorProducts) {
        return (
            <div className="text-center py-5 text-danger">
                No se pudieron cargar los productos. Inténtalo de nuevo más tarde.
            </div>
        );
    }

    return (
        // Usamos un Fragment <> para agrupar todo
        <>
            {/* 3. RENDERIZAMOS EL CARRUSEL EN LA PARTE SUPERIOR */}
            {/* Le pasamos los datos y el estado de carga que obtuvimos del hook useQuery */}
            <BannerCarousel banners={banners} isLoading={isLoadingBanners} />

            {/* 4. RENDERIZAMOS LA LISTA DE PRODUCTOS DEBAJO */}
            <div className="products-container container my-4">
                <h1 className="mb-4">Nuestros Productos</h1>
                <div className="products-grid">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="product-card">
                                <Link to={`/product/${product.id}`} className="product-link">
                                    <img
                                        src={product.imageUrl || 'default-image.jpg'}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <div className="card-content">
                                        <h2 className="card-title">{product.name}</h2>
                                        <p className="card-price">{formatColombianPrice(product.price)}</p>
                                    </div>
                                </Link>
                                <Link to={`/product/${product.id}`} className="details-btn mt-auto">
                                    Ver Detalles
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No hay productos disponibles en este momento.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductsPage;