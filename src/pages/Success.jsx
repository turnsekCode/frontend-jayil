import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Success = () => {
  return (
    <>
      <Helmet>
        <title>Jayil.es</title>
        <meta name='description' content='Joyería con diseño exclusivo hechas a mano' />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className='flex flex-col sm:flex-row items-center justify-center py-12 px-6'>
        <div className='bg-white shadow-xl rounded-2xl p-8 max-w-md text-center border-t-4 border-[#C15470]'>
          <FaCheckCircle className='text-[#C15470] text-6xl mb-4 mx-auto' />
          <h1 className='text-3xl font-bold text-gray-800'>¡Gracias por tu compra!</h1>
          <p className='text-lg text-gray-600 mt-4'>Tu pedido ha sido procesado con éxito.</p>
          <p className='text-lg text-gray-600'>Recibirás un correo con los detalles de tu compra.</p>
          <p className='text-lg text-gray-600'>Si tienes alguna pregunta, no dudes en contactarnos.</p>
        </div>
      </div>
    </>
  );
};

export default Success;