import { PackageOpen, RefreshCw } from 'lucide-react';

export default function CatalogState({ loading, error, onRetry, children }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-6" role="status" aria-label="Loading products...">
        <div className="py-6 flex items-center justify-center gap-3 text-orange-600 bg-orange-50 border border-orange-200 rounded-[8px]">
          <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-base font-bold">Loading products...</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((item) => (
            <div
              className="border border-[#e9e9e5] rounded-[8px] bg-white p-5 flex flex-col gap-4 animate-pulse shadow-none"
              key={item}
            >
              <div className="bg-gray-200 aspect-square rounded-[8px] w-full" />
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-6 bg-gray-200 rounded w-1/3 mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-white border border-[#e9e9e5] rounded-[8px] p-10 text-center flex flex-col items-center justify-center gap-4 shadow-none"
        role="alert"
      >
        <div className="p-4 bg-red-50 text-red-500 rounded-full">
          <PackageOpen size={42} />
        </div>
        <h3 className="text-xl font-bold text-[#1e293b]">โหลดสินค้าไม่สำเร็จ</h3>
        <p className="text-sm text-gray-600 max-w-md leading-relaxed">{error}</p>
        {onRetry && (
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-[6px] transition shadow-none cursor-pointer"
            onClick={onRetry}
          >
            <RefreshCw size={16} />
            <span>ลองอีกครั้ง</span>
          </button>
        )}
      </div>
    );
  }

  return children;
}
