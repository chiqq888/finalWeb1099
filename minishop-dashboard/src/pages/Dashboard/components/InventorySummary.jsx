import { Boxes, CircleDollarSign, AlertOctagon } from 'lucide-react';

export default function InventorySummary({ products }) {
  // คำนวณจากสินค้าจริงในระบบ
  // 1. จำนวนรายการสินค้าทั้งหมด
  const totalItemsCount = products.length;

  // 2. มูลค่าสินค้าคงเหลือรวม: รวม price × stock
  const totalStockValue = products.reduce(
    (sum, p) => sum + (Number(p.price) || 0) * (Number(p.stock) || 0),
    0
  );

  // 3. จำนวนรายการสินค้าที่หมดสต็อก
  const outOfStockCount = products.filter((p) => Number(p.stock) === 0).length;

  return (
    <section className="bg-white border border-[#e9e9e5] rounded-[10px] p-6 sm:p-7 shadow-none flex flex-col gap-5">
      <div className="flex items-center justify-between pb-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1e293b]">
            สรุปข้อมูลสินค้าคงคลัง (Inventory Summary)
          </h2>
          <span className="text-sm text-gray-500 font-medium">
            คำนวณสดจากรายการสินค้าจริงในระบบ (ข้อมูลสรุป 3 ค่า)
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* ค่าที่ 1: จำนวนรายการสินค้าทั้งหมด */}
        <article className="border border-[#e9e9e5] rounded-[8px] p-5 bg-white flex flex-col justify-between gap-3 shadow-none hover:border-orange-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-bold text-gray-600">
              จำนวนรายการสินค้าทั้งหมด
            </span>
            <span className="p-3 bg-orange-50 text-orange-600 rounded-[8px]">
              <Boxes size={22} />
            </span>
          </div>
          <strong className="text-3xl sm:text-4xl font-black text-[#1e293b]">
            {totalItemsCount} รายการ
          </strong>
          <small className="text-xs sm:text-sm text-gray-500 font-medium">
            ชนิดสินค้าทั้งหมดในคลัง
          </small>
        </article>

        {/* ค่าที่ 2: มูลค่าสินค้าคงเหลือรวม: รวม price × stock */}
        <article className="border border-[#e9e9e5] rounded-[8px] p-5 bg-white flex flex-col justify-between gap-3 shadow-none hover:border-orange-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-bold text-gray-600">
              มูลค่าสินค้าคงเหลือรวม
            </span>
            <span className="p-3 bg-orange-50 text-orange-600 rounded-[8px]">
              <CircleDollarSign size={22} />
            </span>
          </div>
          <strong className="text-3xl sm:text-4xl font-black text-[#1e293b]">
            ฿
            {totalStockValue.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </strong>
          <small className="text-xs sm:text-sm text-gray-500 font-medium">
            คำนวณจาก รวม price × stock
          </small>
        </article>

        {/* ค่าที่ 3: จำนวนรายการสินค้าที่หมดสต็อก */}
        <article className="border border-[#e9e9e5] rounded-[8px] p-5 bg-white flex flex-col justify-between gap-3 shadow-none hover:border-orange-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-bold text-gray-600">
              จำนวนรายการสินค้าที่หมดสต็อก
            </span>
            <span
              className={`p-3 rounded-[8px] ${
                outOfStockCount > 0
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-emerald-50 text-emerald-600'
              }`}
            >
              <AlertOctagon size={22} />
            </span>
          </div>
          <strong
            className={`text-3xl sm:text-4xl font-black ${
              outOfStockCount > 0 ? 'text-orange-600' : 'text-emerald-600'
            }`}
          >
            {outOfStockCount} รายการ
          </strong>
          <small className="text-xs sm:text-sm text-gray-500 font-medium">
            {outOfStockCount > 0 ? 'สินค้าที่มี stock = 0' : 'ไม่มีสินค้าหมดสต็อก'}
          </small>
        </article>
      </div>
    </section>
  );
}
