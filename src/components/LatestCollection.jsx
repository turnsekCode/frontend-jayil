import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const sortedProducts = products
        .slice()
        .sort((a, b) => b.date - a.date);

      setLatestProducts(sortedProducts.slice(0, 10));
    }
  }, [products]);

  const renderSkeleton = () => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse space-y-2">
            <div className="bg-gray-300 w-full h-40 rounded-xl" />
            <div className="h-4 bg-gray-300 w-3/4 rounded" />
            <div className="h-3 bg-gray-200 w-1/2 rounded" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="ÚLTIMAS" text2="COLECCIONES" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Brilla con lo más nuevo, encuentra piezas exclusivas en nuestra última colección, ¡Elige tu favorita!
        </p>
      </div>

      {latestProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              category={item.category}
              subCategory={item.subCategory}
              slug={item.slug}
            />
          ))}
        </div>
      ) : (
        renderSkeleton()
      )}
    </div>
  );
};

export default LatestCollection;
