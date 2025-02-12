import React from 'react'
import {assets} from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero left side*/}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141] px-4 py-2'>
            <div className='flex items-center gap-2'>
                <span className='w-8 md:w-11 h-[2px] bg-[#C15470]'></span>
                <p className='font-medium text-sm md:text-base'>Pendientes, collares y pulseras</p>
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-[60px] leading-[1.4]'>JOYERÍA CON DISEÑO EXCLUSIVO</h1>
            <div className='flex items-center gap-2'>
                <p className='font-semibold text-sm md:text-base'>hechas a mano</p>
                <p className='w-8 md:w-11 h-[1px] bg-[#C15470]'></p>
            </div>
        </div>
      </div>
       {/* Hero right side*/}
       <img className='w-full sm:w-1/2 object-cover' fetchpriority="high" src={assets.hero_img} alt="Jayil Artesania" />
    </div>
  )
}

export default Hero
