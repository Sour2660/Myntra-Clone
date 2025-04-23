import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-3 mb-4">
      <Link
        to={`/product/${product._id}`}
        className="text-decoration-none text-dark"
      >
        <div className="card h-100 shadow-sm product-card">
          <img
            src={product.image || "https://via.placeholder.com/300x200?text=No+Image"}
            className="card-img-top"
            alt={product.name}
            style={{ height: "220px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">₹{product.price}</p>
            <p className="text-muted">{product.category}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
