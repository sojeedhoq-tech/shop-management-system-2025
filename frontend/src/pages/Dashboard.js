import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiTrendingDown, FiShoppingCart, FiBox } from 'react-icons/fi';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    profit: 0,
    lowStockItems: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const salesResponse = await api.get('/reports/sales-summary');
      const stockResponse = await api.get('/stock/low-stock');
      const profitResponse = await api.get('/reports/profit-loss');

      setStats({
        totalSales: salesResponse.data.totalSales,
        totalRevenue: salesResponse.data.totalRevenue,
        profit: profitResponse.data.profit,
        lowStockItems: stockResponse.data.length
      });
    } catch (error) {
      console.error('Stats fetch error:', error);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
      <div className={`${color} p-4 rounded-lg text-white`}>
        <Icon size={32} />
      </div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">ড্যাশবোর্ড</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiShoppingCart}
          title="মোট বিক্রয়"
          value={stats.totalSales}
          color="bg-blue-500"
        />
        <StatCard
          icon={FiTrendingUp}
          title="মোট রাজস্ব"
          value={`৳${stats.totalRevenue.toFixed(0)}`}
          color="bg-green-500"
        />
        <StatCard
          icon={FiTrendingDown}
          title="লাভ"
          value={`৳${stats.profit.toFixed(0)}`}
          color="bg-purple-500"
        />
        <StatCard
          icon={FiBox}
          title="কম স্টক"
          value={stats.lowStockItems}
          color="bg-red-500"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">সম্প্রতি বিক্রয়</h2>
        <p className="text-gray-600">সম্প্রতি সম্পন্ন বিক্রয় রেকর্ড এখানে প্রদর্শিত হবে</p>
      </div>
    </div>
  );
};

export default Dashboard;
