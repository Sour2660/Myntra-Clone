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

  const handleOrder = async () => {
    try {
      await axios.post("http://localhost:5000/api/orders", {
        userId: auth.user._id,
        paymentMethod,
      });

      await axios.post("http://localhost:5000/api/cart/clear", {
        userId: auth.user._id,
      });

      navigate("/order-success");
    } catch (err) {
      alert("❌ Failed to place order. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#fff0f5", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <div className="container" style={{ maxWidth: "1140px" }}>
        <h2 className="text-center fw-bold mb-5">🧾 Checkout & Payment</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-danger">Your cart is empty.</p>
        ) : (
          <div className="row g-4">
            {/* Cart Preview */}
            <div className="col-md-7">
              {cartItems.map((item) => (
                <div className="card mb-3 shadow-sm border-0" key={item._id}>
                  <div className="row g-0 align-items-center">
                    <div className="col-md-4 text-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded-start"
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title fw-semibold">{item.name}</h5>
                        <p className="text-muted mb-1">Category: {item.category}</p>
                        <p className="mb-1">Qty: {item.quantity}</p>
                        <p className="fw-semibold text-danger">Subtotal: ₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Section */}
            <div className="col-md-5">
              <div className="card p-4 shadow-sm border-0">
                <h4 className="mb-4 fw-semibold">💳 Payment Summary</h4>

                <div className="bg-light rounded p-3 d-flex justify-content-between align-items-center mb-3">
                  <img
                    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/atm-card-design-template-eb1fa96e57f2bf2a0ff20cfd07432803_screen.jpg?ts=1718906565"
                    alt="Card"
                    height="40"
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyVO9LUWF81Ov6LZR50eDNu5rNFCpkn0LwYQ&s"
                    alt="Google Pay"
                    height="40"
                  />
                  <img
                    src="https://i.pinimg.com/474x/81/aa/84/81aa84e607f0a0432c54fd11642b3d0d.jpg"
                    alt="PhonePe"
                    height="40"
                  />
                </div>

                <label className="form-label">Select Payment Method</label>
                <select
                  className="form-select mb-4"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="UPI">UPI (Google Pay / PhonePe)</option>
                  <option value="Card">Credit / Debit Card</option>
                </select>

                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold">Total:</span>
                  <span className="fw-bold text-danger">₹{totalAmount}</span>
                </div>

                <button
  className="btn btn-sm btn-primary w-100 mt-3 py-2 rounded-pill fw-semibold"
  style={{ fontSize: "1rem" }}
  onClick={handleOrder}
>
  Pay Securely ₹{totalAmount}
</button>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
