import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {


  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'TOTAL DEL'} text2={'CARRITO'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>
            {currency}{" "}
            {getCartAmount() === 0
              ? "0.00"
              : getCartAmount().toFixed(2)}
          </p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Costo de envío</p>
          <p>
            {getCartAmount() > 45
              ? "Gratis (para España peninsular)"
              : `${currency} ${delivery_fee.toFixed(2)}`}
          </p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Total</p>
          <p>
            {currency}{" "}
            {getCartAmount() === 0
              ? "0.00"
              : getCartAmount() > 45
                ? getCartAmount().toFixed(2) // No sumar delivery_fee si es gratis
                : (getCartAmount() + delivery_fee).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
