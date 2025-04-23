// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ GET all products (optionally filter by category)
router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching products" });
  }
});

// ✅ GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching product" });
  }
});

// ✅ POST create a new product (for admin use)
router.post("/create", async (req, res) => {
  try {
    const { name, category, price, image, description } = req.body;

    const newProduct = new Product({
      name,
      category,
      price,
      image,
      description,
    });

    await newProduct.save();
    res.status(201).json({ msg: "Product created", product: newProduct });
  } catch (err) {
    res.status(500).json({ msg: "Error creating product" });
  }
});

// ✅ DELETE a product by ID (for admin use)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted", product: deleted });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting product" });
  }
});

// ✅ PUT update a product by ID (optional for admin)
router.put("/:id", async (req, res) => {
  try {
    const { name, category, price, image, description } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price, image, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product updated", product: updated });
  } catch (err) {
    res.status(500).json({ msg: "Error updating product" });
  }

}
);


module.exports = router;
