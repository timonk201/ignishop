'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../store/cartStore';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [address, setAddress] = useState('');
  const router = useRouter();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const order = {
      items: cart,
      total: totalPrice,
      deliveryMethod,
      address: deliveryMethod === 'delivery' ? address : null,
    };
    console.log('Оформлен заказ:', order);
    clearCart();
    alert('Заказ успешно оформлен!');
    router.push('/');
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#333333] mb-6">Корзина</h2>
      {cart.length === 0 ? (
        <p className="text-center text-[#333333] text-lg">Корзина пуста</p>
      ) : (
        <>
          {/* Список товаров в корзине */}
          <div className="space-y-6 mb-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  )}
                  <div>
                    <h3 className="font-semibold text-[#333333] text-lg mb-1">{item.name}</h3>
                    <p className="text-[#FF6200] font-bold text-lg">{item.price} $</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <label className="text-sm text-gray-600">Количество:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="w-16 p-1 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#FF6200]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-[#333333] font-semibold">Итого: {item.price * item.quantity} $</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Итоговая сумма */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <p className="text-2xl font-bold text-[#333333]">
              Общая сумма: <span className="text-[#FF6200]">{totalPrice} $</span>
            </p>
          </div>

          {/* Форма оформления заказа */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-[#333333] mb-4">Оформление заказа</h3>
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Способ получения:</label>
                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#FF6200]"
                >
                  <option value="pickup">Самовывоз</option>
                  <option value="delivery">Доставка</option>
                </select>
              </div>
              {deliveryMethod === 'delivery' && (
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Адрес доставки:</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Введите адрес доставки"
                    className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#FF6200]"
                    required
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-[#FF6200] text-white py-3 rounded-full hover:bg-[#e65a00] transition-colors text-lg font-semibold"
              >
                Оформить заказ
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}