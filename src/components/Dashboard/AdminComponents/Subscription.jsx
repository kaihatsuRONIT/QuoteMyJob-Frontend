const plans = [
    {
        tier: "Client Tier",
        name: "FREE",
        price: "£0",
        period: "30 Days",
        features: [
            { label: "2 Job Listings", active: true },
            { label: "Standard Support", active: true },
            { label: "Analytics Dashboard", active: false },
        ],
        popular: false,
        dark: false,
        btnStyle: "dark",
        icon: "🏠",
    },
    {
        tier: "Client Tier",
        name: "BASIC",
        price: "£100",
        period: "30 Days",
        features: [
            { label: "10 Job Listings", active: true, bold: true },
            { label: "Priority Support", active: true },
            { label: "Analytics Dashboard", active: true },
        ],
        popular: true,
        dark: false,
        btnStyle: "orange",
        icon: "📋",
    },
    {
        tier: "Provider Tier",
        name: "PREMIUM",
        price: "£300",
        period: "30 Days",
        features: [
            { label: "50 Applications", active: true, bold: true },
            { label: "Featured Profile", active: true },
            { label: "Master Foreman Tools", active: true },
        ],
        popular: false,
        dark: true,
        btnStyle: "white",
        icon: "📐",
    },
];
const stats = [
    { icon: "📈", title: "Active Subscription Growth", sub: "+12% from previous cycle", arrow: true },
    { icon: "⚙️", title: "Node Load Optimization", sub: null },
    { icon: "🛡️", title: "Compliance & Audits", sub: null },
];

export default function Subscription() {
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px", border: "1px solid #e8e8e8", borderRadius: 12, background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>

                <div style={{ maxWidth: 400 }}>
                    <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 26, fontWeight: 800, color: "#111", margin: "0 0 10px", lineHeight: 1.3 }}>
                        Subscription Matrix:{" "}
                        <span style={{ color: "#f97316" }}>Manage Plans</span>
                    </h2>
                    <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.6 }}>
                        Configure service tiers, pricing, and operational limits for both Client and Provider nodes within the Foreman ecosystem.
                    </p>
                </div>

                <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Work Sans', sans-serif", whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: 15 }}>🚀</span> Deploy New Plan
                </button>

            </div>
            <SubscriptionMatrixBody/>
        </>
    );
}
function FeatureItem({ feature, dark }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 16, color: feature.active ? "#f97316" : "#ccc" }}>
                {feature.active ? "✅" : "⊘"}
            </span>
            <span style={{
                fontSize: 13,
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: feature.bold ? 700 : 400,
                color: feature.active ? (dark ? "#fff" : "#111") : "#aaa",
                textDecoration: feature.active ? "none" : "line-through",
            }}>
                {feature.label}
            </span>
        </div>
    );
}
function SubscriptionMatrixBody() {
    return (
        <div style={{ padding: "24px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>

            {/* Plans Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 24, alignItems: "start" }}>
                {plans.map((plan) => (
                    <div key={plan.name} style={{
                        background: plan.dark ? "#0f172a" : "#fff",
                        border: plan.popular ? "2px solid #f97316" : "1px solid #e8e8e8",
                        borderRadius: 14,
                        padding: "24px 22px",
                        position: "relative",
                        marginTop: plan.popular ? 0 : 0,
                    }}>

                        {/* Popular badge */}
                        {plan.popular && (
                            <div style={{
                                position: "absolute", top: -1, right: -1,
                                background: "#f97316", color: "#fff",
                                fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
                                padding: "6px 14px", borderRadius: "0 12px 0 12px",
                                fontFamily: "'Work Sans', sans-serif",
                            }}>POPULAR</div>
                        )}

                        {/* Tier + Icon */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                            <span style={{
                                fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
                                background: plan.dark ? "#1e293b" : "#f0f0f8",
                                color: plan.dark ? "#94a3b8" : "#555",
                                padding: "4px 10px", borderRadius: 20,
                                fontFamily: "'Work Sans', sans-serif",
                            }}>{plan.tier.toUpperCase()}</span>
                            <span style={{ fontSize: 22, opacity: 0.25 }}>{plan.icon}</span>
                        </div>

                        {/* Name */}
                        <h2 style={{
                            fontFamily: "Manrope, sans-serif", fontSize: 32, fontWeight: 900,
                            color: plan.dark ? "#fff" : "#111", margin: "6px 0 4px",
                        }}>{plan.name}</h2>

                        {/* Price */}
                        <div style={{ marginBottom: 20 }}>
                            <span style={{ fontSize: 22, fontWeight: 800, color: "#f97316", fontFamily: "Manrope, sans-serif" }}>{plan.price}</span>
                            <span style={{ fontSize: 13, color: plan.dark ? "#94a3b8" : "#888", marginLeft: 6 }}>/ {plan.period}</span>
                        </div>

                        {/* Features */}
                        <div style={{ marginBottom: 24 }}>
                            {plan.features.map((f, i) => <FeatureItem key={i} feature={f} dark={plan.dark} />)}
                        </div>

                        {/* Button */}
                        <button style={{
                            width: "100%", padding: "12px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                            cursor: "pointer", fontFamily: "'Work Sans', sans-serif", letterSpacing: "0.03em",
                            background: plan.btnStyle === "orange" ? "#f97316" : plan.btnStyle === "dark" ? "#0f172a" : "transparent",
                            color: plan.btnStyle === "white" ? "#fff" : "#fff",
                            border: plan.btnStyle === "white" ? "1px solid #fff" : "none",
                        }}>
                            Modify Tier
                        </button>

                    </div>
                ))}
            </div>

            {/* Stats Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {stats.map((s, i) => (
                    <div key={i} style={{
                        background: "#f7f8fa", borderRadius: 10, padding: "16px 18px",
                        display: "flex", alignItems: "center", gap: 14,
                    }}>
                        <span style={{ fontSize: 22 }}>{s.icon}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#111", fontFamily: "Manrope, sans-serif" }}>{s.title}</div>
                            {s.sub && <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{s.sub}</div>}
                        </div>
                        {s.arrow && <span style={{ color: "#aaa", fontSize: 16 }}>›</span>}
                    </div>
                ))}
            </div>

        </div>
    );
}