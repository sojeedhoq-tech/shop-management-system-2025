import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sales, setSales] = useState([
    { id: 1, saleNumber: 'SALE-001', customer: 'রহিম', amount: 5000, date: '2026-09-01', status: 'পরিশোধিত' },
    { id: 2, saleNumber: 'SALE-002', customer: 'করিম', amount: 3500, date: '2026-09-01', status: 'বাকি' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">বিক্রয় রেকর্ড</h1>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
          <FiPlus /> নতুন বিক্রয়
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="বিক্রয় খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-none outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2">
              <tr>
                <th className="text-left p-4">বিক্রয় নম্বর</th>
                <th className="text-left p-4">গ্রাহক</th>
                <th className="text-right p-4">পরিমাণ</th>
                <th className="text-left p-4">তারিখ</th>
                <th className="text-left p-4">অবস্থা</th>
                <th className="text-center p-4">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{sale.saleNumber}</td>
                  <td className="p-4">{sale.customer}</td>
                  <td className="p-4 text-right">৳{sale.amount}</td>
                  <td className="p-4">{sale.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      sale.status === 'পরিশোধিত'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FiEdit2 />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales;
