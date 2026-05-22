"use client";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const magazines = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    src: `/mag-${i + 1}.png`,
    alt: `Magazine Issue ${i + 1}`,
}));

export default function RecentMagazine() {
    const [page, setPage] = useState(0);
    const perPage = 5;
    const totalPages = Math.ceil(magazines.length / perPage);
    const visible = magazines.slice(page * perPage, page * perPage + perPage);

    return (
        <div style={{ padding: "32px 24px", fontFamily: "'DM Sans', sans-serif" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <div>
                    <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a", margin: "0 0 6px" }}>
                        Recent Magazine
                    </h2>
                    <div style={{ width: "40px", height: "3px", background: "#e07b2a", borderRadius: "2px" }} />
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                    {[{ dir: -1, icon: <IoIosArrowBack size={16} />, disabled: page === 0 },
                    { dir: 1, icon: <IoIosArrowForward size={16} />, disabled: page === totalPages - 1 }]
                        .map(({ dir, icon, disabled }) => (
                            <button
                                key={dir}
                                onClick={() => setPage((p) => p + dir)}
                                disabled={disabled}
                                style={{
                                    width: "34px", height: "34px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    background: "#fff",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: disabled ? "not-allowed" : "pointer",
                                    opacity: disabled ? 0.4 : 1,
                                    color: "#374151",
                                }}
                            >
                                {icon}
                            </button>
                        ))}
                </div>
            </div>

            {/* Magazine Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
                {visible.map((mag) => (
                    <div
                        key={mag.id}
                        style={{
                            borderRadius: "6px",
                            overflow: "hidden",
                            cursor: "pointer",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <img
                            src={mag.src}
                            alt={mag.alt}
                            onError={(e) => { e.currentTarget.src = e.currentTarget.src.replace('.png', '.jpg'); }}
                            style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}