import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ onNavigate, isMobile = false }) {
  const showCategories = () => {
    if (onNavigate) onNavigate();
    setTimeout(() => {
      document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navClass = isMobile
    ? 'flex flex-col gap-2 w-full py-2'
    : 'hidden md:flex items-center gap-7';

  const linkClass = (isActive) =>
    `text-base sm:text-[17px] font-semibold transition py-1.5 relative text-left cursor-pointer ${
      isActive ? 'text-orange-600 font-bold' : 'text-gray-700 hover:text-orange-600'
    }`;

  return (
    <nav className={navClass} aria-label="เมนูหลัก">
      <NavLink
        to="/"
        end
        className={({ isActive }) => linkClass(isActive)}
        onClick={onNavigate}
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) => linkClass(isActive)}
        onClick={onNavigate}
      >
        Products
      </NavLink>
      <Link
        to="/#categories"
        className={linkClass(false)}
        onClick={showCategories}
      >
        Categories
      </Link>
      <NavLink
        to="/about"
        className={({ isActive }) => linkClass(isActive)}
        onClick={onNavigate}
      >
        About
      </NavLink>
    </nav>
  );
}
