import { Minus, Plus } from 'lucide-react';

export default function QuantityControl({ value, onChange, label = 'จำนวนสินค้า' }) {
  return (
    <div
      className="inline-flex items-center border border-[#e9e9e5] rounded-[6px] bg-white overflow-hidden shadow-none"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-orange-50 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
        aria-label={`ลด${label}`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={15} />
      </button>
      <span
        className="w-11 text-center text-sm sm:text-base font-bold text-gray-800 select-none"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition cursor-pointer"
        aria-label={`เพิ่ม${label}`}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
