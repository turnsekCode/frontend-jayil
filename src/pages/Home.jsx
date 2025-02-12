import React, { Suspense, lazy, useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ShowCategories from '../components/ShowCategories';
import { Helmet } from 'react-helmet-async';

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
      </Helmet>

      <section>
        <Hero />

        {/* Trigger para activar el lazy loading */}
    
          <ShowCategories />
    
          <div id="show-categories-trigger"></div>
        {/* Carga diferida de los componentes */}
        {loadComponents && (
          <Suspense fallback={<p>...</p>}>
            <HomeImage />
            <LatestCollection />
            <SeccionAyuda />
            <BestSeller />
            <CallToAction />
          </Suspense>
        )}
      </section>
    </>
  );
};

export default Home;
