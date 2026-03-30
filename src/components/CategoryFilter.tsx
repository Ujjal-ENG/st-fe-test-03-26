const CATEGORIES = ["Electronics", "Clothing", "Home", "Outdoors"];

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <select
      className="glass-panel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
  );
}
