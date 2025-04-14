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
          {cartData.length != 0 ? (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 flex flex-col sm:grid sm:grid-cols-[4fr_2fr_0.5fr] sm:items-center gap-4"
                >
                  {/* Producto: imagen + info */}
                  <div className="flex gap-4 sm:items-center">
                    <img
                      className="w-20 h-auto flex-shrink-0"
                      src={productData?.image[0]}
                      alt={productData?.name}
                    />
                    <div className="flex flex-col">
                      <p className="text-base sm:text-lg font-medium">{productData?.name}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {currency}{Number(productData?.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Controles de cantidad */}
                  <div>
                    <input
                      onChange={(e) => {
                        const value = e.target.value;
                        const numericValue = value === '' ? '' : Number(value);
                        if (numericValue <= productData?.quantity) {
                          handleInputChange(item._id, numericValue);
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        const quantity = value === '' ? 1 : Math.min(Number(value), productData?.quantity);
                        handleBlur(item._id, quantity);
                      }}
                      value={tempValues[item._id] ?? item.quantity}
                      className="border w-20 px-2 py-1 text-center text-sm rounded"
                      type="number"
                      min={1}
                      max={productData?.quantity}
                      disabled={productData?.quantity === 0}
                    />

                    {/* Stock info */}
                    {productData?.quantity === 0 ? (
                      <div className="mt-1 text-xs text-yellow-600">
                        <p className="font-semibold">⚠ Producto no disponible.</p>
                        <p>Contáctanos para más unidades.</p>
                      </div>
                    ) : (
                      <div className="mt-1 text-xs text-green-700">
                        <p>Quedan <span className="font-semibold">{productData?.quantity}</span> unidades.</p>
                      </div>
                    )}
                  </div>

                  {/* Botón eliminar */}
                  <div className="flex justify-end sm:justify-center">
                    <img
                      onClick={() => updateQuantity(item._id, 0)}
                      className="w-5 h-5 cursor-pointer"
                      src={assets.bin_icon}
                      alt="Eliminar producto"
                    />
                  </div>
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
