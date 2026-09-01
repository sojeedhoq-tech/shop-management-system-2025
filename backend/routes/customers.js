const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// সকল গ্রাহক দেখুন
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find({ isActive: true });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// একটি গ্রাহক দেখুন
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'গ্রাহক পাওয়া যায়নি' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// নতুন গ্রাহক যুক্ত করুন
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, address, type } = req.body;

    const customer = new Customer({
      name,
      phone,
      email,
      address,
      type: type || 'খুচরা'
    });

    await customer.save();
    res.status(201).json({ message: 'গ্রাহক সফলভাবে যুক্ত হয়েছে', customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// গ্রাহক আপডেট করুন
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!customer) {
      return res.status(404).json({ error: 'গ্রাহক পাওয়া যায়নি' });
    }
    res.json({ message: 'গ্রাহক আপডেট সফল', customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// গ্রাহক ডিলিট করুন
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!customer) {
      return res.status(404).json({ error: 'গ্রাহক পাওয়া যায়নি' });
    }
    res.json({ message: 'গ্রাহক সফলভাবে মুছে ফেলা হয়েছে' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
