

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
//     fetchProductById(id)
//       .then(setProduct)
//       .catch(console.error);
//   }, [id]);

//   const handleAddToCart = async () => {
//     if (!auth.token) return alert("Please login to add to cart.");
//     try {
//       await axios.post("http://localhost:5000/api/cart/add", {
//         userId: auth.user._id,
//         productId: product._id,
//         quantity: 1,
//       });
//       alert("✅ Added to cart!");
//     } catch (err) {
//       alert("❌ Error adding to cart.");
//     }
//   };

//   const handleAddToWishlist = async () => {
//     if (!auth.token) return alert("Please login to add to wishlist.");
//     try {
//       await axios.post("http://localhost:5000/api/wishlist/add", {
//         userId: auth.user._id,
//         productId: product._id,
//       });
//       alert("❤️ Added to wishlist!");
//     } catch (err) {
//       alert("❌ Error adding to wishlist.");
//     }
//   };

//   if (!product) return <p className="text-center mt-5">Loading product details...</p>;

//   return (
//     <div className="container py-5">
//       <div className="row align-items-center bg-white rounded-4 shadow p-4 g-5">
//         <div className="col-lg-6 text-center">
//           <img
//             src={product.image || "https://via.placeholder.com/500?text=No+Image"}
//             alt={product.name}
//             className="img-fluid rounded-3 border"
//             style={{ maxHeight: "450px", objectFit: "contain" }}
//           />
//         </div>

//         <div className="col-lg-6">
//           <h1 className="mb-3 fw-bold">{product.name}</h1>
//           <h3 className="text-success mb-4 fw-semibold">₹{product.price}</h3>

//           <p className="text-muted mb-1">
//             <strong>Category:</strong> {product.category}
//           </p>

//           <p className="mb-4">{product.description}</p>

//           <div className="d-flex flex-wrap gap-3">
//             <button
//               className="btn btn-lg btn-primary px-4 shadow-sm"
//               onClick={handleAddToCart}
//             >
//               🛒 Add to Cart
//             </button>
//             <button
//               className="btn btn-lg btn-outline-danger px-4"
//               onClick={handleAddToWishlist}
//             >
//               ❤️ Add to Wishlist
//             </button>
//           </div>
//         </div>
//       </div>
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
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <div className="bg-white border rounded-4 shadow-sm p-4">
        <div className="row g-4 align-items-center">
          {/* Image Section */}
          <div className="col-md-5 text-center">
            <img
              src={product.image || "https://via.placeholder.com/400?text=No+Image"}
              alt={product.name}
              className="img-fluid rounded-3 shadow-sm border"
              style={{ maxHeight: "350px", objectFit: "contain" }}
            />
          </div>

          {/* Info Section */}
          <div className="col-md-7">
            <h2 className="fw-bold mb-2">{product.name}</h2>
            <h4 className="text-success fw-semibold mb-3">₹{product.price}</h4>
            <p className="text-muted mb-2"><strong>Category:</strong> {product.category}</p>
            <p className="small text-secondary">{product.description}</p>

            <div className="mt-4 d-flex gap-3 flex-wrap">
              <button className="btn btn-sm btn-primary px-4" onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
              <button className="btn btn-sm btn-outline-danger px-4" onClick={handleAddToWishlist}>
                ❤️ Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
