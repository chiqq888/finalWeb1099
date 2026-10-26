import { useState } from 'react';
import { ImageOff } from 'lucide-react';

export default function ProductImage({ product, className = '', eager = false }) {
  const [failedSource, setFailedSource] = useState('');

  if (failedSource === product.image) {
    return (
      <span
        className={`flex flex-col items-center justify-center bg-gray-50 text-gray-400 text-xs p-4 rounded-[6px] text-center ${className}`}
        role="img"
        aria-label={`ไม่สามารถโหลดรูป ${product.name}`}
      >
        <ImageOff size={24} className="mb-1 text-gray-400" />
        <span className="text-[11px]">Image unavailable</span>
      </span>
    );
  }

  return (
    <img
      className={className}
      src={product.image}
      alt={product.name}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailedSource(product.image)}
    />
  );
}
