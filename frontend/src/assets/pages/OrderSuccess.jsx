import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div style={{ backgroundColor: "#fff0f5", minHeight: "100vh" }} className="d-flex align-items-center">
      <div className="container text-center py-5">
        {/* Success Image */}
        <img
          src="https://w7.pngwing.com/pngs/158/388/png-transparent-success-success-three-dimensional-graphics-five-pointed-star.png"
          alt="Order Placed"
          className="mb-4"
          style={{ maxHeight: "200px" }}
        />

        {/* Title */}
        <h2 className="text-success fw-bold mb-3">🎉 Order Placed Successfully!</h2>

        {/* Subtext */}
        <p className="lead text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
          Thank you for shopping with us. Your order has been confirmed and is now being processed.
          We’ll send you an update when your package ships!
        </p>

        {/* Buttons */}
        <div className="mt-5 d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/orders" className="btn btn-primary px-4 py-2 rounded-pill">
            View My Orders
          </Link>
          <Link to="/" className="btn btn-outline-dark px-4 py-2 rounded-pill">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
