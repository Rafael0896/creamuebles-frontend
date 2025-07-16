// c:\Users\ASUS\IdeaProjects\creamuebles-frontend\src\components\HeroBanner.jsx
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { getActiveBanners } from '../services/bannerService';
// No es necesario importar App.scss aquí si ya está importado en tu App.js o index.js

const HeroBanner = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setLoading(true);
                setError(null); // Limpiamos errores previos al iniciar la carga
                const data = await getActiveBanners();
                setBanners(data);
            } catch (err) {
                // Si la petición falla, guardamos un mensaje de error amigable
                setError('No se pudieron cargar las promociones. Inténtalo de nuevo más tarde.');
                console.error("Error al obtener los datos del banner:", err);
            } finally {
                // Esto se ejecuta siempre, haya habido éxito o error
                setLoading(false);
            }
        };

        fetchBanners();
    }, []); // El array vacío asegura que se ejecute solo una vez

    // 1. Estado de Carga: Muestra un placeholder visual.
    if (loading) {
        return <div className="hero-banner-loading" aria-label="Cargando banners..."></div>;
    }

    // 2. Estado de Error: Muestra un mensaje claro al usuario.
    if (error) {
        return (
            <div className="hero-banner-error">
                <p>{error}</p>
            </div>
        );
    }

    // 3. Si no hay banners (pero no hubo error), no muestra nada para evitar un hueco.
    if (!banners || banners.length === 0) {
        return null;
    }

    // 4. Estado de Éxito: Muestra el carrusel con los datos.
    return (
        <Carousel className="hero-banner" interval={5000} ride="carousel">
            {banners.map((banner) => (
                <Carousel.Item key={banner.id}>
                    <div
                        className="carousel-image-container"
                        style={{ backgroundImage: `url(${banner.imageUrl})` }}
                    />
                    <Carousel.Caption className="hero-content">
                        <h1 className="hero-title">{banner.title}</h1>
                        <p className="hero-subtitle">{banner.subtitle}</p>
                        {/* Puedes volver a añadir el Link aquí si tu data lo incluye */}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default HeroBanner;
