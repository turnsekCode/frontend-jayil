import React from 'react'
import ShowAllCategoriesPendientes from '../components/ShowAllCategoriesPendientes'

const Pendientes = () => {
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-[110px] justify-center'>
      <ShowAllCategoriesPendientes />
    </div>
  )
}

export default Pendientes
