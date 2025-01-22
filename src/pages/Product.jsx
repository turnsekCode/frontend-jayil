import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  const fetchProductsData = async () => {

    products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }
  
  const notify = () =>{

    toast.success("Producto añadido al carrito", {
      position: "bottom-right",
      className: 'foo-bar'
    });
  }


  useEffect(()=>{
    fetchProductsData()
  }, [productId, products])

  return productData ? (
    <div className='pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img key={index} onClick={()=>setImage(item)} src={item} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/* product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            {/*<div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className='w-3 5'/>
              <img src={assets.star_icon} alt="" className='w-3 5'/>
              <img src={assets.star_icon} alt="" className='w-3 5'/>
              <img src={assets.star_icon} alt="" className='w-3 5'/>
              <img src={assets.star_dull_icon} alt="" className='w-3 5'/>
              <span className='pl-2'>(122)</span>
            </div>*/}
            <div className='mt-5 text-3xl font-medium'>{currency}{productData.price.toFixed(2)}</div>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <button onClick={()=>{addToCart(productData._id, productData.name), notify()}} className='bg-[#C15470] text-white mt-4 px-8 py-3 text-sm active:bg-gray-700'>AÑADIR AL CARRITO</button>
            <hr className='mt-8 sm:w-4/5'/>
            <p className='mt-5 text-gray-500 md:w-4/5'>Categoria: {productData.category}</p>
        </div>
      </div>
      {/* description and review section */}
      {productData.description2 ? 
      <div className='mt-20'>
          <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Descripción</b>
            {/*<b className='border px-5 py-3 text-sm'>Reviews (122)</b>*/}
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>{productData.description2}</p>
          </div>
      </div> : null}

      {/* display related product */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product