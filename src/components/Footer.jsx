"use client";

const footerLinks = [
  { heading: "Marketplace", links: ["Browse Categories", "For Tradespeople", "Success Stories"] },
  { heading: "Resources",   links: ["Safety & Trust", "Support Center", "Help Guides"] },
  { heading: "Company",     links: ["Contact Info", "About Us", "Careers"] },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1e2a3b", fontFamily: "'DM Sans', sans-serif", color: "#cbd5e1" }}>
      <style>{`
        .footer-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 70px; }
        .footer-bottom { display: flex; align-items: center; justify-content: space-between; }
        .footer-bottom-links { display: flex; gap: 24px; }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
          .footer-bottom-links { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>

      {/* Main */}
      <div className="footer-grid" style={{ maxWidth: "100vw", margin: "0 auto", padding: "56px", justifyContent:"space-evenly" }}>

        {/* Brand */}
        <div style={{marginLeft:"-20px"}}>
          <div style={{ marginBottom: "16px"}}>
            <img src="/websiteLogoBgRem.png" style={{ width: "auto", height: "auto", mixBlendMode: "screen", marginTop:"-52px" }} />
          </div>
          <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.7, margin: 0, maxWidth: "200px", margin:"auto", marginTop:"-73px" }}>
            Connecting the best trades with the best projects since 2024.
          </p>
        </div>

        {/* Link columns */}
        {footerLinks.map((col) => (
          <div key={col.heading}>
            <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#fff", margin: "0 0 20px" }}>
              {col.heading}
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}
                    onMouseEnter={(e) => e.target.style.color = "#fff"}
                    onMouseLeave={(e) => e.target.style.color = "#94a3b8"}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

      {/* Bottom bar */}
      <div className="footer-bottom" style={{ maxWidth: "100vw", padding: "20px 40px", justifyContent:"space-between" }}>
        <span style={{ fontSize: "12px", color: "#64748b" }}>
          © 2026 Quotemyjob. Built for professionals.
        </span>
        <div className="footer-bottom-links">
          {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
            <a key={item} href="#" style={{ fontSize: "12px", color: "#64748b", textDecoration: "none" }}
              onMouseEnter={(e) => e.target.style.color = "#fff"}
              onMouseLeave={(e) => e.target.style.color = "#64748b"}
            >{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}