export default function TeamHero() {
  return (
    <div style={{
      position: "relative",
      background: "#0a0f1e",
      overflow: "hidden",
      padding: "80px 60px 100px",
      fontFamily: "'Work Sans', sans-serif",
      minHeight: "420px",
    }}>

      {/* BG image — replace with your actual architectural grid image */}
      <img
        src="/team-hero-bg.png"
        alt=""
        style={{
          position: "absolute", top: 0, right: 0,
          height: "100%", width: "60%",
          objectFit: "cover", objectPosition: "left",
          opacity: 0.3, pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "740px" }}>

        {/* Badge */}
        <div style={{
          display: "inline-block",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "20px",
          padding: "6px 14px",
          fontSize: "11px",
          fontWeight: "700",
          letterSpacing: "1.5px",
          color: "#D06600",
          marginBottom: "28px",
        }} className="bg-[#D06600]/10">
          EXPERTISE & AUTHORITY
        </div>

        <h1 style={{fontFamily:"Manrope", fontSize: "72px", fontWeight: "800", lineHeight: "72px", margin: "0 0 24px", width:"100%" }}>
          <span style={{ color: "#fff" }}>Meet the Team — The<br />Minds Behind the<br /></span>
          <span style={{ color: "#f97316" }}>Digital Foreman</span>
          <span style={{ color: "#fff" }}>.</span>
        </h1>

        <p style={{ fontSize: "20px", lineHeight: "32.5px", margin: 0, maxWidth: "571px", fontWeight:"300",letterSpacing:"0px" }} className="text-[#B9C7E4]/65">
          Bridging the gap between architectural precision and digital innovation. We are the publishers, developers, and strategists defining the future of trade services.
        </p>

      </div>
    </div>
  );
}