// src/components/BannerCarousel.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './BannerCarousel.scss';

// 1. Importaciones necesarias de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';

// 2. Importa los estilos base de Swiper (¡muy importante!)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// --- Componente para el contenido de una sola diapositiva ---
const BannerSlideContent = ({ titulo, subtitulo, imageUrl, linkUrl }) => (
    <div className="banner-slide-container">
        <Link
            to={linkUrl || '#'}
            aria-label={`Promoción: ${titulo}. ${subtitulo}. Haz clic para ver más.`}
        >
            <div className="banner-background" style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className="banner-overlay" />
            <div className="banner-content">
                <h1>{titulo}</h1>
                <p>{subtitulo}</p>
            </div>
        </Link>
    </div>
);

// Validación de props para el contenido del slide (se mantiene igual)
BannerSlideContent.propTypes = {
    titulo: PropTypes.string.isRequired,
    subtitulo: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    linkUrl: PropTypes.string,
};

// --- Componente de Esqueleto para el estado de carga ---
const SkeletonSlide = () => (
    <div className="banner-slide-container carousel-placeholder">
        <div className="banner-content">
            <h1 className="placeholder-glow"><span className="placeholder col-6"></span></h1>
            <p className="placeholder-glow"><span className="placeholder col-8"></span></p>
        </div>
    </div>
);


// --- Componente Principal del Banner (Versión final con Swiper) ---
const BannerCarousel = ({ banners, isLoading }) => {
    // Caso 1: Los datos están cargando. Mostramos el esqueleto.
    if (isLoading) {
        return (
            <div className="banner-carousel-wrapper">
                <SkeletonSlide />
            </div>
        );
    }

    // Caso 2: No hay banners o la carga falló. No mostramos nada.
    if (!banners || banners.length === 0) {
        return null;
    }

    // Caso 3: Solo hay un banner. Lo mostramos estático, sin carrusel.
    if (banners.length === 1) {
        const firstBanner = banners[0];
        return (
            <div className="banner-carousel-wrapper">
                <BannerSlideContent
                    key={firstBanner.id}
                    titulo={firstBanner.title}      // Corregido: El DTO de Spring Boot usa 'title'
                    subtitulo={firstBanner.subtitle}  // Corregido: El DTO de Spring Boot usa 'subtitle'
                    imageUrl={firstBanner.imageUrl}
                    linkUrl={firstBanner.linkUrl}
                />
            </div>
        );
    }

    // Caso 4: ¡Hay múltiples banners! Aquí es donde Swiper entra en acción.
    return (
        <div className="banner-carousel-wrapper">
            <Swiper
                // Módulos que activan funcionalidades (flechas, puntos, autoplay)
                modules={[Navigation, Pagination, Autoplay, A11y]}
                // Configuración
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                navigation={true} // Muestra las flechas de navegación
                pagination={{ clickable: true }} // Muestra los puntos y permite hacer clic
                autoplay={{
                    delay: 5000, // Cambia de slide cada 5 segundos
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true, // Pausa el autoplay si el ratón está sobre el carrusel
                }}
                a11y={{ // Mejoras de accesibilidad para lectores de pantalla
                    prevSlideMessage: 'Diapositiva anterior',
                    nextSlideMessage: 'Siguiente diapositiva',
                    paginationBulletMessage: 'Ir a la diapositiva {{index}}',
                }}
            >
                {/* Mapeamos el array de banners para crear cada diapositiva */}
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <BannerSlideContent
                            titulo={banner.title}
                            subtitulo={banner.subtitle}
                            imageUrl={banner.imageUrl}
                            linkUrl={banner.linkUrl}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

// Validación de Propiedades del componente principal
// Nota: Ajustado a los nombres de campo de tu DTO (title, subtitle)
BannerCarousel.propTypes = {
    banners: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,    // Corregido: Prop validation para 'title'
            subtitle: PropTypes.string.isRequired, // Corregido: Prop validation para 'subtitle'
            imageUrl: PropTypes.string.isRequired,
            linkUrl: PropTypes.string,
        })
    ),
    isLoading: PropTypes.bool,
};

// Valores por defecto
BannerCarousel.defaultProps = {
    banners: [],
    isLoading: true,
};

export default BannerCarousel;