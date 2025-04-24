import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { auth } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${auth.user._id}`);
      const rawItems = res.data.products;

      const enrichedItems = await Promise.all(
        rawItems.map(async (item) => {
          try {
            const productRes = await axios.get(`http://localhost:5000/api/products/${item.productId}`);
            return {
              ...productRes.data,
              quantity: item.quantity,
            };
          } catch (err) {
            console.warn("Missing product:", item.productId);
            return null;
          }
        })
      );

      setCartItems(enrichedItems.filter(Boolean));
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    if (auth.user) loadCart();
  }, [auth.user]);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await axios.post("http://localhost:5000/api/cart/update", {
        userId: auth.user._id,
        productId,
        quantity: parseInt(newQuantity),
      });
      loadCart();
    } catch (err) {
      alert("Failed to update quantity.");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/cart/remove", {
        userId: auth.user._id,
        productId,
      });
      loadCart();
    } catch (err) {
      alert("Failed to remove item.");
    }
  };

  const handleCheckout = () => {
    navigate("/payment");
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ backgroundColor: "#fff0f5", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <div className="container" style={{ maxWidth: "1140px" }}>
        <h2 className="text-center fw-bold mb-5">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-muted">Your cart is empty.</p>
        ) : (
          <div className="row g-4">
            {/* Cart Items */}
            <div className="col-md-8">
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
                        <p className="text-muted mb-1">{item.category}</p>
                        <p><strong>Price:</strong> ₹{item.price}</p>
                        <div className="mb-3">
                          <label className="form-label">Quantity</label>
                          <select
                            className="form-select form-select-sm"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                          </select>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm w-100"
                          onClick={() => handleRemove(item._id)}
                        >
                          🗑 Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="col-md-4">
              <div className="card p-4 shadow-sm border-0">
                <h4 className="mb-4 fw-semibold">Order Summary</h4>
                {cartItems.map((item) => (
                  <div className="d-flex justify-content-between mb-2 small" key={item._id}>
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <hr />
                <h5 className="d-flex justify-content-between">
                  <span>Total</span>
                  <span className="text-danger">₹{totalAmount}</span>
                </h5>
                <button
                  className="btn btn-primary w-100 mt-4 rounded-pill fw-semibold"
                  onClick={handleCheckout}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
