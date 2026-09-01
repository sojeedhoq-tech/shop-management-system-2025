const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// সকল স্টক তথ্য দেখুন
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).select('name code stock reorderLevel purchasePrice');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// একটি পণ্যের স্টক আপডেট করুন
router.put('/:productId', async (req, res) => {
  try {
    const { stock, reason } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      { stock: stock },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'পণ্য পাওয়া যায়নি' });
    }

    res.json({
      message: 'স্টক আপডেট সফল',
      product,
      reason: reason || 'ম্যানুয়াল আপডেট'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// কম স্টকের পণ্য দেখুন
router.get('/low-stock', async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      $expr: { $lte: ['$stock', '$reorderLevel'] },
      isActive: true
    });
    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
