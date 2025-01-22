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



    const addToCart = (itemId) => { // aqui envio el id de cada producto seleccionado para saber si hay mas de uno
        setCartItems((prevCartItems) => ({
            ...prevCartItems,
            [itemId]: (prevCartItems[itemId] || 0) + 1,
        }));
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

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const itemInfo = products.find((product) => product._id === itemId);
            return itemInfo ? total + itemInfo.price * quantity : total;
        }, 0);
    };
    
    const getsProductsData = async () => {
        try {
            const response = await axios.get(`${backenUrl}api/product/list`);
            if(response.data.success){
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }    

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
        navigate, backenUrl, token, setToken,setCartItems
    }

  

    return (
        <ShopContext.Provider value={value}>
        {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;