import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import CallToAction from '../components/CallToAction';

const CorazonCollection = () => {

  const {products, search, showSearch} = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType,setSortType] = useState('relavent');

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
    const selectedSubcategory = "Corazón";
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
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'CORAZÓN'} text2={'COLLECTIONS'}/>
             {/* Product sort (clasificar) */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to low</option>
          </select>
        </div>
        <div >
            <p className='mb-10 text-gray-500 text-sm px-2'>
            Lleva el amor contigo todos los días con nuestros pendientes en forma de corazón, hechos a mano con esmero.
            </p>
        </div>

          {/* Map product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
            filterProducts.map((item, index)=>(
                <ProductItem 
                key={index} 
                id={item._id} 
                image={item.image} 
                name={item.name} 
                price={item.price}
                category={item.category}
                subCategory={item.subCategory}/>
                
            ))
        }
        </div>
        <CallToAction/>
      </div>
    
    </div>
  )
}

export default CorazonCollection