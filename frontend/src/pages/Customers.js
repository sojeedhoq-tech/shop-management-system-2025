import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([
    { id: 1, name: 'রহিম আহমেদ', phone: '01712345678', city: 'ঢাকা', totalDue: 5000 },
    { id: 2, name: 'করিম হোসেন', phone: '01812345678', city: 'চট্টগ্রাম', totalDue: 0 }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">গ্রাহক</h1>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
          <FiPlus /> নতুন গ্রাহক
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="গ্রাহক খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-none outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2">
              <tr>
                <th className="text-left p-4">নাম</th>
                <th className="text-left p-4">ফোন</th>
                <th className="text-left p-4">শহর</th>
                <th className="text-right p-4">বাকি পরিমাণ</th>
                <th className="text-center p-4">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{customer.name}</td>
                  <td className="p-4">{customer.phone}</td>
                  <td className="p-4">{customer.city}</td>
                  <td className="p-4 text-right">৳{customer.totalDue}</td>
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

export default Customers;
