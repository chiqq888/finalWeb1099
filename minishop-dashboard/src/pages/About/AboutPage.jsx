import { ShoppingBag, ArrowUpRight, ShieldCheck, Truck, Sparkles, Layers, Database, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col gap-10 max-w-4xl mx-auto">
      {/* Hero / Header Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-amber-50/40 border border-orange-200/80 rounded-[12px] p-8 sm:p-12 text-center flex flex-col items-center gap-4">
        <span className="w-16 h-16 rounded-[12px] bg-orange-500 text-white flex items-center justify-center shadow-sm">
          <ShoppingBag size={32} />
        </span>
        <span className="text-xs font-bold text-orange-600 tracking-wider uppercase inline-flex items-center gap-1.5 bg-orange-100/70 px-3 py-1 rounded-full">
          <Sparkles size={13} />
          ABOUT MINISHOP DASHBOARD
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1e293b] tracking-tight">
          MiniShop Dashboard<span className="text-orange-500">.</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed font-medium">
          ระบบร้านค้าออนไลน์และแดชบอร์ดจัดการสต็อกสินค้า พัฒนาด้วย React, Vite, Tailwind CSS และเชื่อมต่อ RESTful API
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/products"
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-[6px] transition shadow-none"
          >
            เลือกชมสินค้า (Shop)
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-2.5 bg-white border border-[#e9e9e5] hover:bg-gray-50 text-gray-800 text-sm font-bold rounded-[6px] transition shadow-none"
          >
            ไปที่แดชบอร์ด (Dashboard)
          </Link>
        </div>
      </section>

      {/* Project & Developer Info Card */}
      <section className="bg-white border border-[#e9e9e5] rounded-[10px] p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#e9e9e5]">
          <span className="p-2.5 bg-orange-50 text-orange-600 rounded-[8px]">
            <Code2 size={24} />
          </span>
          <div>
            <h2 className="text-xl font-extrabold text-[#1e293b]">ข้อมูลโครงงานและผู้พัฒนา</h2>
            <p className="text-xs sm:text-sm text-gray-500">Web Programming Final Examination Project</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px] flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">ชื่อโครงการ</span>
            <strong className="text-base font-bold text-[#1e293b]">MiniShop Dashboard & E-Commerce Web Application</strong>
          </div>
          <div className="p-4 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px] flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">วิชา</span>
            <strong className="text-base font-bold text-[#1e293b]">05506071 Web Programming</strong>
          </div>
          <div className="p-4 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px] flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">ผู้จัดทำ</span>
            <strong className="text-base font-bold text-[#1e293b]">นาย รัชตพงศ์ อรรถีโภค (67051099)</strong>
          </div>
          <div className="p-4 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px] flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">เทคโนโลยีที่ใช้</span>
            <strong className="text-base font-bold text-[#1e293b]">React 19, Vite, Tailwind CSS, React Router</strong>
          </div>
        </div>
      </section>

      {/* API & Architecture Info */}
      <section className="bg-white border border-[#e9e9e5] rounded-[10px] p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#e9e9e5]">
          <span className="p-2.5 bg-orange-50 text-orange-600 rounded-[8px]">
            <Database size={24} />
          </span>
          <div>
            <h2 className="text-xl font-extrabold text-[#1e293b]">แหล่งข้อมูล REST API</h2>
            <p className="text-xs sm:text-sm text-gray-500">Fake Store API Integration & Mock Data Fallback</p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            โปรเจกต์นี้เชื่อมต่อกับ <strong>Fake Store API</strong> เพื่อดึงรายการสินค้าจริงมาแสดงผล
            โดยมีการแปลงโครงสร้างข้อมูล <code>title &rarr; name</code>, อ่านคะแนนรีวิวจาก <code>rating.rate</code>,
            และสร้างสต็อกจำลอง (Simulated Stock) เพื่อนำมาคำนวณมูลค่าสินค้าคงคลังในหน้า Admin Dashboard
          </p>
          <p>
            หากการเชื่อมต่อ API ขัดข้อง ระบบมีกลไก <strong>Fallback สลับไปใช้ Mock Data (5 รายการ)</strong> สำรองโดยอัตโนมัติ
            เพื่อให้ระบบสามารถทำงานได้ต่อเนื่องตามข้อกำหนด
          </p>
        </div>

        <div className="pt-2">
          <a
            href="https://fakestoreapi.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition"
          >
            <span>เยี่ยมชมเว็บไซต์ Fake Store API</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-[#e9e9e5] rounded-[8px] flex flex-col gap-2">
          <span className="w-10 h-10 rounded-[6px] bg-orange-50 text-orange-600 flex items-center justify-center">
            <Layers size={20} />
          </span>
          <strong className="text-base font-bold text-[#1e293b]">5 หน้าการทำงานหลัก</strong>
          <p className="text-xs sm:text-sm text-gray-500">
            Home, Product Detail, Shopping Cart, Profile และ Admin Dashboard รองรับ React Router v7
          </p>
        </div>
        <div className="p-5 bg-white border border-[#e9e9e5] rounded-[8px] flex flex-col gap-2">
          <span className="w-10 h-10 rounded-[6px] bg-orange-50 text-orange-600 flex items-center justify-center">
            <ShieldCheck size={20} />
          </span>
          <strong className="text-base font-bold text-[#1e293b]">Realtime Inventory</strong>
          <p className="text-xs sm:text-sm text-gray-500">
            ระบบค้นหา กรอง เพิ่มสินค้า ตรวจสอบความถูกต้อง และลบสินค้า พร้อมสรุป 3 ค่าทันที
          </p>
        </div>
        <div className="p-5 bg-white border border-[#e9e9e5] rounded-[8px] flex flex-col gap-2">
          <span className="w-10 h-10 rounded-[6px] bg-orange-50 text-orange-600 flex items-center justify-center">
            <Truck size={20} />
          </span>
          <strong className="text-base font-bold text-[#1e293b]">Responsive Design</strong>
          <p className="text-xs sm:text-sm text-gray-500">
            ออกแบบให้ใช้งานได้สมบูรณ์ทั้งบนมือถือ แท็บเล็ต และคอมพิวเตอร์ ด้วย Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
