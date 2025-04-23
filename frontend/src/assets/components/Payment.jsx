// components/Payment.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Payment = () => {
  const { auth } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (auth.user) {
      axios
        .get(`http://localhost:5000/api/cart/${auth.user._id}`)
        .then((res) => {
          const products = res.data.products || [];
          setCartItems(products);

          // Calculate total (mock product prices)
          let tempTotal = 0;
          products.forEach((item) => {
            tempTotal += 499 * item.quantity; // assume each item = ₹499
          });
          setTotal(tempTotal);
        })
        .catch(console.error);
    }
  }, [auth.user]);

  const handlePlaceOrder = () => {
    axios
      .post("http://localhost:5000/api/orders/place", {
        userId: auth.user._id,
        totalAmount: total,
      })
      .then((res) => {
        alert(res.data.msg);
        setCartItems([]);
        setTotal(0);
      })
      .catch((err) => {
        alert("Order failed: " + err.response?.data?.msg || "Server error");
      });
  };
  

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, i) => (
              <li key={i}>
                Product ID: {item.productId} | Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <h3>Total Amount: ₹{total}</h3>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Payment;
