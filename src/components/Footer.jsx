import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Obtiene el año actual
  return (
    <footer>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-14 text-sm'>
        <div>
            <img src={assets.logo} alt="" className='mb-5 w-32' />
            <p className='w-full md:w-2/3 text-gray-600 text-lg'>Producto Artesanal</p>
            <div className='flex gap-5 mt-3 text-lg'>
              <a title='Instagram' aria-label="Instagram" href='https://www.instagram.com/jayil.artesania' target='_blank'><FaInstagram /></a>
              <a title='Facebook' aria-label="Facebook" href='https://www.facebook.com/jayil.artesania' target='_blank'><FaFacebook /></a>
              <a title='Linkedin' aria-label="Linkedin" href='https://www.linkedin.com/jayil.artesania' target='_blank'><FaLinkedin /></a>
            </div>
        </div>

        <div>
            <p className='text-xl font-medium mb-5 text-gray-700'>Links rápidos</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/about">Sobre mi</Link></li>
                <li><Link to="/delivery">Política de envíos</Link></li>
                <li><Link to="/privacy_policy">Política de privacidad</Link></li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5 text-gray-700'>Contáctanos</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>(+34) 672 56 34 52</li>
                <li>jayil.artesania@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr/>
        <p className='pt-5 text-sm text-center'>Copyright {currentYear}@ jayil.es - Todos los derechos reservados</p>
        <div className="pb-5 text-sm text-gray-600 text-center">Creado por <a href='https://www.pixeltech.es/' target='_blank'>pixeltech.es</a></div>
      </div>
    </footer>
  )
}

export default Footer
