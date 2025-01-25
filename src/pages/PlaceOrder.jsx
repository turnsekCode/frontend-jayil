import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import axios from 'axios';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, cartItems, products, delivery_fee, getCartAmount, currency, backenUrl, token,setCartItems } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [coupon, setCoupon] = useState(''); // Estado para el cupón ingresado
  const [discount, setDiscount] = useState(0); // Estado para el descuento aplicado
  const [couponError, setCouponError] = useState(''); // Estado para manejar errores del cupón

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
        image: productData?.image[0],
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
      total: getCartAmount() + delivery_fee - discount,
      discount,
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

  const applyCoupon = () => {
    // Lógica de validación de cupones
    const validCoupons = {
      DESCUENTO10: 0.1, // 10% de descuento
      ENVIOGRATIS: delivery_fee, // Descuento igual al costo de envío
      DESCUENTO20: 0.2, // 20% de descuento
    };

    if (validCoupons[coupon]) {
      const discountValue =
        typeof validCoupons[coupon] === 'number'
          ? getCartAmount() * validCoupons[coupon]
          : validCoupons[coupon];

      setDiscount(discountValue);
      setCouponError('');
    } else {
      setDiscount(0);
      setCouponError('Cupón inválido o expirado');
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    function generateOrderNumber() {
      const timestamp = Math.floor(Date.now() / 1000); // Tiempo en segundos desde 1970
      const shortTimestamp = timestamp.toString().slice(-6); // Últimos 6 dígitos del timestamp
      const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Número aleatorio de 4 dígitos
      return `PEDIDO-${shortTimestamp}-${randomPart}`;
    }
    //sendEmail()
    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        const quantity = cartItems[itemId];
        if (quantity > 0) {
          const productData = products.find((product) => product._id === itemId);
          if (productData) {
            const itemInfo = structuredClone(productData);
            itemInfo.quantity = quantity;
            orderItems.push(itemInfo);
          }
        }
      }
    
      let orderData = {
        orderNumber: generateOrderNumber(),
        address: shippingInfo,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }
      switch(method){
        //api calls for cod
        case 'cod':
          const response = await axios.post(`${backenUrl}/api/order/place`, orderData)
          if (response.data.success){
            setCartItems({})
          } else {
            toast.error(response.data.mesasage)
          }
        break;

        default:
          break;
      }



    } catch (error) {
      console.error("Error al procesar el carrito:", error);
      toast.error(error.mesasage)
    }
    
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
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
            placeholder='Nombre*'
            type='text'
            name='name'
            required
          />
          <input
            value={shippingInfo.lastName}
            onChange={handleInputChange}
            className={`border ${errors.lastName ? 'border-red-500' : 'border-gray-300'
              } rounded py-1.5 px-3.5 w-full`}
            placeholder='Apellido*'
            type='text'
            name='lastName'
            required
          />
        </div>
        <input
          value={shippingInfo.email}
          onChange={handleInputChange}
          className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded py-1.5 px-3.5 w-full`}
          placeholder='Email*'
          type='email'
          name='email'
          required
        />
        <input
          value={shippingInfo.address}
          onChange={handleInputChange}
          className={`border ${errors.address ? 'border-red-500' : 'border-gray-300'
            } rounded py-1.5 px-3.5 w-full`}
          placeholder='Dirección, portal, puerta*'
          type='text'
          name='address'
          required
        />
        <div className='flex gap-3'>
          <input
            value={shippingInfo.province}
            onChange={handleInputChange}
            className={`border ${errors.province ? 'border-red-500' : 'border-gray-300'
              } rounded py-1.5 px-3.5 w-full`}
            placeholder='Provincia*'
            type='text'
            name='province'
            required
          />
          <input
            value={shippingInfo.city}
            onChange={handleInputChange}
            className={`border ${errors.city ? 'border-red-500' : 'border-gray-300'
              } rounded py-1.5 px-3.5 w-full`}
            placeholder='Ciudad*'
            type='text'
            name='city'
            required
          />
        </div>
        <div className='flex gap-3'>
          <input
            value={shippingInfo.postalCode}
            onChange={handleInputChange}
            className={`border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'
              } rounded py-1.5 px-3.5 w-full`}
            placeholder='Código postal*'
            type='number'
            name='postalCode'
            required
          />
          <input
            value={shippingInfo.country}
            onChange={handleInputChange}
            className={`border ${errors.country ? 'border-red-500' : 'border-gray-300'
              } rounded py-1.5 px-3.5 w-full`}
            placeholder='País*'
            type='text'
            name='country'
            required
          />
        </div>
        <input
          value={shippingInfo.phone}
          onChange={handleInputChange}
          className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'
            } rounded py-1.5 px-3.5 w-full`}
          placeholder='Teléfono*'
          type='number'
          name='phone'
          required
        />
      </div>

      {/* Right side */}
      <div className='mt-8'>
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
            <p>{currency} {getCartAmount().toFixed(2)}</p>
          </div>
          <hr />
          <div className='flex justify-between'>
            <p>Costo de envío</p>
            <p>{getCartAmount() > 45 ? 'Gratis' : `${currency} ${delivery_fee.toFixed(2)}`}</p>
          </div>
          <div className='flex justify-between'>
            <p>Descuento</p>
            <p>- {currency} {discount.toFixed(2)}</p>
          </div>
          <hr />
          <div className='flex justify-between'>
            <p>Total</p>
            <p>{currency} {(getCartAmount() + delivery_fee - discount).toFixed(2)}</p>
          </div>
        </div>

        {/* Campo para cupón */}
        <div className='mt-4'>
          <input
            type='text'
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className='border px-2 py-1 w-full'
            placeholder='Introduce tu cupón de descuento'
          />
          <button
            onClick={applyCoupon}
            className='bg-green-500 text-white px-4 py-2 mt-2'
          >
            Aplicar cupón
          </button>
          {couponError && <p className='text-red-500 mt-2'>{couponError}</p>}
        </div>

        <div className='mt-12'>
          {/* Botón de envío */}
          <button
            type='submit'
            disabled={isSending || getCartAmount() === 0}
            className='bg-[#C15470] text-white px-16 py-3 text-sm'
          >
            {isSending ? 'Enviando...' : 'REALIZAR PEDIDO'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
