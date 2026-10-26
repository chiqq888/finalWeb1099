import { useState } from 'react';
import { CalendarDays, Sparkles } from 'lucide-react';
import StatCards from './components/StatCards';
import SalesChart from './components/SalesChart';
import RecentOrdersTable from './components/RecentOrdersTable';
import ProductManagementTable from './components/ProductManagementTable';
import InventorySummary from './components/InventorySummary';
import { mockProducts } from '../../data/mockData';

export default function DashboardPage({
  products = mockProducts,
  onAddProduct,
  onDeleteProduct,
  loading = false,
  error = null,
  onFetchApi,
  onResetMock,
  orders = [],
}) {
  const [date] = useState(() =>
    new Intl.DateTimeFormat('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Bangkok',
    }).format(new Date())
  );

  // Top products (สินค้าขายดี / มูลค่าสต็อกสูงสุด)
  const topProducts = [...products]
    .sort((a, b) => Number(b.price) * Number(b.stock) - Number(a.price) * Number(a.stock))
    .slice(0, 4);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Header ส่วนหัว Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <span className="text-sm font-bold tracking-wider text-orange-600 uppercase flex items-center gap-1.5">
            <Sparkles size={16} className="text-orange-500" />
            MINISHOP DASHBOARD
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1e293b] mt-1">
            MiniShop Dashboard & Inventory<span className="text-orange-500">.</span>
          </h1>
          <p className="text-base text-gray-600 mt-1 font-medium">
            สถิติสินค้า ยอดขาย และระบบจัดการสินค้าคงคลัง Real-time
          </p>
        </div>
        <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-[#e9e9e5] rounded-[8px] self-start sm:self-auto shadow-none">
          <CalendarDays size={18} className="text-orange-500" />
          <span>{date}</span>
        </span>
      </div>

      {/* 1. ด้านบน Dashboard ต้องมีข้อมูลสรุป 3 ค่า ที่คำนวณจากสินค้าจริง */}
      <InventorySummary products={products} />

      {/* 2. แสดงภาพรวมของร้านค้า: กล่องแสดง total product, total orders, total revenue, total user */}
      <StatCards products={products} orders={orders} />

      {/* 3. กราฟ sales overview และ recent orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* กราฟ sales overview */}
        <SalesChart orders={orders} />

        {/* recent orders */}
        <RecentOrdersTable orders={orders.slice(0, 5)} />
      </div>

      {/* 4. Top product (สินค้าในคลัง) */}
      <section className="bg-white border border-[#e9e9e5] rounded-[10px] p-6 shadow-none flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-[#1e293b]">
            Top product (สินค้าในคลัง)
          </h2>
          <span className="text-xs sm:text-sm font-semibold text-gray-500">{topProducts.length} รายการเด่น</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topProducts.map((p) => {
            const inStock = Number(p.stock) > 0;
            return (
              <div
                key={p.id}
                className="border border-[#e9e9e5] rounded-[8px] p-4 bg-white flex flex-col justify-between gap-2 shadow-none hover:border-orange-300 transition"
              >
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>
                    #{p.id} · {p.category}
                  </span>
                  <span
                    className={`rounded-[4px] px-2 py-0.5 text-xs font-bold ${
                      inStock
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-orange-50 text-orange-700 border border-orange-200'
                    }`}
                  >
                    {inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <strong className="text-sm font-bold text-[#1e293b] line-clamp-1">
                  {p.name}
                </strong>
                <small className="text-xs text-gray-600 font-semibold">
                  ฿{Number(p.price).toLocaleString()} · สต็อก {p.stock} ชิ้น
                </small>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ค้นหา กรอง เพิ่มสินค้า และตารางข้อมูลสินค้า (พร้อมลบสินค้า และ Realtime update) */}
      <ProductManagementTable
        products={products}
        onAddProduct={onAddProduct}
        onDeleteProduct={onDeleteProduct}
        onResetMock={onResetMock}
        onFetchApi={onFetchApi}
        loading={loading}
        error={error}
      />
    </div>
  );
}
