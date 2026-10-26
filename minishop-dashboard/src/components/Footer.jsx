import { useState } from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="bg-white border-t border-[#e9e9e5] mt-auto">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-base text-gray-600">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl sm:text-2xl font-black text-[#1e293b]"
          >
            <span className="w-9 h-9 rounded-[8px] bg-orange-500 text-white flex items-center justify-center">
              <ShoppingBag size={18} />
            </span>
            <span>
              MiniShop<span className="text-orange-500">.</span>
            </span>
          </Link>
          <span className="hidden sm:inline text-gray-300 font-bold">|</span>
          <p className="text-gray-500 text-sm sm:text-base font-medium">
            MiniShop Dashboard & Inventory System
          </p>
        </div>

        <nav
          aria-label="เมนูท้ายเว็บไซต์"
          className="flex items-center gap-7 text-sm sm:text-base font-semibold"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'text-orange-600 font-bold' : 'hover:text-orange-600 transition'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? 'text-orange-600 font-bold' : 'hover:text-orange-600 transition'
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'text-orange-600 font-bold' : 'hover:text-orange-600 transition'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/dashboard"
            className="inline-flex items-center gap-1.5 hover:text-orange-700 transition text-orange-600 font-bold"
          >
            Dashboard <ArrowUpRight size={15} />
          </NavLink>
        </nav>

        <p className="text-sm text-gray-500">© {year} MiniShop. All rights reserved.</p>
      </div>
    </footer>
  );
}
