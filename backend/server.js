require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shop-management')
  .then(() => console.log('✅ MongoDB সংযুক্ত হয়েছে'))
  .catch(err => console.log('❌ MongoDB সংযোগ ব্যর্থ:', err.message));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/purchases', require('./routes/purchases'));
app.use('/api/stock', require('./routes/stock'));
app.use('/api/reports', require('./routes/reports'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: '🟢 সার্ভার চলছে' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'পেজ পাওয়া যায়নি' });
});

// Error Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 সার্ভার চলছে পোর্ট ${PORT}-এ`);
});
