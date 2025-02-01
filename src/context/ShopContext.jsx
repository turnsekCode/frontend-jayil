import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export const ShopContext = createContext();
import { toast } from 'react-toastify';

const ShopContextProvider = (props) =>{



    const currency = '€';
    const delivery_fee = 4.90;
    const backenUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    //const [cartItems,setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [isSending, setIsSending] = useState(false); 
   


// Función para cargar datos del carrito desde localStorage
const loadCartFromLocalStorage = () => {
    try {
        const storedCart = localStorage.getItem("cartItems");
        const expirationTime = localStorage.getItem("cartItemsExpiration");

        if (!storedCart || !expirationTime) return {}; // Si no hay datos, retorna un objeto vacío

        if (Date.now() > Number(expirationTime)) {
            // Si los datos han expirado, eliminarlos
            localStorage.removeItem("cartItems");
            localStorage.removeItem("cartItemsExpiration");
            return {};
        }

        return JSON.parse(storedCart); // Retornar datos si no han expirado
    } catch (error) {
        console.error("Error reading cart from localStorage:", error);
        return {}; // En caso de error, devuelve un objeto vacío
    }
};

// Estado del carrito, inicializado con datos seguros
const [cartItems, setCartItems] = useState(loadCartFromLocalStorage);

// Guardar el carrito en localStorage cada vez que cambie
useEffect(() => {
    try {
        const expirationTime = Date.now() + 60 * 60 * 1000; // Tiempo de expiración: 1 hora en milisegundos
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("cartItemsExpiration", expirationTime.toString());
    } catch (error) {
        console.error("Error saving cart to localStorage:", error);
    }
}, [cartItems]);


  const notify = () =>{

    toast.success("Producto añadido al carrito", {
      position: "bottom-right",
      className: 'foo-bar'
    });
  }
  const addToCart = (itemId) => {
    setCartItems((prevCartItems) => {
        const currentQuantity = prevCartItems[itemId] || 0;
        
        // Verificar si la cantidad actual es menos que 2
        if (currentQuantity < 2) {
            const updatedCart = {
                ...prevCartItems,
                [itemId]: currentQuantity + 1,
            };
            notify(); // Solo se ejecuta notify si la cantidad es menos de 2
            return updatedCart;
        } else {
            // Si la cantidad es 2 o más, no hacer nada (opcional: puedes mostrar un mensaje de alerta)
            toast.info("Solo puedes añadir hasta 2 unidades de este producto.");
            return prevCartItems; // No modificamos el carrito si ya hay 2
        }
    });
};



    const getCartCount = () => { // aqui hacemos un simple contador del total de productos seleccionados
        return Object.values(cartItems).reduce((total, count) => total + count, 0);
    };

    const updateQuantity = (itemId, newQuantity) => {
        setCartItems((prevCartItems) => {
            const updatedCart = { ...prevCartItems };
    
            if (newQuantity <= 0) {
                // Si la cantidad es 0 o menor, eliminamos el producto
                delete updatedCart[itemId];
            } else {
                // Si no, actualizamos la cantidad
                updatedCart[itemId] = newQuantity;
            }
    
            return updatedCart;
        });
    };
    
    // Estado temporal para manejar el valor del input
    const [tempValues, setTempValues] = useState({});
    
    const handleInputChange = (itemId, value) => {
        const parsedValue = value === '' ? '' : Number(value); // Permitimos '' para evitar errores al borrar temporalmente
        setTempValues((prevValues) => ({
            ...prevValues,
            [itemId]: parsedValue,
        }));
    
        if (parsedValue !== '' && parsedValue > 0) {
            // Si el valor es válido, actualizamos el carrito en tiempo real
            updateQuantity(itemId, parsedValue);
        }
    };
    
    const handleBlur = (itemId, value) => {
        const finalValue = value === '' ? 1 : Number(value); // Si está vacío, asumimos 1 como mínimo
        setTempValues((prevValues) => ({
            ...prevValues,
            [itemId]: finalValue,
        }));
        updateQuantity(itemId, finalValue); // Actualizamos el carrito al perder el foco
    };
    
    

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const itemInfo = products.find((product) => product._id === itemId);
            return itemInfo ? total + itemInfo.price * quantity : total;
        }, 0);
    };
    
    const getsProductsData = async () => {
        setLoading(true); // Mueve esto al principio para indicar que el loading empieza.
        try {
            const response = await axios.get(`${backenUrl}/api/product/list`);
            
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false); // Asegúrate de que el loading termine tanto en éxito como en error.
        }
    };
      

    useEffect(() => {
        getsProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }   
    },[]);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount,updateQuantity, getCartAmount,
        navigate, backenUrl, token, setToken,setCartItems, handleInputChange, tempValues, handleBlur, loading,
        setCheckoutToken, checkoutToken, setIsSending, isSending
    }

  

    return (
        <ShopContext.Provider value={value}>
        {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;