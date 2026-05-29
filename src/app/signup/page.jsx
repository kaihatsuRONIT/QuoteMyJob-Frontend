"use client";
import { useState } from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdPerson, MdAlternateEmail, MdEmail, MdPhone, MdLocationOn, MdLock, MdLockClock, MdVisibilityOff, MdVisibility } from "react-icons/md";

const fields = {
  customer: [
    {
      row: [{ label: "FULL NAME", icon: <MdPerson size={13} />, placeholder: "John Doe", type: "text" },
      { label: "USERNAME", icon: <MdAlternateEmail size={13} />, placeholder: "johndoe88", type: "text" }]
    },
    {
      row: [{ label: "EMAIL ADDRESS", icon: <MdEmail size={13} />, placeholder: "john@example.com", type: "email" },
      { label: "PHONE NUMBER", icon: <MdPhone size={13} />, placeholder: "+1 (555) 000-0000", type: "tel" }]
    },
    { full: { label: "FULL ADDRESS", icon: <MdLocationOn size={13} />, placeholder: "Enter your site or home address" } },
  ],
  tradesperson: [
    {
      row: [{ label: "FULL NAME", icon: <MdPerson size={13} />, placeholder: "John Doe", type: "text" },
      { label: "USERNAME", icon: <MdAlternateEmail size={13} />, placeholder: "johndoe_pro", type: "text" }]
    },
    {
      row: [{ label: "EMAIL ADDRESS", icon: <MdEmail size={13} />, placeholder: "john@company.com", type: "email" },
      { label: "PHONE NUMBER", icon: <MdPhone size={13} />, placeholder: "+1 (555) 000-0000", type: "tel" }]
    },
    { full: { label: "BUSINESS/HOME ADDRESS", icon: <MdLocationOn size={13} />, placeholder: "Enter your full business or home address" } },
  ],
};

export default function SignUp() {
  const [role, setRole] = useState("customer");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: "8px",
    border: "1px solid #e2e8f0", fontSize: "14px", color: "#475569",
    fontFamily: "Work Sans, sans-serif", outline: "none",
    background: "#f0f3ff", boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: "13px", fontWeight: "600", color: "#0f172a",
    display: "block", marginBottom: "8px",
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f5f6fa",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Work Sans', sans-serif",
      padding: "40px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: "620px" }}>

        {/* Back */}
        <a href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "14px", fontWeight: "500", color: "#475569",
          textDecoration: "none", marginBottom: "32px",
        }}>← Back to Home</a>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          {
            role === "customer" ? (
              <>
                <h1 style={{ fontSize: "40px", fontWeight: "600", fontFamily: "Manrope, sans-serif", color: "#0f172a", margin: "0 0 12px" }}>
                  Join the Digital Foreman
                </h1>
                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                  Your dream project is just a few quotes away. Connect with the best local tradespeople today.
                </p>
              </>
            ) : (
              <>
              <IoShieldCheckmark style={{margin: '0 auto', textAlign: 'center'}} size={30}/>
                <h1 style={{ fontSize: "40px", fontWeight: "600", fontFamily: "Manrope, sans-serif", color: "#0f172a", margin: "0 0 12px" }}>
                  Build Your Future
                </h1>
                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.7, margin: 0, maxWidth:"350px",margin: '0 auto', textAlign: 'center'}}>
                  Join the elite network of professional
                  tradespeople and secure high-value contracts
                  today.
                </p>
              </>
            )
          }
        </div>

        {/* Card */}
        <div style={{
          background: "#fff", borderRadius: "20px", padding: "36px 40px",
          boxShadow: "0px 8px 10px -6px #0D1C320D, 0px 20px 25px -5px #0D1C320D",
        }}>

          {/* Toggle */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            background: "#f0f3ff", borderRadius: "10px", padding: "4px",
            marginBottom: "28px",
          }}>
            {[{ key: "customer", label: "As a Customer" }, { key: "tradesperson", label: "As a Tradesperson" }].map((r) => (
              <button key={r.key} onClick={() => setRole(r.key)} style={{
                padding: "10px", borderRadius: "8px", border: "none",
                background: role === r.key ? "#fff" : "transparent",
                color: "#0f172a", fontSize: "14px", fontWeight: "600",
                cursor: "pointer", fontFamily: "inherit",
                boxShadow: role === r.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.2s",
              }}>{r.label}</button>
            ))}
          </div>

          {fields[role].map((group, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              {group.row && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {group.row.map((f) => (
                    <div key={f.label}>
                      <label style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#0f172a", display: "flex", alignItems: "center", gap: "5px", marginBottom: "8px" }}>
                        {f.icon} {f.label}
                      </label>
                      <input type={f.type} placeholder={f.placeholder} style={inputStyle} />
                    </div>
                  ))}
                </div>
              )}
              {group.full && (
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#0f172a", display: "flex", alignItems: "center", gap: "5px", marginBottom: "8px" }}>
                    {group.full.icon} {group.full.label}
                  </label>
                  <textarea placeholder={group.full.placeholder} rows={3} style={{ ...inputStyle, resize: "none" }} />
                </div>
              )}
            </div>
          ))}

          {/* Row 3 — passwords */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
            {[
              { label: "Password", icon: <MdLock />, show: showPass, toggle: () => setShowPass(!showPass) },
              { label: "Confirm Password", icon: <MdLockClock />, show: showConfirm, toggle: () => setShowConfirm(!showConfirm) },
            ].map((f) => (
              <div key={f.label}>
                <div className="flex flex-row gap-1">
                  {f.icon}
                  <label style={labelStyle}>{f.label}</label>
                </div>
                <div style={{ position: "relative" }}>
                  <input type={f.show ? "text" : "password"} defaultValue="••••••••" style={{ ...inputStyle, paddingRight: "40px" }} />
                  <span onClick={f.toggle} style={{
                    position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                    cursor: "pointer", color: "#94a3b8",
                  }}>
                    {f.show ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button style={{
            width: "100%", padding: "15px", background: "#f97316",
            color: "#fff", border: "none", borderRadius: "10px",
            fontSize: "16px", fontWeight: "600", cursor: "pointer",
            fontFamily: "inherit", marginBottom: "20px",
          }}>
            Create Account
          </button>

          <p style={{ textAlign: "center", fontSize: "14px", color: "#64748b", margin: 0 }}>
            Already Have an Account ? <a href="/login" style={{ color: "#f97316", fontWeight: "600", textDecoration: "none" }}>Login Here</a>
          </p>
        </div>

        {/* Footer links */}
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "32px" }}>
          {["Help Center", "Privacy Policy", "Cookies"].map((item) => (
            <a key={item} href="#" style={{ fontSize: "13px", color: "#64748b", textDecoration: "none" }}>{item}</a>
          ))}
        </div>
        <p className="text-center" style={{ fontSize: "12px", color: "#94a3b8", marginTop: "12px" }}>
          © 2024 QuoteMyJob. Built for Professionals.
        </p>

      </div>
    </div>
  );
}