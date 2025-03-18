'use client';

import { useState } from 'react';
import { useProductStore } from '../../store/productStore';

export default function AdminPanel() {
  const { products, categories, addProduct, editProduct, deleteProduct } = useProductStore();
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: categories[0] || '',
    description: '',
    price: '',
    stock: '',
    image: '',
  });
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    image: '',
  });

  // Обработка загрузки файла для нового товара
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Пожалуйста, выберите файл в формате .jpg');
    }
  };

  // Обработка загрузки файла для редактируемого товара
  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct({ ...editedProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Пожалуйста, выберите файл в формате .jpg');
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (
      newProduct.name &&
      newProduct.category &&
      newProduct.description &&
      newProduct.price &&
      newProduct.stock
    ) {
      addProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      });
      setNewProduct({
        name: '',
        category: categories[0] || '',
        description: '',
        price: '',
        stock: '',
        image: '',
      });
    } else {
      alert('Пожалуйста, заполните все поля');
    }
  };

  const handleEdit = (product) => {
    setEditProductId(product.id);
    setEditedProduct({ ...product });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (
      editedProduct.name &&
      editedProduct.category &&
      editedProduct.description &&
      editedProduct.price &&
      editedProduct.stock
    ) {
      editProduct(editProductId, {
        ...editedProduct,
        price: parseFloat(editedProduct.price),
        stock: parseInt(editedProduct.stock),
      });
      setEditProductId(null);
      setEditedProduct({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        image: '',
      });
    } else {
      alert('Пожалуйста, заполните все поля');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      deleteProduct(id);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333333', marginBottom: '16px' }}>
        Админ-панель
      </h2>

      {/* Форма для добавления товара */}
      <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333333', marginBottom: '16px' }}>
          Добавить новый товар
        </h3>
        <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Название:</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Категория:</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Описание:</label>
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', minHeight: '80px' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Цена ($):</label>
            <input
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Количество на складе:</label>
            <input
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Изображение (.jpg):</label>
            <input
              type="file"
              accept="image/jpeg"
              onChange={handleImageUpload}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#ff6200',
              color: 'white',
              padding: '8px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Добавить товар
          </button>
        </form>
      </div>

      {/* Список текущих товаров */}
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333333', marginBottom: '16px' }}>
        Текущие товары
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '12rem', objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : (
              <div className="placeholder-image">{product.name}</div>
            )}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333333', marginBottom: '8px' }}>
                {product.name}
              </h4>
              <p style={{ fontSize: '14px', color: '#666666', marginBottom: '4px' }}>
                Категория: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </p>
              <p style={{ fontSize: '14px', color: '#666666', marginBottom: '4px' }}>Описание: {product.description}</p>
              <p style={{ fontSize: '14px', color: '#666666', marginBottom: '4px' }}>Цена: ${product.price.toFixed(2)}</p>
              <p style={{ fontSize: '14px', color: '#666666', marginBottom: '4px' }}>На складе: {product.stock}</p>
            </div>
            {editProductId === product.id ? (
              <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                  style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
                  required
                />
                <select
                  value={editedProduct.category}
                  onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                  style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <textarea
                  value={editedProduct.description}
                  onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                  style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', minHeight: '80px' }}
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                  style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
                  required
                />
                <input
                  type="number"
                  value={editedProduct.stock}
                  onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })}
                  style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
                  required
                />
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Изображение (.jpg):</label>
                  <input
                    type="file"
                    accept="image/jpeg"
                    onChange={handleEditImageUpload}
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#ff6200',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '20px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => setEditProductId(null)}
                  style={{
                    backgroundColor: '#666666',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '20px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Отмена
                </button>
              </form>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleEdit(product)}
                  style={{
                    backgroundColor: '#ff6200',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '20px',
                    border: 'none',
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={{
                    backgroundColor: '#ff0000',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '20px',
                    border: 'none',
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  Удалить
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}