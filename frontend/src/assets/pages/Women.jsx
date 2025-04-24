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
    <div style={{ backgroundColor: "#fff0f5", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <div className="container" style={{ maxWidth: "1140px" }}>
        <h2 className="text-center fw-bold mb-5">Women's Collection</h2>

        <div className="row g-4">
          {products.map((product) => (
            <div className="col-6 col-sm-4 col-md-3" key={product._id}>
              <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                <div className="card border-0 shadow-sm h-100">
                  <img
                    src={product.image}
                    className="card-img-top rounded-2"
                    alt={product.name}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      borderBottom: "1px solid #eee",
                    }}
                  />
                  <div className="card-body p-2">
                    <h6 className="fw-semibold mb-1 text-truncate">{product.name}</h6>
                    <p className="text-danger fw-bold mb-1">₹{product.price}</p>
                    <p className="text-muted small mb-0">
                      {product.description?.slice(0, 40)}...
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Women;
