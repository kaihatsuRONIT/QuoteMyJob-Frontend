"use client";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" stroke="#F97316" strokeWidth="1.5" fill="none" />
    <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TradesIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="22" r="11" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
    <path d="M10 52c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="48" cy="18" r="6" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
    <path d="M44 12l-3-3M52 12l3-3M54 20l4 1M54 16l4-1" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 13l4-5 3 3 4-6 3 3" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 7h3v3" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function RoleSelector() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{
      minHeight: "85vh",
      backgroundColor:"#F0F3FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .role-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .role-card:hover { transform: translateY(-2px); }
        .btn-dark { transition: background 0.2s ease; }
        .btn-dark:hover { background: #2d3748 !important; }
        .btn-light { transition: background 0.2s ease, box-shadow 0.2s ease; }
        .btn-light:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.15) !important; }
      `}</style>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        maxWidth: "1000px",
        width: "100%",
      }}>

        {/* Card 1 — I need a job done */}
        <div
          className="role-card"
          style={{
            width:"auto",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "52px 48px",
            display: "flex",
            flexDirection: "column",
            gap: "0",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Icon top-right */}
          <div style={{ position: "absolute", top: "28px", right: "28px", opacity: 0.2 }}>
            <FaHome size={70} />
          </div>

          <h2 style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#0f172a",
            margin: "0 0 12px",
            lineHeight: 1.2,
            maxWidth: "220px",
          }}>
            I need a job done
          </h2>

          <p style={{
            fontSize: "16px",
            color: "#64748b",
            lineHeight: 1.65,
            margin: "0 0 24px",
            maxWidth: "320px",
          }}>
            From leaky taps to full extensions, connect with top-rated local tradespeople who are ready to work.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "44px" }}>
            {["100% Free to use", "Vetted professionals only"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckIcon />
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#1e293b" }}>{item}</span>
              </div>
            ))}
          </div>

          <button
            className="btn-dark"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#0f172a",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "16px 28px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              width: "fit-content",
              fontFamily: "inherit",
            }}
          >
            Post your project
            <ArrowIcon />
          </button>
        </div>

        {/* Card 2 — I am a tradesperson */}
        <div
          className="role-card"
          style={{
            background: "#0f172a",
            borderRadius: "20px",
            padding: "52px 48px",
            display: "flex",
            flexDirection: "column",
            gap: "0",
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Icon top-right */}
          <div style={{ position: "absolute", top: "28px", right: "28px", opacity:"0.2" }}>
            <GrUserWorker color="white" size={70} />
          </div>

          <h2 style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#ffffff",
            margin: "0 0 12px",
            lineHeight: 1.2,
            maxWidth: "220px",
          }}>
            I am a tradesperson
          </h2>

          <p style={{
            fontSize: "16px",
            color: "#94a3b8",
            lineHeight: 1.65,
            margin: "0 0 24px",
            maxWidth: "320px",
          }}>
            Grow your business with a steady stream of verified local leads tailored to your expertise.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "44px" }}>
            {["Access high-intent leads", "Build your digital reputation"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckIcon />
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#e2e8f0" }}>{item}</span>
              </div>
            ))}
          </div>

          <button
            className="btn-light"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#ffffff",
              color: "#0f172a",
              border: "none",
              borderRadius: "10px",
              padding: "16px 28px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              width: "fit-content",
              fontFamily: "inherit",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            Join as a Pro
            <TrendIcon />
          </button>
        </div>

      </div>
    </div>
  );
}