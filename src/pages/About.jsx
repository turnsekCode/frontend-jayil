import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CallToAction from '../components/CallToAction';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>Sobre de mi</title>
        <meta name='description' content='Sobre mi' />
        <meta name='keywords' content='joyería, accesorios, handmade, arcilla polimérica, pendientes, pulseras, collares' />
        <meta name='author' content='Raquel Turnsek' />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://www.jayil.es/about' />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "jayil.es",
            url: "https://jayil.es",
            logo: "/logo.png",
            image: "https://www.jayil.es/assets/hero_img-iYLBa_0K.webp",
            description:
              "Jayil.es es una tienda online de joyería de ocasión hecha de arcilla polimérica. Vendemos pendientes, pulseras y collares artesanales con envío desde Valencia, España.",
            telephone: "+34 672 56 34 52",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Valencia",
              addressCountry: "ES",
            },
            sameAs: [
              "https://www.instagram.com/jayil.artesania",
              "https://www.facebook.com/jayil.artesania",
            ],
          })}
        </script>
      </Helmet>

      <div>
        <div className='text-2xl text-center pt-[120px]'>
          <Title text1={'SOBRE'} text2={'MI'} />
        </div>

        <div className='my-10 flex flex-col lg:flex-row gap-16'>
          <img className='w-full lg:max-w-[550px] object-cover' src={assets.about_img} alt="joyería, accesorios, handmade, arcilla polimérica, pendientes, pulseras, collares" />
          <div className='flex flex-col justify-center gap-6 lg:w-2/4 text-gray-600'>
            <p>IMPRIMO MUCHO AMOR Y DEDICACIÓN A LOS ACCESORIOS PARA DARTE UNA EXPERIENCIA ÚNICA.</p>
            <b className='text-2xl'>Jayil</b>
            <p>Hola soy Raquel y quiero presentarte mi marca de joyería artesanal *Jayil*. Cada pieza esta realizada totalmente a mano y con mucha dedicación y cariño. Es el complemento ideal para aportar color, estilo y vida a tu look de cada día, siendo modelos adaptables para cualquier ocasión y momento.</p>
          </div>
        </div>
        <div className='text-xl py-4'>
          <Title text1={'EL VALOR DEL'} text2={'TRABAJO A MANO'} />
        </div>
        <div className='flex flex-col lg:flex-row mb:20'>
          <div className='border px-5 md:px-16 py-8 sm:py-9 flex flex-col gap-5'>
            <p className='text-gray-600'>El material usado para la artesanía es la arcilla polimérica, un material ligero, versátil y no tóxico. Todas las piezas van horneadas, lijadas y acabadas con resina, barniz o mate. Cada uno de los modelos pueden ser totalmente personalizados, de a cuerdo a tu preferencia de color o acabado siendo así un complemento totalmente único y exclusivo.</p>
            <p className='text-gray-600'>Crear estos accesorios es algo que me llena, me gusta y disfruto mucho. Aportar valor a la vida de cada mujer que decida usarlos es algo asombroso. Espero que al usarlos te sientas única y bonita como ya lo eres.</p>
          </div>
          <img className='w-full lg:max-w-[460px] object-cover' src={assets.sobre_mi} alt="joyería, accesorios, handmade, arcilla polimérica, pendientes, pulseras, collares" />
        </div>

        <div className='my-10 flex flex-col-reverse lg:flex-row gap-16'>
          <img className='w-full lg:max-w-[550px] object-cover' src={assets.personalizacion} alt="joyería, accesorios, handmade, arcilla polimérica, pendientes, pulseras, collares" />
          <div className='flex flex-col justify-center gap-6 lg:w-2/4 text-gray-600'>
            <p>Cada pieza que creo está hecha a mano con mucho amor y dedicación, utilizando arcilla polimérica como material principal. Me encanta que cada accesorio cuente una historia única, y por eso ofrezco la opción de personalizar collares, pendientes o pulseras según tus gustos, colores favoritos o alguna idea especial que tengas en mente.
            </p>
            <p>Si estás buscando un detalle único para ti o un regalo con verdadero significado, ¡estás en el lugar correcto! Escríbeme directamente por WhatsApp para conversar sobre tu idea y juntos crear esa joya especial que te represente o emocione a quien la reciba.</p>
          </div>
        </div>

        <div className='my-10 flex flex-col lg:flex-row gap-16'>
          <div className='my-10 flex flex-col lg:flex-row gap-16'>
            <div className='flex flex-col justify-center gap-6 lg:w-2/4 text-gray-600'>
              <p>Recuerda que puedes elegir el tope o la fornitura de la oreja de cada pendiente en dorado o plateado, según la disponibilidad del modelo. Al realizar tu pedido, solo espera nuestro contacto para seleccionar la opción que prefieras. Elegir una buena fornitura o tope de acero inoxidable garantiza comodidad y durabilidad, evitando alergias e irritaciones en la piel.</p>
              <p className='uppercase'> A continuación, te dejamos una breve descripción de algunos tipos de fornitura y sus ventajas.</p>
            </div>
            <img className='w-full lg:max-w-[550px] object-cover  hidden md:block' src={assets.fornituraWeb} alt="joyería, accesorios, handmade, arcilla polimérica, pendientes, pulseras, collares" />
            <img className='w-full lg:max-w-[550px] object-cover block md:hidden ' src={assets.fornituraMovil} alt="joyería, accesorios, handmade, arcilla polimérica, pendientes, pulseras, collares" />
          </div>
        </div>
        <CallToAction />
      </div>
    </>
  )
}

export default About
