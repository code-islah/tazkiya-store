import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const clearCart = () => {
    setCartItems([]);
  };
  const addToCart = (product) => {
    const exist = cartItems.find((item) => {
      return item._id === product._id;
    });

    if (exist) {
      setCartItems(
        cartItems.map((item) => {
          return item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        }),
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(
      cartItems.filter((item) => {
        return item._id !== id;
      }),
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
