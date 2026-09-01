const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'গ্রাহকের নাম প্রয়োজন']
  },
  phone: {
    type: String,
    required: true
  },
  email: String,
  address: String,
  city: String,
  district: String,
  type: {
    type: String,
    enum: ['খুচরা', 'পাইকারি'],
    default: 'খুচরা'
  },
  creditLimit: {
    type: Number,
    default: 0
  },
  totalDue: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Customer', customerSchema);
