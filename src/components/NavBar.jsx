import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const categories = [
    { name: 'VER TODAS', path: '/collection' },
    { name: 'COLLARES', path: '/collection/collares' },
    {
        name: 'PENDIENTES',
        path: '/collection/pendientes',
        icon: <IoIosArrowForward />,
        subcategories: [
            { name: 'CORAZÓN', path: '/collection/pendientes/corazon' },
            { name: 'ARO', path: '/collection/pendientes/aro' },
            { name: 'COLETTE', path: '/collection/pendientes/colette' },
            { name: 'GOTA', path: '/collection/pendientes/gota' },
            { name: 'LEA', path: '/collection/pendientes/lea' },
            { name: 'COLECCIÓN FLORAL', path: '/collection/pendientes/coleccion-floral' },
            { name: 'ÓVALO', path: '/collection/pendientes/ovalo' },
            { name: 'ELENA', path: '/collection/pendientes/elena' },
            { name: 'CASCADA', path: '/collection/pendientes/cascada' },
            { name: 'HOJA', path: '/collection/pendientes/hoja' },
        ],
    },
    { name: 'PULSERAS', path: '/collection/pulseras' },
];

const NavBar = () => {

    const [visible, setVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, getCartAmount, currency } = useContext(ShopContext);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isCollectionOpen, setIsCollectionOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const location = useLocation();


    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setSearchVisible(true)
        } else {
            setSearchVisible(false)
        }
    }, [location])

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        navigate('/login');
        setCartItems({});
    }

    const handleNavClick = () => {
        // Cierra el menú móvil y restablece los submenús
        setVisible(false);
        setIsCollectionOpen(false);
        setOpenSubmenu(null);
    };

    return (
        <div className='flex items-center justify-between py-5 font-medium border-b'>
            <Link to="/"><img src={assets.logo} className='w-28' alt="" /></Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>INICIO</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#C15470] hidden' />
                </NavLink>
                <div
                    className="relative"
                    onMouseEnter={() => setIsSubmenuOpen(true)}
                    onMouseLeave={() => setIsSubmenuOpen(false)}
                >
                    <NavLink to="/collection" className="flex flex-col items-center gap-1" onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}>
                        <div className="flex items-center gap-1">
                            <p>COLECCIÓN</p>
                            <IoIosArrowDown />
                        </div>
                        <hr className='w-2/4 border-none h-[1.5px] bg-[#C15470] hidden' />
                    </NavLink>

                    {/* Submenu */}
                    {isSubmenuOpen && (
                        <div
                            className="absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-48 transition-transform transform scale-100 opacity-100 z-10"
                        >
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="relative"
                                    onMouseEnter={() => setHoveredCategory(category.name)}
                                    onMouseLeave={() => setHoveredCategory(null)}
                                >
                                    <NavLink
                                        onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                                        to={category.path}
                                        className="px-4 py-2 hover:bg-gray-100 text-gray-800 flex items-center justify-between"
                                    >
                                        {/* Renderizar el ícono si existe */}
                                        {category.name}
                                        {category.icon && category.icon}
                                    </NavLink>

                                    {/* Submenu for Category 2 */}
                                    {category.subcategories && hoveredCategory === category.name && (
                                        <div
                                            className={`absolute top-0 left-full bg-white shadow-md rounded-md py-2 w-48 transition-all duration-300 transform ${hoveredCategory === category.name
                                                ? 'opacity-100 translate-y-0'
                                                : 'opacity-0 translate-y-3'
                                                }`}
                                        >
                                            {category.subcategories.map((subcategory, subIndex) => (
                                                <NavLink
                                                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                                                    key={subIndex}
                                                    to={subcategory.path}
                                                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                                                >
                                                    {subcategory.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>SOBRE MI</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#C15470] hidden' />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p>CONTACTO</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#C15470] hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <p className='text-[#C15470]'>
                    {currency}{" "}
                    {getCartAmount() === 0
                        ? "0.00"
                        : getCartAmount().toFixed(2)}
                </p>
                {searchVisible ? <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" /> : null}
                {/*<div className='group relative'>
                    <img onClick={()=> token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    {/* Dropdown */}
                { /*token &&
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                        <p onClick={()=>logout()} className='cursor-pointer hover:text-black'>Logout </p>
                    </div>
                </div>

                   }
                </div>*/}
                <Link to="/cart" className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#C15470] text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* side bar menu para moviles*/}
            <div className={`z-10 absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => handleNavClick()} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Atras</p>
                    </div>
                    <NavLink onClick={() => handleNavClick()} className='py-2 pl-6 border' to='/'>INICIO</NavLink>
                    <div className="relative">
                        <button
                            onClick={() => setIsCollectionOpen(!isCollectionOpen)}
                            className="w-full py-2 px-6 border flex items-center justify-between"
                        >
                            COLECCIÓN
                            <FaChevronDown
                                className={`transition-transform duration-300 ${isCollectionOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {/* Submenu */}
                        {isCollectionOpen && (
                            <div className="pl-8 py-2 border-l">
                                {categories.map((category, index) => (
                                    <div key={index} className="mb-2">
                                        {/* Category link */}
                                        <div className="flex items-center justify-between">
                                            <NavLink
                                                onClick={handleNavClick}
                                                className="py-2 px-5 text-sm block"
                                                to={category.path}
                                            >
                                                {category.name}
                                            </NavLink>
                                            {category.subcategories && (
                                                <button
                                                    onClick={() =>
                                                        setOpenSubmenu(
                                                            openSubmenu === category.name ? null : category.name
                                                        )
                                                    }
                                                    className="text-sm w-24 flex items-center justify-end p-2"
                                                >
                                                    <FaChevronRight
                                                        className={`transition-transform duration-300 ${openSubmenu === category.name ? 'rotate-90' : ''
                                                            }`}
                                                    />
                                                </button>
                                            )}
                                        </div>

                                        {/* Submenu for Category 2 */}
                                        {category.subcategories && openSubmenu === category.name && (
                                            <div className="pl-4 py-1 border-l">
                                                {category.subcategories.map((subcategory, subIndex) => (
                                                    <NavLink
                                                        key={subIndex}
                                                        onClick={handleNavClick}
                                                        className="w-max py-2 px-4 text-sm block text-gray-700"
                                                        to={subcategory.path}
                                                    >
                                                        {subcategory.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <NavLink onClick={() => handleNavClick()} className='py-2 pl-6 border' to='/about'>SOBRE MI</NavLink>
                    <NavLink onClick={() => handleNavClick()} className='py-2 pl-6 border' to='/contact'>CONTACTO</NavLink>
                </div>
            </div>
        </div>
    )
}

export default NavBar
