# Backend - Shop Management System

Node.js + Express + MongoDB দিয়ে তৈরি ব্যাকএন্ড API সার্ভার।

## 📂 ফোল্ডার স্ট্রাকচার

```
backend/
├── models/          - Database schemas
├── routes/          - API routes
├── controllers/      - Business logic
├── middleware/       - Custom middleware
├── config/          - Configuration files
├── .env.example     - Environment variables template
├── package.json     - Dependencies
└── server.js        - Main server file
```

## 🔧 সেটআপ

```bash
npm install
cp .env.example .env
npm start
```

## 🌐 API Endpoints

### Authentication
- POST `/api/auth/register` - নতুন ব্যবহারকারী নিবন্ধন
- POST `/api/auth/login` - লগইন

### Products
- GET `/api/products` - সকল পণ্য দেখুন
- POST `/api/products` - নতুন পণ্য যোগ করুন
- PUT `/api/products/:id` - পণ্য আপডেট করুন
- DELETE `/api/products/:id` - পণ্য মুছুন

### Sales
- GET `/api/sales` - সকল বিক্রয় রেকর্ড
- POST `/api/sales` - নতুন বিক্রয় রেকর্ড তৈরি করুন
- GET `/api/sales/:id` - নির্দিষ্ট বিক্রয় বিস্তারিত

### Stock
- GET `/api/stock` - স্টক তথ্য
- PUT `/api/stock/:productId` - স্টক আপডেট করুন

### Reports
- GET `/api/reports/profit-loss` - লাভ-ক্ষতির রিপোর্ট
- GET `/api/reports/sales-summary` - বিক্রয় সারাংশ

## 📦 ডিপেন্ডেন্সিজ

- express
- mongoose
- dotenv
- jsonwebtoken
- bcryptjs
- cors
- morgan

## 🔐 Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shop-management
JWT_SECRET=your-secret-key
NODE_ENV=development
```