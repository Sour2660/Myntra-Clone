import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Women = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products?category=Women")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Women's Collection</h2>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-danger fw-bold">₹{product.price}</p>
                    <p className="card-text text-muted">
                      {product.description?.slice(0, 60)}...
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Women;
