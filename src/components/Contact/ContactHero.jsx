export default function ContactHero() {
    return (
        <div style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            maxWidth: "1216px",
            height: "499px",
            margin: "0 auto",
            fontFamily: "'DM Sans', sans-serif",
            display: "flex",
            alignItems: "center",
            background: "linear-gradient(90deg, rgba(13,28,50,1) 45%, rgba(13,28,50,0.6) 75%, rgba(13,28,50,0.2) 100%)",
        }}>

            {/* BG image */}
            <img src="/contact-hero.png" alt="" style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "right center",
            }} />

            {/* Dark overlay — left heavy */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg, #080d1a 45%, rgba(8,13,26,0.6) 75%, rgba(8,13,26,0.2) 100%)",
            }} />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1, padding: "80px", maxWidth: "800px" }}>
                <div style={{
                    display: "inline-block",
                    borderRadius: "13px", padding: "5px 12px",
                    fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px",
                    color: "#fff", marginBottom: "24px",
            }} className="bg-[#D06600]">
                    CONTACT US
                </div>
                <div style={{maxWidth: "100%" }}>
                    <h1 style={{ fontSize: "72px", fontWeight: "400", fontFamily: "Manrope, sans-serif", color: "#fff", margin: "0 0 8px", lineHeight: "72px", letterSpacing: "-3.6px" }}>
                        The Digital Foreman
                    </h1>
                    <h1 style={{ fontSize: "72px", fontWeight: "400", fontFamily: "Manrope, sans-serif", margin: "0 0 24px", lineHeight: "72px", letterSpacing: "-3.6px" }}>
                        <span style={{ color: "#fff" }}>is </span>
                        <span style={{ color: "#f97316" }}>at your service.</span>
                    </h1>
                </div>

                <p style={{ fontSize: "20px", fontWeight: "400", fontFamily: "Work Sans, sans-serif", color: "rgba(148,163,184,1)", lineHeight: "28px", letterSpacing: "0px", margin: 0, width: "490.92px", height: "84px" }}>
                    Whether you're a homeowner looking for the right pro or a tradesperson scaling your business, we're here to bridge the gap.
                </p>
            </div>

        </div>
    );
}