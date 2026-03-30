export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Image placeholder */}
      <div className="bg-gray-200 aspect-square w-full" />

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Category pill */}
        <div className="h-3 w-16 bg-gray-200 rounded-full" />

        {/* Name — 2 lines */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded-full" />
          <div className="h-4 w-2/3 bg-gray-200 rounded-full" />
        </div>

        {/* Price */}
        <div className="h-5 w-24 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
}
