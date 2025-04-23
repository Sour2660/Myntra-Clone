// 


import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { auth } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${auth.user._id}`);
        const rawItems = res.data.products;

        const enriched = await Promise.all(
          rawItems.map(async (item) => {
            try {
              const product = await axios.get(`http://localhost:5000/api/products/${item.productId}`);
              return {
                ...product.data,
                quantity: item.quantity,
              };
            } catch (err) {
              console.warn("Missing product:", item.productId);
              return null;
            }
          })
        );

        setCartItems(enriched.filter(Boolean));
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    if (auth.user?._id) {
      fetchCartItems();
    }
  }, [auth.user]);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // const handleOrder = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/api/orders", {
  //       userId: auth.user._id,
  //       paymentMethod,
  //     });

  //     alert("✅ Order placed successfully!");
  //     navigate("/orders");
  //   } catch (err) {
  //     alert("❌ Failed to place order. Please try again.");
  //     console.error(err);
  //   }
  // };


  const handleOrder = async () => {
    try {
      // Place the order in backend
      await axios.post("http://localhost:5000/api/orders", {
        userId: auth.user._id,
        paymentMethod,
      });
  
      // Optional: Clear the cart
      await axios.post("http://localhost:5000/api/cart/clear", {
        userId: auth.user._id,
      });
  
      // ✅ Redirect to success page
      navigate("/order-success");
  
    } catch (err) {
      alert("❌ Failed to place order. Please try again.");
      console.error(err);
    }
  };
  
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">🧾 Checkout & Payment</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-danger">Your cart is empty.</p>
      ) : (
        <div className="row">
          <div className="col-md-7">
            {cartItems.map((item) => (
              <div className="card mb-3 shadow-sm" key={item._id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded-start"
                      style={{ height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p>Category: {item.category}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Subtotal: ₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-5">
            <div className="card shadow-sm p-4">
              <h4 className="mb-3">Total Amount: ₹{totalAmount}</h4>

              <label className="form-label">Choose Payment Method</label>

              <div className="d-flex justify-content-around align-items-center bg-light rounded p-3 mb-3">
                <img
                  src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/atm-card-design-template-eb1fa96e57f2bf2a0ff20cfd07432803_screen.jpg?ts=1718906565"
                  alt="Card"
                  height="45"
                />
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyVO9LUWF81Ov6LZR50eDNu5rNFCpkn0LwYQ&s"
                  alt="Google Pay"
                  height="45"
                />
                <img
                  src="https://i.pinimg.com/474x/81/aa/84/81aa84e607f0a0432c54fd11642b3d0d.jpg"
                  alt="PhonePe"
                  height="45"
                />
              </div>

              <select
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI (Google Pay / PhonePe)</option>
                <option value="Card">Credit / Debit Card</option>
              </select>

              <button
                className="btn btn-primary w-100 mt-4 py-2 fs-5"
                onClick={handleOrder}
              >
                Pay Securely ₹{totalAmount}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
