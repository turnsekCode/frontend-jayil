import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our store</p>
          <p className='text-gray-500'>54709 wills statios <br/> suite 350, wasgington, USA</p>
          <p className='font-semibold text-xl text-gray-600'>Direct Contact</p>
          <p className='text-gray-500'>Tel: (34) 555-0132 <br/>Email: admin@jayil.es</p>
        </div>
      </div>

    </div>
  )
}

export default Contact