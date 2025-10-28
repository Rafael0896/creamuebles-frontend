// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
// 1. IMPORTAMOS useNavigate PARA LA BÚSQUEDA y useLocation para limpiar la búsqueda
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { getAllCategories } from '../../services/categoryService';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

// 2. IMPORTAMOS EL FUTURO HOOK DE AUTENTICACIÓN
// import { useAuth } from '../../context/AuthContext'; // Descomentar cuando crees el AuthContext

const Header = () => {
    const [categories, setCategories] = useState([]);
    // 3. AÑADIMOS UN ESTADO PARA LA BARRA DE BÚSQUEDA
    const [searchQuery, setSearchQuery] = useState('');

    // Hooks y lógica existente
    const { cartItems } = useCart();
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    // 4. INICIALIZAMOS useNavigate PARA REDIRIGIR AL USUARIO
    const navigate = useNavigate();
    const location = useLocation();

    // Lógica para cargar categorías (sin cambios)
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

    // Efecto para limpiar la búsqueda si cambiamos de página
    useEffect(() => {
        setSearchQuery('');
    }, [location]);


    // 5. FUNCIÓN PARA MANEJAR EL ENVÍO DEL FORMULARIO DE BÚSQUEDA
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        if (searchQuery.trim()) {
            // Redirigimos a una página de resultados de búsqueda
            navigate(`/search?q=${searchQuery.trim()}`);
        }
    };

    // 6. DATOS DE AUTENTICACIÓN DESDE EL CONTEXTO REAL
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark header-navbar">
                <div className="container">
                    <Link className="navbar-brand header-brand" to="/">CreaMuebles MR</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* --- INICIO: NUEVA BARRA DE BÚSQUEDA CENTRADA --- */}
                    <div className="search-wrapper mx-auto"> {/* 1. Wrapper para centrar y controlar el tamaño */}
                        <form className="position-relative" onSubmit={handleSearchSubmit}> {/* 2. El form es ahora el contenedor relativo */}
                            <input
                                className="form-control search-input" // 3. Clase custom para el input
                                type="search"
                                placeholder="Encuentra tu mueble ideal..."
                                aria-label="Buscar productos"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch
                                className="search-icon" // 4. Clase custom para el icono
                                onClick={handleSearchSubmit} // Hacemos el icono clickeable para enviar la búsqueda
                            />
                        </form>
                    </div>
                    {/* --- FIN: NUEVA BARRA DE BÚSQUEDA CENTRADA --- */}

                        <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
                            <li className="nav-item dropdown">
                                {/* ... tu código del dropdown de categorías no cambia ... */}
                                <button
                                    className="nav-link dropdown-toggle btn btn-link"
                                    type="button"
                                    id="navbarDropdownCategories"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Categorías
                                </button>
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
                            
                            {/* --- INICIO: LÓGICA DE AUTENTICACIÓN --- */}
                            <li className="nav-item dropdown">
                                {isAuthenticated ? (
                                    // Vista para usuario AUTENTICADO
                                    <>
                                        <button
                                            className="nav-link dropdown-toggle btn btn-link"
                                            id="navbarDropdownAccount"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <span>Hola, {user.fullName || user.firstName || 'Usuario'}</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownAccount">
                                            <li><Link className="dropdown-item" to="/account">Mi Cuenta</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <button className="dropdown-item" onClick={logout}>
                                                    Cerrar Sesión
                                                </button>
                                            </li>
                                        </ul>
                                    </>
                                ) : (
                                    // Vista para usuario NO AUTENTICADO (tu código original)
                                    <>
                                        <button
                                            className="nav-link dropdown-toggle btn btn-link"
                                            id="navbarDropdownAccount"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Iniciar Sesión
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownAccount">
                                            <li><Link className="dropdown-item" to="/login">Iniciar Sesión</Link></li>
                                            <li><Link className="dropdown-item" to="/register">Registrarse</Link></li>
                                            <li><Link className="dropdown-item" to="/account">Mi Cuenta</Link></li>
                                        </ul>
                                    </>
                                )}
                            </li>
                            {/* --- FIN: LÓGICA DE AUTENTICACIÓN --- */}

                            <li className="nav-item">
                                {/* ... tu código del carrito no cambia ... */}
                                <NavLink className="nav-link position-relative" to="/cart" aria-label="Ver carrito de compras">
                                    <FaShoppingCart size="1.3em" />
                                    {totalItemsInCart > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {totalItemsInCart}
                                            <span className="visually-hidden">productos en el carrito</span>
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;