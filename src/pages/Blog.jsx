import React from 'react';
import { Helmet } from 'react-helmet-async';

const BlogPost = () => {
    return (
        <>
            <Helmet>
                <title>Jayil.es</title>
                <meta name='description' content='Joyería con diseño exclusivo hechas a mano' />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <article className="max-w-3xl mx-auto pt-32">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Cómo elegir la mejor mochila para viajar (Guía 2025)</h1>

                <p className="text-lg text-gray-700 mb-6">¿Estás buscando la mochila ideal para tus próximas aventuras? En esta guía te ayudamos a elegir la mejor opción según tus necesidades, con consejos prácticos y recomendaciones.</p>

                <nav className="bg-gray-100 p-4 mb-8 rounded-lg">
                    <strong className="text-xl text-gray-800">Tabla de contenidos:</strong>
                    <ul className="list-inside list-disc mt-2">
                        <li><a href="#caracteristicas" className="text-blue-600 hover:underline">¿Qué hace que una mochila sea ideal para viajar?</a></li>
                        <li><a href="#tipos" className="text-blue-600 hover:underline">Tipos de mochilas de viaje</a></li>
                        <li><a href="#consejos" className="text-blue-600 hover:underline">Consejos según tu destino</a></li>
                        <li><a href="#recomendaciones" className="text-blue-600 hover:underline">Nuestras recomendaciones</a></li>
                        <li><a href="#faq" className="text-blue-600 hover:underline">Preguntas frecuentes</a></li>
                    </ul>
                </nav>

                <div className="mb-8">
                    <h2 id="caracteristicas" className="text-2xl font-semibold text-gray-800 mb-4">¿Qué hace que una mochila sea ideal para viajar?</h2>
                    <img src="https://www.jayil.es/assets/fornitura%20web-CUZ5YoCz.jpg" alt="Mochilas para viajar" className="w-full h-auto rounded-lg mb-4" />

                    <h3 className="text-xl font-medium text-gray-800 mt-4">Capacidad</h3>
                    <p className="text-gray-700 mb-4">La capacidad se mide en litros. Para escapadas cortas, bastan 30-40L; para viajes largos, opta por 50L o más.</p>

                    <h3 className="text-xl font-medium text-gray-800">Material y resistencia</h3>
                    <p className="text-gray-700 mb-4">Busca mochilas de poliéster o nylon ripstop, con costuras reforzadas y tratamiento impermeable.</p>

                    <h3 className="text-xl font-medium text-gray-800">Comodidad</h3>
                    <p className="text-gray-700 mb-4">Tirantes acolchados, respaldo ergonómico y cintas ajustables marcan la diferencia en largas caminatas.</p>
                </div>

                <div className="mb-8">
                    <h2 id="tipos" className="text-2xl font-semibold text-gray-800 mb-4">Tipos de mochilas de viaje</h2>
                    <h3 className="text-xl font-medium text-gray-800">Mochilas urbanas</h3>
                    <p className="text-gray-700 mb-4">Diseñadas para el día a día, con espacio para portátil y compartimentos organizadores.</p>

                    <h3 className="text-xl font-medium text-gray-800">Mochilas de senderismo</h3>
                    <p className="text-gray-700 mb-4">Mayor capacidad, con estructura interna, soporte lumbar y compartimentos técnicos.</p>
                </div>

                <div className="mb-8">
                    <h2 id="consejos" className="text-2xl font-semibold text-gray-800 mb-4">Consejos para elegir según tu destino</h2>
                    <ul className="list-inside list-disc text-gray-700">
                        <li><strong>Viajes de ciudad:</strong> ligera y discreta</li>
                        <li><strong>Montaña o naturaleza:</strong> resistente y espaciosa</li>
                        <li><strong>Climas húmedos:</strong> impermeable o con funda incluida</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 id="recomendaciones" className="text-2xl font-semibold text-gray-800 mb-4">Nuestras recomendaciones</h2>
                    <p className="text-gray-700 mb-4">Estas son algunas mochilas top disponibles en nuestra tienda:</p>
                    <ul className="text-blue-600">
                        <li><a href="/producto/mochila-urbana-x" className="hover:underline">Mochila Urbana X</a> – perfecta para ciudad y escapadas.</li>
                        <li><a href="/producto/mochila-trekking-z" className="hover:underline">Mochila Trekking Z</a> – ideal para rutas largas.</li>
                    </ul>
                </div>

                <div className="faq mb-8">
                    <h2 id="faq" className="text-2xl font-semibold text-gray-800 mb-4">Preguntas frecuentes</h2>
                    <h3 className="text-xl font-medium text-gray-800">¿Qué mochila es mejor para viajar en avión?</h3>
                    <p className="text-gray-700 mb-4">Las de 40L suelen cumplir con las medidas de equipaje de mano en la mayoría de aerolíneas.</p>

                    <h3 className="text-xl font-medium text-gray-800">¿Cuánto pesa una mochila vacía?</h3>
                    <p className="text-gray-700 mb-4">Entre 800g y 1.5kg dependiendo del tamaño y materiales.</p>
                </div>

                <p className="text-lg font-semibold text-gray-900">¿Listo para elegir tu mochila?</p>
                <p><a href="/categoria/mochilas" className="text-blue-600 hover:underline">Explora todas nuestras opciones aquí</a>.</p>
            </article>
        </>
    );
};

export default BlogPost;
