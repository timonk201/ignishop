'use client';

import { useStore } from '@/store';
import { useState } from 'react';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // "pickup" или "delivery"
  const [address, setAddress] = useState('');

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleOrder = () => {
    // Пока моковая логика, позже подключим API
    setOrderPlaced(true);
    setIsCheckoutOpen(false);
    setAddress('');
    setDeliveryMethod('pickup');
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Ваша корзина пуста</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center border p-4 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {item.product.image ? (
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                    Нет фото
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">${item.product.price} x {item.quantity}</p>
                  <p className="text-lg font-bold">
                    Итого: ${item.product.price * item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateCartQuantity(item.product.id, Number(e.target.value))
                  }
                  className="w-16 p-1 border rounded"
                />
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
          <div className="text-right">
            <p className="text-lg font-bold">Общая сумма: ${total}</p>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Оформить заказ
            </button>
            {orderPlaced && (
              <p className="text-green-600 mt-2">Заказ успешно оформлен!</p>
            )}
          </div>
        </div>
      )}

      {/* Модальное окно оформления заказа */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Оформление заказа</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Способ доставки</label>
                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="pickup">Самовывоз</option>
                  <option value="delivery">Доставка</option>
                </select>
              </div>
              {deliveryMethod === 'delivery' && (
                <div>
                  <label className="block text-gray-700">Адрес доставки</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Введите адрес"
                    required
                  />
                </div>
              )}
              <div>
                <p className="text-lg font-bold">Итого: ${total}</p>
                {deliveryMethod === 'delivery' && (
                  <p className="text-sm text-gray-600">+ доставка: $5</p>
                )}
                <p className="text-lg font-bold">
                  К оплате: ${deliveryMethod === 'delivery' ? total + 5 : total}
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                >
                  Отмена
                </button>
                <button
                  onClick={handleOrder}
                  disabled={deliveryMethod === 'delivery' && !address}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition disabled:bg-gray-400"
                >
                  Подтвердить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}