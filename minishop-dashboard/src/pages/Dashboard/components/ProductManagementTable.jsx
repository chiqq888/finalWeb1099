import { useState } from 'react';
import {
  Plus,
  Search,
  Trash2,
  AlertCircle,
  CheckCircle2,
  LayoutList,
  LayoutGrid,
  RotateCcw,
  RefreshCw,
  Boxes,
} from 'lucide-react';

export default function ProductManagementTable({
  products,
  onAddProduct,
  onDeleteProduct,
  onResetMock,
  onFetchApi,
  loading,
  error,
}) {
  // 1. ค้นหาชื่อสินค้า: ใช้ useState รับข้อความ และ filter() กรอง โดยไม่สนตัวพิมพ์เล็ก–ใหญ่
  const [searchTerm, setSearchTerm] = useState('');

  // 2. กรองหมวดหมู่: มี Dropdown อย่างน้อย All Categories, Accessories, Display, Camera และต้องใช้ร่วมกับการค้นหาได้
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // สลับการแสดงผลแบบ Table หรือ Card ตามโจทย์ "ใช้ map() แสดงเป็น Card หรือ Table"
  const [viewMode, setViewMode] = useState('table');

  // 3. ฟอร์มเพิ่มสินค้า: มีฟอร์ม Product Name, Category, Price, Stock และปุ่ม Add Product
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Accessories');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  // State สำหรับ Error message ในการตรวจความถูกต้อง
  const [validationErrors, setValidationErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  // Dropdown หมวดหมู่สินค้า: ต้องมีอย่างน้อย All Categories, Accessories, Display, Camera
  const baseCategories = ['Accessories', 'Display', 'Camera'];
  const allCategories = [
    'All Categories',
    ...new Set([...baseCategories, ...products.map((p) => p.category)]),
  ];

  // ค้นหาและกรองร่วมกัน
  const filteredProducts = products.filter((item) => {
    // กรองชื่อสินค้าโดยไม่สนตัวพิมพ์เล็ก-ใหญ่
    const matchesSearch = (item.name || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    // กรองหมวดหมู่
    const matchesCategory =
      selectedCategory === 'All Categories' ||
      (item.category || '').toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // 4. ตรวจชื่อไม่ว่าง ราคาและสต็อกถูกต้อง เมื่อเพิ่มสำเร็จให้รายการอัปเดตทันทีโดยไม่โหลดหน้าใหม่
  const handleFormSubmit = (e) => {
    e.preventDefault(); // ป้องกันการโหลดหน้าใหม่

    const errors = {};

    // ตรวจชื่อไม่ว่าง
    if (!productName.trim()) {
      errors.name = 'กรุณาระบุชื่อสินค้า (ห้ามเว้นว่าง)';
    }

    // ตรวจราคาถูกต้อง (ต้องเป็นตัวเลข และ >= 0)
    const parsedPrice = Number(price);
    if (price === '' || isNaN(parsedPrice) || parsedPrice < 0) {
      errors.price = 'กรุณาระบุราคาที่ถูกต้อง (ตัวเลข >= 0)';
    }

    // ตรวจสต็อกถูกต้อง (ต้องเป็นตัวเลขจำนวนเต็ม และ >= 0)
    const parsedStock = Number(stock);
    if (
      stock === '' ||
      isNaN(parsedStock) ||
      parsedStock < 0 ||
      !Number.isInteger(parsedStock)
    ) {
      errors.stock = 'กรุณาระบุจำนวนสต็อกที่ถูกต้อง (จำนวนเต็ม >= 0)';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // เมื่อเพิ่มสำเร็จให้รายการอัปเดตทันทีโดยไม่โหลดหน้าใหม่
    const newProductItem = {
      id:
        products.length > 0 ? Math.max(...products.map((p) => Number(p.id) || 0)) + 1 : 1,
      name: productName.trim(),
      category: category,
      price: parsedPrice,
      stock: parsedStock,
    };

    onAddProduct(newProductItem);

    // ล้างค่าในฟอร์ม
    setProductName('');
    setCategory('Accessories');
    setPrice('');
    setStock('');
    setValidationErrors({});
    setSuccessMsg(`เพิ่มสินค้า "${newProductItem.name}" สำเร็จเรียบร้อย!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <section className="bg-white border border-[#e9e9e5] rounded-[10px] p-6 sm:p-7 shadow-none flex flex-col gap-6 sm:gap-7">
      {/* ส่วนหัว Panel */}
      <div className="flex items-center justify-between pb-3 border-b border-[#e9e9e5]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1e293b]">
            Product catalog & Inventory (จัดการสินค้า)
          </h2>
          <span className="text-sm text-gray-500 font-medium">
            {products.length} รายการสินค้าทั้งหมดในระบบ
          </span>
        </div>
      </div>

      {/* 3. ฟอร์มเพิ่มสินค้า (Add Product Form) */}
      <div className="bg-[#f8fafc] border border-[#e9e9e5] rounded-[8px] p-5 sm:p-6 flex flex-col gap-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#1e293b]">
            เพิ่มสินค้าใหม่ (Add Product Form)
          </h3>
          <span className="text-xs sm:text-sm text-gray-500">
            กรอกข้อมูลให้ครบถ้วนเพื่อเพิ่มสินค้าลงในระบบทันที
          </span>
        </div>

        {successMsg && (
          <div className="flex items-center gap-2.5 px-4 py-3 text-sm font-bold bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-[6px]">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Product Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="product-name" className="text-sm font-bold text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                id="product-name"
                type="text"
                placeholder="เช่น Wireless Mouse, 4K Monitor..."
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                  if (validationErrors.name) {
                    setValidationErrors((prev) => ({ ...prev, name: null }));
                  }
                }}
                className={`bg-white border ${
                  validationErrors.name ? 'border-red-500' : 'border-[#e9e9e5]'
                } rounded-[6px] px-3.5 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none`}
              />
              {validationErrors.name && (
                <span className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-0.5">
                  <AlertCircle size={13} /> {validationErrors.name}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="product-category"
                className="text-sm font-bold text-gray-700"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="product-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white border border-[#e9e9e5] rounded-[6px] px-3.5 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none cursor-pointer"
              >
                {allCategories
                  .filter((c) => c !== 'All Categories')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="product-price" className="text-sm font-bold text-gray-700">
                Price (บาท) <span className="text-red-500">*</span>
              </label>
              <input
                id="product-price"
                type="number"
                min="0"
                step="any"
                placeholder="เช่น 450, 1200"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (validationErrors.price) {
                    setValidationErrors((prev) => ({ ...prev, price: null }));
                  }
                }}
                className={`bg-white border ${
                  validationErrors.price ? 'border-red-500' : 'border-[#e9e9e5]'
                } rounded-[6px] px-3.5 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none`}
              />
              {validationErrors.price && (
                <span className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-0.5">
                  <AlertCircle size={13} /> {validationErrors.price}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="product-stock" className="text-sm font-bold text-gray-700">
                Stock (จำนวนชิ้น) <span className="text-red-500">*</span>
              </label>
              <input
                id="product-stock"
                type="number"
                min="0"
                step="1"
                placeholder="เช่น 20, 0"
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                  if (validationErrors.stock) {
                    setValidationErrors((prev) => ({ ...prev, stock: null }));
                  }
                }}
                className={`bg-white border ${
                  validationErrors.stock ? 'border-red-500' : 'border-[#e9e9e5]'
                } rounded-[6px] px-3.5 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none`}
              />
              {validationErrors.stock && (
                <span className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-0.5">
                  <AlertCircle size={13} /> {validationErrors.stock}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-[6px] inline-flex items-center gap-2 text-sm sm:text-base shadow-none transition cursor-pointer"
            >
              <Plus size={18} />
              <span>Add Product</span>
            </button>
          </div>
        </form>
      </div>

      {/* Toolbar: 1. ค้นหาชื่อสินค้า, 2. กรองหมวดหมู่ (Dropdown), สลับ Table/Card */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* 1. ค้นหาชื่อสินค้า (filter โดยไม่สนตัวพิมพ์เล็ก-ใหญ่) */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="ค้นหาชื่อสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="ค้นหาชื่อสินค้า"
              className="w-full bg-white border border-[#e9e9e5] rounded-[6px] pl-10 pr-9 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none font-medium"
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-sm font-bold cursor-pointer"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* 2. กรองหมวดหมู่: มี Dropdown อย่างน้อย All Categories, Accessories, Display, Camera */}
          <select
            id="filter-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="กรองหมวดหมู่สินค้า"
            className="bg-white border border-[#e9e9e5] rounded-[6px] px-4 py-2.5 text-base font-semibold text-[#1e293b] focus:border-orange-500 focus:outline-none cursor-pointer"
          >
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2.5 justify-end flex-wrap">
          {/* สลับการแสดงผล Table / Card */}
          <div className="inline-flex rounded-[6px] border border-[#e9e9e5] bg-white p-1">
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold rounded-[4px] transition cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setViewMode('table')}
              title="แสดงแบบ Table"
            >
              <LayoutList size={16} />
              <span>Table</span>
            </button>
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold rounded-[4px] transition cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setViewMode('card')}
              title="แสดงแบบ Card"
            >
              <LayoutGrid size={16} />
              <span>Card</span>
            </button>
          </div>

          {/* ปุ่มรีเซ็ตเป็น mockProducts 5 รายการ */}
          {onResetMock && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold bg-white border border-[#e9e9e5] rounded-[6px] text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              onClick={onResetMock}
              title="รีเซ็ตสินค้ากลับเป็น 5 รายการเริ่มต้น (mockProducts)"
            >
              <RotateCcw size={15} />
              <span>Reset Mock</span>
            </button>
          )}

          {/* ปุ่มดึงข้อมูล API */}
          {onFetchApi && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold bg-white border border-[#e9e9e5] rounded-[6px] text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              onClick={onFetchApi}
              title="ทดสอบดึงข้อมูลผ่าน API"
            >
              <RefreshCw size={15} />
              <span>Fetch API</span>
            </button>
          )}
        </div>
      </div>

      {/* สรุปผลลัพธ์ */}
      <div className="text-sm font-semibold text-gray-600">
        <span>
          {filteredProducts.length} results (จากทั้งหมด {products.length} รายการ)
        </span>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-14 flex flex-col items-center justify-center gap-4 text-gray-600">
          <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-base font-semibold">
            Loading products... (กำลังโหลดข้อมูลสินค้า)
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-300 text-red-800 rounded-[8px] text-sm sm:text-base font-medium">
          <AlertCircle size={20} className="shrink-0 text-red-600" />
          <div>
            <strong className="font-bold">เกิดข้อผิดพลาดในการโหลด API:</strong> {error}
          </div>
        </div>
      )}

      {/* แสดงรายการสินค้า Table หรือ Card พร้อม map() และสถานะ In Stock / Out of Stock */}
      {!loading && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="py-14 text-center flex flex-col items-center justify-center gap-3 text-gray-400">
              <Boxes size={44} />
              <h4 className="text-lg font-bold text-gray-800">ไม่พบสินค้าที่ค้นหา</h4>
              <p className="text-sm text-gray-500">
                ลองเปลี่ยนคำค้นหา หรือเลือก "All Categories"
              </p>
            </div>
          ) : viewMode === 'table' ? (
            /* Table View */
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] text-sm font-bold text-gray-700 border-b border-[#e9e9e5]">
                    <th className="py-3.5 px-4">ID</th>
                    <th className="py-3.5 px-4">Product Name</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Stock</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((item) => {
                    const inStock = Number(item.stock) > 0;
                    return (
                      <tr
                        key={item.id}
                        className="border-b border-[#e9e9e5] hover:bg-[#fbfcfd] transition text-sm sm:text-base"
                      >
                        <td className="py-4 px-4 font-mono font-bold text-gray-500">
                          #{item.id}
                        </td>
                        <td className="py-4 px-4 font-bold text-[#1e293b]">
                          {item.name}
                        </td>
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          {item.category}
                        </td>
                        <td className="py-4 px-4 font-extrabold text-[#1e293b]">
                          ฿{Number(item.price).toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          {item.stock} ชิ้น
                        </td>
                        <td className="py-4 px-4">
                          {inStock ? (
                            <span className="rounded-[6px] px-3 py-1 text-xs sm:text-sm font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              In Stock
                            </span>
                          ) : (
                            <span className="rounded-[6px] px-3 py-1 text-xs sm:text-sm font-bold bg-orange-100 text-orange-700 border border-orange-200">
                              Out of Stock
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-[6px] transition cursor-pointer"
                            title={`ลบสินค้า ${item.name}`}
                            onClick={() => onDeleteProduct(item.id)}
                            aria-label={`ลบสินค้า ${item.name}`}
                          >
                            <Trash2 size={15} />
                            <span>ลบ</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Card View */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((item) => {
                const inStock = Number(item.stock) > 0;
                return (
                  <div
                    key={item.id}
                    className="border border-[#e9e9e5] rounded-[8px] p-5 bg-white flex flex-col justify-between gap-4 shadow-none hover:border-orange-400 transition"
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                      <span className="font-mono font-bold">#{item.id}</span>
                      {inStock ? (
                        <span className="rounded-[6px] px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          In Stock
                        </span>
                      ) : (
                        <span className="rounded-[6px] px-2.5 py-1 text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    <div>
                      <strong className="text-base sm:text-lg font-bold text-[#1e293b] line-clamp-1">
                        {item.name}
                      </strong>
                      <span className="text-xs sm:text-sm font-bold text-orange-600 block mt-1">
                        {item.category}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#e9e9e5] text-sm">
                      <div>
                        <small className="text-gray-500 font-medium block">ราคา</small>
                        <strong className="text-[#1e293b] font-extrabold text-base sm:text-lg">
                          ฿{Number(item.price).toLocaleString()}
                        </strong>
                      </div>
                      <div>
                        <small className="text-gray-500 font-medium block">สต็อก</small>
                        <strong className="text-[#1e293b] font-bold text-base sm:text-lg">
                          {item.stock} ชิ้น
                        </strong>
                      </div>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-[6px] transition cursor-pointer"
                        onClick={() => onDeleteProduct(item.id)}
                        aria-label={`ลบสินค้า ${item.name}`}
                      >
                        <Trash2 size={16} />
                        <span>ลบสินค้า</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}
