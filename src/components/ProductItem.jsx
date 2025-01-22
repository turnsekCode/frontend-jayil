import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price, category, subCategory}) => {

    const {currency} = useContext(ShopContext);


  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img className='w-100 hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
        </div>
        <p className='pt-3 text-sm uppercase'>{name}</p>
        <p className='text-gray-500 pt-1 pb-1 text-sm'>- {category}</p>
        {subCategory ? <p className='text-gray-500 pt-1 pb-1 text-sm'>- - {subCategory}</p> : null}
        <p className='text-sm font-medium'>{currency} {price.toFixed(2)}</p>
    </Link>
  )
}

export default ProductItem
