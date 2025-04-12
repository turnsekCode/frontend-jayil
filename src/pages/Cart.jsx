import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Helmet } from 'react-helmet-async';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, handleInputChange, navigate, tempValues, handleBlur } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    if (cartItems && Object.keys(cartItems).length > 0) {
      const tempData = Object.entries(cartItems)
        .filter(([_, quantity]) => quantity > 0)
        .map(([itemId, quantity]) => ({ _id: itemId, quantity }));

      setCartData(tempData);
    } else {
      setCartData([]); // Si no hay datos, limpia el estado
    }
  }, [cartItems]);
  return (
    <>
      <Helmet>
        <title>Carrito</title>
        <meta name='description' content='Carrito' />
      </Helmet>

      <div className='pt-[120px]'>
        <div className='text-2xl mb-3'>
          <Title text1={'TU'} text2={'CARRITO'} />
        </div>

        <div>
          { cartData.length != 0 ? (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr,1.5fr,0.5fr] sm:grid-cols-[4fr_,1fr,0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={productData?.image[0]} alt="" />
                    <div>
                      <p className='text-sx sm:text-lg font-medium'>{productData?.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{Number(productData?.price || 0).toFixed(2)}</p>

                      </div>
                    </div>
                  </div>
                  <div>
                    <input
                      onChange={(e) => {
                        const value = e.target.value;
                        const numericValue = value === '' ? '' : Number(value);

                        // Validar que el valor no sea mayor que 2
                        if (numericValue <= 2) {
                          handleInputChange(item._id, numericValue); // Solo actualizamos si el valor es válido
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        const quantity = value === '' ? 1 : Math.min(Number(value), 2); // Asegurarse de que el valor no sea mayor que 2
                        handleBlur(item._id, quantity); // Al perder el foco, actualizamos
                      }}
                      value={tempValues[item._id] ?? item.quantity} // Mostramos el estado temporal o la cantidad original
                      className="border w-10 sm:w-30 px-1 sm:px-2 py-1"
                      type="number"
                      min={1}
                      max={2}
                    />
                    <p className='text-[10px]'>Solo puedes elegir dos productos</p>
                  </div>
                  <img onClick={() => updateQuantity(item._id, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
                </div>
              )
            })
            ) : (
              <div className=' text-gray-500 mt-10'>
                <p className='text-lg'>Tu carrito está vacío</p>
                <p className='text-sm'>Agrega productos para verlos aquí</p>
              </div>
            )
          }
        </div>
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <div className='w-full text-end'>
              <button onClick={() => navigate('/place-order')} className='bg-[#C15470] text-white text-sm my-8 px-8 py-3'>PROCEDER CON LA COMPRA</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
