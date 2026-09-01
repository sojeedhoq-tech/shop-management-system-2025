const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// রেজিস্ট্রেশন
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ইমেইল চেক করুন
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে' });
    }

    // পাসওয়ার্ড হ্যাশ করুন
    const hashedPassword = await bcrypt.hash(password, 10);

    // নতুন ব্যবহারকারী তৈরি করুন
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'staff'
    });

    await user.save();

    // JWT টোকেন তৈরি করুন
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      message: 'সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// লগইন
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // ব্যবহারকারী খুঁজুন
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'ইমেইল বা পাসওয়ার্ড সঠিক নয়' });
    }

    // পাসওয়ার্ড যাচাই করুন
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'ইমেইল বা পাসওয়ার্ড সঠিক নয়' });
    }

    // JWT টোকেন তৈরি করুন
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'লগইন সফল',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
