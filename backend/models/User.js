const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'অনুগ্রহ করে নাম প্রদান করুন']
  },
  email: {
    type: String,
    required: [true, 'অনুগ্রহ করে ইমেইল প্রদান করুন'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'অনুগ্রহ করে পাসওয়ার্ড প্রদান করুন'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'staff'],
    default: 'staff'
  },
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
