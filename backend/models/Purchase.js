const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  poNumber: {
    type: String,
    unique: true,
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
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
  tax: {
    type: Number,
    default: 0
  },
  totalAmount: Number,
  status: {
    type: String,
    enum: ['অপেক্ষমান', 'গৃহীত', 'অংশত গৃহীত', 'বাতিল'],
    default: 'অপেক্ষমান'
  },
  paymentStatus: {
    type: String,
    enum: ['অপেক্ষমান', 'আংশিক প্রদত্ত', 'সম্পূর্ণ প্রদত্ত'],
    default: 'অপেক্ষমান'
  },
  notes: String,
  dueDate: Date,
  receivedDate: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

module.exports = mongoose.model('Purchase', purchaseSchema);
