import React from 'react'

const CallToAction = () => {
  return (
    <div className='text-center mt-8'>
      <p className='text-4xl font-medium text-gray-700'>¿Interesada en personalizar tu accesorio?</p>
      <p className='text-gray-400 mt-3'>Escoge tu color ideal, personaliza a tu gusto para ese evento especial</p>
      <p className='text-gray-400 mt-3'>Comunícate con nosotros a través de WhatsApp</p>
      <div className='w-full sm:w-1/2 flex items-center justify-center gap-3 mx-auto my-6 pl-3'>
        <a
          href="https://wa.me/672563452?text=Estoy%20interesada%20en%20personalizar%20un%20producto"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25d366] text-white text-xs px-10 py-4 flex items-center justify-center"
        >
          WHATSAPP
        </a>

      </div>
    </div>
  )
}

export default CallToAction
