'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useProductStore } from '../../store/productStore'; // Исправленный путь

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const { products, editProduct } = useProductStore();
  const product = products.find((p) => p.id === parseInt(id));

  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct(parseInt(id), { name, category });
    router.push('/');
  };

  if (!product) return <p>Товар не найден</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333333', marginBottom: '16px' }}>
        Редактировать товар
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Название:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Категория:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
            required
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
      </form>
    </div>
  );
}