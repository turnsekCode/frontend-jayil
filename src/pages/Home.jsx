import React, { lazy, useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ShowCategories from '../components/ShowCategories';
import { Helmet } from 'react-helmet-async';
import { assets } from '../assets/assets';

// Lazy load de los componentes
const HomeImage = lazy(() => import('../components/HomeImage'));
const LatestCollection = lazy(() => import('../components/LatestCollection'));
const SeccionAyuda = lazy(() => import('../components/SeccionAyuda'));
const BestSeller = lazy(() => import('../components/BestSeller'));
const CallToAction = lazy(() => import('../components/CallToAction'));

const Home = () => {
  const [loadComponents, setLoadComponents] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadComponents(true);
          observer.disconnect(); // Evita que siga observando
        }
      },
      { threshold: 0.1 }
    );

    const target = document.getElementById('show-categories-trigger');
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Joyería Artesanal Exclusiva - Pendientes, Anillos y Collares Hechos a Mano</title>
        <meta
          name="description"
          content="Descubre joyería única que combina diseño exclusivo artesanal con acero inoxidable. Pendientes, anillos y collares hechos a mano, complementos para mujer, fusionando moda, elegancia y durabilidad. ¡Encuentra tu estilo único aquí!"
        />
        <link rel="preload" as="image" href={assets.hero_img} />
        <meta name="author" content="Jayil Artesanía" />
        {/* Open Graph (Facebook, WhatsApp, etc.) */}
        <meta property="og:title" content="Jayil.es | Joyería artesanal de ocasión" />
        <meta
          property="og:description"
          content="Tienda online de joyería artesanal: pendientes, pulseras y collares únicos desde Valencia. Envíos a toda España."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jayil.es" />
        <meta property="og:image" content={assets.hero_img} /> {/* Cambia por tu imagen destacada */}
        <meta property="og:site_name" content="Jayil.es" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jayil.es | Joyería artesanal de ocasión" />
        <meta
          name="twitter:description"
          content="Tienda online de joyas únicas hechas a mano. Pendientes, pulseras y collares desde Valencia. ¡Descúbrelos!"
        />
        <meta name="twitter:image" content={assets.hero_img} />
        <meta name='keywords' content='pendientes, joyería artesanal, moda, mujer, acero inoxidable, diseño exclusivo, tendencia, elegancia' />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://www.jayil.es' />
      </Helmet>

      <section>
        <Hero />

        {/* Trigger para activar el lazy loading */}

        <ShowCategories />

        <div id="show-categories-trigger"></div>
        {/* Carga diferida de los componentes */}
        {loadComponents && (
          <>
            <HomeImage />
            <LatestCollection />
            <SeccionAyuda />
            <BestSeller />
            <CallToAction />
          </>
        )}
      </section>
    </>
  );
};

export default Home;
