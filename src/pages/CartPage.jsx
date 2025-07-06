import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatColombianPrice } from '../utils/formatters';
import { FaTrashAlt } from 'react-icons/fa'; // Importamos un ícono de basura

const CartPage = () => {
    // 1. OBTENEMOS LAS NUEVAS FUNCIONES DEL CONTEXTO
    const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="container text-center py-5">
                <h2>Tu carrito de compras está vacío</h2>
                <p className="lead text-muted">Parece que aún no has añadido ningún producto.</p>
                <Link to="/" className="btn btn-primary mt-3">
                    Ver Productos
                </Link>
            </div>
        );
    }

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="container cart-page-container py-5">
            <h1 className="mb-4">Mi Carrito de Compras</h1>
            <div className="row">
                <div className="col-lg-8">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item d-flex align-items-center mb-3">
                            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details flex-grow-1">
                                <h5>{item.name}</h5>
                                <p className="fw-bold mb-0">{formatColombianPrice(item.price)}</p>
                            </div>
                            
                            {/* 2. AÑADIMOS LOS CONTROLES DE CANTIDAD */}
                            <div className="quantity-controls d-flex align-items-center">
                                <button 
                                    className="btn btn-outline-secondary btn-sm" 
                                    onClick={() => decrementQuantity(item.id)}
                                >-</button>
                                <span className="quantity-display mx-3">{item.quantity}</span>
                                <button 
                                    className="btn btn-outline-secondary btn-sm" 
                                    onClick={() => incrementQuantity(item.id)}
                                >+</button>
                            </div>

                            <div className="cart-item-subtotal mx-4">
                                <p className="fw-bold mb-0">{formatColombianPrice(item.price * item.quantity)}</p>
                            </div>

                            {/* 3. AÑADIMOS EL BOTÓN DE ELIMINAR */}
                            <button 
                                className="btn btn-outline-danger btn-sm" 
                                onClick={() => removeFromCart(item.id)}
                                aria-label={`Eliminar ${item.name} del carrito`}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Columna del resumen de la compra */}
                <div className="col-lg-4">
                    <div className="cart-summary">
                        <h3>Resumen del Pedido</h3>
                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>{formatColombianPrice(cartTotal)}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5">
                            <span>Total</span>
                            <span>{formatColombianPrice(cartTotal)}</span>
                        </div>
                        <button className="btn btn-success w-100 mt-4">
                            Proceder al Pago
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;