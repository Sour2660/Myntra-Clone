// 

import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="container text-center py-5">
      {/* Success Image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/3159/3159066.png"
        alt="Order Placed"
        height="120"
        className="mb-4"
      />

      {/* Title */}
      <h2 className="text-success fw-bold">🎉 Order Placed Successfully!</h2>

      {/* Subtext */}
      <p className="lead mt-3">
        Thank you for shopping with us. Your order has been confirmed.
        You’ll receive a confirmation email shortly.
      </p>

      {/* Buttons */}
      <div className="mt-5 d-flex justify-content-center gap-3 flex-wrap">
        <Link to="/orders" className="btn btn-primary px-4 py-2">
          View My Orders
        </Link>
        <Link to="/" className="btn btn-outline-secondary px-4 py-2">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
