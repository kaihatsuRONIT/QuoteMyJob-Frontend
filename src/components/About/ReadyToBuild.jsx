import { BiArrowToRight } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { RiUserSearchLine } from "react-icons/ri";

export default function ReadyToBuild() {
  return (
    <div style={{ maxWidth: "1216px", margin: "0 auto", padding: "80px 40px", fontFamily: "'Work Sans', sans-serif" }}>

      <h2 style={{fontFamily:"Manrope", fontSize: "48px", fontWeight: "800", color: "#0f172a", textAlign: "center", margin: "0 0 48px", lineHeight:"48px" }}>
        Ready to Build Something Great?
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

        {/* Card 1 — Customer */}
        <div style={{
          background: "#f97316", borderRadius: "16px", padding: "36px 32px",
          display: "flex", flexDirection: "column", gap: "12px",
        }}>
          <RiUserSearchLine size={32} color="#fff" />
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#fff", margin: 0 }}>I'm a Customer</h3>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: 0 }}>
            Post your project and find the right tradesperson today.
          </p>
          <button style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "none", border: "none", color: "#fff",
            fontSize: "13px", fontWeight: "700", letterSpacing: "1px",
            cursor: "pointer", padding: 0, marginTop: "8px", fontFamily: "inherit",
          }}>
            Post my Job <BsArrowRight size={22}/>
          </button>
        </div>

        {/* Card 2 — Tradesperson */}
        <div style={{
          background: "#fff", borderRadius: "16px", padding: "36px 32px",
          display: "flex", flexDirection: "column", gap: "12px",
          boxShadow: "0px 32px 64px -12px #0D1C3214",
          border:"1px solid #0B1A301A"
        }}>
          <GrUserWorker size={32} color="#f97316" />
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>I'm a Tradesperson</h3>
          <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.65, margin: 0 }}>
            Grow your business and gain access to local high-quality leads.
          </p>
          <button style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "none", border: "none", color: "#f97316",
            fontSize: "13px", fontWeight: "700", letterSpacing: "1px",
            cursor: "pointer", padding: 0, marginTop: "8px", fontFamily: "inherit",
          }}>
            Join Quote My Job Trade Directory <BsArrowRight size={22}/>
          </button>
        </div>

      </div>
    </div>
  );
}