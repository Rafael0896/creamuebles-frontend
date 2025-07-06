// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getAllCategories } from '../../services/categoryService';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
    const [categories, setCategories] = useState([]);
    const cartItemCount = 0;

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getAllCategories();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    return (
        <header>
            {/* Fíjate cómo combinamos clases de Bootstrap con las nuestras */}
            <nav className="navbar navbar-expand-lg navbar-dark header-navbar">
                <div className="container">
                    <Link className="navbar-brand header-brand" to="/">CreaMuebles</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                            <li className="nav-item dropdown">
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
                                    {cartItemCount > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {cartItemCount}
                                            <span className="visually-hidden">productos en el carrito</span>
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Inicia Sesión</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;