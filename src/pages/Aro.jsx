import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem'
import CallToAction from '../components/CallToAction';
import { Helmet } from 'react-helmet-async';

const AroCollection = () => {

  const { products, search, showSearch, loading } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState('relavent')

  const applyFilter = () => {
    let productsCopy = products.slice();

    // Filtro por búsqueda
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtro por categoría "Pendientes" y subcategoría "Aro"
    const selectedCategory = "Pendientes";
    const selectedSubcategory = "Aro";
    productsCopy = productsCopy.filter(item =>
      item.category === selectedCategory && item.subCategory === selectedSubcategory
    );

    setFilterProducts(productsCopy);
  };



  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter(fpCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        break;
    }
  }


  useEffect(() => {
    applyFilter();
  }, [search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])



  return (
    <>
      <Helmet>
        <title>Pendientes Aro Exclusivos - Joyería Artesanal en Arcilla Polimérica</title>
        <meta name='description' content='Descubre los pendientes de moda Aro, diseño circular hecho a mano con arcilla polimérica. Exclusivos y ligeros, ideales para realzar tu estilo con un toque único. Joyería artesanal que define tu esencia. ¡Hazlos tuyos hoy!' />
        <meta name='keywords' content='pendientes aro, joyería artesanal, arcilla polimérica, pendientes de moda, diseño exclusivo, joyas únicas, accesorios de moda' />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://www.jayil.es/collection/pendientes/aro' />
      </Helmet>

      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-[110px]'>

        {/* Filter options */}


        {/* Right side*/}
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4 gap-2'>
            <Title text1={'COLECCIÓN DE'} text2={'ARO'} />
            {/* Product sort (clasificar) */}
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 sm:w-auto w-full'>
              <option value="relavent">Ordenar por: Relevancia</option>
              <option value="low-high">Ordenar por: Menor a Mayor precio</option>
              <option value="high-low">Ordenar por: Mayor a Menor precio</option>
            </select>
          </div>
          <div >
            <p className='mb-10 text-gray-500 text-sm px-2'>
              Su diseño atemporal los convierte en una pieza imprescindible en tu colección de accesorios. Hechos a mano con cariño y dedicación.
              Añade un toque de elegancia y estilo moderno a tu colección de joyas con estos deslumbrantes pendientes redondos. Diseñados para ser llevados pegados al lóbulo de la oreja, estos pendientes cuentan con un orificio central que aporta un elemento distintivo y sofisticado a su apariencia.
            </p>
          </div>

          {/* Map product */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-lg animate-pulse">
                  <div className="h-[250px] bg-gray-300 "></div>
                  <div className="h-4 bg-gray-300  mt-4 w-3/4"></div>
                  <div className="h-4 bg-gray-300  mt-2 w-1/2"></div>
                </div>
              ))
            ) : (
              filterProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  category={item.category}
                  subCategory={item.subCategory}
                  slug={item.slug}
                />
              ))
            )}
          </div>
          <CallToAction />
        </div>

      </div>
    </>
  )
}

export default AroCollection