// import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { fetchProductById } from "../services/productService";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const { auth } = useContext(AuthContext);
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetchProductById(id).then(setProduct).catch(console.error);
//   }, [id]);

//   const handleAddToCart = async () => {
//     if (!auth.token) return alert("Please login to add to cart.");
//     try {
      
//       console.log("Sending to cart:", {
//         userId: auth.user._id,
//         productId: product._id,
//         quantity: 1,
//       });

//       await axios.post("http://localhost:5000/api/cart/add", {
//         userId: auth.user._id,
//         productId: product._id,
//         quantity: 1,
//       });
//       alert("Added to cart!");
//     } catch (err) {
//       alert("Error adding to cart.");
//     }
//   };

//   const handleAddToWishlist = async () => {
//     if (!auth.token) return alert("Please login to add to wishlist.");
//     try {
//       await axios.post("http://localhost:5000/api/wishlist/add", {
//         userId: auth.user._id,
//         productId: product._id,
//       });
//       alert("Added to wishlist!");
//     } catch (err) {
//       alert("Error adding to wishlist.");
//     }
//   };

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <img src={product.image} alt={product.name} width="300" />
//       <h2>{product.name}</h2>
//       <p><strong>Price:</strong> ₹{product.price}</p>
//       <p><strong>Category:</strong> {product.category}</p>
//       <p><strong>Description:</strong> {product.description}</p>
//       <button onClick={handleAddToCart} style={{ marginRight: "10px" }}>Add to Cart</button>
//       <button onClick={handleAddToWishlist}>Add to Wishlist</button>
//     </div>
//   );
// };

// export default ProductDetail;



import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id)
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  const handleAddToCart = async () => {
    if (!auth.token) return alert("Please login to add to cart.");
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        userId: auth.user._id,
        productId: product._id,
        quantity: 1,
      });
      alert("✅ Added to cart!");
    } catch (err) {
      alert("❌ Error adding to cart.");
    }
  };

  const handleAddToWishlist = async () => {
    if (!auth.token) return alert("Please login to add to wishlist.");
    try {
      await axios.post("http://localhost:5000/api/wishlist/add", {
        userId: auth.user._id,
        productId: product._id,
      });
      alert("❤️ Added to wishlist!");
    } catch (err) {
      alert("❌ Error adding to wishlist.");
    }
  };

  if (!product) return <p className="text-center mt-5">Loading product details...</p>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <div className="row g-4">
          <div className="col-md-6 text-center">
            <img
              src={product.image || "https://via.placeholder.com/400?text=No+Image"}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-2">{product.name}</h2>
            <h4 className="text-danger mb-3">₹{product.price}</h4>
            <p><strong>Category:</strong> {product.category}</p>
            <p>{product.description}</p>

            <div className="mt-4">
              <button className="btn btn-primary me-3" onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
              <button className="btn btn-outline-danger" onClick={handleAddToWishlist}>
                ❤️ Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
