import React from 'react';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';

const Navbar = ({ onMenuClick, onLogout }) => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="text-gray-600 hover:text-gray-900">
          <FiMenu size={24} />
        </button>
        <h1 className="text-2xl font-bold text-blue-900">শপ ম্যানেজমেন্ট সিস্টেম</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-gray-900">
          <FiBell size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">3</span>
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <FiUser size={16} />
          </div>
          <span className="text-gray-700">প্রোফাইল</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
