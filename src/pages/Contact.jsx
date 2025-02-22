import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { Helmet } from 'react-helmet-async'

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contacto</title>
        <meta name='description' content='Contacto' />
      </Helmet>

      <div>

        <div className='text-center text-2xl pt-[120px]'>
          <Title text1={'CONTACTA'} text2={'NOS'} />
        </div>
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Tienda Online</p>
            <p className='text-gray-500'>Valencia, España<br />Entregas personales en Valencia capital.</p>
            <p className='font-semibold text-xl text-gray-600'>Contacto</p>
            <p className='text-gray-500'>Tel: (+34) 672 56 34 52 <br />Email: jayil.artesania@gmail.com</p>
          </div>
        </div>

      </div>
    </>
  )
}

export default Contact