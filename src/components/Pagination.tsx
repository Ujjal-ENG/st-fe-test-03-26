import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((pg) => pg === 1 || pg === totalPages || Math.abs(pg - page) <= 2)
    .reduce<(number | "...")[]>((acc, pg, idx, arr) => {
      if (idx > 0 && (pg as number) - (arr[idx - 1] as number) > 1) acc.push("...");
      acc.push(pg);
      return acc;
    }, []);

  return (
    <nav
      aria-label="Pagination"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "2.5rem" }}
    >
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="glass-panel"
        style={{ padding: "0.5rem", borderRadius: "12px", opacity: page === 1 ? 0.4 : 1 }}
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((pg, i) =>
        pg === "..."
          ? <span key={`ellipsis-${i}`} style={{ padding: "0 0.25rem", color: "var(--text-muted)" }}>…</span>
          : (
            <button
              key={pg}
              onClick={() => onPageChange(pg as number)}
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
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="glass-panel"
        style={{ padding: "0.5rem", borderRadius: "12px", opacity: page === totalPages ? 0.4 : 1 }}
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
