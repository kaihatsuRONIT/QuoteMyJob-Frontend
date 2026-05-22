const stats = [
    { value: "100+", label: "MAGAZINES PUBLISHED" },
    { value: "33,000+", label: "DISTRIBUTION REACH" },
    { value: "20,000+", label: "MONTHLY PAGE VIEWS" },
    { value: "10M+", label: "TOTAL PAGE VIEWS" },
];

export default function StatsAndCTA() {
    return (
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 40px", fontFamily: "'Work Sans', sans-serif" }}>


            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "48px" }}>
                {stats.map((s) => (
                    <div key={s.label} className="mx-auto">
                        <h2 style={{ fontSize: "48px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px", lineHeight: 1 }}>
                            {s.value}
                        </h2>
                        <p style={{ fontSize: "11px", fontWeight: "700", color: "#f97316", letterSpacing: "1.5px", margin: "0 0 10px" }}>
                            {s.label}
                        </p>
                        <div style={{ width: "32px", height: "3px", background: "#f97316", borderRadius: "2px" }} />
                    </div>
                ))}
            </div>


            {/* CTA Banner */}
            <div style={{
                background: "#0f172a",
                width: "1216px",
                borderRadius: "48px",
                padding: "64px 40px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Network pattern overlay */}
                <img src="/network.png" alt="" style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", opacity: 0.15, pointerEvents: "none",
                }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                    <h2 style={{fontFamily:"Manrope", fontSize: "48px", fontWeight: "700", color: "#fff", margin: "0 0 32px", lineHeight: "48px" }}>
                        Ready to join the elite<br />network of professionals?
                    </h2>
                    <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                        <button style={{
                            background: "#f97316", color: "#fff", border: "none",
                            borderRadius: "8px", padding: "14px 32px",
                            fontSize: "15px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit",
                        }}>Apply as a Pro</button>
                        <button style={{
                            background: "transparent", color: "#fff",
                            border: "1px solid rgba(255,255,255,0.4)",
                            borderRadius: "8px", padding: "14px 32px",
                            fontSize: "15px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit",
                        }}>Contact Sales</button>
                    </div>
                </div>
            </div>

        </div>
    );
}