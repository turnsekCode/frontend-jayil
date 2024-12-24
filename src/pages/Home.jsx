import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import ShowCategories from '../components/ShowCategories'
import CallToAction from '../components/CallToAction'

const Home = () => {
  return (
    <div>
      <Hero />
      <ShowCategories />
      <LatestCollection />
      <CallToAction />
      <BestSeller />
      <OurPolicy />
    </div>
  )
}

export default Home
