import { BiTachometer } from "react-icons/bi";
import { LuMapPin } from "react-icons/lu";
import { MdDevices } from "react-icons/md";

const features = [
  {
    icon: <LuMapPin size={20} color="#f97316" />,
    title: "40-Mile Radius",
    desc: "Post a job and our intelligent system instantly notifies all qualified tradespeople within a 40-mile radius, ensuring local expertise.",
    dark: false,
  },
  {
    icon: <BiTachometer size={20} color="#f97316" />,
    title: "Rapid Quoting",
    desc: "No more waiting weeks for a reply. Our streamlined platform encourages faster professional responses and detailed, transparent quotes.",
    dark: true,
  },
  {
    icon: <MdDevices size={20} color="#f97316" />,
    title: "Device Agnostic",
    desc: "Access your dashboard, message trades, or read our latest magazine issues seamlessly on your phone, tablet, or desktop.",
    dark: false,
  },
];

export default function Advantage() {
  return (
    <div style={{ maxWidth: "1216px", margin: "0 auto", padding: "80px 40px", fontFamily: "'Work Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={{fontFamily:"Manrope", fontSize: "36px", fontWeight: "800", color: "#0f172a", margin: "0 0 12px", lineHeight:"40px" }}>
          The Quotemyjob Advantage
        </h2>
        <p style={{ fontSize: "15px", color: "#64748b", margin: 0 }}>
          Innovative features designed to streamline the project lifecycle for both sides.
        </p>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", alignItems: "center" }}>
        {features.map((f) => (
          <div key={f.title} style={{
            background: f.dark ? "#0f172a" : "#fff",
            borderRadius: "16px",
            padding: f.dark ? "48px 36px" : "36px 28px",
            boxShadow: f.dark ? "0 8px 32px rgba(0,0,0,0.15)" : "0px 32px 64px -12px #0D1C3214",
            transform: f.dark ? "scale(1.05)" : "scale(1)",
          }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: f.dark ? "rgba(255,255,255,0.1)" : "#fff3e8",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "28px",
            }}>
              {f.icon}
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: f.dark ? "#fff" : "#0f172a", margin: "0 0 14px" }}>
              {f.title}
            </h3>
            <p style={{ fontSize: "14px", color: f.dark ? "#94a3b8" : "#475569", lineHeight: 1.75, margin: 0 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}