export default function ProductCardSkeleton() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse"
      aria-hidden="true"
    >
      {/* Mirrors ProductCard image */}
      <div className="bg-gray-200 aspect-square w-full" />

      {/* Mirrors ProductCard body — p-4, mb-1, mb-3 */}
      <div className="p-4">
        {/* Category pill — matches text-sm mb-1 */}
        <div className="h-3 w-16 bg-gray-200 rounded-full mb-1" />

        {/* Name lines — matches line-clamp-2 mb-3 */}
        <div className="mb-3 space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded-full" />
          <div className="h-4 w-2/3 bg-gray-200 rounded-full" />
        </div>

        {/* Price — matches text-lg */}
        <div className="h-5 w-24 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
}
