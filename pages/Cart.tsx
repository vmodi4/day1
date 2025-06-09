import React from "react";
import "../css/Cart.css";
import useCart from "@/hooks/useCart";

function Cart() {
     const Cart = useCart(); // Use the custom cart hook
     const { cartItems } = Cart; // Get cart items from the custom hook
    // Calculate the total price
     const totalPrice = Cart.getTotalPrice();
  
    return (
      <div className="cart">
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-grid">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <h3>{item.title}</h3>
                  <p>{item.price}</p>
                  <button onClick={() => Cart.remove(item.id)}>Remove from Cart</button>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h2>Total: ${totalPrice.toFixed(2)}</h2>
            </div>
          </>
        )}
      </div>
    );
  }
  
  export default Cart;