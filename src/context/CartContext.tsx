'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Cart } from '@/types';

interface CartContextType {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    barbershopId: '',
  });

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedBarbershopId = localStorage.getItem('barbershopId');
    
    if (savedCart && savedBarbershopId) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart({
          items: parsedCart,
          total: parsedCart.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0),
          barbershopId: savedBarbershopId,
        });
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (cart.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart.items));
      localStorage.setItem('barbershopId', cart.barbershopId);
    } else {
      localStorage.removeItem('cart');
      localStorage.removeItem('barbershopId');
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      // Si el carrito está vacío o es de una barbería diferente, reiniciar el carrito
      if (prevCart.items.length === 0 || prevCart.barbershopId !== item.barbershopId) {
        const newCart = {
          items: [{ ...item, quantity: 1 }],
          total: item.price,
          barbershopId: item.barbershopId,
        };
        return newCart;
      }

      // Si ya existe el item, aumentar la cantidad
      const existingItem = prevCart.items.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        const updatedItems = prevCart.items.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        return {
          ...prevCart,
          items: updatedItems,
          total: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0),
        };
      }

      // Si no existe, agregar el nuevo item
      const updatedItems = [...prevCart.items, { ...item, quantity: 1 }];
      return {
        ...prevCart,
        items: updatedItems,
        total: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      };
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.id !== itemId);
      return {
        ...prevCart,
        items: updatedItems,
        total: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      };
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      return {
        ...prevCart,
        items: updatedItems,
        total: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      barbershopId: '',
    });
  };

  const getCartTotal = () => {
    return cart.total;
  };

  const getCartItemsCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 