import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiShoppingCart, FiBox, FiUsers, FiBarChart3, FiPackage, FiLogOut } from 'react-icons/fi';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { icon: FiHome, label: 'ড্যাশবোর্ড', path: '/' },
    { icon: FiShoppingCart, label: 'বিক্রয়', path: '/sales' },
    { icon: FiBox, label: 'পণ্য', path: '/products' },
    { icon: FiUsers, label: 'গ্রাহক', path: '/customers' },
    { icon: FiPackage, label: 'ইনভেন্টরি', path: '/inventory' },
    { icon: FiBarChart3, label: 'রিপোর্ট', path: '/reports' }
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 h-screen flex flex-col`}>
      <div className="p-4 text-center font-bold text-xl border-b border-blue-800">
        {isOpen ? '🏪 শপ ম্যানেজার' : '🏪'}
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Icon size={24} />
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-blue-800">
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800 transition-colors">
          <FiLogOut size={24} />
          {isOpen && <span>লগআউট</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
