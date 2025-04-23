import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await axios.get(`http://localhost:5000/api/products`);
      const filtered = res.data.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="container mt-4">
      <h3>Results for: "{query}"</h3>
      {results.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div className="row">
          {results.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5>{product.name}</h5>
                  <p className="text-muted">₹{product.price}</p>
                  <p>{product.description?.slice(0, 60)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
