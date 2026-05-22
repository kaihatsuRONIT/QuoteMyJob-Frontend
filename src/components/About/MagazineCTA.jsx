
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";

export default function MagazineCTA() {
    return (
        <div style={{
            background: "#0f172a",
            padding: "72px 40px",
            fontFamily: "'Work Sans', sans-serif",
        }}>
            <div style={{
                maxWidth: "1216px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "60px",
            }}>

                {/* Left */}
                <div style={{ maxWidth: "576px", flexShrink: 0 }}>
                    <h2 style={{fontFamily:"Manrope", fontSize: "30px", fontWeight: "700", color: "#fff", margin: "0 0 16px", lineHeight: "36px" }}>
                        Stay Ahead with our Digital Magazine
                    </h2>
                    <p style={{ fontSize: "18px",fontWeight:"400", color: "#94a3b8", lineHeight:"29px", margin: "0 0 32px" }}>
                        Exclusive interviews with industry leaders, tool reviews, and deep dives into upcoming building regulations. Available to all members for free.
                    </p>

                    {/* Contact card */}
                    <div style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "14px",
                        padding: "24px 28px",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                            <IoIosHelpCircle size={18} color="#f97316" />
                            <span style={{ fontSize: "14px", fontWeight: "700", color: "#fff" }}>Get in Touch</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <CiMail size={14} color="#94a3b8" />
                                <span style={{ fontSize: "13px", color: "#94a3b8" }}>hello@quotemyjob.com</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <FaPhoneAlt size={14} color="#94a3b8" />
                                <span style={{ fontSize: "13px", color: "#94a3b8" }}>+44 (0) 800 123 4567</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — magazine images */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", flexShrink: 0 }}>
                    <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transform:"rotate(-3deg)"}}>
                        <img
                            src="/mag-cover.png"
                            alt="Magazine Cover"
                            style={{
                                width: "220px", height: "300px", objectFit: "cover", display: "block",
                                transform: "scale(1.72)"
                            }}
                        />
                    </div>
                    <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transform:"rotate(3deg)"}}>
                        <img
                            src="/mag-back.png"
                            alt="Magazine Back"
                            style={{
                                width: "220px", height: "300px", objectFit: "cover", display: "block",
                                transform: "scale(1.72)"
                            }}

                        />
                    </div>
                </div>

            </div>
        </div>
    );
}