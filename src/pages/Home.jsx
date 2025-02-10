import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import ShowCategories from '../components/ShowCategories'
import CallToAction from '../components/CallToAction'
import SeccionAyuda from '../components/SeccionAyuda'
import HomeImage from '../components/HomeImage'
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Joyería Artesanal Exclusiva - Pendientes, Anillos y Collares Hechos a Mano</title>
        <meta name='description' content='Descubre joyería única que combina diseño exclusivo artesanal con acero inoxidable. Pendientes, anillos y collares hechos a mano, complementos para mujer, fusionando moda, elegancia y durabilidad. ¡Encuentra tu estilo único aquí!' />
      </Helmet>

      <section>


        <Hero />
        <ShowCategories />
        <HomeImage />
        <LatestCollection />
        <SeccionAyuda />
        <BestSeller />
        <CallToAction />
      </section>
    </>
  )
}

export default Home
