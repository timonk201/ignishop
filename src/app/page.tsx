'use client';

import Link from 'next/link';
import { useProductStore } from '../store/productStore';

export default function Home() {
  const { products } = useProductStore();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      {/* Баннер */}
      <div
        style={{
          backgroundColor: '#fffacd',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#000000' }}>Горячие товары!</h2>
            <p style={{ fontSize: '18px', color: '#000000' }}>До 90% скидки</p>
            <button
              style={{
                marginTop: '16px',
                backgroundColor: '#000000',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Смотреть >
            </button>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="banner-placeholder">Ноутбук</div>
            <div className="banner-placeholder">Одежда</div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 0, left: '0', width: '100%', height: '8px', backgroundColor: '#ff0000' }} />
      </div>

      {/* Главные скидки */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff0000', marginBottom: '16px' }}>Главные скидки</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {products.slice(0, 8).map((product) => (
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
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333333', marginBottom: '8px' }}>{product.name}</h4>
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
                    marginBottom: '8px',
                  }}
                >
                  Смотреть ещё >
                </button>
                <Link href={`/edit/${product.id}`}>
                  <button
                    style={{
                      width: '100%',
                      backgroundColor: '#666666',
                      color: 'white',
                      padding: '8px',
                      borderRadius: '20px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Редактировать
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Распродажа */}
      <div>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff0000', marginBottom: '16px' }}>Распродажа</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {products.slice(0, 5).map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s',
                position: 'relative',
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
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333333', marginBottom: '8px' }}>{product.name}</h4>
                <span
                  style={{
                    backgroundColor: '#ff6200',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}
                >
                  SALE
                </span>
                <button
                  style={{
                    width: '100%',
                    backgroundColor: '#ff6200',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '20px',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '8px',
                  }}
                >
                  Смотреть ещё >
                </button>
                <Link href={`/edit/${product.id}`}>
                  <button
                    style={{
                      width: '100%',
                      backgroundColor: '#666666',
                      color: 'white',
                      padding: '8px',
                      borderRadius: '20px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Редактировать
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}