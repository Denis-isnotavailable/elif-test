import { Product } from "@/types/db.types";

export interface CartItem extends Product {
    quantity: number;
}

export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: Product) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
  
    if (!existingItem) {
        const newCart = [...cart, { ...product, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(newCart));
    }   
};

export const updateQuantity = (id: number, delta: number) => {
  const cart = getCart();
  const newCart = cart.map(item => 
    item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
  ).filter(item => item.quantity > 0);
  
  localStorage.setItem('cart', JSON.stringify(newCart));
};

export const removeFromCart = (id: number) => {
  const cart = getCart();
  const newCart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(newCart));
};