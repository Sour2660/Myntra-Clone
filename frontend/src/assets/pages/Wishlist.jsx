import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

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
      fetchWishlistProducts(); // Refresh UI
    } catch (err) {
      alert("Error removing from wishlist.");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-muted">Your wishlist is empty.</p>
      ) : (
        <div className="row">
          {wishlistItems.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-danger fw-bold">₹{product.price}</p>
                  <p className="card-text">{product.description?.slice(0, 60)}...</p>
                  <button
                    className="btn btn-outline-danger mt-2 w-100"
                    onClick={() => handleRemoveFromWishlist(product._id)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
