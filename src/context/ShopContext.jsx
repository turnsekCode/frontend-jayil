import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) =>{



    const currency = '€';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const navigate = useNavigate();

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
    
    
    

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount,updateQuantity, getCartAmount,
        navigate
    }

  

    return (
        <ShopContext.Provider value={value}>
        {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;