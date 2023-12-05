// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    const item = { product, quantity };
    setCartItems([...cartItems, item]);
    
  };
  const deleteCart = (updatedCartItems) => {
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, deleteCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
