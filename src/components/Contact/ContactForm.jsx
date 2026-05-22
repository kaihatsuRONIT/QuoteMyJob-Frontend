import { MdMail, MdOutlineArticle, MdLocationOn, MdOpenInNew } from "react-icons/md";

export default function ContactForm() {
    return (
        <div style={{
            maxWidth: "1216px", margin: "0 auto", padding: "60px 40px", minHeight: "100vh",
            fontFamily: "'Work Sans', sans-serif",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px",
        }}>

            {/* Left — Form */}
            <div>
                <h2 style={{fontFamily:"Manrope", fontSize: "30px", fontWeight: "400", color: "#0f172a", margin: "0 0 32px" }}>
                    Send us a Message
                </h2>

                {/* Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                        <label style={{fontFamily:"Work sans", fontSize: "13px", fontWeight: "500", color: "#0f172a", display: "block", marginBottom: "8px" }}>Full Name</label>
                        <input placeholder="John Doe" style={{
                            width: "100%", padding: "12px 14px", borderRadius: "8px",
                            border: "1px solid #e2e8f0", fontSize: "14px", color: "#475569",
                            fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                            background: "#f8fafc",
                        }} />
                    </div>
                    <div>
                        <label style={{fontFamily:"Work sans", fontSize: "13px", fontWeight: "500", color: "#0f172a", display: "block", marginBottom: "8px" }}>Email Address</label>
                        <input placeholder="john@example.com" style={{
                            width: "100%", padding: "12px 14px", borderRadius: "8px",
                            border: "1px solid #e2e8f0", fontSize: "14px", color: "#475569",
                            fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                            background: "#f8fafc",
                        }} />
                    </div>
                </div>

                {/* Subject */}
                <div style={{ marginBottom: "16px" }}>
                    <label style={{fontFamily:"Work sans", fontSize: "13px", fontWeight: "500", color: "#0f172a", display: "block", marginBottom: "8px" }}>Subject</label>
                    <select style={{
                        width: "100%", padding: "12px 14px", borderRadius: "8px",
                        border: "1px solid #e2e8f0", fontSize: "14px", color: "#475569",
                        fontFamily: "inherit", outline: "none", background: "#f8fafc",
                        appearance: "none", cursor: "pointer",
                    }}>
                        <option>General Inquiry</option>
                        <option>Support</option>
                        <option>Partnership</option>
                        <option>Other</option>
                    </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "24px" }}>
                    <label style={{fontFamily:"Work sans", fontSize: "13px", fontWeight: "500", color: "#0f172a", display: "block", marginBottom: "8px" }}>Your Message</label>
                    <textarea placeholder="How can our team help you today?" rows={5} style={{
                        width: "100%", padding: "12px 14px", borderRadius: "8px",
                        border: "1px solid #e2e8f0", fontSize: "14px", color: "#475569",
                        fontFamily: "inherit", outline: "none", resize: "none",
                        background: "#f8fafc", boxSizing: "border-box",
                    }} />
                </div>

                {/* Submit */}
                <button style={{
                    width: "100%", padding: "16px", background: "#f97316",
                    color: "#fff", border: "none", borderRadius: "10px",
                    fontSize: "16px", fontWeight: "600", cursor: "pointer",
                    fontFamily: "Manrope", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: "8px",
                }}>
                    Submit Message
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>

            {/* Right */}
            <div>

                {/* Direct Channels */}
                <h3 style={{ fontFamily: "Manrope", fontSize: "24px", fontWeight: "400", color: "#0f172a", margin: "0 0 20px", lineHeight: "32px", letterSpacing: "0px" }}>Direct Channels</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
                    {[
                        { icon: <MdMail size={18} color="#f97316" />, label: "EMAIL SUPPORT", value: "support@quotemyjob.co.uk", link: true },
                        { icon: <MdOutlineArticle size={18} color="#64748b" />, label: "SELF SERVICE", value: "Visit Help Center", link: true },
                    ].map((item) => (
                        <div key={item.label} style={{
                            display: "flex", alignItems: "center", gap: "16px",
                            background: "#F0F3FF", borderRadius: "10px", padding: "16px 20px",
                            borderLeft: `3px solid ${item.label === "EMAIL SUPPORT" ? "#f97416b2" : "#000000a0"}`,
                        }}>
                            <div style={{
                                width: "40px", height: "40px", borderRadius: "8px",
                                background: `${item.label === "EMAIL SUPPORT" ? "#fcdbc486" : "#b8b8b81a"}`, display: "flex", alignItems: "center",
                                justifyContent: "center", flexShrink: 0,
                                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                            }}>
                                {item.icon}
                            </div>
                            <div>
                                <p style={{ fontSize: "11px", fontWeight: "700", color: "#0f172a", letterSpacing: "1px", margin: "0 0 2px" }}>{item.label}</p>
                                <p style={{fontFamily:"Manrope", fontSize: "14px", fontWeight: "600", color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "4px" }}>
                                    {item.value} {item.link && <MdOpenInNew size={12} color="#94a3b8" />}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Locations */}
                <div className="flex flex-col gap-5">
                    <h3 style={{ fontFamily: "Manrope", fontSize: "24px", fontWeight: "400", color: "#0f172a", margin: "0 0 20px", lineHeight: "32px", letterSpacing: "0px" }}>Our Locations</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                        {[
                            { name: "UK Headquarters", lines: ["128 City Road", "London, EC1V 2NX", "United Kingdom"] },
                            { name: "Ireland Office", lines: ["Digital Hub, Thomas Street", "Dublin 8, D08 TCV4", "Ireland"] },
                        ].map((loc) => (
                            <div key={loc.name} style={{ display: "flex", gap: "12px" }}>
                                <MdLocationOn size={18} color="#f97316" style={{ flexShrink: 0, marginTop: "2px" }} />
                                <div>
                                    <p style={{fontFamily:"Manrope", fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px", lineHeight:"24px", letterSpacing:"0px" }}>{loc.name}</p>
                                    {loc.lines.map((l) => (
                                        <p key={l} style={{fontFamily:"Work sans", fontSize: "13px", color: "#64748b", margin: "0 0 2px" }}>{l}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}