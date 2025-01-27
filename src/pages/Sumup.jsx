import React, { useState } from "react";

const Sumup = () => {
  const [paymentLink, setPaymentLink] = useState(null);

  const handlePayment = async () => {
    const amount = 10.0; // Monto del pago
    const currency = "USD"; // Moneda
    const customerEmail = "cliente@ejemplo.com"; // Email del cliente

    try {
      // Autenticar y obtener un token de acceso
      const authResponse = await fetch("http://localhost:4000/auth", {
        method: "POST",
      });
      const authData = await authResponse.json();

      if (!authData.access_token) {
        throw new Error("Error al autenticar: Token no recibido.");
      }

      const token = authData.access_token;

      // Crear el enlace de pago
      const checkoutResponse = await fetch(
        "http://localhost:4000/create-checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, amount, currency, customerEmail }),
        }
      );

      const checkoutData = await checkoutResponse.json();

      if (!checkoutData.checkout_url) {
        throw new Error("Error al crear el enlace de pago.");
      }

      // Redirigir al cliente al enlace de pago
      window.location.replace(checkoutData.checkout_url);
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
      alert("Hubo un error durante el proceso de pago. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div>
      <h1>Pagos en Línea con SumUp</h1>
      <button onClick={handlePayment}>Pagar con SumUp</button>
      {paymentLink && (
        <div>
          <p>Enlace de pago creado:</p>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">
            Pagar ahora
          </a>
        </div>
      )}
    </div>
  );
};

export default Sumup;
