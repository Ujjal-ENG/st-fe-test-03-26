import { useState } from 'react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE = 'https://placehold.co/400x400/f3f4f6/9ca3af?text=No+Image';

export default function ProductCard({ product }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.imageUrl);

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
      aria-label={`${product.name}, ${product.category}, ৳${product.price.toLocaleString()}`}
    >
      {/* Image */}
      <div className="bg-gray-100 aspect-square w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
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
        <p className="text-lg font-semibold text-cyan-500" aria-label={`Price: ৳${product.price.toLocaleString()}`}>
          ৳ {product.price.toLocaleString()}
        </p>
      </div>
    </article>
  );
}
