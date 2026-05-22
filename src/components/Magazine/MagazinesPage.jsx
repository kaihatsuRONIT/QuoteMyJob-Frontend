"use client";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const magazines = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  src: `/mag-${i + 1}.png`,
  alt: `Magazine Issue ${i + 1}`,
}));

export default function MagazinePage() {
  const [page, setPage] = useState(0);
  const perPage = 10;
  const totalPages = Math.ceil(magazines.length / perPage);
  const visible = magazines.slice(page * perPage, page * perPage + perPage);

  return (
    <div style={{ maxWidth: "1216px", margin: "0 auto", padding: "60px 40px", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Hero text */}
      <p style={{ fontSize: "12px", fontWeight: "700", color: "#f97316", letterSpacing: "1.5px", margin: "0 0 8px" }}>
        MAGAZINE
      </p>
      <h1 style={{ fontSize: "56px", fontWeight: "800", color: "#0f172a", margin: "0 0 16px", lineHeight: 1.1 }}>
        <span style={{ color: "#0f172a" }}>Best </span>
        <span style={{ color: "#f97316" }}>Digital Publishing</span>
      </h1>
      <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.7, margin: "0 0 48px", maxWidth: "560px" }}>
        All back editions for the magazine are available on the carousel below, click on any image to view that edition in full.
      </p>

      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a", margin: 0 }}>Recent Editions</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { dir: -1, icon: <BsArrowLeft size={16} />, disabled: page === 0 },
            { dir: 1,  icon: <BsArrowRight size={16} />, disabled: page === totalPages - 1 },
          ].map(({ dir, icon, disabled }) => (
            <button
              key={dir}
              onClick={() => setPage((p) => p + dir)}
              disabled={disabled}
              style={{
                width: "34px", height: "34px",
                border: "1px solid #d1d5db", borderRadius: "6px",
                background: "#fff", display: "flex", alignItems: "center",
                justifyContent: "center", cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.4 : 1, color: "#374151",
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Grid — 5 cols x 2 rows */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
        {visible.map((mag) => (
          <div
            key={mag.id}
            style={{ borderRadius: "8px", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <img src={mag.src} alt={mag.alt} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
          </div>
        ))}
      </div>

    </div>
  );
}