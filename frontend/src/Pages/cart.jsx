import React from "react";
import { useCart } from "../Context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-wrapper">
      <h1 className="cart-title">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-message">You don't have any items yet.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <h3>{item.title}</h3>
              <p>Quantity: {item.qty}</p>
              <p>Price: ₹{item.price}</p>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;