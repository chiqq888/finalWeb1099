import { Package, ShoppingBag, DollarSign, Users } from 'lucide-react';

export default function StatCards({ products, orders }) {
  // คำนวณภาพรวมของร้านค้า: total product, total orders, total revenue, total user
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalUsers = new Set(orders.map((o) => o.customer)).size || 1;

  const stats = [
    {
      label: 'Total product',
      value: totalProducts,
      note: `${new Set(products.map((p) => p.category)).size} categories`,
      icon: Package,
    },
    {
      label: 'Total orders',
      value: totalOrders,
      note: `${orders.filter((o) => o.status === 'Processing' || o.status === 'Pending').length} awaiting fulfillment`,
      icon: ShoppingBag,
    },
    {
      label: 'Total revenue',
      value: `฿${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`,
      note: 'คำนวณจากคำสั่งซื้อจริง',
      icon: DollarSign,
    },
    {
      label: 'Total user',
      value: totalUsers,
      note: 'Customers in store',
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {stats.map(({ label, value, note, icon: Icon }) => (
        <article
          className="border border-[#e9e9e5] rounded-[8px] p-5 bg-white flex flex-col justify-between gap-3 shadow-none hover:border-orange-300 transition"
          key={label}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-bold text-gray-600">{label}</span>
            <span className="p-3 bg-orange-50 text-orange-600 rounded-[8px]">
              <Icon size={22} />
            </span>
          </div>
          <strong className="text-3xl sm:text-4xl font-black text-[#1e293b]">
            {value}
          </strong>
          <small className="text-xs sm:text-sm text-gray-500 font-medium">{note}</small>
        </article>
      ))}
    </div>
  );
}
