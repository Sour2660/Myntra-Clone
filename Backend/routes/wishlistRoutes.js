const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;
  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) wishlist = await Wishlist.create({ userId, products: [] });

  if (!wishlist.products.includes(productId)) {
    wishlist.products.push(productId);
    await wishlist.save();
    return res.json({ msg: "Product added", wishlist });
  }

  res.status(200).json({ msg: "Product already in wishlist", wishlist });
});


router.get('/:userId', async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: req.params.userId });
  res.json(wishlist || { products: [] });
});

router.post('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ msg: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    res.json({ msg: "Product removed from wishlist", wishlist });
  } catch (err) {
    console.error("Remove Wishlist Error:", err);
    res.status(500).json({ msg: "Error removing product from wishlist" });
  }
});


module.exports = router;
