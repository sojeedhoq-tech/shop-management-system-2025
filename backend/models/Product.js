const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'পণ্যের নাম প্রয়োজন'],
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: String,
  category: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    enum: ['পিস', 'কেজি', 'লিটার', 'মিটার'],
    default: 'পিস'
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  reorderLevel: {
    type: Number,
    default: 10
  },
  supplier: String,
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

module.exports = mongoose.model('Product', productSchema);
