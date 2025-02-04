import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Ordenar los productos por el campo 'date' en orden descendente
    const sortedProducts = products
      .slice() // Crear una copia del array para no mutarlo directamente
      .sort((a, b) => b.date - a.date); // Más recientes primero

    setLatestProducts(sortedProducts.slice(0, 10)); // Tomar los 10 primeros
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="ÚLTIMAS" text2="COLECCIONES" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Brilla con lo más nuevo, encuentra piezas exclusivas en nuestra última colección, ¡Elige tu favorita!
        </p>
      </div>

      {/* Renderizar los productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id} // Es mejor usar `_id` como clave única en lugar del índice
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
    </div>
  );
};

export default LatestCollection;
