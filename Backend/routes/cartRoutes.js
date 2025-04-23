// const express = require("express");
// const router = express.Router();
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");

// // POST /api/cart/add
// router.post("/add", async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({
//         userId,
//         products: [{ productId, quantity }],
//       });
//     } else {
//       const index = cart.products.findIndex(
//         (item) => item.productId.toString() === productId
//       );

//       if (index > -1) {
//         cart.products[index].quantity += quantity;
//       } else {
//         cart.products.push({ productId, quantity });
//       }
//     }

//     await cart.save();
//     res.status(200).json({ message: "Cart updated", cart });
//   } catch (error) {
//     console.error("Add to Cart Error:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// // POST /api/cart/clear
// router.post("/clear", async (req, res) => {
//   try {
//     await Cart.deleteOne({ userId: req.body.userId });
//     res.json({ message: "Cart cleared" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to clear cart" });
//   }
// });

// // GET /api/cart/:userId
// router.get("/:userId", async (req, res) => {
//   try {
//     let cart = await Cart.findOne({ userId: req.params.userId });
//     if (!cart) return res.json({ products: [] });

//     // Filter out non-existent products
//     const validProducts = [];

//     for (const item of cart.products) {
//       const productExists = await Product.exists({ _id: item.productId });
//       if (productExists) {
//         validProducts.push(item);
//       }
//     }

//     // Update the cart with only valid products
//     cart.products = validProducts;
//     await cart.save();

//     res.json(cart);
//   } catch (err) {
//     console.error("Fetch Cart Error:", err);
//     res.status(500).json({ error: "Failed to fetch cart" });
//   }
// });

// // router.get("/:userId", async (req, res) => {
// //   try {
// //     const cart = await Cart.findOne({ userId: req.params.userId });
// //     if (!cart) return res.json({ products: [] });
// //     res.json(cart);
// //   } catch (err) {
// //     console.error("Fetch Cart Error:", err);
// //     res.status(500).json({ error: "Failed to fetch cart" });
// //   }
// // });

// // POST /api/cart/update
// router.post("/update", async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ error: "Cart not found" });

//     const index = cart.products.findIndex(
//       (item) => item.productId.toString() === productId
//     );

//     if (index === -1) return res.status(404).json({ error: "Product not in cart" });

//     cart.products[index].quantity = quantity;
//     await cart.save();

//     res.json({ message: "Cart updated", cart });
//   } catch (err) {
//     console.error("Cart Update Error:", err);
//     res.status(500).json({ error: "Failed to update cart" });
//   }
// });

// // POST /api/cart/remove
// router.post("/remove", async (req, res) => {
//   try {
//     const { userId, productId } = req.body;

//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ error: "Cart not found" });

//     cart.products = cart.products.filter(
//       (item) => item.productId.toString() !== productId
//     );

//     await cart.save();
//     res.json({ message: "Item removed", cart });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to remove item from cart" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// POST /api/cart/add
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // create new cart
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      // update existing cart
      const index = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST /api/cart/clear
router.post("/clear", async (req, res) => {
  try {
    await Cart.deleteOne({ userId: req.body.userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

// GET /api/cart/:userId
router.get("/:userId", async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.json({ products: [] });

    // Remove invalid products
    const validProducts = [];
    for (const item of cart.products) {
      const productExists = await Product.exists({ _id: item.productId });
      if (productExists) {
        validProducts.push(item);
      }
    }
    cart.products = validProducts;
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error("Fetch Cart Error:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// POST /api/cart/update
router.post("/update", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const index = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index === -1) return res.status(404).json({ error: "Product not in cart" });

    cart.products[index].quantity = quantity;
    await cart.save();

    res.json({ message: "Cart updated", cart });
  } catch (err) {
    console.error("Cart Update Error:", err);
    res.status(500).json({ error: "Failed to update cart" });
  }
});

// POST /api/cart/remove
router.post("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json({ message: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

module.exports = router;