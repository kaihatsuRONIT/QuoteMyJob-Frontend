export default function MasterplaceCTA() {
  return (
    <div style={{
      background: "#0f172a",
      padding: "80px 40px",
      textAlign: "center",
      fontFamily: "'Manrope', sans-serif",
      position: "relative",
    }}>
      <h2 style={{ fontSize: "36px", fontWeight: "700", color: "#fff", margin: "0 0 28px" }}>
        Ready to build your masterpiece?
      </h2>
      <button style={{
        background: "#f97316", color: "#fff", border: "none",
        borderRadius: "8px", padding: "14px 36px",
        fontSize: "16px", fontWeight: "600", cursor: "pointer",
        fontFamily: "inherit",
      }}>
        Post my Job
      </button>
    </div>
  );
}