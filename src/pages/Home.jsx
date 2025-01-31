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

const Home = () => {
  return (
    <div>
      <Hero />
      <ShowCategories />
      <HomeImage/>
      <LatestCollection />
      <ImagePromo />
      <SeccionAyuda />
      <BestSeller />
      <CallToAction />
      <OurPolicy />
    </div>
  )
}

export default Home
