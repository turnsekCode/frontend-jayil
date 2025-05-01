import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { Helmet } from 'react-helmet-async';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  const fetchProductsData = async () => {
    const product = products.find(item => item.slug === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [productId, products]);
console.log('Product data:', productData);
  const renderSkeleton = () => (
    <div className="pt-[120px] animate-pulse">
      <div className="flex gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="sm:w-[18.7%] w-full space-y-2 sm:space-y-3 flex sm:flex-col flex-row overflow-auto sm:overflow-visible">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-20 w-20 sm:w-full" />
            ))}
          </div>
          <div className="sm:w-[80%] w-full">
            <div className="bg-gray-300 w-full h-[400px]" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="h-7 bg-gray-300 w-3/4" />
          <div className="h-9 bg-gray-300 w-1/4" />
          <div className="h-20 bg-gray-300 w-full" />
          <div className="h-10 bg-gray-300 w-1/2" />
          <div className="h-4 bg-gray-300 w-2/3" />
        </div>
      </div>
    </div>
  );
  if (!productData) return renderSkeleton();
  return (
    <>
      <Helmet>
        <title>
          {productData?.metaTitle && productData.metaTitle !== 'undefined' && productData.metaTitle.trim() !== ''
            ? productData.metaTitle
            : 'Joyería Artesanal Exclusiva - Pendientes, Anillos y Collares Hechos a Mano'}
        </title>
        <meta
          name="description"
          content={
            productData?.metaDescription &&
            productData.metaDescription !== 'undefined' &&
            productData.metaDescription.trim() !== ''
              ? productData.metaDescription
              : 'Descubre joyería única que combina diseño exclusivo artesanal con acero inoxidable. Pendientes, anillos y collares hechos a mano, complementos para mujer, fusionando moda, elegancia y durabilidad. ¡Encuentra tu estilo único aquí!'
          }
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: productData.name,
            image: productData.image,
            additionalImage: Array.isArray(productData.image) ? productData.image : [productData.image],
            description: productData.description,
            sku: productData._id,
            brand: {
              "@type": "Brand",
              name: "Jayil.artesanía"
            },
            offers: {
              "@type": "Offer",
              url: window.location.href,
              priceValidUntil: "2030-12-31",
              priceCurrency: "EUR",
              price: productData.price.toFixed(2),
              availability:
                productData.quantity > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },
          })}
        </script>
        <meta name='keywords' content='pendientes, joyería artesanal, moda, mujer, acero inoxidable, diseño exclusivo, tendencia, elegancia' />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href={`https://www.jayil.es/product/${productData.slug}`} />
      </Helmet>

      <div className="pt-[120px] transition-opacity ease-in duration-500 opacity-100">
        {/* product data */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/* product image */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-2 sm:justify-normal sm:w-[18.7%] w-full">
              {productData.image.map((item, index) => (
                <img
                  key={index}
                  onClick={() => setImage(item)}
                  src={item}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt={productData.name}
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img className="w-full h-auto" src={image} alt={productData.name} />
            </div>
          </div>

          {/* product info */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

            <div className="mt-5 text-3xl font-medium">
              {currency}
              {productData.price.toFixed(2)}
            </div>

            <p className="mt-5 text-gray-500">{productData.description}</p>

            {/* Mensaje de disponibilidad */}
            {productData.quantity === 0 ? (
              <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg text-sm">
                <p className="font-semibold">⚠ Producto no disponible por el momento.</p>
                <p className="mb-3">Para comprar más unidades, por favor comunícate con nosotros.</p>
                <a
                  href={`https://wa.me/34672563452?text=${encodeURIComponent(`Hola, estoy interesado(a) en el producto "${productData.name}" pero veo que no está disponible. ¿Puedo encargarlo o saber cuándo vuelve a estar en stock?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                >
                  📲 Contactar por WhatsApp
                </a>
              </div>
            ) : (
              <div className="mt-4 p-4 bg-green-50 border border-green-400 text-green-800 rounded-lg text-sm">
                <p>✅ Quedan <span className="font-semibold">{productData.quantity}</span> unidades disponibles.</p>
              </div>
            )}

            <button
              onClick={() => addToCart(productData._id, productData.quantity)}
              className="bg-[#C15470] text-white mt-4 px-8 py-3 text-sm active:bg-gray-700 disabled:opacity-50"
              disabled={productData.quantity === 0}
            >
              AÑADIR AL CARRITO
            </button>

            <hr className="mt-8 sm:w-4/5" />
            <p className="mt-5 text-gray-500 md:w-4/5">
              Categoría: {productData.category}
            </p>
          </div>
        </div>

        {/* description and review section */}
        {productData.description2 && (
          <div className="mt-20">
            <div className="flex">
              <b className="border px-5 py-3 text-sm">Descripción</b>
            </div>
            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
              <p>{productData.description2}</p>
            </div>
          </div>
        )}

        {/* display related products */}
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </>
  );
};

export default Product;
