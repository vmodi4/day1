import React, { createContext, useContext, useState } from "react";

// Define the type for a cart item
type CartItem = {
  id: number;
  title: string;
  price: string;
  [key: string]: any; // Optional additional properties
};

// Define the type for the CartContext
type CartContextType = {
  cartItems: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: number) => void;
  clear: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the CartProvider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const add = (item: CartItem) => {
    console.log("Adding item to cart:", item);
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const remove = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clear = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price;
    }, 0);
  };

   const getTotalItems = () => {
    return cartItems.length;
  };

  return (
    <CartContext.Provider value={{ cartItems, add, remove, clear, getTotalPrice, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

// Create the useCart hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

