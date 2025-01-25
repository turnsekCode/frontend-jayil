import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedBlock = ({ children, className }) => {
    const { ref, inView } = useInView({
        triggerOnce: true, // La animación solo se ejecutará una vez
        threshold: 0.2,   // Comienza la animación cuando el 20% del bloque es visible
    });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 50 }} // Inicio de la animación
            animate={inView ? { opacity: 1, y: 0 } : {}} // Animación cuando está visible
            transition={{ duration: 0.6, ease: "easeOut" }} // Duración y estilo de la animación
        >
            {children}
        </motion.div>
    );
};

export default AnimatedBlock;
