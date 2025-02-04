import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import ShowCategories from '../components/ShowCategories'
import CallToAction from '../components/CallToAction'
import ImagePromo from '../components/ImagePromo'
import SeccionAyuda from '../components/SeccionAyuda'
import HomeImage from '../components/HomeImage'
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <section>
      <Helmet>
        <title>Jayil.es</title>
        <meta name='description' content='Joyería con diseño exclusivo hechas a mano' />
      </Helmet>

      <Hero />
      <ShowCategories />
      <HomeImage/>
      <LatestCollection />
      <SeccionAyuda />
      <BestSeller />
      <CallToAction />
    </section>
  )
}

export default Home
