import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Trash2,
  ShoppingBag,
  LockKeyhole,
  Check,
  PackageCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import ProductImage from '../../components/ProductImage';
import QuantityControl from '../../components/QuantityControl';
import Modal from '../../components/Modal';
import { categoryLabel, formatPrice } from '../../utils/storage';

export default function ShoppingCartPage({
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  products = [],
  ...cardProps
}) {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
  const recommendations = products
    .filter((p) => !cartItems.some((item) => item.id === p.id))
    .slice(0, 4);

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Heading */}
      <div className="pb-3 border-b border-[#e9e9e5]">
        <span className="text-sm font-bold tracking-wider text-orange-600 uppercase">
          YOUR GOOD FINDS
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1e293b] mt-1">
          Shopping cart<span className="text-orange-500">.</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1.5 font-medium">
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items, a little closer
          to being yours.
        </p>
      </div>

      {success && !cartItems.length ? (
        <div className="bg-white border border-[#e9e9e5] rounded-[10px] p-10 text-center flex flex-col items-center justify-center gap-4 shadow-none">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full">
            <PackageCheck size={48} />
          </div>
          <h2 className="text-2xl font-bold text-[#1e293b]">สั่งซื้อสำเร็จแล้ว!</h2>
          <p className="text-base text-gray-600 max-w-md">
            บันทึกคำสั่งซื้อจำลองแล้ว สามารถดูรายการได้ในหน้าโปรไฟล์
          </p>
          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base font-bold rounded-[6px] inline-flex items-center gap-2 transition cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <span>ดูคำสั่งซื้อ</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-white border border-[#e9e9e5] hover:bg-gray-50 text-gray-700 text-sm sm:text-base font-bold rounded-[6px] transition cursor-pointer"
              onClick={() => navigate('/products')}
            >
              เลือกซื้อสินค้าต่อ
            </button>
          </div>
        </div>
      ) : cartItems.length ? (
        <>
          {/* Cart Table */}
          <div className="bg-white border border-[#e9e9e5] rounded-[10px] p-5 sm:p-7 shadow-none overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-[#e9e9e5] text-sm font-bold text-gray-700">
                  <th className="py-3 px-3">Product</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Quantity</th>
                  <th className="py-3 px-3">Total</th>
                  <th className="py-3 px-3 text-right">
                    <span className="sr-only">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e9e9e5] hover:bg-[#fbfcfd] transition text-sm sm:text-base"
                  >
                    <td className="py-4 px-3">
                      <button
                        type="button"
                        className="flex items-center gap-3.5 text-left hover:text-orange-600 transition cursor-pointer"
                        onClick={() => navigate(`/products/${item.id}`)}
                      >
                        <span className="w-14 h-14 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px] p-1.5 flex items-center justify-center shrink-0">
                          <ProductImage
                            product={item}
                            className="max-h-full max-w-full object-contain"
                          />
                        </span>
                        <div>
                          <strong className="text-[#1e293b] font-bold block line-clamp-1 text-base">
                            {item.name}
                          </strong>
                          <small className="text-gray-500 font-medium text-xs sm:text-sm">
                            {categoryLabel(item.category)}
                          </small>
                        </div>
                      </button>
                    </td>
                    <td className="py-4 px-3 text-gray-700 font-bold">
                      {formatPrice(item.price)}
                    </td>
                    <td className="py-4 px-3">
                      <QuantityControl
                        value={item.quantity}
                        label={`จำนวน ${item.name}`}
                        onChange={(qty) => onUpdateQuantity && onUpdateQuantity(item.id, qty)}
                      />
                    </td>
                    <td className="py-4 px-3 text-[#1e293b] font-extrabold text-base sm:text-lg">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                    <td className="py-4 px-3 text-right">
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-[6px] transition cursor-pointer"
                        aria-label={`ลบ ${item.name}`}
                        onClick={() => onRemoveItem && onRemoveItem(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lower Section: Continue Shopping + Order Summary */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-[#e9e9e5] hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-bold rounded-[6px] transition cursor-pointer"
              onClick={() => navigate('/products')}
            >
              <ArrowLeft size={16} />
              <span>Continue shopping</span>
            </button>

            <aside className="w-full md:w-88 bg-white border border-[#e9e9e5] rounded-[10px] p-6 sm:p-7 flex flex-col gap-5 shadow-none">
              <h2 className="text-xl font-bold text-[#1e293b]">Order summary</h2>
              <dl className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between text-gray-600 font-medium">
                  <dt>Subtotal</dt>
                  <dd className="font-bold text-gray-900">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <dt>Shipping</dt>
                  <dd className="font-bold text-emerald-600">Free</dd>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-[#e9e9e5] text-lg font-black text-[#1e293b]">
                  <dt>
                    Total <span className="text-xs text-gray-400 font-normal">(USD)</span>
                  </dt>
                  <dd className="text-2xl text-orange-600 font-black">{formatPrice(subtotal)}</dd>
                </div>
              </dl>

              <button
                type="button"
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white text-base font-bold rounded-[8px] inline-flex items-center justify-center gap-2 transition cursor-pointer shadow-none"
                onClick={() => setCheckoutOpen(true)}
              >
                <span>Proceed to checkout</span>
                <ArrowRight size={18} />
              </button>

              <span className="inline-flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                <LockKeyhole size={14} className="text-emerald-600" />
                Demo checkout · ไม่มีการเรียกเก็บเงิน
              </span>
            </aside>
          </div>
        </>
      ) : (
        <div className="bg-white border border-[#e9e9e5] rounded-[10px] p-12 text-center flex flex-col items-center justify-center gap-4 shadow-none">
          <div className="p-5 bg-orange-50 text-orange-600 rounded-full">
            <ShoppingBag size={48} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e293b]">
            Your next favorite is waiting.
          </h2>
          <p className="text-base text-gray-600 max-w-md font-medium">
            ตะกร้าของคุณยังว่างอยู่ ลองเลือกสินค้าที่ชอบกันเลย
          </p>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2.5 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-base font-bold rounded-[6px] transition cursor-pointer shadow-none"
            onClick={() => navigate('/products')}
          >
            <span>Explore the collection</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section className="flex flex-col gap-6 mt-4">
          <div className="pb-3 border-b border-[#e9e9e5]">
            <span className="text-sm font-bold tracking-wider text-orange-600 uppercase">
              ONE MORE GOOD FIND?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e293b] mt-1">
              You might also like<span className="text-orange-500">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onViewProduct={(rec) => navigate(`/products/${rec.id}`)}
                {...cardProps}
              />
            ))}
          </div>
        </section>
      )}

      {/* Checkout Modal */}
      {checkoutOpen && (
        <Modal title="Confirm your good finds." onClose={() => setCheckoutOpen(false)}>
          <div className="flex flex-col items-center gap-2 p-5 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px] text-center">
            <ShoppingBag size={32} className="text-orange-600" />
            <p className="text-sm text-gray-600 font-medium">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
            </p>
            <strong className="text-3xl font-black text-gray-900">
              {formatPrice(subtotal)}
            </strong>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed text-center font-medium">
            นี่คือคำสั่งซื้อจำลอง ระบบจะบันทึกประวัติไว้ในเครื่องของคุณ
            โดยไม่มีการเรียกเก็บเงินจริง
          </p>
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              className="px-5 py-2.5 bg-white border border-[#e9e9e5] hover:bg-gray-50 text-gray-800 text-sm font-bold rounded-[6px] transition cursor-pointer"
              onClick={() => setCheckoutOpen(false)}
            >
              กลับไปตะกร้า
            </button>
            <button
              type="button"
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-[6px] inline-flex items-center gap-2 transition cursor-pointer shadow-none"
              onClick={() => {
                if (onCheckout) onCheckout();
                setCheckoutOpen(false);
                setSuccess(true);
              }}
            >
              <Check size={16} />
              <span>ยืนยันคำสั่งซื้อ</span>
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
