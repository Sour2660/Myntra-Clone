// components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products/create", newProduct);
      alert("Product added!");
      fetchProducts();
      setNewProduct({
        name: "",
        category: "",
        price: "",
        image: "",
        description: "",
      });
    } catch (err) {
      alert("Error adding product.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleAddProduct} style={{ marginBottom: "30px" }}>
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category (Men/Women/Kids)"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          required
        />
        <br />
        <button type="submit">Add Product</button>
      </form>

      <h3>All Products</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", width: "250px" }}>
            <img src={product.image} alt={product.name} width="100%" />
            <h4>{product.name}</h4>
            <p>{product.category}</p>
            <p>₹{product.price}</p>
            <p style={{ fontSize: "12px" }}>{product.description}</p>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
