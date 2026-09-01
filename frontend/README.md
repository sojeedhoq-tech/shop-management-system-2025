# Frontend - Shop Management System

React দিয়ে তৈরি আধুনিক এবং মোবাইল-ফ্রেন্ডলি ইউজার ইন্টারফেস।

## 📂 ফোল্ডার স্ট্রাকচার

```
frontend/
├── src/
│   ├── components/    - Reusable React components
│   ├── pages/        - Page components
│   ├── services/     - API services
│   ├── context/      - Context API
│   ├── App.js        - Main App component
│   └── index.js      - Entry point
├── public/           - Static files
├── package.json      - Dependencies
└── tailwind.config.js - Tailwind CSS config
```

## 🔧 সেটআপ

```bash
npm install
npm start
```

## 📄 প্রধান পেজ

- **Dashboard** - দোকানের সারাংশ এবং আজকের বিক্রয়
- **Sales** - বিক্রয় রেকর্ড ম্যানেজমেন্ট
- **Products** - পণ্যের তালিকা এবং ম্যানেজমেন্ট
- **Inventory** - স্টক ট্র্যাকিং এবং আপডেট
- **Customers** - গ্রাহক এবং বাকি ম্যানেজমেন্ট
- **Reports** - লাভ-ক্ষতি এবং বিক্রয় বিশ্লেষণ

## 🎨 UI কম্পোনেন্ট

- Navigation Bar
- Sidebar Menu
- Dashboard Cards
- Data Tables
- Forms
- Modal Dialogs
- Toast Notifications

## 📦 ডিপেন্ডেন্সিজ

- react
- react-router-dom
- axios
- tailwindcss
- react-icons
- date-fns

## 🚀 বিল্ড এবং ডিপ্লয়

```bash
npm run build
```

## 🌐 API Base URL

`.env` ফাইলে কনফিগ করুন:
```
REACT_APP_API_URL=http://localhost:5000/api
```