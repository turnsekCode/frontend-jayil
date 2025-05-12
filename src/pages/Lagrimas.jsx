import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem'
import CallToAction from '../components/CallToAction';
import {Helmet} from 'react-helmet-async';

const LagrimasCollection = () => {

  const {products, search, showSearch, loading} = useContext(ShopContext);
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
    const selectedSubcategory = "Lágrima";
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
    <>
    <Helmet>
        <title>Pendientes de Moda hechos a mano - Joyería </title>
        <meta name='description' content='Los pendientes Lágrimas son perfectos para el uso diario gracias a su diseño ligero y cómodo adquierelos para tu colección de accesorios para tu día a día' />
        <meta name='keywords' content='pendientes, joyería artesanal, moda, mujer, acero inoxidable, diseño exclusivo, tendencia, elegancia' />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://www.jayil.es/collection/pendientes/colette' />
      </Helmet>
   
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-[110px]'>
      
      {/* Filter options */}
   

      {/* Right side*/}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'COLECCIÓN DE'} text2={'LÁGRIMAS'}/>
             {/* Product sort (clasificar) */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to low</option>
          </select>
        </div>
        <div >
            <p className='mb-10 text-gray-500 text-sm px-2'>
            Los pendientes Lágrimas son perfectos para el uso diario gracias a su diseño ligero y cómodo. Su forma geométrica al estilo Vintage le aporta un estilo femenino y único del cual cuelga una figura de un corazón de acero inoxidable.
            Si lo tuyo es lucir más discreta, esta será pieza imprescindible en tu colección de accesorios para tu día a día.
            </p>
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

export default LagrimasCollection