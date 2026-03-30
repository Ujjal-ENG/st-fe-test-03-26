import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

export default function SearchBar({ value, onChange, onSubmit, onClear }: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
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
      {value && (
        <button
          onClick={onClear}
          aria-label="Clear search"
          style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginLeft: "0.5rem" }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
