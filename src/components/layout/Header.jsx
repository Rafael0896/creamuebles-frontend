// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getAllCategories } from '../../services/categoryService';
import { FaShoppingCart } from 'react-icons/fa';
// 1. IMPORTAMOS EL HOOK PARA USAR EL CONTEXTO DEL CARRITO
import { useCart } from '../../context/CartContext';

const Header = () => {
    const [categories, setCategories] = useState([]);
    
    // 2. OBTENEMOS LOS ITEMS DEL CARRITO DESDE EL CONTEXTO GLOBAL
    const { cartItems } = useCart();

    // 3. CALCULAMOS EL NÚMERO TOTAL DE PRODUCTOS EN EL CARRITO
    //    Sumamos las cantidades de cada item para tener el total real.
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Tu lógica para cargar categorías se mantiene intacta
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error al cargar las categorías:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark header-navbar">
                <div className="container">
                    <Link className="navbar-brand header-brand" to="/">CreaMuebles</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                            <li className="nav-item dropdown">
                                {/* ... tu código del dropdown de categorías no cambia ... */}
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categorías
                                </a>
                                <ul className="dropdown-menu">
                                    {categories.map(category => (
                                        <li key={category.id}>
                                            <Link className="dropdown-item" to={`/category/${category.id}`}>
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link position-relative" to="/cart" aria-label="Ver carrito de compras">
                                    <FaShoppingCart size="1.3em" />
                                    {/* 4. USAMOS LA NUEVA VARIABLE DINÁMICA */}
                                    {totalItemsInCart > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {totalItemsInCart}
                                            <span className="visually-hidden">productos en el carrito</span>
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                            {/* Menú desplegable para la cuenta de usuario */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownAccount" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Iniciar Sesión
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownAccount">
                                    {/* Más adelante, aquí puedes mostrar "Mi Cuenta" si el usuario está logueado */}
                                    <li>
                                        <Link className="dropdown-item" to="/login">Iniciar Sesión</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/register">Registrarse</Link>
                                    </li>
                                    <li><Link className="dropdown-item" to="/account">Mi Cuenta</Link></li> {/* Aquí podrías agregar más opciones como "Cerrar Sesión" si el usuario está logueado */}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;