'use client';

import { useState } from 'react';
import { useStore } from '@/store';

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: 0,
    description: '',
    stock: 0,
    image: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file); // Преобразуем файл в Base64
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({ ...newProduct, id: Date.now().toString() });
    setNewProduct({ id: '', name: '', price: 0, description: '', stock: 0, image: '' });
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setNewProduct(product);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, newProduct);
      setEditingId(null);
      setNewProduct({ id: '', name: '', price: 0, description: '', stock: 0, image: '' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Админ-панель Ignishop</h1>

      {/* Форма добавления/редактирования */}
      <form
        onSubmit={editingId ? handleUpdateProduct : handleAddProduct}
        className="mb-8 space-y-4"
      >
        <div>
          <label className="block text-gray-700">Название</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Цена</label>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Описание</label>
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Количество на складе</label>
          <input
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Картинка</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {newProduct.image && (
            <img src={newProduct.image} alt="Превью" className="mt-2 w-32 h-32 object-cover" />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {editingId ? 'Обновить товар' : 'Добавить товар'}
        </button>
      </form>

      {/* Список товаров */}
      <h2 className="text-2xl font-semibold mb-4">Товары</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center border p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
              ) : (
                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                  Нет фото
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-bold">${product.price}</p>
                <p className="text-sm text-gray-500">В наличии: {product.stock}</p>
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
              >
                Редактировать
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}