'use client';

import { useStore } from '@/store';

export default function Home() {
  const { products, addToCart } = useStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Каталог товаров</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
                Нет фото
              </div>
            )}
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
            <p className="text-sm text-gray-500">В наличии: {product.stock}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Добавить в корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}