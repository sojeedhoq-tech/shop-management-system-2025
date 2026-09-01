const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');

// লাভ-ক্ষতি রিপোর্ট
router.get('/profit-loss', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const sales = await Sale.find(query).populate('items.product');

    let totalRevenue = 0;
    let totalCost = 0;

    for (let sale of sales) {
      totalRevenue += sale.totalAmount;

      for (let item of sale.items) {
        if (item.product) {
          totalCost += item.quantity * item.product.purchasePrice;
        }
      }
    }

    const profit = totalRevenue - totalCost;
    const profitPercentage = totalRevenue ? (profit / totalRevenue) * 100 : 0;

    res.json({
      totalRevenue,
      totalCost,
      profit,
      profitPercentage: profitPercentage.toFixed(2),
      totalSales: sales.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// বিক্রয় সংক্ষিপ্ত বিবরণ
router.get('/sales-summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const sales = await Sale.find(query);

    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalDiscount = sales.reduce((sum, sale) => sum + (sale.discount || 0), 0);

    const paymentMethodSummary = {};
    for (let sale of sales) {
      const method = sale.paymentMethod || 'অনির্ধারিত';
      paymentMethodSummary[method] = (paymentMethodSummary[method] || 0) + 1;
    }

    res.json({
      totalSales,
      totalRevenue,
      totalDiscount,
      averageOrderValue: totalSales > 0 ? (totalRevenue / totalSales).toFixed(2) : 0,
      paymentMethodSummary
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// দৈনিক বিক্রয় রিপোর্ট
router.get('/daily-sales', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const sales = await Sale.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    }).populate('items.product');

    let totalAmount = 0;
    let totalItems = 0;

    for (let sale of sales) {
      totalAmount += sale.totalAmount;
      totalItems += sale.items.length;
    }

    res.json({
      date: today.toISOString().split('T')[0],
      totalSales: sales.length,
      totalAmount,
      totalItems,
      sales
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
