import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const {navigate, token, setCartItems, backenUrl} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')


    const verifyPayment = async () => {
        try {
            const response = await fetch(`${backenUrl}/api/order/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ success, orderId })  // Enviar los datos correctamente como JSON
            });
    
            const data = await response.json();  // Obtener la respuesta como JSON
    
            //console.log(data);  // Ver la respuesta del servidor
    
            if (data.success) {
                setCartItems([]);
                navigate('/orders');
            } else {
                toast.error(data.message || 'Error verifying payment');
                navigate('/cart');
            }
        } catch (error) {
            //console.log(error);
            toast.error('Error verifying payment');
            navigate('/cart');
        }
    }
    

    useEffect(() => {
        verifyPayment()
    }, [token])

  return (
    <div>
verify
    </div>
  )
}

export default Verify
