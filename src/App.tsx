import { useProducts } from "./hooks/useProducts";
import ProductCard from "./components/ProductCard";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ErrorBanner from "./components/ErrorBanner";
import EmptyState from "./components/EmptyState";
import Pagination from "./components/Pagination";

const SKELETON_COUNT = 12;

function App() {
  const {
    products,
    loading,
    error,
    page,
    total,
    totalPages,
    category,
    searchInput,
    startItem,
    endItem,
    setPage,
    setSearchInput,
    handleCategoryChange,
    handleSearchSubmit,
    handleClearSearch,
    retry,
  } = useProducts();

  return (
    <div style={{ minHeight: "100vh", padding: "2rem" }}>
      {/* Header */}
      <header
        className="glass-panel"
        style={{ padding: "2rem", marginBottom: "2rem" }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Premium Products
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Browse our collection. Handling the flaky API gracefully is part of the challenge.
        </p>
      </header>

      {/* Controls */}
      <section style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSubmit={handleSearchSubmit}
          onClear={handleClearSearch}
        />
        <CategoryFilter value={category} onChange={handleCategoryChange} />
        <button onClick={handleSearchSubmit} className="btn-primary" aria-label="Apply search">
          Search
        </button>
      </section>

      {/* Result count */}
      {!loading && !error && total > 0 && (
        <p style={{ color: "var(--text-muted)", marginBottom: "1rem", fontSize: "0.875rem" }}>
          Showing {startItem}–{endItem} of {total} products
        </p>
      )}

      {/* Error */}
      {error && <ErrorBanner message={error} onRetry={retry} />}

      {/* Product grid */}
      {!error && (
        <main>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <ProductCardSkeleton key={i} />)
              : products.map((p) => <ProductCard key={p.id} product={p} />)
            }
          </div>

          {!loading && products.length === 0 && <EmptyState />}
        </main>
      )}

      {/* Pagination */}
      {!loading && !error && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}

export default App;
