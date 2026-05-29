import { useState } from "react";

const nodes = [
    {
        name: "Vansh Jainn",
        location: "Noida, 201301",
        tier: "Premium",
        tierColor: "#f97316",
        latency: "12ms",
        latencyColor: "#22c55e",
        deployments: 17,
        status: "Synchronized",
        statusColor: "#6366f1",
        networkId: "17540ed7-a5d4-40a-9022-bf882e",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Sarah Chen",
        location: "Singapore, 049315",
        tier: "Standard",
        tierColor: "#64748b",
        latency: "45ms",
        latencyColor: "#f97316",
        deployments: 4,
        status: "Idling",
        statusColor: "#3b82f6",
        networkId: "44012bc2-e1f8-92c-8833-cc112a",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Marcus Thorne",
        location: "Austin, TX 78701",
        tier: "Premium",
        tierColor: "#f97316",
        latency: "8ms",
        latencyColor: "#22c55e",
        deployments: 31,
        status: "Synchronized",
        statusColor: "#6366f1",
        networkId: "99221cd4-b1a9-33b-7762-ef001c",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
];
const publicationHistory = [
    { id: "#JOB-2938", category: "Plumbing", icon: "🔧", date: "Oct 12, 2023", status: "completed" },
    { id: "#JOB-3102", category: "Electrical", icon: "⚡", date: "Nov 04, 2023", status: "active" },
    { id: "#JOB-3185", category: "Renovation", icon: "🏠", date: "Nov 28, 2023", status: "pending" },
    { id: "#JOB-2210", category: "Landscaping", icon: "⛰", date: "Jul 19, 2023", status: "completed" },
];

const activityAudit = [
    { title: "Account Login", sub: "IP: 192.168.1.45 (New Device)", time: "2M AGO", active: true },
    { title: "Quote Accepted", sub: "Accepted for #JOB-3102", time: "3H AGO", active: false },
    { title: "New Post Published", sub: '"Master Bedroom Paint Job"', time: "1D AGO", active: false },
    { title: "KYC Update", sub: "Identity document re-verified", time: "1W AGO", active: false },
];

const statusStyles = {
    completed: { background: "#f0fdf4", color: "#16a34a", label: "COMPLETED" },
    active: { background: "#eff6ff", color: "#3b82f6", label: "ACTIVE" },
    pending: { background: "#fff7ed", color: "#f97316", label: "PENDING QUOTES" },
};

export default function DirectoryHeader() {
    const [inspectedNode, setInspectedNode] = useState(null);
    if (inspectedNode) return <InspectNode node={inspectedNode} onBack={() => setInspectedNode(null)} />;
    return (
        <>
            <div style={{ padding: "24px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>

                {/* Title Row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                    <div>
                        <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 26, fontWeight: 800, color: "#111", margin: "0 0 6px" }}>
                            Directory: Client Nodes
                        </h2>
                        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
                            Manage and audit deployment specifications across the global edge network.
                        </p>
                    </div>
                    <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Work Sans', sans-serif", whiteSpace: "nowrap" }}>
                        <span style={{ fontSize: 16 }}>⊕</span> Provision New Node
                    </button>
                </div>

                {/* Search Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={{ background: "#f7f8fa", border: "1px solid #e8e8e8", borderRadius: 10, padding: "14px 16px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8, fontFamily: "'Work Sans', sans-serif" }}>Query Entity Array</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 16, color: "#aaa" }}>🗄</span>
                            <input
                                placeholder="Search by Node ID, Name, or Metadata..."
                                style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#555", fontFamily: "'Work Sans', sans-serif", width: "100%" }}
                            />
                        </div>
                    </div>

                    <div style={{ background: "#f7f8fa", border: "1px solid #e8e8e8", borderRadius: 10, padding: "14px 16px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8, fontFamily: "'Work Sans', sans-serif" }}>Filter Coordinates</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 16, color: "#aaa" }}>📍</span>
                            <input
                                placeholder="Noida, 201301 | IN-UP"
                                style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#555", fontFamily: "'Work Sans', sans-serif", width: "100%" }}
                            />
                        </div>
                    </div>
                </div>

            </div>
            <DirectoryBody onInspect={(n) => setInspectedNode(n)} />
        </>
    );
}

function NodeCard({ node, onInspect }) {
    return (
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: "20px", fontFamily: "'Work Sans', sans-serif" }}>

            {/* Top Row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ position: "relative" }}>
                    <img src={node.avatar} alt={node.name} style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover" }} />
                    <span style={{ position: "absolute", bottom: -4, right: -4, background: "#f97316", borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, border: "2px solid #fff" }}>★</span>
                </div>
                <div style={{ textAlign: "right" }}>
                    <span style={{ background: node.tierColor + "22", color: node.tierColor, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 6 }}>{node.tier}</span>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em" }}>Latency Index</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: node.latencyColor, fontFamily: "Manrope, sans-serif" }}>{node.latency} 📶</div>
                </div>
            </div>

            {/* Name */}
            <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{node.name}</h3>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>📍 {node.location}</div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                <div style={{ background: "#f7f8fa", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Deployments</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#111", fontFamily: "Manrope, sans-serif" }}>{String(node.deployments).padStart(2, "0")}</div>
                </div>
                <div style={{ background: "#f7f8fa", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Status</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: node.statusColor, display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: node.statusColor, display: "inline-block" }} />
                        {node.status}
                    </div>
                </div>
            </div>

            {/* Network ID */}
            <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Network ID</div>
                <div style={{ background: "#0f172a", borderRadius: 6, padding: "8px 12px", fontSize: 11, color: "#22c55e", fontFamily: "monospace", letterSpacing: "0.04em" }}>{node.networkId}</div>
            </div>

            {/* Button */}
            <button
                onClick={() => onInspect(node)}
                style={{ width: "100%", background: "#0f172a", color: "#fff", border: "none", borderRadius: 8, padding: "12px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Work Sans', sans-serif" }}
            >
                Inspect Node →
            </button>

        </div>
    );
}
function DirectoryBody({ onInspect }) {
    return (
        <div style={{ padding: "0 32px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>

            {/* Node Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 24 }}>
                {nodes.map((node) => (
                    <NodeCard key={node.name} node={node} onInspect={onInspect} />
                ))}
            </div>

            {/* Audit Banner */}
            <div style={{ background: "#0f172a", borderRadius: 14, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Node Activity Integrity Audit</h3>
                    <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>Generate a cryptographic audit trail for all active nodes in this entity array.</p>
                </div>
                <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Work Sans', sans-serif", whiteSpace: "nowrap" }}>
                    🖥 Export Audit Log
                </button>
            </div>

        </div>
    );
}
function InspectNode({ node, onBack }) {
    return (
        <>
            <div style={{ padding: "24px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>

                {/* Back */}
                <button onClick={(e) => { e.stopPropagation(); onBack(); }} style={{ background: "none", border: "none", fontSize: 13, color: "#555", cursor: "pointer", marginBottom: 12, fontFamily: "'Work Sans', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                    ← Back
                </button>

                {/* Title Row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
                    <div>
                        <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 26, fontWeight: 800, color: "#111", margin: "0 0 4px" }}>
                            Node Inspection: {node.name}
                        </h2>
                        <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Internal Audit ID: NODE-77291-VJ</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", fontSize: 13, fontWeight: 600, color: "#333", cursor: "pointer", fontFamily: "'Work Sans', sans-serif" }}>
                            🔼 Export Activity Report
                        </button>
                        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#e53e3e", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Work Sans', sans-serif" }}>
                            🚫 Suspend Node
                        </button>
                    </div>
                </div>

                {/* Info Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>

                    {/* Left: Profile Card */}
                    <div style={{ border: "1px solid #e8e8e8", borderRadius: 14, padding: "24px", display: "flex", gap: 24, alignItems: "flex-start", position: "relative", overflow: "hidden" }}>
                        {/* Watermark */}
                        <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", fontSize: 80, opacity: 0.06 }}>🪪</div>

                        {/* Avatar */}
                        <div style={{ position: "relative", flexShrink: 0 }}>
                            <img src={node.avatar} alt={node.name} style={{ width: 80, height: 96, borderRadius: 12, objectFit: "cover" }} />
                            <div style={{ position: "absolute", bottom: -8, right: -8, background: "#0f172a", borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>⚙️</div>
                        </div>

                        {/* Details */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px", flex: 1 }}>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Full Name</div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: "#111", fontFamily: "Manrope, sans-serif" }}>{node.name}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Status</div>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "4px 12px", fontSize: 13, fontWeight: 600, color: "#16a34a" }}>
                                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
                                    Verified Active
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Node ID</div>
                                <div style={{ background: "#f7f8fa", border: "1px solid #e8e8e8", borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: "#333", display: "inline-block", fontFamily: "monospace" }}>USR-8821-X90</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Member Since</div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", fontFamily: "Manrope, sans-serif" }}>January 14, 2023</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Spend Card */}
                    <div style={{ background: "#0f172a", borderRadius: 14, padding: "24px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Platform Lifetime Spend</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: "#f97316", fontFamily: "Manrope, sans-serif", marginBottom: 6 }}>$14,280.50</div>
                        <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>Across 12 successful projects</div>
                        <div style={{ borderTop: "1px solid #1e293b", paddingTop: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                <span style={{ fontSize: 13, color: "#94a3b8" }}>Average Quote Match</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "Manrope, sans-serif" }}>$1,190.00</span>
                            </div>
                            <div style={{ height: 4, background: "#1e293b", borderRadius: 4 }}>
                                <div style={{ height: "100%", width: "65%", background: "#f97316", borderRadius: 4 }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <NodeInspectDetails/>
        </>
    );
}
function NodeInspectDetails() {
    return (
        <div style={{ padding: "24px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>

                {/* Left: Publication History */}
                <div style={{ border: "1px solid #e8e8e8", borderRadius: 14, overflow: "hidden" }}>
                    <div style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0" }}>
                        <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>Publication History</h3>
                        <span style={{ background: "#f7f8fa", border: "1px solid #e8e8e8", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.04em" }}>12 TOTAL POSTS</span>
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                                {["Job ID", "Category", "Date", "Status"].map((h) => (
                                    <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {publicationHistory.map((row, i) => (
                                <tr key={i} style={{ borderBottom: i < publicationHistory.length - 1 ? "1px solid #f6f6f6" : "none" }}>
                                    <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 600, color: "#333" }}>{row.id}</td>
                                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#f97316", fontWeight: 600 }}>{row.icon} {row.category}</td>
                                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#666" }}>{row.date}</td>
                                    <td style={{ padding: "14px 20px" }}>
                                        <span style={{ background: statusStyles[row.status].background, color: statusStyles[row.status].color, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, letterSpacing: "0.04em" }}>
                                            {statusStyles[row.status].label}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Right Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {/* Activity Audit */}
                    <div style={{ background: "#f7f8fa", borderRadius: 14, padding: "20px" }}>
                        <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, fontWeight: 700, color: "#111", margin: "0 0 16px" }}>Activity Audit</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                            {activityAudit.map((item, i) => (
                                <div key={i} style={{ display: "flex", gap: 12, paddingBottom: i < activityAudit.length - 1 ? 16 : 0, marginBottom: i < activityAudit.length - 1 ? 0 : 0, position: "relative" }}>
                                    {/* Timeline dot */}
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                                        <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${item.active ? "#f97316" : "#d0d0d0"}`, background: item.active ? "transparent" : "transparent", flexShrink: 0, marginTop: 2 }} />
                                        {i < activityAudit.length - 1 && <div style={{ width: 1, flex: 1, background: "#e0e0e0", minHeight: 24, marginTop: 4 }} />}
                                    </div>
                                    <div style={{ flex: 1, paddingBottom: i < activityAudit.length - 1 ? 12 : 0 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: "#111", fontFamily: "Manrope, sans-serif" }}>{item.title}</span>
                                            <span style={{ fontSize: 10, color: "#aaa", fontWeight: 600, letterSpacing: "0.04em", whiteSpace: "nowrap", marginLeft: 8 }}>{item.time}</span>
                                        </div>
                                        <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{item.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button style={{ width: "100%", marginTop: 16, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px", fontSize: 11, fontWeight: 700, color: "#333", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Work Sans', sans-serif" }}>
                            View Full History Logs
                        </button>
                    </div>

                    {/* Stats Row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div style={{ background: "#f7f8fa", borderRadius: 12, padding: "16px", textAlign: "center" }}>
                            <div style={{ fontSize: 22, marginBottom: 4 }}>⭐</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: "#111", fontFamily: "Manrope, sans-serif" }}>4.9</div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>Trust Score</div>
                        </div>
                        <div style={{ background: "#f7f8fa", borderRadius: 12, padding: "16px", textAlign: "center" }}>
                            <div style={{ fontSize: 22, marginBottom: 4 }}>🕐</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: "#111", fontFamily: "Manrope, sans-serif" }}>92%</div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>Res. Rate</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}