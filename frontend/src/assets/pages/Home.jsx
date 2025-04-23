import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Products</h2>

      <div className="text-center mb-4">
        {["All", "Men", "Women", "Kids"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`btn btn-${filter === cat ? "dark" : "outline-dark"} mx-2`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row justify-content-center">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
