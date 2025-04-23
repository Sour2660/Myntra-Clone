// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");

// // ✅ POST /api/orders - Place order
// router.post("/", async (req, res) => {
//   try {
//     const { userId, paymentMethod } = req.body;

//     if (!cart || !Array.isArray(cart.products) || cart.products.length === 0) {
//       return res.status(400).json({ error: "Cart is empty" });
//     }
    

//     const totalAmount = await Promise.all(
//       cart.products.map(async (item) => {
//         const product = await Product.findById(item.productId);
//         if (!product) throw new Error(`Product not found: ${item.productId}`);
//         return product.price * item.quantity;
//       })
//     ).then((amounts) => amounts.reduce((acc, curr) => acc + curr, 0));
    

//     const order = new Order({
//       userId,
//       products: cart.products,
//       paymentMethod,
//       totalAmount,
//     });

//     await order.save();
//     await Cart.deleteOne({ userId });

//     res.status(201).json({ message: "Order placed", order });
//   } catch (err) {
//     console.error("🚨 Order Placement Error:", err);
//     res.status(500).json({ error: "Failed to place order", detail: err.message });
//   }
  
//   }
// );

// module.exports = router;


const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// POST /api/orders - Place an order
router.post("/", async (req, res) => {
  try {
    const { userId, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Fetch products and validate them
    const validProducts = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        validProducts.push({ productId: product._id, quantity: item.quantity });
        totalAmount += product.price * item.quantity;
      }
    }

    if (validProducts.length === 0) {
      return res.status(400).json({ error: "No valid products in cart" });
    }

    const order = new Order({
      userId,
      products: validProducts,
      paymentMethod,
      totalAmount,
    });

    await order.save();
    await Cart.deleteOne({ userId }); // Optional: Clear the cart after order

    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    console.error("🚨 Order Placement Error:", error.message || error);
    res.status(500).json({ error: "Failed to place order" });
  }
});


// GET /api/orders/:userId - Fetch all orders for a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });

    // Populate product details
    const enrichedOrders = await Promise.all(orders.map(async (order) => {
      const enrichedProducts = await Promise.all(order.products.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          productId: item.productId,
          quantity: item.quantity,
          name: product?.name || "Unknown Product",
          image: product?.image || "",
        };
      }));
      return { ...order.toObject(), products: enrichedProducts };
    }));

    res.json(enrichedOrders);
  } catch (err) {
    console.error("Fetch Orders Error:", err.message || err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});



module.exports = router;
