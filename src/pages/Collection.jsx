import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem'

const Collections = () => {

  const {products, search, showSearch, loading} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {

    if(category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item=> item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) => {

    if(subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item=> item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

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
  }, [category, subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  }, [sortType])



  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10'>
      
      {/* Filter options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 text-gray-700'>FILTROS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium text-gray-700'>CATEGORIAS</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Pendientes'} onChange={toggleCategory}/> Pendientes
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Collares'} onChange={toggleCategory}/> Collares
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Pulseras'} onChange={toggleCategory}/> Pulseras
            </p>
          </div>
        </div>
         {/* SubCategory filter */}
         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>SUB CATEGORIA</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Corazón'} onChange={toggleSubCategory}/> Corazón
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Lea'} onChange={toggleSubCategory}/> Lea
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Colette'} onChange={toggleSubCategory}/> Colette
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Gota'} onChange={toggleSubCategory}/> Gota
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Hoja'} onChange={toggleSubCategory}/> Hoja
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Colección Floral'} onChange={toggleSubCategory}/> Colección Floral
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Óvalo'} onChange={toggleSubCategory}/> Óvalo
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Elena'} onChange={toggleSubCategory}/> Elena
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Cascada'} onChange={toggleSubCategory}/> Cascada
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Aro'} onChange={toggleSubCategory}/> Aro
            </p>
          </div>
        </div>
      </div>

      {/* Right side*/}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4 gap-2'>
          <Title text1={'TODAS LAS'} text2={'COLECCIONES'}/>
             {/* Product sort (clasificar) */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 sm:w-auto w-full'>
            <option value="relavent">Ordenar por: Relevancia</option>
            <option value="low-high">Ordenar por: Menor a Mayor precio</option>
            <option value="high-low">Ordenar por: Mayor a Menor precio</option>
          </select>
        </div>

       {/* Map product */}
       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 h-auto'>
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
                    />
                ))
            )}
        </div>

      </div>
    </div>
  )
}

export default Collections