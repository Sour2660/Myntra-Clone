import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={{ backgroundColor: "#fff0f5", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">All Products</h2>

        <div className="row justify-content-center">
          {products.length === 0 ? (
            <p className="text-center text-muted">No products found.</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
