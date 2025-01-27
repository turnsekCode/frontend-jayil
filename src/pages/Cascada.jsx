import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem'
import CallToAction from '../components/CallToAction';

const CascadaCollection = () => {

  const {products, search, showSearch} = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType,setSortType] = useState('relavent')  

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
    const selectedSubcategory = "Cascada";
    productsCopy = productsCopy.filter(item =>
        item.category === selectedCategory && item.subCategory === selectedSubcategory
    );

    setFilterProducts(productsCopy);
};



  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high': 
      setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
      break;
    
      case 'high-low': 
      setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
      break;

      default:
        applyFilter()
        break;
  }
}


  useEffect(()=>{
    applyFilter();
  }, [search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  }, [sortType])



  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10'>
      
      {/* Filter options */}
   

      {/* Right side*/}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4 gap-2'>
          <Title text1={'COLECCIÓN DE'} text2={'HOJA'}/>
             {/* Product sort (clasificar) */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 sm:w-auto w-full'>
          <option value="relavent">Ordenar por: Relevancia</option>
            <option value="low-high">Ordenar por: Menor a Mayor precio</option>
            <option value="high-low">Ordenar por: Mayor a Menor precio</option>
          </select>
        </div>
        <div >
            <p className='mb-10 text-gray-500 text-sm px-2'>
            Los pendientes Hoja son perfectos para el uso diario gracias a su diseño ligero y cómodo. Su versatilidad los convierte en el accesorio ideal para cualquier ocasión, desde una jornada laboral hasta una salida casual. Realza tu belleza natural y destaca con la elegancia discreta de estos pendientes artesanales que combinan a la perfección con tu día a día.
            </p>
        </div>

        {/* Map product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterProducts.length === 0 ? (
                Array.from({ length: 8 }).map((_, index) => (
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
                    />
                ))
            )}
        </div>
        <CallToAction/>
      </div>
    
    </div>
  )
}

export default CascadaCollection