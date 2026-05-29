export default function AboutHero() {
  return (
    <>
      <style>{`
        .about-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          gap: 120px;
          max-width: 100vw;
          padding: 80px 40px;
          font-family: 'DM Sans', sans-serif;
        }
        .about-left { max-width: 560px; flex-shrink: 0; }
        .about-left h1 { font-size: 72px; }
        .about-left p.desc { font-size: 20px; }
        .about-right { position: relative; flex-shrink: 0; max-width: 580px; width: 100%; transform: rotate(1deg); }

        @media (min-width: 1600px) {
          .about-wrapper { gap: 160px; padding: 100px 80px; }
          .about-left { max-width: 640px; }
          .about-left h1 { font-size: 88px; }
          .about-left p.desc { font-size: 22px; }
          .about-right { max-width: 680px; }
        }
        @media (max-width: 1024px) {
          .about-wrapper { gap: 60px; padding: 60px 32px; }
          .about-left h1 { font-size: 56px; }
          .about-left p.desc { font-size: 17px; }
        }
        @media (max-width: 768px) {
          .about-wrapper { flex-direction: column; gap: 40px; padding: 48px 24px; }
          .about-left { max-width: 100%; }
          .about-left h1 { font-size: 44px; }
          .about-left p.desc { font-size: 16px; }
          .about-right { max-width: 100%; transform: none; }
        }
        @media (max-width: 480px) {
          .about-left h1 { font-size: 36px; }
          .about-left p.desc { font-size: 15px; }
          .about-wrapper { padding: 36px 16px; }
        }
      `}</style>

      <div className="about-wrapper" style={{fontFamily:"Work Sans"}}>
        {/* Left */}
        <div className="about-left">
          <p style={{ fontSize: "14px", fontWeight: "700", color: "#f97316", letterSpacing: "1.4px", margin: "0 0 16px" }}>
            #BUILDINGBETTERTOGETHER
          </p>
          <h1 style={{fontFamily:"Manrope",fontSize:"72px", fontWeight: "800", color: "#0f172a", margin: "0 0 20px", lineHeight: "72px" }}>
            About Us
          </h1>
          <p className="desc" style={{fontSize:"20px", color: "#515F78", lineHeight: "32.5px", margin: "0 0 36px", width: "100%" }}>
            Quotemyjob is more than just a marketplace. We are the digital backbone for modern tradespeople and the most trusted partner for homeowners.
          </p>
          <button style={{
            background: "#0f172a", color: "#fff", border: "none",
            borderRadius: "8px", padding: "14px 28px",
            fontSize: "15px", fontWeight: "600", cursor: "pointer",
            fontFamily: "inherit",
          }}>
            Terms & Conditions
          </button>
        </div>

        {/* Right */}
        <div className="about-right">
          <img
            src="/about-hero.png"
            alt="About Us"
            style={{ width: "100%", borderRadius: "16px", objectFit: "cover", display: "block", maxHeight: "460px" }}
          />
          <div style={{
            position: "absolute", bottom: "24px", left: "24px", right: "24px",
            background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)",
            borderRadius: "10px", padding: "14px 20px",
          }}>
            <p style={{ margin: 0, fontSize: "16px", color: "#fff", fontStyle: "italic", lineHeight:"24px" }}>
              "Precision in every quote, excellence in every build."
            </p>
          </div>
        </div>
      </div>
    </>
  );
}