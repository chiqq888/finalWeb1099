import { useRef, useState } from 'react';
import {
  UserRound,
  ClipboardList,
  MapPin,
  Heart,
  ArrowUpRight,
  Camera,
  Save,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import RecentOrdersTable from '../Dashboard/components/RecentOrdersTable';

const tabs = [
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
];

export default function ProfilePage({
  profile,
  onUpdateProfile,
  orders,
  products = [],
  wishlist = [],
  ...cardProps
}) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('profile');
  const [form, setForm] = useState({ ...profile });
  const [photoError, setPhotoError] = useState('');
  const photoInput = useRef(null);

  const change = (event) =>
    setForm((old) => ({ ...old, [event.target.name]: event.target.value }));

  const save = (event) => {
    event.preventDefault();
    onUpdateProfile(form);
  };

  const changePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (
      !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ||
      file.size > 1024 * 1024
    ) {
      setPhotoError('กรุณาเลือกรูป JPG, PNG หรือ WebP ขนาดไม่เกิน 1 MB');
      return;
    }
    setPhotoError('');
    const reader = new FileReader();
    reader.onload = () => setForm((old) => ({ ...old, avatar: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-start gap-9">
      {/* Profile Sidebar */}
      <aside className="w-full lg:w-80 bg-white border border-[#e9e9e5] rounded-[10px] p-6 sm:p-7 shadow-none flex flex-col gap-6 shrink-0">
        <div className="flex flex-col items-center text-center gap-2.5">
          <div className="w-24 h-24 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center overflow-hidden text-orange-600">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserRound size={44} />
            )}
          </div>
          <strong className="text-lg font-extrabold text-[#1e293b] mt-1">
            {profile.name}
          </strong>
          <span className="text-sm text-gray-500 font-medium">{profile.email}</span>
          <span className="text-xs font-bold tracking-wider uppercase text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-[6px] mt-1">
            MEMBER · {profile.studentId}
          </span>
        </div>

        <nav aria-label="เมนูบัญชี" className="flex flex-col gap-1.5">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`flex items-center justify-between px-4 py-3 rounded-[8px] text-sm sm:text-base font-bold transition cursor-pointer ${
                tab === id
                  ? 'bg-orange-50 text-orange-600 border border-orange-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setTab(id)}
            >
              <span className="flex items-center gap-3">
                <Icon size={19} />
                <span>{label}</span>
              </span>
              {id === 'wishlist' && wishlist.length > 0 && (
                <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <Link
          to="/dashboard"
          className="w-full pt-5 border-t border-[#e9e9e5] text-sm sm:text-base font-bold text-orange-600 hover:text-orange-700 flex items-center justify-center gap-2 transition"
        >
          <span>Go to dashboard</span>
          <ArrowUpRight size={17} />
        </Link>
      </aside>

      {/* Main Profile Content */}
      <div className="flex-1 w-full flex flex-col gap-8">
        <div className="pb-3 border-b border-[#e9e9e5]">
          <span className="text-sm font-bold tracking-wider text-orange-600 uppercase">
            A SPACE THAT’S YOURS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1e293b] mt-1">
            {tab === 'profile'
              ? 'Profile information'
              : tabs.find((item) => item.id === tab)?.label}
            <span className="text-orange-500">.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 font-medium">
            จัดการข้อมูลส่วนตัว และสิ่งที่คุณชอบได้ที่นี่
          </p>
        </div>

        {tab === 'profile' && (
          <>
            <form
              className="bg-white border border-[#e9e9e5] rounded-[10px] p-6 sm:p-8 shadow-none flex flex-col-reverse sm:flex-row gap-8 sm:gap-10"
              onSubmit={save}
            >
              <div className="flex-1 flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-name" className="text-sm font-bold text-gray-700">
                    Full name
                  </label>
                  <input
                    id="user-name"
                    required
                    name="name"
                    value={form.name}
                    onChange={change}
                    autoComplete="name"
                    className="bg-white border border-[#e9e9e5] rounded-[6px] px-4 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-email" className="text-sm font-bold text-gray-700">
                    Email address
                  </label>
                  <input
                    id="user-email"
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={change}
                    autoComplete="email"
                    className="bg-white border border-[#e9e9e5] rounded-[6px] px-4 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-phone" className="text-sm font-bold text-gray-700">
                    Phone number
                  </label>
                  <input
                    id="user-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={change}
                    autoComplete="tel"
                    className="bg-white border border-[#e9e9e5] rounded-[6px] px-4 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-bio" className="text-sm font-bold text-gray-700">
                    Bio
                  </label>
                  <textarea
                    id="user-bio"
                    name="bio"
                    value={form.bio}
                    onChange={change}
                    rows={3}
                    className="bg-white border border-[#e9e9e5] rounded-[6px] px-4 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none resize-none font-medium"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-base font-bold rounded-[6px] inline-flex items-center gap-2 transition cursor-pointer shadow-none"
                  >
                    <Save size={18} />
                    <span>Save changes</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 sm:w-52 text-center">
                <div className="w-28 h-28 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center overflow-hidden text-orange-600">
                  {form.avatar ? (
                    <img
                      src={form.avatar}
                      alt="รูปโปรไฟล์ที่เลือก"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserRound size={56} />
                  )}
                </div>
                <input
                  ref={photoInput}
                  hidden
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={changePhoto}
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-[#e9e9e5] hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-[6px] inline-flex items-center gap-2 transition cursor-pointer"
                  onClick={() => photoInput.current?.click()}
                >
                  <Camera size={16} />
                  <span>Change photo</span>
                </button>
                <small className="text-xs text-gray-500">JPG, PNG, WebP · Max 1 MB</small>
                {photoError && (
                  <p className="text-xs text-red-500 font-semibold mt-1" role="alert">
                    {photoError}
                  </p>
                )}
              </div>
            </form>

            <RecentOrdersTable
              orders={orders.slice(0, 3)}
              compact
              onViewAll={() => setTab('orders')}
            />
          </>
        )}

        {tab === 'orders' && <RecentOrdersTable orders={orders} compact />}

        {tab === 'addresses' && (
          <form
            className="bg-white border border-[#e9e9e5] rounded-[10px] p-7 sm:p-8 shadow-none flex flex-col gap-5 max-w-xl"
            onSubmit={save}
          >
            <div className="flex items-center gap-4 pb-4 border-b border-[#e9e9e5]">
              <span className="p-3 bg-orange-50 text-orange-600 rounded-[8px]">
                <MapPin size={26} />
              </span>
              <div>
                <h2 className="text-xl font-bold text-[#1e293b]">Shipping address</h2>
                <p className="text-sm text-gray-500">ที่อยู่สำหรับคำสั่งซื้อของคุณ</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="address-name" className="text-sm font-bold text-gray-700">
                ชื่อผู้รับ
              </label>
              <input
                id="address-name"
                required
                name="name"
                value={form.name}
                onChange={change}
                className="bg-white border border-[#e9e9e5] rounded-[6px] px-4 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="address-phone" className="text-sm font-bold text-gray-700">
                หมายเลขโทรศัพท์
              </label>
              <input
                id="address-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={change}
                className="bg-white border border-[#e9e9e5] rounded-[6px] px-4 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="address-location"
                className="text-sm font-bold text-gray-700"
              >
                ที่อยู่จัดส่ง
              </label>
              <textarea
                id="address-location"
                required
                name="address"
                value={form.address}
                onChange={change}
                rows={4}
                className="bg-white border border-[#e9e9e5] rounded-[6px] px-4 py-2.5 text-base text-[#1e293b] focus:border-orange-500 focus:outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-base font-bold rounded-[6px] inline-flex items-center gap-2 transition cursor-pointer shadow-none"
              >
                <Save size={18} />
                <span>Save address</span>
              </button>
            </div>
          </form>
        )}

        {tab === 'wishlist' &&
          (products.some((p) => wishlist.includes(p.id)) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((p) => wishlist.includes(p.id))
                .map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    wishlist={wishlist}
                    onViewProduct={(cardProduct) => navigate(`/products/${cardProduct.id}`)}
                    {...cardProps}
                  />
                ))}
            </div>
          ) : (
            <div className="bg-white border border-[#e9e9e5] rounded-[10px] p-10 text-center flex flex-col items-center justify-center gap-4 shadow-none">
              <div className="p-4 bg-red-50 text-red-500 rounded-full">
                <Heart size={44} />
              </div>
              <h2 className="text-2xl font-bold text-[#1e293b]">
                A place for your favorites.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-md font-medium">
                กดหัวใจบนสินค้าที่ชอบ เพื่อเก็บไว้ดูภายหลัง
              </p>
              <Link
                to="/products"
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base font-bold rounded-[6px] transition shadow-none"
              >
                <span>ค้นพบสินค้าที่ชอบ</span>
                <ArrowUpRight size={17} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
