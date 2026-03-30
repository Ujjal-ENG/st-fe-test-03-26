import { AlertTriangle, RotateCcw } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
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
        <p style={{ color: "var(--text-muted)", maxWidth: "400px" }}>{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="btn-primary"
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        <RotateCcw size={16} />
        Try Again
      </button>
    </div>
  );
}
