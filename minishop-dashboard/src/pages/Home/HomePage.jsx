import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Monitor,
  Gem,
  Shirt,
  ShoppingBag,
  Truck,
  ShieldCheck,
  PackageOpen,
  SlidersHorizontal,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import ProductImage from '../../components/ProductImage';
import CatalogState from '../../components/CatalogState';
import { categoryLabel } from '../../utils/storage';

const categoryIcons = {
  electronics: Monitor,
  jewelery: Gem,
  "men's clothing": Shirt,
  "women's clothing": ShoppingBag,
};

export default function HomePage({
  products = [],
  loading = false,
  error = '',
  onRetry,
  isShop = false,
  searchQuery = '',
  category = 'all',
  setCategory,
  onOpenShop,
  onClearFilters,
  ...cardProps
}) {
  const navigate = useNavigate();
  const [sort, setSort] = useState('featured');
  const categories = [
    ...new Set([
      ...Object.keys(categoryIcons).filter((c) => products.some((p) => p.category === c)),
      ...products.map((p) => p.category),
    ]),
  ];
  const ProductHeading = isShop ? 'h1' : 'h2';

  const handleOpenShop = (cat = 'all') => {
    if (onOpenShop) {
      onOpenShop(cat);
    } else {
      navigate('/products');
    }
  };

  const filtered = products.filter(
    (p) =>
      (category === 'all' || p.category.toLowerCase() === category.toLowerCase()) &&
      `${p.name} ${p.category}`.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const sorted = [...filtered].sort((a, b) =>
    sort === 'price-low'
      ? a.price - b.price
      : sort === 'price-high'
        ? b.price - a.price
        : sort === 'rating'
          ? (b.rating || 0) - (a.rating || 0)
          : 0
  );

  const featured = [1, 3, 6, 15]
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const displayProducts = isShop
    ? sorted
    : featured.length >= 4
      ? featured.slice(0, 4)
      : products.slice(0, 4);

  const heroProducts = [1, 6, 3]
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="w-full flex flex-col gap-12 sm:gap-14">
      {!isShop && (
        <section
          className="bg-gradient-to-br from-orange-50/80 via-white to-amber-50/40 border border-orange-200/80 rounded-[14px] p-8 sm:p-12 lg:p-14 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-none"
          aria-label="Welcome to MiniShop"
        >
          <div className="flex-1 max-w-xl">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase mb-2 inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              THE EVERYDAY COLLECTION
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#1e293b] tracking-tight leading-tight mt-1">
              Little things.
              <br />
              Big possibilities<span className="text-orange-500">.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mt-5 leading-relaxed font-medium">
              ค้นพบสิ่งที่ชอบ ในราคาที่ใช่
              <br />
              เติมสไตล์ให้ทุกวันของคุณกับ MiniShop
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base sm:text-lg rounded-[8px] transition cursor-pointer shadow-none"
              >
                <span>Explore the collection</span>
                <ArrowRight size={20} />
              </Link>
            </div>
            <span className="text-xs text-gray-400 font-bold tracking-wider uppercase mt-8 block">
              GOOD FINDS. GREAT PRICES. ALL YOURS.
            </span>
          </div>

          <div
            className="relative w-full max-w-xs sm:max-w-md aspect-square flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-80 h-80 rounded-full bg-orange-100/70 border border-orange-200/60 flex items-center justify-center p-8 relative">
              {heroProducts[0] && (
                <div className="w-48 h-48 bg-white p-4 rounded-[10px] border border-[#e9e9e5] flex items-center justify-center shadow-none z-10">
                  <ProductImage
                    product={heroProducts[0]}
                    eager
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
              {heroProducts[1] && (
                <div className="absolute -top-3 -right-3 w-32 h-32 bg-white p-3 rounded-[10px] border border-[#e9e9e5] flex items-center justify-center shadow-none">
                  <ProductImage
                    product={heroProducts[1]}
                    eager
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
              {heroProducts[2] && (
                <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-white p-3 rounded-[10px] border border-[#e9e9e5] flex items-center justify-center shadow-none">
                  <ProductImage
                    product={heroProducts[2]}
                    eager
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Catalog Section */}
      <section className="flex flex-col gap-8" aria-labelledby="products-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#e9e9e5]">
          <div>
            <span className="text-sm font-bold tracking-wider text-orange-600 uppercase">
              {isShop ? 'FIND YOUR FAVORITES' : 'HANDPICKED FOR YOU'}
            </span>
            <ProductHeading
              id="products-heading"
              className="text-3xl sm:text-4xl font-black text-[#1e293b] mt-1"
            >
              {isShop ? 'The collection' : 'Featured products'}
              <span className="text-orange-500">.</span>
            </ProductHeading>
            <p className="text-sm sm:text-base text-gray-600 mt-1.5 font-medium">
              {isShop
                ? searchQuery
                  ? `ผลการค้นหาสำหรับ “${searchQuery}”`
                  : 'ของดีที่คุณกำลังมองหา รวมไว้ที่นี่แล้ว'
                : 'A few favorites. A whole lot to love.'}
            </p>
          </div>
          {!isShop && (
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-orange-600 hover:text-orange-700 transition cursor-pointer self-start sm:self-auto"
            >
              <span>View all products</span>
              <ArrowRight size={18} />
            </Link>
          )}
        </div>

        {isShop && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div
              className="flex flex-wrap items-center gap-2"
              aria-label="หมวดหมู่สินค้า"
            >
              <button
                type="button"
                className={`px-4 py-2 rounded-[6px] text-sm font-bold border transition cursor-pointer ${
                  category === 'all'
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'bg-white border-[#e9e9e5] text-gray-700 hover:border-orange-400'
                }`}
                onClick={() => setCategory && setCategory('all')}
              >
                All products
              </button>
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`px-4 py-2 rounded-[6px] text-sm font-bold border transition cursor-pointer ${
                    category.toLowerCase() === item.toLowerCase()
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'bg-white border-[#e9e9e5] text-gray-700 hover:border-orange-400'
                  }`}
                  onClick={() => setCategory && setCategory(item)}
                >
                  {categoryLabel(item)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5 self-end md:self-auto">
              <SlidersHorizontal size={17} className="text-gray-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="เรียงสินค้า"
                className="bg-white border border-[#e9e9e5] rounded-[6px] px-3.5 py-2 text-sm font-bold text-[#1e293b] focus:border-orange-500 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>
        )}

        <CatalogState loading={loading} error={error} onRetry={onRetry}>
          {isShop && (
            <p className="text-sm font-bold text-gray-500">{displayProducts.length} products</p>
          )}
          {displayProducts.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewProduct={(p) => navigate(`/products/${p.id}`)}
                  {...cardProps}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#e9e9e5] rounded-[10px] p-10 text-center flex flex-col items-center justify-center gap-4">
              <PackageOpen size={48} className="text-gray-400" />
              <h3 className="text-xl font-bold text-[#1e293b]">
                ยังไม่พบสินค้าที่ค้นหา
              </h3>
              <p className="text-sm text-gray-600">
                ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น
              </p>
              <button
                type="button"
                className="mt-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-[6px] transition shadow-none cursor-pointer"
                onClick={onClearFilters}
              >
                ล้างตัวกรอง
              </button>
            </div>
          )}
        </CatalogState>
      </section>

      {!isShop && (
        <>
          {/* Categories Section */}
          <section className="flex flex-col gap-8" id="categories">
            <div className="flex items-end justify-between pb-3 border-b border-[#e9e9e5]">
              <div>
                <span className="text-sm font-bold tracking-wider text-orange-600 uppercase">
                  SOMETHING FOR EVERY SIDE OF YOU
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1e293b] mt-1">
                  Shop by category<span className="text-orange-500">.</span>
                </h2>
              </div>
              <span className="text-sm font-semibold text-gray-500">
                Find your kind of good.
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {(categories.length ? categories : Object.keys(categoryIcons)).map(
                (item) => {
                  const Icon = categoryIcons[item] || ShoppingBag;
                  return (
                    <button
                      type="button"
                      className="bg-white border border-[#e9e9e5] rounded-[10px] p-6 flex items-center justify-between hover:border-orange-400 hover:bg-orange-50/30 transition cursor-pointer text-left shadow-none group"
                      key={item}
                      onClick={() => handleOpenShop(item)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-13 h-13 rounded-[8px] bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition">
                          <Icon size={26} strokeWidth={2} />
                        </span>
                        <div>
                          <strong className="text-base sm:text-lg font-bold text-[#1e293b] block">
                            {categoryLabel(item)}
                          </strong>
                          <span className="text-xs sm:text-sm font-semibold text-gray-500">
                            {products.filter((p) => p.category === item).length || '—'}{' '}
                            products
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-gray-400 group-hover:text-orange-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                      />
                    </button>
                  );
                }
              )}
            </div>
          </section>

          {/* Service Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 border-t border-[#e9e9e5]">
            <div className="flex items-center gap-4 p-5 bg-white border border-[#e9e9e5] rounded-[8px] shadow-none">
              <span className="p-3 bg-orange-50 text-orange-600 rounded-[8px]">
                <Truck size={24} />
              </span>
              <div>
                <strong className="text-sm sm:text-base font-bold text-[#1e293b] block">
                  A little less waiting
                </strong>
                <small className="text-xs sm:text-sm text-gray-500 font-medium">
                  จัดส่งฟรีทุกคำสั่งซื้อในร้านตัวอย่าง
                </small>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white border border-[#e9e9e5] rounded-[8px] shadow-none">
              <span className="p-3 bg-orange-50 text-orange-600 rounded-[8px]">
                <ShieldCheck size={24} />
              </span>
              <div>
                <strong className="text-sm sm:text-base font-bold text-[#1e293b] block">
                  Shop with confidence
                </strong>
                <small className="text-xs sm:text-sm text-gray-500 font-medium">
                  ดูข้อมูลสินค้าและราคาก่อนตัดสินใจ
                </small>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white border border-[#e9e9e5] rounded-[8px] shadow-none">
              <span className="p-3 bg-orange-50 text-orange-600 rounded-[8px]">
                <ShoppingBag size={24} />
              </span>
              <div>
                <strong className="text-sm sm:text-base font-bold text-[#1e293b] block">
                  Made for your everyday
                </strong>
                <small className="text-xs sm:text-sm text-gray-500 font-medium">
                  สินค้าหลากหลาย เลือกง่ายในที่เดียว
                </small>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
