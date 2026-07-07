import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "#050505",
        color: "#ffffff",
        textAlign: "center"
      }}
    >
      <div style={{ maxWidth: 620 }}>
        <p style={{ color: "#CB6116", letterSpacing: "0.24em", textTransform: "uppercase", fontSize: 12, fontWeight: 800 }}>
          Fashion Gate
        </p>
        <h1 style={{ fontFamily: "var(--heading-font)", fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.9, margin: "18px 0" }}>
          Page not found
        </h1>
        <p style={{ color: "rgba(255,255,255,0.68)", lineHeight: 1.8, marginBottom: 32 }}>
          The destination you requested is not available. Return to the Boulevard and continue exploring.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            border: "1px solid rgba(255,255,255,0.28)",
            padding: "14px 28px",
            color: "#ffffff",
            textDecoration: "none",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontSize: 12,
            fontWeight: 800
          }}
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
