const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// সকল ক্রয় অর্ডার দেখুন
router.get('/', authMiddleware, async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate('supplier')
      .populate('items.product')
      .populate('createdBy')
      .sort({ createdAt: -1 });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// একটি ক্রয় অর্ডার দেখুন
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id)
      .populate('supplier')
      .populate('items.product')
      .populate('createdBy');
    if (!purchase) {
      return res.status(404).json({ error: 'ক্রয় অর্ডার পাওয়া যায়নি' });
    }
    res.json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// নতুন ক্রয় অর্ডার তৈরি করুন
router.post('/',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  async (req, res) => {
    try {
      const { supplier, items, tax, notes, dueDate } = req.body;

      // PO নম্বর তৈরি করুন
      const poNumber = 'PO-' + Date.now();

      // সাবটোটাল গণনা করুন
      let subtotal = 0;
      for (let item of items) {
        const product = await Product.findById(item.product);
        item.unitPrice = product.purchasePrice;
        item.total = item.quantity * item.unitPrice;
        subtotal += item.total;
      }

      const totalAmount = subtotal + (tax || 0);

      const purchase = new Purchase({
        poNumber,
        supplier,
        items,
        subtotal,
        tax: tax || 0,
        totalAmount,
        notes,
        dueDate,
        createdBy: req.user.userId
      });

      await purchase.save();
      res.status(201).json({ message: 'ক্রয় অর্ডার সফলভাবে তৈরি হয়েছে', purchase });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// ক্রয় অর্ডার আপডেট করুন
router.put('/:id',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  async (req, res) => {
    try {
      const purchase = await Purchase.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: Date.now() },
        { new: true }
      );
      if (!purchase) {
        return res.status(404).json({ error: 'ক্রয় অর্ডার পাওয়া যায়নি' });
      }
      res.json({ message: 'ক্রয় অর্ডার আপডেট সফল', purchase });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// ক্রয় অর্ডার গ্রহণ করুন
router.put('/:id/receive',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  async (req, res) => {
    try {
      const purchase = await Purchase.findById(req.params.id);
      if (!purchase) {
        return res.status(404).json({ error: 'ক্রয় অর্ডার পাওয়া যায়নি' });
      }

      // পণ্যের স্টক আপডেট করুন
      for (let item of purchase.items) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: item.quantity } }
        );
      }

      purchase.status = 'গৃহীত';
      purchase.receivedDate = new Date();
      await purchase.save();

      res.json({ message: 'ক্রয় অর্ডার সফলভাবে গৃহীত হয়েছে', purchase });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
