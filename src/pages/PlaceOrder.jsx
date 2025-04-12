import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import SumupPopUp from '../components/SumupPopUp';
import ClipLoader from 'react-spinners/ClipLoader'
import { Helmet } from 'react-helmet-async';

const PlaceOrder = () => {

  const [method, setMethod] = useState('');
  const { navigate, cartItems, products, delivery_fee, getCartAmount, currency, backenUrl, setCartItems, setCheckoutToken, setIsSending, isSending } = useContext(ShopContext);
  console.log("amount", getCartAmount())
  const [cartData, setCartData] = useState([]);
  const [coupon, setCoupon] = useState(''); // Estado para el cupón ingresado
  const [discount, setDiscount] = useState(0); // Estado para el descuento aplicado
  const [couponError, setCouponError] = useState(''); // Estado para manejar errores del cupón correo
  const [errors, setErrors] = useState({}); // Estado para manejar errores de campos vacíos
  const [isOpen, setIsOpen] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [paymentType, setPaymentType] = useState('Transferencia'); // Estado para el tipo de pago
  const [orderCancel, setOrderCancel] = useState(null);
  const [loading, setLoading] = useState(false);

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
    event.preventDefault();
    // Función para generar el número de pedido
    function generateOrderNumber() {
      const timestamp = Math.floor(Date.now() / 1000); // Tiempo en segundos desde 1970
      const shortTimestamp = timestamp.toString().slice(-6); // Últimos 6 dígitos del timestamp
      const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Número aleatorio de 4 dígitos
      return `PEDIDO-${shortTimestamp}-${randomPart}`;
    }
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
      // Crear los datos del pedido
      let orderData = {
        orderNumber: generateOrderNumber(),
        address: shippingInfo,
        items: orderItems,
        amount: getCartAmount() > 45
          ? getCartAmount() - discount // No sumar delivery_fee si es gratis
          : getCartAmount() + delivery_fee - discount,
        delivery_fee: delivery_fee
      };
      setOrderData(orderData);

      // Llamada API para procesar el pedido
      switch (method) {
        case 'cod':
          setPaymentType('Transferencia');
          setLoading(true);
          console.log(orderData)
          const response = await axios.post(`${backenUrl}/api/order/place`, orderData);
          if (response.data.success) {
            setCartItems({});
            setDiscount(0);
            setCoupon('');
            setLoading(false);
            navigate("/success");
            // Llamada para enviar el correo solo si el pedido fue exitoso
            await sendEmail(orderData); // Pasar los datos del pedido a la función sendEmail
            // Enviar mensaje de WhatsApp
            sendWhatsAppMessage(orderData);
          } else {
            toast.error(response.data.message); // Mensaje de error
            setLoading(false);
          }
          break;

        case 'stripe':
          setPaymentType('Stripe');
          setLoading(true);
          const responseStripe = await axios.post(`${backenUrl}/api/order/stripe`, orderData,);
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
            setLoading(false);
          } else {
            toast.error(responseStripe.data.message);
            setLoading(false);
          }
          break;

        case 'sumup':
          setPaymentType('Tarjeta');
          setOrderCancel(false)
          try {
            setLoading(true);
            const response = await axios.post(`${backenUrl}/api/order/sumup`, orderData,);
            const data = await response.data;
            if (data) {
              setCheckoutToken(data);
              setIsOpen(true)
              setLoading(false);
            } else {
              toast.error("Error al crear el checkout.");
              setLoading(false);
            }
          } catch (error) {
            console.error("Error al crear el checkout:", error);
            toast.error("Hubo un error al crear el checkout.");
            setLoading(false);
          }
          setLoading(false);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error al procesar el carrito:", error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  // Función para enviar el correo
  const sendEmail = async (orderData) => {
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
    setLoading(true);
    const cartDetails = orderData.items.map((item) => {
      const productData = products.find((product) => product._id === item._id);
      return {
        name: productData?.name,
        quantity: item?.quantity,
        price: productData?.price,
        image: productData?.image[0],
      };
    });
    // Preparar datos para enviar el correo
    const emailData = {
      orderNumber: orderData?.orderNumber,
      cartDetails,
      shippingInfo,
      paymentType,
      subtotal: getCartAmount(),
      shippingFee:
        getCartAmount() > 45
          ? 'Gratis (para España peninsular)'
          : `${currency} ${delivery_fee.toFixed(2)}`,
      total: getCartAmount() > 45
        ? getCartAmount() - discount // No sumar delivery_fee si es gratis
        : getCartAmount() + delivery_fee - discount,
      discount,
      currency,
    };
    try {
      const response = await axios.post(`${backenUrl}/send-email`, emailData);
      //console.log('Respuesta del servidor al enviar el correo:', response.data); // Revisa la respuesta de la API
      if (response.data.success) {
        toast.success('Correo enviado exitosamente!');
      } else {
        toast.error('Hubo un error al enviar el correo. ' + response.data.message);
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error); // Aquí puedes ver el error en detalle
      toast.error('Hubo un error al enviar el correo.');
    } finally {
      setLoading(false);
    }
  };
  // Función para generar el mensaje de WhatsApp
  const sendWhatsAppMessage = (orderData) => {
    const phoneNumber = "672563452";
    const message = `- *Nuevo Pedido Realizado*
  - *Cliente:* ${orderData.address.name} ${orderData.address.lastName}
  - *Email:* ${orderData.address.email}
  - *Teléfono:* ${orderData.address.phone}
  - *Número de pedido:* ${orderData.orderNumber}
  - *Total:* ${orderData.amount} € 
  - *Productos:* \n${orderData.items.map(item => `- ${item.name} x${item.quantity}`).join("\n")}`;
  
    const encodedMessage = encodeURIComponent(message);
  
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
    const url = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  
    window.open(url, "_blank");
  };
  



  return (
    <>
      <Helmet>
        <title>Jayil.es</title>
        <meta name='description' content='Joyería con diseño exclusivo hechas a mano' />
        <script src="https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js"></script>
      </Helmet>
      <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-[120px] sm:pt-28 min-h-[80vh]'>
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
              <p>{getCartAmount() > 45 ? 'Gratis (Para España peninsular)' : `${currency} ${delivery_fee.toFixed(2)}`}</p>
            </div>
            <div className='flex justify-between'>
              <p>Descuento</p>
              <p>- {currency} {discount.toFixed(2)}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <p>Total</p>
              <p>
                {currency}{" "}
                {getCartAmount() === 0
                  ? "0.00"
                  : getCartAmount() > 45
                    ? (getCartAmount() - discount).toFixed(2) // No sumar delivery_fee si es gratis
                    : (getCartAmount() + delivery_fee - discount).toFixed(2)}
              </p>

            </div>
          </div>
          {/* popup sumup */}
          <SumupPopUp isOpen={isOpen} setIsOpen={setIsOpen} setCoupon={setCoupon} orderData={orderData} sendEmail={sendEmail} setOrderCancel={setOrderCancel} orderCancel={orderCancel} />
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
              type='button'
              onClick={applyCoupon}
              className='bg-green-500 text-white px-4 py-2 mt-2'
            >
              Aplicar cupón
            </button>
            {couponError && <p className='text-red-500 mt-2'>{couponError}</p>}
          </div>
          <div className='mt-12'>
            <Title text1={'ELIGE METODO'} text2={'DE PAGO'} />
            {/* payment method seletion */}
            <div className='flex gap-3 flex-col lg:flex-row'>
              {/* <div onClick={() => setMethod('stripe')} className='flex items-center gap-2 border p-2 px-2 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                <img className='h-5 ' src={assets.stripe_logo} alt="" />
              </div>*/}
              <div onClick={() => setMethod('sumup')} className='flex items-center gap-2 border p-2 px-2 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'sumup' ? 'bg-green-400' : ''}`}></p>
                <img className='h-7' src={assets.razorpay_logo} alt="" />
              </div>
              <div onClick={() => setMethod('cod')} className='flex items-center gap-2 border p-2 px-2 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48">
                  <path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path><path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path><path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path><path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path><path fill="#fff" fill-rule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clip-rule="evenodd"></path>
                </svg></p><span className='text-gray-700'>WHATSAPP</span>
              </div>
            </div>
            <p className='text-gray-600 text-sm mt-2'>Para otros métodos de pago comunicate con nosotros por whatsapp</p>
            <div className='mt-12'>
              {/* Botón de envío */}
              <button
                type='submit'
                disabled={loading || getCartAmount() === 0}
                className='bg-[#C15470] text-white px-5 text-sm w-[247px] h-[52px]'
              >
                {loading ? <ClipLoader size={30} color="#ffffff" /> : 'REALIZAR PEDIDO'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
