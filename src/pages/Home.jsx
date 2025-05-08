import React, { lazy, useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ShowCategories from '../components/ShowCategories';
import { Helmet } from 'react-helmet-async';
import { assets } from '../assets/assets';
import GoogleReviews from '../components/GoogleResenas';

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

  useEffect(() => {
    const interval = setInterval(() => {
      const link = document.querySelector('#resenasGoogle .jGAyav a');
      if (link) {
        link.style.setProperty('display', 'none', 'important');
        clearInterval(interval); // Deja de buscar cuando lo encuentre
      }
    }, 10000); // Cada medio segundo revisa

    return () => clearInterval(interval); // Limpieza
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "jayil.es",
            url: "https://jayil.es",
            logo: "/logo.png",
            image: "https://www.jayil.es/assets/hero_img-iYLBa_0K.webp",
            description:
              "Jayil.es es una tienda online de joyería de ocasión hecha de arcilla polimérica. Vendemos pendientes, pulseras y collares artesanales con envío desde Valencia, España.",
            telephone: "+34 672 56 34 52",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Valencia",
              addressCountry: "ES",
            },
            sameAs: [
              "https://www.instagram.com/jayil.artesania",
              "https://www.facebook.com/jayil.artesania",
            ],
          })}
        </script>
      </Helmet>

      <section>
        <Hero />

        {/* Trigger para activar el lazy loading */}

        <ShowCategories />

        <div id="show-categories-trigger"></div>
        {/* Carga diferida de los componentes */}

        <>
          <HomeImage />
          <LatestCollection />
          {loadComponents && (
            <div id='resenasGoogle'><GoogleReviews /></div>
          )}
          <SeccionAyuda />
          <BestSeller />
          <CallToAction />
        </>

      </section>
    </>
  );
};

export default Home;
