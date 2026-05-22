"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
    <>
      <NavBar />
      <div style={{ maxWidth: "1216px", margin: "0 auto", padding: "60px 40px", fontFamily: "'DM Sans', sans-serif" }}>

        {/* Hero text */}
        <p style={{ fontSize: "30px", fontWeight: "700", fontFamily: "Work Sans, sans-serif", color: "#f97316", letterSpacing: "2.8px", lineHeight: "20px", margin: "0 0 8px", textTransform: "uppercase" }}>
          MAGAZINE
        </p>
        <h1 style={{ fontSize: "96px", fontWeight: "400", fontFamily: "Manrope, sans-serif", margin: "0 0 16px", lineHeight: "96px", display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#0f172a", letterSpacing: "-4.8px" }}>Best </span>
          <span style={{ color: "#f97316", letterSpacing: "0px", lineHeight: "100%" }}>Digital Publishing</span>
        </h1>
        <p style={{ fontSize: "24px", fontWeight: "400", fontFamily: "Work Sans, sans-serif", color: "rgba(68, 71, 77, 0.7)", lineHeight: "32.5px", letterSpacing: "0px", margin: "0 0 48px", maxWidth: "761px" }}>
          All back editions for the magazine are available on the carousel below, click on any image to view that edition in full.
        </p>

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", fontFamily: "Manrope, sans-serif", }}>
          <h2 style={{fontSize: "30px", fontWeight: "400", fontFamily: "Manrope, sans-serif", color: "#0f172a", margin: 0, lineHeight: "36px", letterSpacing: "-0.75px" }}>
            <span className="border-b-3 border-[#D06600]">Recent</span> <span>Editions</span>
          </h2>
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { dir: -1, icon: <IoIosArrowBack size={16} />, disabled: page === 0 },
              { dir: 1, icon: <IoIosArrowForward size={16} />, disabled: page === totalPages - 1 },
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
      <Footer />
    </>
  );
}