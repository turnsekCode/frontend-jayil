import React from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import AnimatedBlock from './AnimatedBlock';
import { Helmet } from 'react-helmet-async';

const callouts = [
    {
        name: 'Corazón',
        description: 'Ver colección',
        imageSrc: assets.categoria_corazon,
        imageAlt: 'Pendientes artesanales de arcilla polimérica en forma de corazón, hechos a mano.',
        href: '/collection/pendientes/corazon',
    },
    {
        name: 'Aro',
        description: 'Ver colección',
        imageSrc: assets.categoria_aro,
        imageAlt: 'Pendientes de aro de arcilla polimérica, joyería artesanal hecha a mano.',
        href: '/collection/pendientes/aro',
    },
    {
        name: 'Colette',
        description: 'Ver colección',
        imageSrc: assets.categoria_colette,
        imageAlt: 'Pendientes Colette de arcilla polimérica, diseño elegante y artesanal.',
        href: '/collection/pendientes/colette',
    },
    {
        name: 'Lea',
        description: 'Ver colección',
        imageSrc: assets.categoria_lea,
        imageAlt: 'Pendientes Lea de arcilla polimérica, joyería artesanal moderna.',
        href: '/collection/pendientes/lea',
    },
    {
        name: 'Gota',
        description: 'Ver colección',
        imageSrc: assets.categoria_gota,
        imageAlt: 'Pendientes en forma de gota hechos a mano con arcilla polimérica.',
        href: '/collection/pendientes/gota',
    },
    {
        name: 'Colección Floral',
        description: 'Ver colección',
        imageSrc: assets.categoria_coleccion_floral,
        imageAlt: 'Pendientes florales de arcilla polimérica, inspiración natural y artesanal.',
        href: '/collection/pendientes/coleccion-floral',
    },
    {
        name: 'Óvalo',
        description: 'Ver colección',
        imageSrc: assets.categoria_ovalo,
        imageAlt: 'Pendientes de óvalo de arcilla polimérica, joyería de diseño artesanal.',
        href: '/collection/pendientes/ovalo',
    },
    {
        name: 'Elena',
        description: 'Ver colección',
        imageSrc: assets.categoria_elena,
        imageAlt: 'Pendientes Elena de arcilla polimérica, piezas únicas hechas a mano.',
        href: '/collection/pendientes/elena',
    },
    {
        name: 'Cascada',
        description: 'Ver colección',
        imageSrc: assets.categoria_cascada,
        imageAlt: 'Pendientes Cascada de arcilla polimérica, diseño artesanal fluido.',
        href: '/collection/pendientes/cascada',
    },
    {
        name: 'Hoja',
        description: 'Ver colección',
        imageSrc: assets.categoria_hoja,
        imageAlt: 'Pendientes en forma de hoja de arcilla polimérica, joyería artesanal inspirada en la naturaleza.',
        href: '/collection/pendientes/hoja',
    },
    {
        name: 'Karina',
        description: 'Ver colección',
        imageSrc: assets.categoria_karina,
        imageAlt: 'Pendientes Karina de arcilla polimérica, estilo elegante y hecho a mano.',
        href: '/collection/pendientes/karina',
    },
    {
        name: 'Círculo',
        description: 'Ver colección',
        imageSrc: assets.categoria_circulo,
        imageAlt: 'Pendientes circulares de arcilla polimérica, joyería artesanal minimalista.',
        href: '/collection/pendientes/circulo',
    },
    {
        name: 'Rombo',
        description: 'Ver colección',
        imageSrc: assets.categoria_rombo,
        imageAlt: 'Pendientes en forma de rombo de arcilla polimérica, diseño moderno y artesanal.',
        href: '/collection/pendientes/rombo',
    },
    {
        name: 'Laura',
        description: 'Ver colección',
        imageSrc: assets.categoria_laura,
        imageAlt: 'Pendientes Laura de arcilla polimérica, joyería artesanal sofisticada.',
        href: '/collection/pendientes/elia',
    },
    {
        name: 'Lágrima',
        description: 'Ver colección',
        imageSrc: assets.categoria_lagrima,
        imageAlt: 'Pendientes en forma de lágrima de arcilla polimérica, piezas artesanales hechas a mano.',
        href: '/collection/pendientes/lagrimas',
    },
]

const ShowAllCategoriesPendientes = () => {
    return (
        <>
            <Helmet>
                <title>Joyería Artesanal Exclusiva - Pendientes, Anillos y Collares Hechos a Mano</title>
                <meta name='description' content='Descubre joyería única que combina diseño exclusivo artesanal con acero inoxidable. Pendientes, anillos y collares hechos a mano, complementos para mujer, fusionando moda, elegancia y durabilidad. ¡Encuentra tu estilo único aquí!' />
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

            <div className="">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl py-6 sm:py-6 lg:max-w-none lg:py-10">
                        <div className='text-center py-8 text-3xl'>
                            <Title text1={'MOSTRAR TODOS'} text2={'LOS PENDIENTES'} />
                            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Añade un toque de autenticidad a tu estilo con nuestros pendientes artesanales, cuidadosamente elaborados a mano para ofrecerte piezas únicas y llenas de carácter. Únicos y exclusivos como tú.</p>
                        </div>

                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
                            {callouts.map((callout) => (
                                <AnimatedBlock key={callout.name}>
                                    <div className="group relative p-4 border border-gray-400">
                                        <img
                                            alt={callout.imageAlt}
                                            src={callout.imageSrc}
                                            className="w-full bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                                        />
                                        <h3 className="mt-6 text-sm text-gray-500">
                                            <Link to={callout.href}>
                                                <span className="absolute inset-0" />
                                                {callout.name}
                                            </Link>
                                        </h3>
                                        <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                                    </div>
                                </AnimatedBlock>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowAllCategoriesPendientes
