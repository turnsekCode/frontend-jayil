import React from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import {assets} from '../assets/assets'

const callouts = [
    {
        name: 'PENDIENTES',
        description: 'Ver colección',
        imageSrc: assets.pendientes_category,
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '/collection/pendientes',
    },
    {
        name: 'COLLARES',
        description: 'Ver colección',
        imageSrc: assets.collares_category,
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '/collection/collares',
    },
    {
        name: 'PULSERAS Y ANILLOS',
        description: 'Ver colección',
        imageSrc: assets.pulseras_category,
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/collection/pulseras',
    },
]

const ShowCategories = () => {
    return (
        <div className="">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl py-6 sm:py-6 lg:max-w-none lg:py-10">
                    <div className='text-center py-8 text-3xl'>
                        <Title text1={'VER'} text2={'CATEGORÍAS'} />
                       {/* <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, dolores.</p> */}
                    </div>

                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
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
                                <p className="text-base font-semibold text-gray-700">{callout.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowCategories
