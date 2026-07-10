"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const HeroSection = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <section
      style={{
        minHeight: "560px",
        // background: "linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 40%, #b8b8b8 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Barlow', sans-serif",
        padding: "40px 48px 52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "32px",
      }}
    >

      {/* Background Grid
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      /> */}

      {/* Background Overlay
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.18) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      /> */}

      {/* Inner Flex Row */}
      <div
        className="hero-wrap-inner"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ maxWidth: "900px", flex: 1 }}>
          {/* Tag */}
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "#D06600",
              textTransform: "uppercase",
              marginBottom: "35px",
              margin: "0 0 18px",
            }}
          >
            The Digital Foreman
          </p>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "78px",
              fontWeight: 600,
              lineHeight: 1.1,
              textTransform: "uppercase",
              color: "#01192F",
              margin: "0 0 20px",
            }}
          >
            The{" "}
            <span style={{ color: "#e87722" }}>UK &amp; Ireland&apos;s</span>
            <br />
            Premier <span style={{ color: "#e87722" }}>Building</span>
            <br />
            <span style={{ color: "#e87722" }}>Trade Directory</span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: "20px",
              color: "#3a4a5a",
              lineHeight: 1.28,
              maxWidth: "528px",
              maxHeight: "84px",
              marginBottom: "20px",
            }}
          >
            Skip the guesswork. Get direct access to vetted professionals and
            receive competitive quotes for your next project within hours.
          </p>

          {/* Hashtag */}
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif, 'Manrope'",
              fontSize: "50px",
              fontWeight: 600,
              color: "#515F78",
              lineHeight: "86px",
              letterSpacing: "-0.01em",
              marginBottom: "28px",
            }}
          >
            #BuildingBetterTogether
          </p>

          {/* Search Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#ffffff",
              borderRadius: "14px",
              padding: "8px 8px 8px 16px",
              maxWidth: "560px",
              boxShadow: "0 10px 24px rgba(1,25,47,0.3)",
              gap: 0,
            }}
          >
            {/* Service Field */}
            <div className="bg-[#F0F3FF] rounded-lg px-1.5 py-1.5" style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, paddingRight: "12px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a9aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <input className="search-input" type="text" placeholder="What service do you need?" />
            </div>

            {/* Divider */}
            <div style={{ width: "1px", height: "32px", background: "#e0e5ea", margin: "0 4px", flexShrink: 0 }} />

            {/* Postcode Field */}
            <div className="bg-[#F0F3FF] rounded-lg px-1.5 py-1.5" style={{ display: "flex", alignItems: "center", gap: "8px", flex: "0 0 auto" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a9aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input className="search-input" type="text" placeholder="Postcode" style={{ width: "90px" }} />
            </div>

            {/* Divider */}
            <div style={{ width: "1px", height: "32px", background: "#ffffff", margin: "0 4px", flexShrink: 0 }} />

            {/* CTA Button */}
            <button
              className="post-btn"
              style={{
                background: "#e87722",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 22px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "'Barlow', sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.15s",
              }}
              onClick={() => {
                if (!user) {
                  router.push("/login");
                } else if (user?.user?.role === "TRADESPERSON"){
                  router.push(`/tradesperson/dashboard/find-jobs`);
                }
                else{
                  router.push(`/customer/dashboard/new-job`);
                }
              }}
            >
              {user && user?.user?.role === "CUSTOMER" ? "Post my Job" : "Find Jobs"}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN — Testimonial Card */}
        <div className="right-col" style={{ flexShrink: 0, width: "479px" }}>
          <div
            className="testimonial-card"
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "20px 22px 18px",
              boxShadow: "0 8px 40px rgba(1,25,47,0.13)",
              display: "flex",
              flexDirection: "column",
              gap: "25px",
              transform: "rotate(2deg)",
            }}
          >
            {/* Card Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              {/* User Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #4a6a8a 0%, #1e3d5a 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                  }}

                >
                  <img className="rounded-md" src="AT.jpg" alt="Alex Thompson" />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#01192F", display: "flex", alignItems: "center", gap: "4px" }}>
                    Alex Thompson
                    <span
                      style={{
                        width: "14px",
                        height: "14px",
                        background: "#e87722",
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#6a7e90" }}>Sparky Solutions Ltd.</div>
                </div>
              </div>

              {/* Rating Badge */}
              <div
                style={{
                  background: "#eef3f8",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#01192F",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#e87722" }}>★</span> 4.9 (124)
              </div>
            </div>

            {/* Quote */}
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.55,
                color: "#515F78",
                marginBottom: "16px",
                borderLeft: "3px solid #e87722",
                paddingLeft: "10px",
                margin: "0 0 16px",
              }}
            >
              &ldquo;Quotemyjob helped me grow my kitchen fitting business by 40%
              this year. The quality of local leads is unmatched.&rdquo;
            </p>

            {/* Card Footer */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6a7e90" }}>
                Carpentry &amp; Joinery
              </span>
              <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e87722" }}>
                Verified Professional
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;