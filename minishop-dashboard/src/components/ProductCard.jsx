import { Heart, Plus, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { categoryLabel, formatPrice } from '../utils/storage';
import ProductImage from './ProductImage';

export default function ProductCard({
  product,
  onViewProduct,
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
}) {
  const navigate = useNavigate();
  const liked = wishlist.includes(product.id);

  const handleClickProduct = () => {
    if (onViewProduct) {
      onViewProduct(product);
    } else {
      navigate(`/products/${product.id}`);
    }
  };

  return (
    <article className="border border-[#e9e9e5] rounded-[8px] bg-white overflow-hidden flex flex-col justify-between shadow-none hover:border-orange-400 transition group">
      <div className="relative bg-[#f8fafc] aspect-square flex items-center justify-center overflow-hidden p-6 border-b border-[#e9e9e5]">
        <button
          type="button"
          className="w-full h-full flex items-center justify-center cursor-pointer"
          onClick={handleClickProduct}
          aria-label={`ดูรายละเอียด ${product.name}`}
        >
          <ProductImage
            product={product}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-200"
          />
        </button>
        {onToggleWishlist && (
          <button
            type="button"
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center border border-[#e9e9e5] bg-white transition cursor-pointer ${
              liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
            aria-label={
              liked
                ? `นำ ${product.name} ออกจากรายการโปรด`
                : `บันทึก ${product.name} ในรายการโปรด`
            }
            aria-pressed={liked}
            onClick={() => onToggleWishlist(product.id)}
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs sm:text-sm font-bold text-orange-600 uppercase tracking-wider">
            {categoryLabel(product.category)}
          </span>
          <Link
            to={`/products/${product.id}`}
            className="text-base font-bold text-[#1e293b] text-left hover:text-orange-600 line-clamp-2 transition leading-snug cursor-pointer"
          >
            {product.name}
          </Link>
        </div>

        <div className="flex flex-col gap-3.5 pt-1">
          <div className="flex items-center gap-1.5 text-sm text-amber-500">
            <Star size={15} fill="currentColor" />
            <strong className="text-gray-800 font-bold">{(product.rating || 0).toFixed(1)}</strong>
            <span className="text-gray-500 text-xs">({product.reviewsCount || 0})</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#e9e9e5]">
            <strong className="text-lg sm:text-xl font-extrabold text-[#1e293b]">
              {formatPrice(product.price)}
            </strong>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-[6px] transition shadow-none cursor-pointer"
              aria-label={`เพิ่ม ${product.name} ลงตะกร้า`}
              onClick={() => onAddToCart && onAddToCart(product)}
            >
              <Plus size={16} />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
