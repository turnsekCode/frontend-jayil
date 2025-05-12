import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <>
      <div className='flex flex-col sm:flex-row border border-gray-400 mt-[120px]'>
        {/* Hero left side*/}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
          <div className='text-[#414141] px-4 py-2'>
            <div className='flex items-center gap-2'>
              <span className='w-8 md:w-11 h-[2px] bg-[#C15470]'></span>
              <span className='font-medium text-sm md:text-base'>Pendientes, collares y pulseras</span>
            </div>
            <h1 className='prata-regular text-2xl sm:py-3 lg:text-[40px] leading-[1.4] text-gray-500'>JOYERÍA DE ARCILLA POLIMÉRICA CON DISEÑO EXCLUSIVO</h1>
            <div className='flex items-center gap-2'>
              <span className='font-semibold text-sm md:text-base'>hechas a mano</span>
              <p className='w-8 md:w-11 h-[1px] bg-[#C15470]'></p>
            </div>
          </div>
        </div>
        {/* Hero right side*/}
        <img className='w-full sm:w-1/2 object-cover' fetchpriority="high" src={assets.hero_img} alt="Jayil Artesania" loading="eager" />
      </div>
      {/* Hero text */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 pt-16 pb-1 bg-white">
      <div className="lg:w-1/2">
          <img
            src={assets.sobre_mi}
            alt="joyería, accesorios, handmade, arcilla polimérica, pendientes, pulseras, collares"
            className="w-full max-w-xl object-cover shadow-sm"
          />
        </div>
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl text-gray-800 mb-4 leading-snug text-center">
            Descubre la <span className="text-[#C15470]">joyería de arcilla polimérica</span> que marca la diferencia
          </h2>
          <p className='text-gray-600 text-lg font-light leading-relaxed text-center'>
            <span className="text-gray-600 uppercase tracking-wider text-sm mb-4">
              La <span className="font-medium text-gray-800"> arcilla polimérica</span> es la opción ideal si buscas originalidad y estilo en una sola pieza.
              Gracias a las propiedades únicas de este material, es posible crear <span className="font-medium text-gray-800 mr-2">collares, pulseras y pendientes de arcilla polimérica</span> 
               en una increíble variedad de formas, colores y acabados.
            </span>
            <span className="text-gray-700 text-lg font-light leading-relaxed block">
              Desde diseños llamativos y artísticos hasta opciones más discretas y modernas, hay algo perfecto para cada gusto.
            </span>
          </p>
        </div>


      </div>

    </>
  )
}

export default Hero
