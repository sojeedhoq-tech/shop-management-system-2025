const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');

// সকল বিক্রয় রেকর্ড দেখুন
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate('customer')
      .populate('items.product')
      .populate('createdBy')
      .sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// একটি বিক্রয় রেকর্ড দেখুন
router.get('/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate('customer')
      .populate('items.product')
      .populate('createdBy');
    if (!sale) {
      return res.status(404).json({ error: 'বিক্রয় রেকর্ড পাওয়া যায়নি' });
    }
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// নতুন বিক্রয় তৈরি করুন
router.post('/', async (req, res) => {
  try {
    const { customer, items, discount, tax, paymentMethod, paymentStatus, notes } = req.body;

    // সেল নম্বর তৈরি করুন
    const saleNumber = 'SALE-' + Date.now();

    // সাবটোটাল গণনা করুন
    let subtotal = 0;
    for (let item of items) {
      const product = await Product.findById(item.product);
      item.unitPrice = product.sellingPrice;
      item.total = item.quantity * item.unitPrice;
      subtotal += item.total;
    }

    const totalAmount = subtotal - (discount || 0) + (tax || 0);

    const sale = new Sale({
      saleNumber,
      customer,
      items,
      subtotal,
      discount: discount || 0,
      tax: tax || 0,
      totalAmount,
      paymentMethod: paymentMethod || 'নগদ',
      paymentStatus: paymentStatus || 'পরিশোধিত',
      notes
    });

    await sale.save();

    // স্টক আপডেট করুন
    for (let item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    res.status(201).json({ message: 'বিক্রয় রেকর্ড সফলভাবে তৈরি হয়েছে', sale });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// বিক্রয় আপডেট করুন
router.put('/:id', async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!sale) {
      return res.status(404).json({ error: 'বিক্রয় রেকর্ড পাওয়া যায়নি' });
    }
    res.json({ message: 'বিক্রয় আপডেট সফল', sale });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
