import { useState } from 'react';
import {
  ChevronRight,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import ProductImage from '../../components/ProductImage';
import CatalogState from '../../components/CatalogState';
import QuantityControl from '../../components/QuantityControl';
import { categoryLabel, formatPrice } from '../../utils/storage';

export default function ProductDetailPage({
  product: directProduct,
  products = [],
  loading,
  error,
  onRetry,
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('Description');
  const [zoomed, setZoomed] = useState(false);

  const product =
    directProduct ||
    products.find((p) => String(p.id) === String(id)) ||
    null;

  const recommendations = products
    .filter((p) => p.id !== product?.id)
    .sort(
      (a, b) =>
        Number(b.category === product?.category) -
        Number(a.category === product?.category)
    )
    .slice(0, 4);

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Breadcrumbs */}
      <nav
        className="flex items-center gap-2.5 text-sm font-semibold text-gray-500"
        aria-label="Breadcrumb"
      >
        <Link
          to="/"
          className="hover:text-orange-600 transition"
        >
          Home
        </Link>
        <ChevronRight size={15} className="text-gray-400" />
        <Link
          to="/products"
          className="hover:text-orange-600 transition"
        >
          Products
        </Link>
        <ChevronRight size={15} className="text-gray-400" />
        <span className="text-[#1e293b] font-bold">
          {product ? categoryLabel(product.category) : 'Product detail'}
        </span>
      </nav>

      <CatalogState loading={loading} error={error} onRetry={onRetry}>
        {product ? (
          <>
            {/* Main Product Layout */}
            <section className="bg-white border border-[#e9e9e5] rounded-[10px] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 shadow-none">
              {/* Gallery */}
              <div className="flex flex-col-reverse sm:flex-row gap-5 items-center sm:items-start justify-center">
                <div className="flex sm:flex-col gap-3">
                  <button
                    type="button"
                    className="w-20 h-20 rounded-[8px] border-2 border-orange-500 p-1.5 flex items-center justify-center bg-white cursor-pointer"
                    aria-label="รูปสินค้าหลัก"
                    onClick={() => setZoomed(false)}
                  >
                    <ProductImage
                      product={product}
                      eager
                      className="max-h-full max-w-full object-contain"
                    />
                  </button>
                </div>

                <div
                  className="flex-1 w-full bg-[#f8fafc] border border-[#e9e9e5] rounded-[10px] aspect-square flex items-center justify-center p-8 relative cursor-pointer group"
                  onClick={() => setZoomed(!zoomed)}
                >
                  <ProductImage
                    product={product}
                    eager
                    className={`max-h-full max-w-full object-contain transition duration-200 ${
                      zoomed ? 'scale-125' : 'group-hover:scale-105'
                    }`}
                  />
                  <span className="absolute bottom-4 right-4 text-xs font-semibold text-gray-500 bg-white/90 px-2.5 py-1.5 rounded-[6px] border border-[#e9e9e5] shadow-xs">
                    {zoomed ? 'Click to zoom out' : 'Click to zoom'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-orange-600 uppercase tracking-wider">
                    {categoryLabel(product.category)}
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-black text-[#1e293b] mt-1.5 leading-snug">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-2 mt-3.5 text-sm text-amber-500">
                    <span className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          size={16}
                          fill={n <= Math.round(product.rating) ? 'currentColor' : 'none'}
                        />
                      ))}
                    </span>
                    <strong className="text-gray-800 font-bold ml-1.5 text-base">
                      {product.rating.toFixed(1)}
                    </strong>
                    <span className="text-gray-500 text-sm">
                      ({product.reviewsCount} ratings)
                    </span>
                  </div>

                  <div className="mt-5 text-3xl sm:text-4xl font-black text-[#1e293b] flex items-baseline gap-2">
                    {formatPrice(product.price)}
                    <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase">
                      USD
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-600">สถานะสต็อก:</span>
                    {Number(product.stock) > 0 ? (
                      <span className="px-2.5 py-0.5 rounded-[4px] text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        In Stock ({product.stock} ชิ้น)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-[4px] text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <p className="text-base text-gray-600 leading-relaxed mt-5">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-col gap-5 pt-6 border-t border-[#e9e9e5]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-700">Quantity</span>
                    <QuantityControl value={quantity} onChange={setQuantity} />
                  </div>

                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <button
                      type="button"
                      className="flex-1 py-3.5 px-6 bg-orange-500 hover:bg-orange-600 text-white text-base font-bold rounded-[8px] inline-flex items-center justify-center gap-2 transition cursor-pointer shadow-none"
                      onClick={() => onAddToCart && onAddToCart(product, quantity)}
                    >
                      <ShoppingBag size={20} />
                      <span>Add to cart</span>
                    </button>
                    <button
                      type="button"
                      className="py-3.5 px-6 bg-white border border-[#e9e9e5] hover:bg-gray-50 text-gray-800 text-base font-bold rounded-[8px] inline-flex items-center justify-center gap-2 transition cursor-pointer"
                      onClick={() => {
                        if (onAddToCart) onAddToCart(product, quantity);
                        navigate('/cart');
                      }}
                    >
                      <span>Buy now</span>
                      <ChevronRight size={18} />
                    </button>
                    <button
                      type="button"
                      className={`w-13 h-13 rounded-[8px] border border-[#e9e9e5] flex items-center justify-center transition cursor-pointer ${
                        wishlist.includes(product.id)
                          ? 'bg-red-50 text-red-500 border-red-200'
                          : 'text-gray-400 hover:text-red-500 bg-white'
                      }`}
                      aria-label="บันทึกในรายการโปรด"
                      aria-pressed={wishlist.includes(product.id)}
                      onClick={() => onToggleWishlist && onToggleWishlist(product.id)}
                    >
                      <Heart
                        size={20}
                        fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-8 pt-4 text-sm font-medium text-gray-600">
                    <span className="inline-flex items-center gap-2">
                      <Truck size={18} className="text-orange-600" /> Free delivery
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheck size={18} className="text-orange-600" /> Secure checkout
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Tabs */}
            <section className="bg-white border border-[#e9e9e5] rounded-[10px] p-6 sm:p-8 shadow-none flex flex-col gap-5">
              <div
                className="flex items-center gap-6 border-b border-[#e9e9e5] pb-2 text-base font-bold"
                role="tablist"
              >
                {['Description', 'Specifications', 'Reviews'].map((name) => (
                  <button
                    key={name}
                    role="tab"
                    id={`tab-${name}`}
                    aria-controls={`panel-${name}`}
                    aria-selected={tab === name}
                    type="button"
                    className={`pb-3 border-b-2 font-bold transition cursor-pointer ${
                      tab === name
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}
                    onClick={() => setTab(name)}
                  >
                    {name}
                    {name === 'Reviews' && (
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                        {product.reviewsCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div
                id={`panel-${tab}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab}`}
                className="py-2"
              >
                {tab === 'Description' ? (
                  <div className="space-y-3 text-base text-gray-600 leading-relaxed font-medium">
                    <h3 className="font-extrabold text-[#1e293b] text-lg">A closer look</h3>
                    <p>{product.description}</p>
                  </div>
                ) : tab === 'Specifications' ? (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px]">
                      <dt className="text-gray-500 font-bold">Product ID</dt>
                      <dd className="font-mono font-extrabold text-gray-900 mt-1">
                        MS-{String(product.id).padStart(4, '0')}
                      </dd>
                    </div>
                    <div className="p-4 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px]">
                      <dt className="text-gray-500 font-bold">Category</dt>
                      <dd className="font-bold text-gray-900 mt-1">
                        {categoryLabel(product.category)}
                      </dd>
                    </div>
                    <div className="p-4 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px]">
                      <dt className="text-gray-500 font-bold">Price</dt>
                      <dd className="font-extrabold text-gray-900 mt-1">
                        {formatPrice(product.price)} USD
                      </dd>
                    </div>
                    <div className="p-4 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px]">
                      <dt className="text-gray-500 font-bold">Stock</dt>
                      <dd className="font-bold text-gray-900 mt-1">
                        {product.stock} ชิ้น
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <div className="flex items-center gap-6 p-5 bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px]">
                    <div className="text-4xl font-black text-[#1e293b]">
                      {product.rating.toFixed(1)}
                      <span className="text-sm font-normal text-gray-400"> / 5</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1 font-medium">
                      <div className="flex items-center gap-1.5 text-amber-500">
                        <Star size={18} fill="currentColor" />
                        <strong className="text-gray-900 font-bold">
                          {product.reviewsCount} ratings
                        </strong>
                      </div>
                      <p className="text-gray-500">
                        คะแนนรวมจาก Fake Store API
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <section className="flex flex-col gap-6">
                <div className="pb-2 border-b border-[#e9e9e5]">
                  <span className="text-xs sm:text-sm font-bold tracking-wider text-orange-600 uppercase">
                    KEEP EXPLORING
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
                      onAddToCart={onAddToCart}
                      onViewProduct={(rec) => navigate(`/products/${rec.id}`)}
                      wishlist={wishlist}
                      onToggleWishlist={onToggleWishlist}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="bg-white border border-[#e9e9e5] rounded-[10px] p-10 text-center flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold text-[#1e293b]">ไม่พบสินค้านี้</h2>
            <p className="text-sm text-gray-600">สินค้านี้อาจถูกนำออกจากร้านแล้ว</p>
            <button
              type="button"
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-[6px] transition shadow-none cursor-pointer"
              onClick={() => navigate('/products')}
            >
              <ArrowLeft size={16} />
              <span>กลับไปเลือกสินค้า</span>
            </button>
          </div>
        )}
      </CatalogState>
    </div>
  );
}
