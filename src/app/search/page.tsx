'use client';

import { useSearchParams } from 'next/navigation';
import { useProductStore } from '../../store/productStore';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const { products } = useProductStore();

  // Фильтрация товаров по имени или категории
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333333', marginBottom: '16px' }}>
        Результаты поиска: "{query}"
      </h2>
      {filteredProducts.length === 0 ? (
        <p style={{ fontSize: '16px', color: '#666666' }}>Товары не найдены</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '12rem', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                />
              ) : (
                <div className="placeholder-image">{product.name}</div>
              )}
              <div style={{ padding: '16px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333333', marginBottom: '8px' }}>
                  {product.name}
                </h4>
                <p style={{ fontSize: '14px', color: '#666666', marginBottom: '16px' }}>{product.category}</p>
                <button
                  style={{
                    width: '100%',
                    backgroundColor: '#ff6200',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '20px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Смотреть ещё >
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}