"use client";
import { useServices } from "@/data/providers/ServicesProvider";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { getProducts } = useServices();
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const products = await getProducts();
    console.log(products);
    setProducts(products);
  };

  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        Productos
      </h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4 text-center">
                {product.description}
              </p>
              <span className="text-lg font-bold text-green-600">
                ${product.price}
              </span>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No hay productos disponibles.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
