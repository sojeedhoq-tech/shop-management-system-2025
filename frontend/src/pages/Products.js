import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([
    { id: 1, code: 'PRD-001', name: 'চাউল', category: 'খাদ্য', price: 50, stock: 100 },
    { id: 2, code: 'PRD-002', name: 'আটা', category: 'খাদ্য', price: 40, stock: 50 }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">পণ্য</h1>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
          <FiPlus /> নতুন পণ্য
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="পণ্য খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-none outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2">
              <tr>
                <th className="text-left p-4">কোড</th>
                <th className="text-left p-4">নাম</th>
                <th className="text-left p-4">ক্যাটাগরি</th>
                <th className="text-right p-4">মূল্য</th>
                <th className="text-right p-4">স্টক</th>
                <th className="text-center p-4">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{product.code}</td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4 text-right">৳{product.price}</td>
                  <td className="p-4 text-right">{product.stock}</td>
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

export default Products;
