import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import AnimatedBlock from './AnimatedBlock';


const ProductItem = ({ slug, image, name, price, category, subCategory }) => {

  const { currency } = useContext(ShopContext);


  return (
    <>
    

      <AnimatedBlock>
        <Link className='text-gray-700 cursor-pointer' to={`/product/${slug}`}>
          <div className='overflow-hidden'>
            <img className='w-100 hover:scale-110 transition ease-in-out' src={image[0]} alt={name} />
          </div>
          <p className='pt-3 text-sm uppercase' title={name}>{name.slice(0, 40) + '...'}</p>
          <p className='text-gray-500 pt-1 pb-1 text-sm'>- {category}</p>
          {subCategory ? <p className='text-gray-500 pt-1 pb-1 text-sm'>- - {subCategory}</p> : null}
          <p className='text-sm font-medium'>{price.toFixed(2)} {currency}</p>
        </Link>
      </AnimatedBlock>
    </>
  )
}

export default ProductItem
