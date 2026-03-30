import { Search } from "lucide-react";
import ProductCard from "./components/ProductCard";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import type { Product } from "./types/product";

// Static mock data and i will removed it after adding the real api
const PREVIEW_PRODUCT: Product = {
  id: "preview-1",
  name: "Mens Premium Designer Edition T Shirt",
  description: "Premium designer t-shirt.",
  price: 2500,
  category: "Clothing",
  imageUrl: "https://picsum.photos/seed/42/400/400",
  stock: 10,
};

function App() {
  return (
    <div style={{ minHeight: "100vh", padding: "2rem" }}>
      {/* Header Section */}
      <header
        className="glass-panel"
        style={{ padding: "2rem", marginBottom: "2rem" }}
      >
        <h1
          style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "0.5rem" }}
        >
          Premium Products
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Browse our collection. Handling the flaky API gracefully is part of
          the challenge.
        </p>
      </header>

      {/* Controls Section */}
      <section style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <div
          className="glass-panel"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem",
            flex: 1,
            maxWidth: "400px",
          }}
        >
          <Search
            size={20}
            color="var(--text-muted)"
            style={{ marginRight: "0.75rem" }}
          />
          <input
            type="text"
            placeholder="Search products..."
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-main)",
              outline: "none",
              width: "100%",
              fontSize: "1rem",
            }}
          />
        </div>

        <select
          className="glass-panel"
          style={{
            padding: "0.75rem 1rem",
            color: "var(--text-main)",
            outline: "none",
            fontSize: "1rem",
            cursor: "pointer",
            appearance: "none",
          }}
        >
          <option value="" style={{ background: "var(--surface)" }}>
            All Categories
          </option>
          <option value="electronics" style={{ background: "var(--surface)" }}>
            Electronics
          </option>
          <option value="clothing" style={{ background: "var(--surface)" }}>
            Clothing
          </option>
          <option value="home" style={{ background: "var(--surface)" }}>
            Home
          </option>
          <option value="outdoors" style={{ background: "var(--surface)" }}>
            Outdoors
          </option>
        </select>
      </section>

      {/* Component Preview */}
      <main>
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "1rem",
            fontSize: "0.875rem",
          }}
        >
          Component preview — ProductCard (left) &amp; ProductCardSkeleton
          (right):
        </p>
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          style={{ maxWidth: "700px" }}
        >
          {/* Real card */}
          <ProductCard product={PREVIEW_PRODUCT} />

          {/* Skeleton */}
          <ProductCardSkeleton />
        </div>
      </main>
    </div>
  );
}

export default App;
