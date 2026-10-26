import { useState } from 'react';
import { formatPrice } from '../../../utils/storage';

export default function SalesChart({ orders }) {
  const [period, setPeriod] = useState(7);
  const [today] = useState(
    () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }))
  );
  const days = Array.from({ length: period }, (_, i) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - period + i + 1
    );
    const amount = orders
      .filter((o) => new Date(o.date).toDateString() === date.toDateString())
      .reduce((sum, o) => sum + o.total, 0);
    return {
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      full: date.toLocaleDateString('en-GB'),
      amount,
    };
  });
  const max = Math.max(100, ...days.map((d) => d.amount)) * 1.2;
  const points = days.map(
    (d, i) => `${48 + (i * 450) / (period - 1)},${180 - (d.amount / max) * 150}`
  );

  return (
    <section className="bg-white border border-[#e9e9e5] rounded-[10px] p-6 sm:p-7 shadow-none flex flex-col gap-5">
      <div className="flex items-center justify-between pb-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1e293b]">
            Sales overview
          </h2>
          <span className="text-sm text-gray-500 font-medium">Order totals · USD</span>
        </div>
        <select
          aria-label="ช่วงเวลายอดขาย"
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value))}
          className="bg-white border border-[#e9e9e5] rounded-[6px] px-3.5 py-2 text-sm font-semibold text-[#1e293b] outline-none focus:border-orange-500 cursor-pointer shadow-none"
        >
          <option value={7}>Last 7 days</option>
          <option value={14}>Last 14 days</option>
        </select>
      </div>
      <div className="w-full overflow-x-auto">
        <svg
          className="w-full min-w-[500px] h-[240px]"
          viewBox="0 0 530 225"
          role="img"
          aria-label={`กราฟยอดขาย ${period} วัน รวม ${formatPrice(days.reduce((sum, d) => sum + d.amount, 0))}`}
        >
          {[0, 1, 2, 3].map((n) => (
            <g key={n}>
              <line
                x1="48"
                x2="498"
                y1={30 + n * 50}
                y2={30 + n * 50}
                stroke="#e9e9e5"
                strokeDasharray="3 4"
              />
              <text
                x="35"
                y={34 + n * 50}
                textAnchor="end"
                fontSize="12"
                fill="#94a3b8"
                fontWeight="600"
              >
                {Math.round((max * (3 - n)) / 3)}
              </text>
            </g>
          ))}
          <polygon
            points={`48,180 ${points.join(' ')} 498,180`}
            fill="#ffedd5"
            opacity="0.8"
          />
          <polyline
            points={points.join(' ')}
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {days.map((d, i) => (
            <g key={d.full}>
              <circle
                cx={48 + (i * 450) / (period - 1)}
                cy={180 - (d.amount / max) * 150}
                r="4.5"
                fill="#ea580c"
                tabIndex={0}
                className="cursor-pointer"
              >
                <title>
                  {d.full}: {formatPrice(d.amount)}
                </title>
              </circle>
              {(period === 7 || i % 2 === 0) && (
                <text
                  x={48 + (i * 450) / (period - 1)}
                  y="207"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#64748b"
                  fontWeight="600"
                >
                  {d.label}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
