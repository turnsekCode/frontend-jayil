import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Aparece después de 3 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.a
      href="https://wa.me/672563452" // Reemplaza con tu número de WhatsApp
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }} // Comienza oculto y desplazado hacia abajo
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }} // Efecto al pasar el mouse
      whileTap={{ scale: 0.9 }} // Efecto al hacer clic
      className="fixed bottom-5 left-5 bg-green-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center cursor-pointer z-50"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <FaWhatsapp size={30} />
      </motion.div>
    </motion.a>
  );
};

export default WhatsAppButton;
