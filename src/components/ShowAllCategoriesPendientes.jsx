import React from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import {assets} from '../assets/assets'

const callouts = [
    {
        name: 'Corazón',
        description: 'See collection',
        imageSrc: assets.categoria_corazon,
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '/collection/pendientes/corazon',
    },
    {
        name: 'Aro',
        description: 'See collection',
        imageSrc: assets.categoria_aro,
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '/collection/pendientes/aro',
    },
    {
        name: 'Colette',
        description: 'See collection',
        imageSrc: assets.categoria_colette,
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/collection/pendientes/colette',
    },
    {
        name: 'Lea',
        description: 'See collection',
        imageSrc: assets.categoria_lea,
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/collection/pendientes/lea',
    },
    {
        name: 'Gota',
        description: 'See collection',
        imageSrc: assets.categoria_gota,
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/collection/pendientes/gota',
    },
]

const ShowAllCategoriesPendientes = () => {
    return (
        <div className="">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl py-6 sm:py-6 lg:max-w-none lg:py-10">
                    <div className='text-center py-8 text-3xl'>
                        <Title text1={'SHOW ALL'} text2={'EARRINGS'} />
                        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Añade un toque de autenticidad a tu estilo con nuestros pendientes artesanales, cuidadosamente elaborados a mano para ofrecerte piezas únicas y llenas de carácter. Únicos y exclusivos como tú.</p>
                    </div>

                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
                        {callouts.map((callout) => (
                            <div key={callout.name} className="group relative p-4 border border-gray-400">
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowAllCategoriesPendientes
