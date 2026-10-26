import { useState } from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  UserRound,
  Search,
  LayoutDashboard,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Header({ cartCount = 0, searchQuery = '', onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState(searchQuery);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
    setMenuOpen(false);
  };

  const actionClass = (isActive) =>
    `w-11 h-11 rounded-[8px] flex items-center justify-center transition cursor-pointer ${
      isActive
        ? 'bg-orange-50 text-orange-600 font-bold border border-orange-200'
        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
    }`;

  return (
    <>
      {/* Announcement top bar */}
      <div className="bg-orange-50 border-b border-orange-200/80 text-orange-950 text-xs sm:text-sm py-2 px-4 sm:px-8 flex items-center justify-between font-medium">
        <span className="font-semibold text-orange-900">
          MiniShop Dashboard — Little things. Great finds.
        </span>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 font-bold text-orange-700 hover:text-orange-800 transition"
        >
          เลือกสิ่งที่ใช่ ให้ทุกวันของคุณ <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#e9e9e5]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-22 flex items-center justify-between gap-5">
          <div className="flex items-center gap-7 lg:gap-9">
            {/* Brand แสดงชื่อ MiniShop และ MiniShop Dashboard */}
            <Link
              to="/"
              className="flex items-center gap-3 text-2xl sm:text-3xl font-black tracking-tight text-[#1e293b] hover:opacity-95 transition"
              aria-label="MiniShop Dashboard หน้าหลัก"
            >
              <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-[10px] bg-orange-500 text-white flex items-center justify-center shadow-none shrink-0">
                <ShoppingBag size={24} />
              </span>
              <span className="flex items-baseline gap-2">
                <span>
                  MiniShop<span className="text-orange-500">.</span>
                </span>
                <span className="hidden sm:inline-block text-xs sm:text-sm font-extrabold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-[5px] uppercase tracking-wider">
                  Dashboard
                </span>
              </span>
            </Link>

            {/* Desktop Navbar */}
            <Navbar />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop Search Bar */}
            <form
              className="hidden lg:flex items-center relative w-72 lg:w-80 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px] px-3.5 py-2.5 text-base text-[#1e293b] focus-within:border-orange-500 focus-within:bg-white transition"
              role="search"
              onSubmit={handleSearch}
            >
              <Search size={18} className="text-gray-400 mr-2.5 shrink-0" />
              <input
                type="search"
                aria-label="ค้นหาสินค้า"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-sm sm:text-base text-[#1e293b] placeholder-gray-400 font-medium"
              />
              <button
                type="submit"
                className="text-gray-400 hover:text-orange-600 transition shrink-0 cursor-pointer p-0.5"
                aria-label="ค้นหา"
              >
                <ArrowUpRight size={18} />
              </button>
            </form>

            {/* Actions: Dashboard, Cart, Profile, Mobile Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => actionClass(isActive)}
                aria-label="Dashboard"
                title="Dashboard"
              >
                <LayoutDashboard size={21} />
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative ${actionClass(isActive)}`
                }
                aria-label={`ตะกร้าสินค้า ${cartCount} ชิ้น`}
              >
                <ShoppingCart size={21} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center shadow-none">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) => actionClass(isActive)}
                aria-label="โปรไฟล์"
              >
                <UserRound size={21} />
              </NavLink>

              <button
                type="button"
                className="md:hidden w-11 h-11 rounded-[8px] flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition cursor-pointer"
                aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[#e9e9e5] px-5 py-5 flex flex-col gap-4">
            <Navbar onNavigate={() => setMenuOpen(false)} isMobile />
            <form
              className="flex items-center gap-2 pt-3 border-t border-[#e9e9e5]"
              role="search"
              onSubmit={handleSearch}
            >
              <input
                aria-label="ค้นหาสินค้าบนมือถือ"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px] px-4 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-[8px] inline-flex items-center gap-2 transition cursor-pointer"
              >
                <Search size={17} />
                ค้นหา
              </button>
            </form>
          </div>
        )}
      </header>
    </>
  );
}
