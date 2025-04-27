import React, { useEffect } from 'react';

const GoogleReviews = () => {
  useEffect(() => {
    // Cargar el script de Elfsight de manera asíncrona
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);

    // Limpiar el script al desmontar el componente
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Contenedor del widget de Google Reviews */}
      <div
        className="elfsight-app-bea880f6-7890-456c-bd2a-4731548b596c"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default GoogleReviews;
