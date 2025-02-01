import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader'


export default function SumupPopUp({ isOpen, setIsOpen, orderData, setCoupon, sendEmail,setOrderCancel,orderCancel }) {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isCheckingPayment, setIsCheckingPayment] = useState(false); // 🔹 Nuevo estado
  const { checkoutToken, navigate, setCheckoutToken, backenUrl, setCartItems, setIsSending, isSending } = useContext(ShopContext);
  const [cardInstance, setCardInstance] = useState(null); // Guardar instancia del widget
  const [showBtonCancel, setShowBtonCancel] = useState(false);

console.log(orderCancel)
  const checkPaymentStatus = async () => {
    try {
      const response = await fetch(`${backenUrl}/api/order/verify-sumup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkoutId: checkoutToken?.checkoutToken.id, orderData, orderCancel }),
      });
      const data = await response.json();
      console.log("🔍 Verificando pago:", data);
      if (data.success) {
        setIsCheckingPayment(false); // 🔹 Detener el chequeo
        toast.info("✅ " + data.message);
        setCartItems({}); // Limpiar el carrito
        setCoupon(""); // Limpiar el cupón
        navigate("/success");
        await sendEmail(orderData); // Pasar los datos del pedido a la función sendEmail
      } else if (data.success === false) {
        setIsCheckingPayment(false); // 🔹 Detener el chequeo
        setPaymentStatus(data.message);
        navigate("/place-order");
      } else {
        setPaymentStatus("El pago aún está en proceso...");
      }
    } catch (error) {
      console.error("Error al verificar el pago:", error);
      setPaymentStatus("Hubo un error al verificar el pago.");
    }
  };

  const initializeWidget = () => {
    if (!checkoutToken?.checkoutToken.id) {
      console.error("Primero debes crear un checkout.");
      return;
    }
    setShowBtonCancel(true);
    const card = window.SumUpCard.mount({
      checkoutId: checkoutToken?.checkoutToken.id, // Checkout token del backend
      showFooter: false,
      onResponse: async (type, body) => {
        setIsSending(true); // 🔹 Mostrar spinner de carga
        if (type === "sent") {
          setPaymentStatus("PAGO ENVIADO");
          // 🔹 No hacemos nada aquí, solo esperamos la respuesta final.
        } else if (type === "success") {
          setPaymentStatus("PAGO PROCESADO");
          // 🔹 Ahora sí activamos la verificación del pago
          setIsCheckingPayment(true);
        } else if (type === "error") {
          setPaymentStatus("Hubo un error en el pago. Inténtalo de nuevo.");
        }
      },
    });
    setCardInstance(card); // Guardar la instancia del widget
    return () => {
      card.unmount(); // Desmontar el widget si es necesario
      setIsSending(false); // 🔹 Asegurar que el spinner se apague al desmontar
    };
  };
  // Montar el widget cuando se abra el modal
  useEffect(() => {
    if (isOpen) {
      initializeWidget();
    }
  }, [isOpen]);

  const MAX_ATTEMPTS = 5; // Número máximo de intentos
  useEffect(() => {
    let attempts = 0; // Contador de intentos
    if (isCheckingPayment) {
      const interval = setInterval(() => {
        if (attempts < MAX_ATTEMPTS) {
          checkPaymentStatus();
          //setOrderCancel(true);
          attempts++;
        } else {
          clearInterval(interval);
          setIsSending(false); 
          setIsCheckingPayment(false); // 🔹 Detener chequeo tras 5 intentos
          setPaymentStatus("No se pudo confirmar el pago. Inténtalo más tarde.");
        }
      }, 5000); // Verificar cada 5 segundos
      return () => clearInterval(interval);
    }
  }, [isCheckingPayment]);

  // Función para cancelar el pago
  const cancelPayment = () => {
    if (cardInstance) {
      cardInstance.unmount(); // 🔹 Desmontar el widget manualmente
      // 🔹 Detener el chequeo
      setIsCheckingPayment(false); // 🔹 Detener el chequeo
      setOrderCancel(true);
      setCheckoutToken(null); // Resetear el estado para ocultar el widget
      alert("Pago cancelado.");
    }
  };
  useEffect(() => {
    if (orderCancel) {
      checkPaymentStatus();
    }
  }, [orderCancel]); 

  return (
    <div className="flex justify-center items-center z-20">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <div id="sumup-card"></div> {/* El widget de pago se monta aquí */}
            {showBtonCancel ? <button
              className="mt-4 px-4 py-2 bg-[#C15470] text-white"
              onClick={() => { setIsOpen(false), cancelPayment() }}
            >
              Cancelar
            </button> : ''}
            <div className="text-gray-700 mt-2 flex items-center justify-center gap-2">{paymentStatus} {isSending ? <ClipLoader /> : ''}</div>
          </div>
        </div>
      )}
    </div>
  );
}