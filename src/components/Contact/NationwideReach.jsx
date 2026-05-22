export default function NationwideReach() {
  return (
    <div style={{
      position: "relative",
      borderRadius: "0 0 48px 48px",
      overflow: "hidden",
      maxWidth: "1216px",
      height: "499px",
      margin: "0 auto",
      fontFamily: "'Work Sans', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>

      {/* BG image */}
      <img src="/uk-map.png" alt="" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover",
      }} />

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(8,13,26,0.55)",
      }} />

      {/* Center card */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
        padding: "40px 48px",
        maxWidth: "420px",
        textAlign: "center",
      }}>
        <h2 style={{fontFamily:"Manrope", fontSize: "36px", fontWeight: "800", color: "#0f172a", margin: "0 0 16px", lineHeight:"40px" }}>
          Nationwide Reach
        </h2>
        <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.75, margin: "0 0 28px" }}>
          We have a growing network of over 15,000 verified professionals across every county in the UK and Ireland. Wherever you are, the right trade is just a quote away.
        </p>
        <div style={{ display: "flex", gap: "32px", justifyContent: "center" }}>
          {[{ value: "98%", label: "COVERAGE" }, { value: "24hr", label: "RESPONSE" }].map((s) => (
            <div key={s.label}>
              <p style={{ fontSize: "28px", fontWeight: "700", color: "#f97316", margin: "0 0 2px" }}>{s.value}</p>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "1.5px", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}