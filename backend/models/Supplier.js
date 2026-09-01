const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'সরবরাহকারীর নাম প্রয়োজন'],
    trim: true
  },
  email: {
    type: String,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  address: String,
  city: String,
  district: String,
  contactPerson: String,
  paymentTerms: {
    type: String,
    enum: ['নগদ', '৭ দিন', '১৫ দিন', '৩০ দিন'],
    default: 'নগদ'
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

module.exports = mongoose.model('Supplier', supplierSchema);
