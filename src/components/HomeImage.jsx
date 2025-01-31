import React from 'react'
import { assets } from '../assets/assets'

const HomeImage = () => {
  return (
    <div>
    <img src={assets.homeWeb} alt="web" className="hidden md:block" />
    <img src={assets.homeMovil} alt="movil" className="block md:hidden" />
  </div>
  
  )
}

export default HomeImage
