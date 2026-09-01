const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { customerValidation, validate } = require('../middleware/validationMiddleware');

// সকল সরবরাহকারী দেখুন
router.get('/', authMiddleware, async (req, res) => {
  try {
    const suppliers = await Supplier.find({ isActive: true });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// একটি সরবরাহকারী দেখুন
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'সরবরাহকারী পাওয়া যায়নি' });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// নতুন সরবরাহকারী যোগ করুন
router.post('/', 
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  customerValidation,
  validate,
  async (req, res) => {
    try {
      const { name, email, phone, address, city, contactPerson, paymentTerms } = req.body;

      const supplier = new Supplier({
        name,
        email,
        phone,
        address,
        city,
        contactPerson,
        paymentTerms: paymentTerms || 'নগদ'
      });

      await supplier.save();
      res.status(201).json({ message: 'সরবরাহকারী সফলভাবে যোগ করা হয়েছে', supplier });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// সরবরাহকারী আপডেট করুন
router.put('/:id',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  async (req, res) => {
    try {
      const supplier = await Supplier.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: Date.now() },
        { new: true }
      );
      if (!supplier) {
        return res.status(404).json({ error: 'সরবরাহকারী পাওয়া যায়নি' });
      }
      res.json({ message: 'সরবরাহকারী আপডেট সফল', supplier });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// সরবরাহকারী ডিলিট করুন
router.delete('/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  async (req, res) => {
    try {
      const supplier = await Supplier.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );
      if (!supplier) {
        return res.status(404).json({ error: 'সরবরাহকারী পাওয়া যায়নি' });
      }
      res.json({ message: 'সরবরাহকারী সফলভাবে মুছে ফেলা হয়েছে' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
