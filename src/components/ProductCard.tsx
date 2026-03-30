import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
      {/* Image */}
      <div className="bg-gray-100 aspect-square w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Category / Brand */}
        <p className="text-sm text-gray-400 mb-1">{product.category}</p>

        {/* Name — max 2 lines */}
        <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 mb-3">
          {product.name}
        </h3>

        {/* Price */}
        <p className="text-lg font-semibold text-cyan-500">
          ৳ {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
