import { ArrowRight, ClipboardList } from 'lucide-react';
import { formatPrice } from '../../../utils/storage';

export default function RecentOrdersTable({ orders, compact = false, onViewAll }) {
  return (
    <section className="bg-white border border-[#e9e9e5] rounded-[10px] p-6 sm:p-7 shadow-none flex flex-col gap-5">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1e293b]">
          Recent orders
        </h2>
        {onViewAll && (
          <button
            type="button"
            className="text-sm font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1.5 transition cursor-pointer"
            onClick={onViewAll}
          >
            <span>View all</span>
            <ArrowRight size={15} />
          </button>
        )}
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm sm:text-base border-collapse">
          <thead>
            <tr className="border-b border-[#e9e9e5] text-sm font-bold text-gray-700">
              <th className="py-3 px-4">Order #</th>
              <th className="py-3 px-4">{compact ? 'Date' : 'Customer'}</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-[#e9e9e5] hover:bg-[#fbfcfd] transition text-sm sm:text-base"
              >
                <td className="py-3.5 px-4 font-mono font-bold text-[#1e293b]">
                  <span>#{order.id}</span>
                  {order.isSample && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-[4px]">
                      Demo
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-gray-700 font-medium">
                  {compact ? order.date : order.customer}
                </td>
                <td className="py-3.5 px-4 font-extrabold text-[#1e293b]">
                  {formatPrice(order.total)}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`rounded-[6px] px-3 py-1 text-xs sm:text-sm font-bold ${
                      order.status.toLowerCase() === 'delivered'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : order.status.toLowerCase() === 'processing'
                          ? 'bg-orange-50 text-orange-700 border border-orange-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!orders.length && (
          <div className="py-10 text-center flex flex-col items-center justify-center gap-3 text-gray-400">
            <ClipboardList size={36} />
            <p className="text-sm sm:text-base font-medium">ยังไม่มีคำสั่งซื้อ</p>
          </div>
        )}
      </div>
    </section>
  );
}
