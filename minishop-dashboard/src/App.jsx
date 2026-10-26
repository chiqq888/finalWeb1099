import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home/HomePage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import ShoppingCartPage from './pages/ShoppingCart/ShoppingCartPage';
import ProfilePage from './pages/Profile/ProfilePage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import AboutPage from './pages/About/AboutPage';
import { mockProducts, initialOrders, initialProfile } from './data/mockData';
import { fetchProducts } from './services/storeApi';
import { readStorage, writeStorage } from './utils/storage';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Data Sources: Fake Store API เป็นแหล่งข้อมูลหลัก + Mock Data 5 รายการสำรอง
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const [cartItems, setCartItems] = useState(() => readStorage('minishop.cart', []));
  const [wishlist, setWishlist] = useState(() => readStorage('minishop.wishlist', []));
  const [orders, setOrders] = useState(() =>
    readStorage('minishop.orders', initialOrders).map((order) =>
      order.customer === 'นายภัทรดนัย รัตนสกุล'
        ? { ...order, customer: initialProfile.name }
        : order
    )
  );
  const [profile, setProfile] = useState(() => {
    const savedProfile = readStorage('minishop.profile', initialProfile);
    return {
      ...savedProfile,
      name:
        savedProfile.name === 'นายภัทรดนัย รัตนสกุล'
          ? initialProfile.name
          : savedProfile.name,
      email:
        savedProfile.email === 'phattradanai.67051099@cmu.ac.th'
          ? initialProfile.email
          : savedProfile.email,
    };
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [toast, setToast] = useState('');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // โหลดข้อมูลจาก Fake Store API เมื่อเริ่มต้น
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal)
      .then((data) => {
        setProducts(data);
        setError('');
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(
            err.message
              ? `${err.message} (กำลังใช้ Mock Data สำรองตามเกณฑ์)`
              : 'เกิดข้อผิดพลาดในการโหลด Fake Store API (กำลังใช้ Mock Data สำรองตามเกณฑ์)'
          );
          // Fallback to mock data (at least 5 items) when API fails
          setProducts(mockProducts);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    writeStorage('minishop.cart', cartItems);
  }, [cartItems]);
  useEffect(() => {
    writeStorage('minishop.wishlist', wishlist);
  }, [wishlist]);
  useEffect(() => {
    writeStorage('minishop.orders', orders);
  }, [orders]);
  useEffect(() => {
    writeStorage('minishop.profile', profile);
  }, [profile]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const openShop = (nextCategory = 'all') => {
    setCategory(nextCategory);
    setSearchQuery('');
    navigate('/products');
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((items) =>
      items.some((item) => item.id === product.id)
        ? items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...items, { ...product, quantity }]
    );
    setToast('เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว');
  };

  const toggleWishlist = (id) =>
    setWishlist((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id]
    );

  const updateQuantity = (id, quantity) =>
    setCartItems((items) =>
      quantity <= 0
        ? items.filter((item) => item.id !== id)
        : items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

  const checkout = () => {
    if (!cartItems.length) return;
    setOrders((items) => [
      {
        id: `MS-${Date.now().toString().slice(-7)}`,
        customer: profile.name,
        date: new Intl.DateTimeFormat('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          timeZone: 'Asia/Bangkok',
        }).format(new Date()),
        total: cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0),
        items: cartItems.map((item) => `${item.name} × ${item.quantity}`).join(', '),
        status: 'Processing',
        isSample: false,
      },
      ...items,
    ]);
    setCartItems([]);
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setToast(`เพิ่มสินค้า "${newProduct.name}" เรียบร้อยแล้ว`);
  };

  const handleUpdateProduct = (product) => {
    setProducts((items) =>
      items.map((item) => (item.id === product.id ? product : item))
    );
    setCartItems((items) =>
      items.map((item) =>
        item.id === product.id ? { ...product, quantity: item.quantity } : item
      )
    );
    setToast('บันทึกสินค้าแล้ว');
  };

  const handleDeleteProduct = (id) => {
    setProducts((items) => items.filter((item) => item.id !== id));
    setCartItems((items) => items.filter((item) => item.id !== id));
    setWishlist((items) => items.filter((item) => item !== id));
    setToast('ลบสินค้าออกจากระบบแล้ว');
  };

  const handleResetMock = () => {
    setProducts(mockProducts);
    setError('');
    setToast('สลับมาใช้ Mock Data (5 รายการ) เรียบร้อยแล้ว');
  };

  const handleFetchApi = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProducts();
      setProducts(data);
      setToast('โหลดข้อมูลจาก Fake Store API สำเร็จ');
    } catch (err) {
      setError(
        err.message
          ? `${err.message} (กำลังใช้ Mock Data สำรองตามเกณฑ์)`
          : 'ไม่สามารถโหลดจาก API ได้ (สลับมาใช้ Mock Data ตามเกณฑ์)'
      );
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const shared = {
    products,
    onAddToCart: addToCart,
    wishlist,
    onToggleWishlist: toggleWishlist,
  };

  const apiState = {
    loading,
    error,
    onRetry: () => {
      setLoading(true);
      setError('');
      setReloadKey((key) => key + 1);
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#1e293b] font-sans antialiased selection:bg-orange-100 selection:text-orange-950 text-base">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-orange-500 focus:text-white focus:px-5 focus:py-3 focus:rounded-[6px] focus:shadow-lg focus:font-bold"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        ข้ามไปเนื้อหา
      </a>

      {/* Header แสดงชื่อ MiniShop และ MiniShop Dashboard พร้อม Navigation Menu */}
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        searchQuery={searchQuery}
        onSearch={(value) => {
          setSearchQuery(value);
          setCategory('all');
          navigate('/products');
        }}
      />

      {/* Main Content */}
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 outline-none"
      >
        <Routes>
          {/* Route: / -> Home */}
          <Route
            path="/"
            element={
              <HomePage
                {...shared}
                {...apiState}
                isShop={false}
                searchQuery={searchQuery}
                category={category}
                setCategory={setCategory}
                onOpenShop={openShop}
                onClearFilters={() => {
                  setSearchQuery('');
                  setCategory('all');
                }}
              />
            }
          />

          {/* Route: /products -> รายการสินค้าทั้งหมด (Products / Shop) */}
          <Route
            path="/products"
            element={
              <HomePage
                {...shared}
                {...apiState}
                isShop={true}
                searchQuery={searchQuery}
                category={category}
                setCategory={setCategory}
                onOpenShop={openShop}
                onClearFilters={() => {
                  setSearchQuery('');
                  setCategory('all');
                }}
              />
            }
          />

          {/* Route: /products/:id และ /product/:id -> Product Detail */}
          <Route
            path="/products/:id"
            element={
              <ProductDetailPage
                {...shared}
                {...apiState}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetailPage
                {...shared}
                {...apiState}
              />
            }
          />

          {/* Route: /about -> ข้อมูลเกี่ยวกับแอป */}
          <Route path="/about" element={<AboutPage />} />

          {/* Route: /cart -> Shopping Cart */}
          <Route
            path="/cart"
            element={
              <ShoppingCartPage
                {...shared}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={(id) => updateQuantity(id, 0)}
                onCheckout={checkout}
              />
            }
          />

          {/* Route: /profile -> ข้อมูลส่วนตัวและคำสั่งซื้อ */}
          <Route
            path="/profile"
            element={
              <ProfilePage
                {...shared}
                profile={profile}
                orders={orders}
                onUpdateProfile={(next) => {
                  setProfile(next);
                  setToast('บันทึกข้อมูลส่วนตัวแล้ว');
                }}
              />
            }
          />

          {/* Route: /dashboard -> Admin Dashboard */}
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                {...shared}
                {...apiState}
                orders={orders}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onResetMock={handleResetMock}
                onFetchApi={handleFetchApi}
              />
            }
          />

          {/* Fallback route */}
          <Route
            path="*"
            element={
              <HomePage
                {...shared}
                {...apiState}
                isShop={false}
                searchQuery={searchQuery}
                category={category}
                setCategory={setCategory}
                onOpenShop={openShop}
                onClearFilters={() => {
                  setSearchQuery('');
                  setCategory('all');
                }}
              />
            }
          />
        </Routes>
      </main>

      {/* Footer แสดงข้อความลิขสิทธิ์ และ Navigation */}
      <Footer />

      {/* Toast Notification */}
      {toast && (
        <div
          className="fixed bottom-7 right-7 z-50 flex items-center gap-3 bg-white border border-[#e9e9e5] px-5 py-3.5 rounded-[8px] shadow-sm text-sm sm:text-base font-bold text-gray-800"
          role="status"
        >
          <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Check size={16} />
          </span>
          <span>{toast}</span>
          <button
            type="button"
            className="ml-3 text-gray-400 hover:text-gray-700 transition cursor-pointer"
            aria-label="ปิดการแจ้งเตือน"
            onClick={() => setToast('')}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
