// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { formatColombianPrice } from '../utils/formatters';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // 1. AÑADIMOS UN NUEVO ESTADO PARA LA CONFIRMACIÓN VISUAL
    const [isAdded, setIsAdded] = useState(false);

    const { addToCart } = useCart();

    // 2. CREAMOS UNA FUNCIÓN MANEJADORA PARA EL CLIC
    const handleAddToCart = () => {
        addToCart(product); // Llama a la función del carrito
        setIsAdded(true);   // Activa el estado de confirmación

        // Después de 2 segundos, volvemos el botón a su estado original
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    useEffect(() => {
        // ... (tu useEffect para cargar el producto se mantiene exactamente igual)
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const data = await getProductById(productId);
                setProduct(data);
            } catch (err) {
                setError('No se pudo cargar la información del producto. Es posible que no exista.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (loading) {
        return <div className="text-center py-5"><h2>Cargando...</h2></div>;
    }

    if (error) {
        return <div className="text-center py-5"><h2>{error}</h2></div>;
    }

    if (!product) {
        return null;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-image">
                <img src={product.imageUrl || 'https://via.placeholder.com/500'} alt={product.name} />
            </div>
            <div className="product-detail-info">
                <h1 className="detail-title">{product.name}</h1>
                <p className="detail-description">{product.description}</p>
                <p className="detail-stock">Unidades disponibles: <span>{product.stock}</span></p>
                <p className="detail-price">{formatColombianPrice(product.price)}</p>
                
                {/* 3. MODIFICAMOS EL BOTÓN PARA QUE SEA DINÁMICO */}
                <button
                    className="add-to-cart-detail-btn"
                    onClick={handleAddToCart}
                    disabled={isAdded} // Opcional: deshabilita el botón mientras muestra la confirmación
                >
                    {isAdded ? (
                        <>
                            <span className="me-2">✔</span> ¡Añadido!
                        </>
                    ) : (
                        'Añadir al carrito'
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductDetailPage;