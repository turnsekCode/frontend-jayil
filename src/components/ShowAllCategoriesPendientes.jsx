import React from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import {assets} from '../assets/assets'
import AnimatedBlock from './AnimatedBlock';

const callouts = [
    {
        name: 'Corazón',
        description: 'Ver colección',
        imageSrc: assets.categoria_corazon,
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '/collection/pendientes/corazon',
    },
    {
        name: 'Aro',
        description: 'Ver colección',
        imageSrc: assets.categoria_aro,
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '/collection/pendientes/aro',
    },
    {
        name: 'Colette',
        description: 'Ver colección',
        imageSrc: assets.categoria_colette,
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/collection/pendientes/colette',
    },
    {
        name: 'Lea',
        description: 'Ver colección',
        imageSrc: assets.categoria_lea,
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/collection/pendientes/lea',
    },
    {
        name: 'Gota',
        description: 'Ver colección',
        imageSrc: assets.categoria_gota,
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/collection/pendientes/gota',
    },
    {
        name: 'Colección Floral',
        description: 'Ver colección',
        imageSrc: assets.categoria_coleccion_floral,
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/collection/pendientes/coleccion-floral',
    },
    {
        name: 'Óvalo',
        description: 'Ver colección',
        imageSrc: assets.categoria_ovalo,
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/collection/pendientes/ovalo',
    },
    {
        name: 'Elena',
        description: 'Ver colección',
        imageSrc: assets.categoria_elena,
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/collection/pendientes/elena',
    },
    {
        name: 'Cascada',
        description: 'Ver colección',
        imageSrc: assets.categoria_cascada,
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/collection/pendientes/cascada',
    },
    {
        name: 'Hoja',
        description: 'Ver colección',
        imageSrc: assets.categoria_hoja,
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/collection/pendientes/hoja',
    },
]

const ShowAllCategoriesPendientes = () => {
    return (
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
                            <div  className="group relative p-4 border border-gray-400">
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
    )
}

export default ShowAllCategoriesPendientes
