import { useState, useEffect, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight, AlertTriangle, RotateCcw } from "lucide-react";
import { api } from "./services/api";
import type { Product } from "./types/product";
import ProductCard from "./components/ProductCard";
import ProductCardSkeleton from "./components/ProductCardSkeleton";

const CATEGORIES = ["Electronics", "Clothing", "Home", "Outdoors"];
const LIMIT = 12;

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (pg: number, cat: string, q: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.fetchProducts({
        page: pg,
        limit: LIMIT,
        category: cat || undefined,
        search: q || undefined,
      });
      setProducts(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page, category, search);
  }, [page, category, search, fetchData]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSearchSubmit = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const handleSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearchSubmit();
  };

  const startItem = (page - 1) * LIMIT + 1;
  const endItem = Math.min(page * LIMIT, total);

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
        <div
          className="glass-panel"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem",
            flex: 1,
            maxWidth: "400px",
            minWidth: "200px",
          }}
        >
          <Search size={20} color="var(--text-muted)" style={{ marginRight: "0.75rem", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKey}
            aria-label="Search products"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-main)",
              outline: "none",
              width: "100%",
              fontSize: "1rem",
            }}
          />
          {searchInput && (
            <button
              onClick={handleClearSearch}
              aria-label="Clear search"
              style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginLeft: "0.5rem" }}
            >
              ✕
            </button>
          )}
        </div>

        <select
          className="glass-panel"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          aria-label="Filter by category"
          style={{
            padding: "0.75rem 1rem",
            color: "var(--text-main)",
            outline: "none",
            fontSize: "1rem",
            cursor: "pointer",
            appearance: "none",
          }}
        >
          <option value="" style={{ background: "var(--surface)" }}>All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} style={{ background: "var(--surface)" }}>{c}</option>
          ))}
        </select>

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

      {/* Error state */}
      {error && (
        <div
          role="alert"
          className="glass-panel"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "4rem",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <AlertTriangle size={40} color="var(--error)" />
          <div>
            <h2 style={{ marginBottom: "0.5rem" }}>Failed to load products</h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "400px" }}>{error}</p>
          </div>
          <button
            onClick={() => fetchData(page, category, search)}
            className="btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <RotateCcw size={16} />
            Try Again
          </button>
        </div>
      )}

      {/* Product grid */}
      {!error && (
        <main>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: LIMIT }).map((_, i) => <ProductCardSkeleton key={i} />)
              : products.map((p) => <ProductCard key={p.id} product={p} />)
            }
          </div>

          {/* Empty state */}
          {!loading && products.length === 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "6rem 2rem", textAlign: "center" }}>
              <p style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</p>
              <h2 style={{ marginBottom: "0.5rem" }}>No products found</h2>
              <p style={{ color: "var(--text-muted)" }}>Try a different search or category.</p>
            </div>
          )}
        </main>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <nav
          aria-label="Pagination"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "2.5rem" }}
        >
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className="glass-panel"
            style={{ padding: "0.5rem", borderRadius: "12px", opacity: page === 1 ? 0.4 : 1 }}
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((pg) => pg === 1 || pg === totalPages || Math.abs(pg - page) <= 2)
            .reduce<(number | "...")[]>((acc, pg, idx, arr) => {
              if (idx > 0 && (pg as number) - (arr[idx - 1] as number) > 1) acc.push("...");
              acc.push(pg);
              return acc;
            }, [])
            .map((pg, i) =>
              pg === "..."
                ? <span key={`ellipsis-${i}`} style={{ padding: "0 0.25rem", color: "var(--text-muted)" }}>…</span>
                : (
                  <button
                    key={pg}
                    onClick={() => setPage(pg as number)}
                    aria-label={`Page ${pg}`}
                    aria-current={page === pg ? "page" : undefined}
                    className={page === pg ? "" : "glass-panel"}
                    style={{
                      width: "2.25rem",
                      height: "2.25rem",
                      borderRadius: "12px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      background: page === pg ? "var(--primary)" : undefined,
                      color: page === pg ? "white" : "var(--text-main)",
                    }}
                  >
                    {pg}
                  </button>
                )
            )}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
            className="glass-panel"
            style={{ padding: "0.5rem", borderRadius: "12px", opacity: page === totalPages ? 0.4 : 1 }}
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      )}
    </div>
  );
}

export default App;
