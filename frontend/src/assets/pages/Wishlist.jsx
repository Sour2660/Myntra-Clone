import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const Wishlist = () => {
  const { auth } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlistProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/wishlist/${auth.user._id}`);
      const productIds = res.data.products;

      const productPromises = productIds.map((id) =>
        axios.get(`http://localhost:5000/api/products/${id}`).then((res) => res.data)
      );

      const fullProducts = await Promise.all(productPromises);
      setWishlistItems(fullProducts);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  };

  useEffect(() => {
    if (auth.user) {
      fetchWishlistProducts();
    }
  }, [auth.user]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/wishlist/remove", {
        userId: auth.user._id,
        productId,
      });
      alert("Removed from wishlist!");
      fetchWishlistProducts();
    } catch (err) {
      alert("Error removing from wishlist.");
    }
  };

  return (
    <div style={{ backgroundColor: "#fff0f5", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <div className="container" style={{ maxWidth: "1140px" }}>
        <h2 className="text-center fw-bold mb-5">Your Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-muted">Your wishlist is empty.</p>
        ) : (
          <div className="row g-4 justify-content-center">
            {wishlistItems.map((product) => (
              <div key={product._id} className="col-10 col-sm-6 col-md-4 col-lg-3">
                <div className="card border-0 shadow-sm h-100">
                  <img
                    src={product.image}
                    className="card-img-top rounded-2"
                    alt={product.name}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderBottom: "1px solid #eee",
                    }}
                  />
                  <div className="card-body p-2 d-flex flex-column">
                    <h6 className="fw-semibold mb-1 text-truncate">{product.name}</h6>
                    <p className="text-danger fw-bold mb-1">₹{product.price}</p>
                    <p className="text-muted small mb-2">
                      {product.description?.slice(0, 40)}...
                    </p>
                    <button
  className="btn btn-sm w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold rounded-pill border border-danger text-danger bg-white hover-shadow transition-all"
  onClick={() => handleRemoveFromWishlist(product._id)}
  style={{
    transition: "all 0.3s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffe6e6")}
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
>
  <FaTimes />
  Remove
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
