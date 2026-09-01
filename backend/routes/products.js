const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// সকল পণ্য দেখুন
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// একটি পণ্য দেখুন
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'পণ্য পাওয়া যায়নি' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// নতুন পণ্য তৈরি করুন
router.post('/', async (req, res) => {
  try {
    const { name, code, category, purchasePrice, sellingPrice, stock } = req.body;

    const product = new Product({
      name,
      code,
      category,
      purchasePrice,
      sellingPrice,
      stock: stock || 0
    });

    await product.save();
    res.status(201).json({ message: 'পণ্য সফলভাবে যুক্ত হয়েছে', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// পণ্য আপডেট করুন
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'পণ্য পাওয়া যায়নি' });
    }
    res.json({ message: 'পণ্য আপডেট সফল', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// পণ্য ডিলিট করুন
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'পণ্য পাওয়া যায়নি' });
    }
    res.json({ message: 'পণ্য সফলভাবে মুছে ফেলা হয়েছে' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
