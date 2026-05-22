"use client";
import { useState } from "react";

export default function SignIn() {
    const [showPass, setShowPass] = useState(false);

    return (
        <>
            <div style={{
                minHeight: "100vh", background: "#f5f6fa",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                fontFamily: "'Work Sans', sans-serif",
                position: "relative", overflow: "hidden",
            }}>
                {/* BG image */}
                <img src="/signin-bg.png" alt="" style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", opacity: 0.12, pointerEvents: "none",
                }} />

                <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "600px", padding: "40px 24px", textAlign: "center" }}>

                    <a href="/" style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        fontSize: "14px", fontWeight: "500", color: "#475569",
                        textDecoration: "none", marginBottom: "32px",
                        fontFamily: "Work Sans, sans-serif",
                    }}>
                        ← Back to Home
                    </a>
                    {/* Heading */}
                    <h1 style={{ fontSize: "48px", fontWeight: "600", fontFamily: "Manrope, sans-serif", color: "#0f172a", margin: "0 0 8px", lineHeight: 1.2 }}>
                        Welcome back to the<br />
                        <span style={{ color: "#f97316" }}>Workspace.</span>
                    </h1>
                    <p style={{ fontSize: "16px", color: "#64748b", lineHeight: 1.7, margin: "0 0 36px", fontFamily: "Work Sans, sans-serif" }}>
                        Whether you're planning a renovation or building your professional reputation, we've got the tools to help you succeed.
                    </p>

                    {/* Card */}
                    <div style={{
                        background: "#fff", borderRadius: "16px", padding: "36px 40px",
                        boxShadow: "0px 8px 10px -6px #0D1C320D, 0px 20px 25px -5px #0D1C320D",
                        textAlign: "left",
                    }}>
                        <h2 style={{ fontSize: "24px", fontWeight: "600", fontFamily: "Manrope, sans-serif", color: "#0f172a", margin: "0 0 4px" }}>Sign In</h2>
                        <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 28px" }}>Your space to connect, manage, and grow.</p>

                        {/* Email */}
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#0f172a", display: "block", marginBottom: "8px" }}>
                                EMAIL ADDRESS
                            </label>
                            <input
                                type="email" placeholder="e.g. name@example.com"
                                style={{
                                    width: "100%", padding: "12px 16px", borderRadius: "8px",
                                    border: "1px solid #e2e8f0", fontSize: "14px", color: "#475569",
                                    fontFamily: "Work Sans, sans-serif", outline: "none",
                                    background: "#f8fafc", boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: "28px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                <label style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#0f172a" }}>PASSWORD</label>
                                <a href="#" style={{ fontSize: "13px", color: "#f97316", textDecoration: "none", fontWeight: "500" }}>Forgot password?</a>
                            </div>
                            <input
                                type={showPass ? "text" : "password"} defaultValue="••••••••"
                                style={{
                                    width: "100%", padding: "12px 16px", borderRadius: "8px",
                                    border: "1px solid #e2e8f0", fontSize: "14px", color: "#475569",
                                    fontFamily: "Work Sans, sans-serif", outline: "none",
                                    background: "#f8fafc", boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {/* Submit */}
                        <button style={{
                            width: "100%", padding: "14px", background: "#f97316",
                            color: "#fff", border: "none", borderRadius: "8px",
                            fontSize: "16px", fontWeight: "600", cursor: "pointer",
                            fontFamily: "Work Sans, sans-serif", marginBottom: "20px",
                        }}>
                            Log-in
                        </button>

                        <p style={{ textAlign: "center", fontSize: "14px", color: "#64748b", margin: 0 }}>
                            New here? <a href="/signup" style={{ color: "#f97316", fontWeight: "600", textDecoration: "none" }}>Create Account</a>
                        </p>
                    </div>

                    {/* Footer links */}
                    <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "32px" }}>
                        {["Help Center", "Privacy Policy", "Cookies"].map((item) => (
                            <a key={item} href="#" style={{ fontSize: "13px", color: "#64748b", textDecoration: "none" }}>{item}</a>
                        ))}
                    </div>
                    <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "12px" }}>
                        © 2024 QuoteMyJob. Built for Professionals.
                    </p>

                </div>
            </div>
        </>
    );
}