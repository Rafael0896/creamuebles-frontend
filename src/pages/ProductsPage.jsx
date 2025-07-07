// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../services/productService'; // Asegúrate de que la ruta sea correcta
import '../App.scss';
import { formatColombianPrice } from '../utils/formatters';

const ProductsPage = () => {
    // 1. Inicializar siempre como un array vacío
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getAllProducts();
                
                // 2. Extraer el array de la propiedad "content"
                if (data && data.content) {
                    setProducts(data.content);
                } else {
                    // Si la respuesta no tiene 'content', podría ser un array directo (menos probable)
                    setProducts(data || []);
                }

            } catch (err) {
                console.error("Error al obtener los productos:", err);
                setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // El array vacío asegura que se ejecute solo una vez

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="products-container">
            <h1>Nuestros Productos</h1>
            <div className="products-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.imageUrl || 'default-image.jpg'} alt={product.name} />
                            
                            {/* Añadimos un div para agrupar el contenido de texto */}
                            <div className="card-content">
                                
                                <h2 className="card-title">{product.name}</h2>
                                 <p className="card-price">{formatColombianPrice(product.price)}</p>

                                {/* 3. Añadimos el Link para ver los detalles */}
                                <Link to={`/product/${product.id}`} className="details-btn">
                                    Ver Detalles
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles en este momento.</p>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;