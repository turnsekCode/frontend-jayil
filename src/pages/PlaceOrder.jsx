import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import axios from 'axios';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const backenUrl = import.meta.env.VITE_BACKEND_URL;

  const [method, setMethod] = useState('cod');
  const { navigate, cartItems, products, delivery_fee, getCartAmount, currency } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    lastName: '',
    email: '',
    address: '',
    province: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const [errors, setErrors] = useState({}); // Estado para manejar errores

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });

    // Eliminar error del campo al escribir
    setErrors({
      ...errors,
      [name]: false,
    });
  };

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

  const [isSending, setIsSending] = useState(false);

  const sendEmail = async () => {
    const newErrors = {};

    // Validar campos vacíos
    Object.keys(shippingInfo).forEach((key) => {
      if (!shippingInfo[key].trim()) {
        newErrors[key] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSending(true);

    const cartDetails = cartData.map((item) => {
      const productData = products.find((product) => product._id === item._id);
      return {
        name: productData?.name,
        quantity: item?.quantity,
        price: productData?.price,
      };
    });

    function generateOrderNumber() {
      const timestamp = Math.floor(Date.now() / 1000); // Tiempo en segundos desde 1970
      const shortTimestamp = timestamp.toString().slice(-6); // Últimos 6 dígitos del timestamp
      const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Número aleatorio de 4 dígitos
      return `PEDIDO-${shortTimestamp}-${randomPart}`;
    }

    const emailData = {
      orderNumber: generateOrderNumber(),
      cartDetails,
      shippingInfo,
      subtotal: getCartAmount(),
      shippingFee:
        getCartAmount() > 45
          ? 'Gratis (para España peninsular)'
          : `${currency} ${delivery_fee.toFixed(2)}`,
      total: getCartAmount() + delivery_fee,
      currency,
    };

    try {
      await axios.post(`${backenUrl}/send-email`, emailData);
      alert('Correo enviado exitosamente!');
      navigate('/orders');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      alert('Hubo un error al enviar el correo.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      {/* Left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'INFORMACIÓN DE'} text2={'ENVÍO'} />
        </div>
        <div className='flex gap-3'>
          <input
            value={shippingInfo.name}
            onChange={handleInputChange}
            className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded py-1.5 px-3.5 w-full`}
            placeholder='Nombre'
            type='text'
            name='name'
          />
          <input
            value={shippingInfo.lastName}
            onChange={handleInputChange}
            className={`border ${errors.lastName ? 'border-red-500' : 'border-gray-300'
              } rounded py-1.5 px-3.5 w-full`}
            placeholder='Apellido'
            type='text'
            name='lastName'
          />
        </div>
        <input
          value={shippingInfo.email}
          onChange={handleInputChange}
          className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded py-1.5 px-3.5 w-full`}
          placeholder='Email'
          type='email'
          name='email'
        />
        <input
          value={shippingInfo.address}
          onChange={handleInputChange}
          className={`border ${errors.address ? 'border-red-500' : 'border-gray-300'
            } rounded py-1.5 px-3.5 w-full`}
          placeholder='Dirección, portal, puerta'
          type='text'
          name='address'
        />
        <div className='flex gap-3'>
          <input
            value={shippingInfo.province}
            onChange={handleInputChange}
            className={`border ${errors.province ? 'border-red-500' : 'border-gray-300'
              } rounded py-1.5 px-3.5 w-full`}
            placeholder='Provincia'
            type='text'
            name='province'
          />
          <input
            value={shippingInfo.city}
            onChange={handleInputChange}
            className={`border ${errors.city ? 'border-red-500' : 'border-gray-300'
              } rounded py-1.5 px-3.5 w-full`}
            placeholder='Ciudad'
            type='text'
            name='city'
          />
        </div>
        <div className='flex gap-3'>
          <input
            value={shippingInfo.postalCode}
            onChange={handleInputChange}
            className={`border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'
              } rounded py-1.5 px-3.5 w-full`}
            placeholder='Código postal'
            type='number'
            name='postalCode'
          />
          <input
            value={shippingInfo.country}
            onChange={handleInputChange}
            className={`border ${errors.country ? 'border-red-500' : 'border-gray-300'
              } rounded py-1.5 px-3.5 w-full`}
            placeholder='País'
            type='text'
            name='country'
          />
        </div>
        <input
          value={shippingInfo.phone}
          onChange={handleInputChange}
          className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'
            } rounded py-1.5 px-3.5 w-full`}
          placeholder='Teléfono'
          type='number'
          name='phone'
        />
      </div>

      {/* Right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <div className='w-full'>
            <div className='text-2xl'>
              <Title text1={'TOTAL DEL'} text2={'CARRITO'} />
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm'>
              {cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                return (
                  <div key={index} className='flex justify-between'>
                    <p>{productData?.name} x{item?.quantity}</p>
                    <p>{currency}{productData?.price.toFixed(2)}</p>
                  </div>
                );
              })}
              <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>
                  {currency}{' '}
                  {getCartAmount() === 0
                    ? '0.00'
                    : getCartAmount().toFixed(2)}
                </p>
              </div>
              <hr />
              <div className='flex justify-between'>
                <p>Costo de envío</p>
                <p>
                  {getCartAmount() > 45
                    ? 'Gratis (para España peninsular)'
                    : `${currency} ${delivery_fee.toFixed(2)}`}
                </p>
              </div>
              <hr />
              <div className='flex justify-between'>
                <p>Total</p>
                <p>
                  {currency}{' '}
                  {getCartAmount() === 0
                    ? '0.00'
                    : getCartAmount() > 45
                      ? getCartAmount().toFixed(2)
                      : (getCartAmount() + delivery_fee).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <Title text1={'MÉTODO DE'} text2={'PAGO'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt='' />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt='' />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button
              onClick={sendEmail}
              disabled={isSending || getCartAmount() === 0}
              className='bg-[#C15470] text-white px-16 py-3 text-sm'
            >
              {isSending ? 'Enviando...' : 'REALIZAR PEDIDO'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
