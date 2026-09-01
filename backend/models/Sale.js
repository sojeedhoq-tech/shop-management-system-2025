const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  saleNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unitPrice: Number,
    total: Number
  }],
  subtotal: Number,
  discount: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  totalAmount: Number,
  paymentMethod: {
    type: String,
    enum: ['নগদ', 'চেক', 'ডিজিটাল'],
    default: 'নগদ'
  },
  paymentStatus: {
    type: String,
    enum: ['পরিশোধিত', 'বাকি'],
    default: 'পরিশোধিত'
  },
  notes: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sale', saleSchema);
