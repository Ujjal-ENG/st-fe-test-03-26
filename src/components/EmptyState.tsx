export default function EmptyState() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "6rem 2rem", textAlign: "center" }}>
      <p style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</p>
      <h2 style={{ marginBottom: "0.5rem" }}>No products found</h2>
      <p style={{ color: "var(--text-muted)" }}>Try a different search or category.</p>
    </div>
  );
}
