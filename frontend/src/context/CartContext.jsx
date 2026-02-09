import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartData = localStorage.getItem('cartItems');
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  const addToCart = (product, qty) => {
    const existItem = cartItems.find((x) => x.product === product._id);

    let newCartItems;
    if (existItem) {
      newCartItems = cartItems.map((x) =>
        x.product === existItem.product ? { ...product, product: product._id, qty } : x
      );
    } else {
      newCartItems = [...cartItems, { ...product, product: product._id, qty }];
    }

    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const removeFromCart = (id) => {
    const newCartItems = cartItems.filter((x) => x.product !== id);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
