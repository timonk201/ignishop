import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [
    { id: 1, name: 'Очки', category: 'electronics', description: 'Качественные солнцезащитные очки', price: 49.99, stock: 100, image: '' },
    { id: 2, name: 'Телефон', category: 'electronics', description: 'Смартфон с хорошей камерой', price: 299.99, stock: 50, image: '' },
    { id: 3, name: 'Ноутбук', category: 'electronics', description: 'Мощный ноутбук для работы', price: 799.99, stock: 30, image: '' },
    { id: 4, name: 'Футболка', category: 'clothing', description: 'Удобная хлопковая футболка', price: 19.99, stock: 200, image: '' },
    { id: 5, name: 'Мотоцикл', category: 'other', description: 'Спортивный мотоцикл', price: 4999.99, stock: 10, image: '' },
    { id: 6, name: 'Игрушка', category: 'other', description: 'Интерактивная игрушка для детей', price: 29.99, stock: 150, image: '' },
    { id: 7, name: 'Сумка', category: 'clothing', description: 'Элегантная кожаная сумка', price: 89.99, stock: 75, image: '' },
    { id: 8, name: 'Платье', category: 'clothing', description: 'Летнее платье с цветочным узором', price: 59.99, stock: 120, image: '' },
  ],
  categories: ['electronics', 'clothing', 'other'],
  addProduct: (newProduct) =>
    set((state) => ({
      products: [
        ...state.products,
        { ...newProduct, id: state.products.length + 1 },
      ],
    })),
  editProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));