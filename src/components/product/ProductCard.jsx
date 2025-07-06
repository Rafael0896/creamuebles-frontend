// src/components/product/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Asegúrate de que este archivo exista o créalo si quieres estilos locales para la tarjeta
// import './ProductCard.scss';

const ProductCard = ({ product }) => {
    // Ajusta estos nombres si son diferentes en tu backend (ej: nombre, precio, imagenUrl)
    const { id, name, price, imageUrl } = product;

    return (
        <div className="card product-card h-100">
            <Link to={`/product/${id}`}>
                <img src={imageUrl || 'https://via.placeholder.com/300x200'} className="card-img-top" alt={name} />
            </Link>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                    <Link to={`/product/${id}`} className="text-decoration-none text-dark">{name}</Link>
                </h5>
                <p className="card-text mt-auto fs-4 fw-bold">${price}</p>
                <button className="btn btn-primary">Añadir al carrito</button>
            </div>
        </div>
    );
};

export default ProductCard;