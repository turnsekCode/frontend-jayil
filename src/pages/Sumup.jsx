import React, { useState, useEffect, useRef } from "react";

const SumUp = () => {
  const [statusMessages, setStatusMessages] = useState([]); // Estado para mensajes del widget
  const statusRef = useRef(null); // Referencia para el contenedor de mensajes

  // Función para actualizar los mensajes
  const updateStatus = (message, elementType = "p") => {
    setStatusMessages((prevMessages) => [
      ...prevMessages,
      { message, elementType },
    ]);
  };

  // Inicializar el widget SumUp cuando el componente se monta
  useEffect(() => {
    if (window.SumUpCard) {
      window.SumUpCard.mount({
        checkoutId: "demo", // ID de checkout de demostración
        onResponse: (type, body) => {
          updateStatus(`Tipo de respuesta: ${type}`);
          updateStatus(`Respuesta completa: ${JSON.stringify(body)}`, "pre");
        },
      });

      // Limpiar el widget al desmontar el componente
      return () => {
        if (window.SumUpCard) {
          window.SumUpCard.unmount();
        }
      };
    } else {
      updateStatus("El SDK de SumUp no está cargado.");
    }
  }, []);

  return (
    <div>
      <h1>Demo de Widget de Pago con SumUp</h1>
      <div id="sumup-card"></div> {/* Aquí se montará el widget de SumUp */}

      {/* Contenedor para mostrar los mensajes */}
      <div
        ref={statusRef}
        className="mt-4 bg-gray-100 p-4 rounded border max-w-lg"
      >
        <h2 className="font-bold">Estado:</h2>
        {statusMessages.map((status, index) =>
          status.elementType === "p" ? (
            <p key={index}>{status.message}</p>
          ) : (
            <pre key={index}>{status.message}</pre>
          )
        )}
      </div>
    </div>
  );
};

export default SumUp;
