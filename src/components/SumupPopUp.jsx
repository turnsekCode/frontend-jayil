import React, { useState, useEffect, useContext } from "react";

import { ShopContext } from '../context/ShopContext';
import { use } from "react";


export default function SumupPopUp({ isOpen, setIsOpen, orderData }) {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isCheckingPayment, setIsCheckingPayment] = useState(false); // 🔹 Nuevo estado
  const { checkoutToken, navigate, setCheckoutToken, backenUrl, setCartItems } = useContext(ShopContext);
  const [cardInstance, setCardInstance] = useState(null); // Guardar instancia del widget
  console.log("Respuesta del servidor al crear el checkout:", checkoutToken?.orderId);
  const checkPaymentStatus = async () => {
    try {
      const response = await fetch(`${backenUrl}/api/order/verify-sumup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkoutId: checkoutToken?.checkoutToken?.id, orderId: checkoutToken?.orderId, orderData }),
      });

      const data = await response.json();
      console.log("Estado del pago:", data);

      if (data.success) {
        setIsCheckingPayment(false); // 🔹 Detener el chequeo
        setPaymentStatus("✅ ¡Pago confirmado! Redirigiendo...");
        setCartItems({}); // Limpiar el carrito
        navigate("/success");
      } else if (data.success === false) {
        setIsCheckingPayment(false); // 🔹 Detener el chequeo
        setPaymentStatus("❌ El pago ha fallado. Por favor, inténtalo de nuevo.");
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
    if (!checkoutToken?.checkoutToken?.id) {
      console.error("Primero debes crear un checkout.");
      return;
    }
    const card = window.SumUpCard.mount({
      checkoutId: checkoutToken?.checkoutToken?.id, // Checkout token del backend
      showFooter: false,
      onResponse: async (type, body) => {
        console.log("Tipo de respuesta:", type, body);
        if (type === "sent") {
          setPaymentStatus("Pago enviado. Esperando confirmación...");
          // 🔹 No hacemos nada aquí, solo esperamos la respuesta final.
        } else if (type === "success") {
          setPaymentStatus("Pago procesado. Esperando confirmación...");

          // 🔹 Ahora sí activamos la verificación del pago
          setIsCheckingPayment(true);
        } else if (type === "error") {
          setPaymentStatus("Hubo un error en el pago. Inténtalo de nuevo.");
        }
      },
    });
    setCardInstance(card); // Guardar la instancia del widget
    return () => card.unmount(); // Desmontar el widget si es necesario
  };
  // Montar el widget cuando se abra el modal
  useEffect(() => {
    if (isOpen) {
      initializeWidget();
    }
  }, [isOpen]);
  useEffect(() => {
    if (isCheckingPayment) {
      const interval = setInterval(() => {
        checkPaymentStatus();
      }, 5000); // Verificar cada 5 segundos

      return () => clearInterval(interval);
    }
  }, [isCheckingPayment]);

    // Función para cancelar el pago
    const cancelPayment = () => {
      if (cardInstance) {
        cardInstance.unmount(); // 🔹 Desmontar el widget manualmente
        setCheckoutToken(null); // Resetear el estado para ocultar el widget
        alert("Pago cancelado.");
      }
    };

  return (
    <div className="flex justify-center items-center z-20">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <div id="sumup-card"></div> {/* El widget de pago se monta aquí */}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => {setIsOpen(false), cancelPayment()}}
            >
              Cancelar
            </button>
            <div className="text-gray-700">{paymentStatus}</div>
          </div>
        </div>
      )}
    </div>
  );
}