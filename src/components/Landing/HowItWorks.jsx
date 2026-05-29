import { FaClipboard, FaRegCheckCircle, FaRegEdit } from "react-icons/fa";

const steps = [
  {
    icon: <FaRegEdit size={28} color="white"/>,
    title: "1. Post your job",
    desc: "Describe your project and location. It only takes 60 seconds.",
    active: true,
  },
  {
    icon: <FaClipboard size={28} color="#1e293b" />,
    title: "2. Get 3 Quotes",
    desc: "Verified professionals in your area will review and provide competitive quotes.",
    active: false,
  },
  {
    icon: <FaRegCheckCircle size={28} color="#fff" />,
    title: "3. Choose & Start",
    desc: "Review profiles and ratings, choose your pro, and get the job done right.",
    active: true,
  },
];

export default function HowItWorks() {
  return (
    <div style={{
      background: "#0f172a",
      padding: "80px 40px",
      textAlign: "center",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background circle decoration */}
      <div style={{
        position: "absolute", top: "-400px", right: "-400px",
        width: "800px", height: "800px", borderRadius: "50%",
        background: "rgba(255,255,255,0.04)", pointerEvents: "none",
      }} />

      <h2 style={{ fontSize: "42px", fontWeight: "700", color: "#fff", margin: "0 0 16px" }}>
        How it Works
      </h2>
      <p style={{ fontSize: "15px", color: "#94a3b8", maxWidth: "480px", margin: "0 auto 64px", lineHeight: 1.7 }}>
        Our streamlined process ensures you get the best local talent without the stress of endless phone calls.
      </p>

      {/* Steps */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", maxWidth: "860px", margin: "0 auto", position: "relative" }}>
        {/* Connector line */}
        <div style={{
          position: "absolute", top: "44px", left: "calc(16.66% + 40px)", right: "calc(16.66% + 40px)",
          height: "1px", background: "rgba(255,255,255,0.15)", zIndex: 0,
        }} />

        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", padding: "0 24px", position: "relative", zIndex: 1 }}>
            <div style={{
              width: "88px", height: "88px", borderRadius: "16px",
              background: step.active ? "#f97316" : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {step.icon}
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#fff", margin: 0 }}>
              {step.title}
            </h3>
            <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}