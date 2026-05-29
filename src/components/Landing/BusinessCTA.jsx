"use client";
import { useEffect, useState } from "react";

const leadsData = [
  { label: "New Lead: Bath Refurbishment", src: "/business-1.jpg", rotate: "3deg"  },
  { label: "New Lead: Garden Wall Repair", src: "/business-2.jpg", rotate: "-6deg" },
  { label: "New Lead: Smart Home Install", src: "/business-3.jpg", rotate: "-2deg" },
  { label: "New Lead: Loft Conversion",    src: "/business-4.jpg", rotate: "2deg"  },
];

const positions = {
  desktop: [
    { top: "0",     left: "0",     width: "230px", imgHeight: "160px" },
    { top: "-20px", left: "255px", width: "230px", imgHeight: "160px" },
    { top: "240px", left: "20px",  width: "230px", imgHeight: "160px" },
    { top: "225px", left: "258px", width: "230px", imgHeight: "160px" },
  ],
  tablet: [
    { top: "0",     left: "0",     width: "190px", imgHeight: "135px" },
    { top: "-15px", left: "205px", width: "190px", imgHeight: "135px" },
    { top: "210px", left: "10px",  width: "190px", imgHeight: "135px" },
    { top: "200px", left: "208px", width: "190px", imgHeight: "135px" },
  ],
  mobile: [
    { top: "0",     left: "0",     width: "140px", imgHeight: "100px" },
    { top: "-10px", left: "150px", width: "140px", imgHeight: "100px" },
    { top: "175px", left: "0",     width: "140px", imgHeight: "100px" },
    { top: "168px", left: "152px", width: "140px", imgHeight: "100px" },
  ],
};

const rightSize = {
  desktop: { width: "560px", height: "500px" },
  tablet:  { width: "430px", height: "420px" },
  mobile:  { width: "300px", height: "320px" },
};

function getBreakpoint(w) {
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export default function BusinessCTA() {
  const [bp, setBp] = useState("desktop");

  useEffect(() => {
    const update = () => setBp(getBreakpoint(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pos = positions[bp];
  const size = rightSize[bp];

  return (
    <div
      className="mx-auto my-20"
      style={{
        background: "#e8ecf7",
        borderRadius: "24px",
        padding: bp === "mobile" ? "32px 24px" : "50px 50px",
        display: "flex",
        flexDirection: bp === "desktop" ? "row" : "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "40px",
        fontFamily: "'DM Sans', sans-serif",
        maxWidth: "1216px",
        minHeight: "550px",
      }}
    >
      {/* Left */}
      <div style={{ maxWidth: bp === "desktop" ? "440px" : "100%", flexShrink: 0 }}>
        <h2 style={{ fontSize: bp === "mobile" ? "28px" : "42px", fontWeight: "700", color: "#0f172a", lineHeight: 1.25, margin: "0 0 16px" }}>
          Grow your business with Quotemyjob.
        </h2>
        <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.7, margin: "0 0 32px" }}>
          Join 1000+ verified professionals and start receiving quality leads in your immediate area today.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
          <button style={{
            background: "#f97316", color: "#fff", border: "none",
            borderRadius: "10px", padding: "14px 28px",
            fontSize: "15px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit",
          }}>Join Tradesperson Directory</button>
          <button style={{
            background: "#fff", color: "#0f172a", border: "none",
            borderRadius: "10px", padding: "14px 28px",
            fontSize: "15px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit",
          }}>Success Stories & Reviews</button>
        </div>
      </div>

      {/* Right */}
      <div style={{ position: "relative", width: size.width, height: size.height, flexShrink: 0 }}>
        {leadsData.map((lead, i) => (
          <div key={i} style={{
            position: "absolute",
            top: pos[i].top,
            left: pos[i].left,
            width: pos[i].width,
            background: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            transform: `rotate(${lead.rotate})`,
            zIndex: i % 2 === 0 ? 1 : 2,
          }}>
            <img src={lead.src} alt={lead.label} style={{
              width: "100%", height: pos[i].imgHeight,
              objectFit: "cover", display: "block", padding: "10px", borderRadius: "12px",
            }} />
            <div style={{ padding: "8px 10px" }}>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: "600", color: "#0f172a" }}>{lead.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}