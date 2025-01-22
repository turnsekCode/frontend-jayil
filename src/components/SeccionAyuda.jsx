import React from 'react'

const SeccionAyuda = () => {
    return (
        <div className='flex flex-col lg:flex-row gap-12 my-16 lg:my-28 px-4 lg:px-0'>
            <div className='flex flex-col gap-6 w-full lg:w-3/2'>
                <b className='text-3xl text-gray-600 text-center'>Necesitas ayuda para escoger el accesorio adecuado para ti?</b>
                <button onClick={() => navigate('/contact')} className='bg-[#C15470] text-white text-sm my-2 px-8 py-3'>PREGUNTA POR AYUDA</button>
            </div>
            <div className='flex flex-col gap-6 text-gray-600'>
                <p>Así como el uso del maquillaje, la ropa o arreglarse las uñas y cabello, el uso de pendientes, collares o pulseras es una elección que hacemos diariamente. Ya sea que prefieras buscar inspiración en unos bellos pendientes para vestirte o los escoges como un accesorio que complemente tu look.</p>
                <p>Si necesitas ayuda en este caso, no dudes en escribirme, estaré atenta para ayudarte a escoger esos complementos que sean ideales para ti. </p>
            </div>
        </div>
    )
}

export default SeccionAyuda
