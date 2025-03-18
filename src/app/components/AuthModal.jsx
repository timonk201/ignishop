'use client';

import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'test@example.com' && password === 'password123') {
      login({ email });
      localStorage.setItem('token', 'mock-token');
    } else {
      alert('Неверный email или пароль');
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333333', marginBottom: '16px' }}>Вход</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
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
            Войти
          </button>
          <button
            type="button"
            onClick={closeAuthModal}
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
      </div>
    </div>
  );
}