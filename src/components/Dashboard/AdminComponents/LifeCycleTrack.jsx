import { useState } from "react";

const stats = [
    { label: "TOTAL JOBS", value: "1,284", sub: "↗ +12% vs last month", subColor: "#22c55e", accent: "#f97316", icon: "💼" },
    { label: "OPEN", value: "432", sub: "Awaiting action from pros", subColor: "#888", accent: "#3b82f6", icon: "🗂" },
    { label: "CLOSED", value: "712", sub: "Success rate: 94.2%", subColor: "#888", accent: "#22c55e", icon: "✅" },
    { label: "WITH APPLICATIONS", value: "256", sub: "Avg. 3.4 quotes per job", subColor: "#888", accent: "#a855f7", icon: "👥" },
];
const jobs = [
  {
    icon: "💧",
    iconBg: "#fff7ed",
    iconColor: "#f97316",
    title: "Kitchen Tap Leakage",
    category: "PLUMBING",
    id: "#QMJ-88214",
    date: "Oct 12, 2023",
    stages: [
      { label: "POSTED", state: "done" },
      { label: "3 APPLIED", state: "done" },
      { label: "QUOTED", state: "active" },
      { label: "CLOSURE", state: "pending" },
    ],
    status: "open",
    statusLabel: "OPEN",
    meta: "Customer: Marc J.",
  },
  {
    icon: "⚡",
    iconBg: "#eff6ff",
    iconColor: "#3b82f6",
    title: "Whole House Rewire",
    category: "ELECTRICAL",
    id: "#QMJ-87990",
    date: "Oct 05, 2023",
    stages: [
      { label: "POSTED", state: "done" },
      { label: "8 APPLIED", state: "done" },
      { label: "QUOTED", state: "done" },
      { label: "CLOSED", state: "done" },
    ],
    status: "closed",
    statusLabel: "CLOSED",
    meta: "Closed by: Foreman Sarah • Oct 11",
  },
  {
    icon: "🔩",
    iconBg: "#fff7ed",
    iconColor: "#f97316",
    title: "Emergency Pipe Repair",
    category: "PLUMBING",
    id: "#QMJ-88301",
    date: "Oct 14, 2023",
    stages: [
      { label: "POSTED", state: "done" },
      { label: "AWAITING", state: "active" },
      { label: "QUOTING", state: "pending" },
      { label: "CLOSURE", state: "pending" },
    ],
    status: "open-new",
    statusLabel: "OPEN (NEW)",
    meta: "Customer: Elena K.",
  },
  {
    icon: "🚽",
    iconBg: "#fff7ed",
    iconColor: "#f97316",
    title: "Toilet Installation",
    category: "PLUMBING",
    id: "#QMJ-87521",
    date: "Sep 28, 2023",
    stages: [
      { label: "POSTED", state: "done" },
      { label: "2 APPLIED", state: "done" },
      { label: "QUOTED", state: "done" },
      { label: "CLOSED", state: "done" },
    ],
    status: "closed",
    statusLabel: "CLOSED",
    meta: "Closed by: Customer Auto • Oct 02",
  },
];

const categoryColors = {
  PLUMBING: { bg: "#fff7ed", color: "#f97316" },
  ELECTRICAL: { bg: "#eff6ff", color: "#3b82f6" },
};

const statusStyles = {
  open: { bg: "#fff7ed", color: "#f97316" },
  "open-new": { bg: "#fff7ed", color: "#f97316" },
  closed: { bg: "#f0fdf4", color: "#16a34a" },
};

export default function LifeCycle() {
    return (
        <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, padding: "24px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>
                {stats.map((s) => (
                    <div key={s.label} style={{ background: "#f7f8fa", borderRadius: 12, padding: "20px", borderLeft: `4px solid ${s.accent}`, display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</div>
                            <div style={{ background: "#eef0fb", borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{s.icon}</div>
                        </div>
                        <div style={{ fontSize: 32, fontWeight: 800, color: "#111", fontFamily: "Manrope, sans-serif", lineHeight: 1 }}>{s.value}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: s.subColor }}>{s.sub}</div>
                    </div>
                ))}
            </div>
            <JobLifecycleTracking/>
        </>
    );
}

function StageNode({ state }) {
    if (state === "done") return (
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, flexShrink: 0 }}>✓</div>
    );
    if (state === "active") return (
        <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #f97316", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f97316" }} />
        </div>
    );
    return (
        <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #d0d0d0", background: "#fff", flexShrink: 0 }} />
    );
}

function StageTrack({ stages }) {
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 0, flex: 1 }}>
            {stages.map((s, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                        {i > 0 && (
                            <div style={{ flex: 1, height: 2, background: s.state === "done" ? "#22c55e" : "#e0e0e0" }} />
                        )}
                        <StageNode state={s.state} />
                        {i < stages.length - 1 && (
                            <div style={{ flex: 1, height: 2, background: stages[i + 1].state === "done" ? "#22c55e" : "#e0e0e0" }} />
                        )}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: s.state === "active" ? "#f97316" : s.state === "done" ? "#22c55e" : "#aaa", marginTop: 6, textAlign: "center", letterSpacing: "0.04em", fontFamily: "'Work Sans', sans-serif" }}>{s.label}</div>
                </div>
            ))}
        </div>
    );
}

function JobLifecycleTracking() {
    const [page, setPage] = useState(1);

    return (
        <div style={{ padding: "24px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                    <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 20, fontWeight: 800, color: "#111", margin: "0 0 4px" }}>Job Lifecycle Tracking</h2>
                    <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Real-time status of current and historic service requests across the network.</p>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <button style={{ background: "none", border: "none", fontSize: 12, fontWeight: 700, color: "#555", cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'Work Sans', sans-serif" }}>Export Report</button>
                    <button style={{ background: "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'Work Sans', sans-serif" }}>Generate Invoice Audit</button>
                </div>
            </div>

            {/* Table Header */}
            <div style={{ background: "#0f172a", borderRadius: 10, padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>Job Details & Category</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>Posted &nbsp; Applications &nbsp; Quoting &nbsp; Closure</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>Action & Status</span>
            </div>

            {/* Job Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                {jobs.map((job, i) => (
                    <div key={i} style={{ border: "1px solid #e8e8e8", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 20 }}>

                        {/* Icon */}
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: job.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{job.icon}</div>

                        {/* Info */}
                        <div style={{ minWidth: 140, flexShrink: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#111", fontFamily: "Manrope, sans-serif" }}>{job.title}</span>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: categoryColors[job.category]?.bg, color: categoryColors[job.category]?.color }}>{job.category}</span>
                            </div>
                            <div style={{ fontSize: 11, color: "#aaa" }}>ID: {job.id} • {job.date}</div>
                        </div>

                        {/* Stage Track */}
                        <div style={{ flex: 1, padding: "0 12px" }}>
                            <StageTrack stages={job.stages} />
                        </div>

                        {/* Status */}
                        <div style={{ flexShrink: 0, textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                            <span style={{ background: statusStyles[job.status].bg, color: statusStyles[job.status].color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.04em" }}>{job.statusLabel}</span>
                            <span style={{ fontSize: 11, color: "#888" }}>{job.meta}</span>
                            <span style={{ fontSize: 16, color: "#ccc", cursor: "pointer" }}>⋮</span>
                        </div>

                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#888" }}>Showing <strong>1-10</strong> of <strong>432</strong> Open Life Cycles</span>
                <div style={{ display: "flex", gap: 6 }}>
                    {["‹", 1, 2, 3, "›"].map((p, i) => (
                        <button key={i} onClick={() => typeof p === "number" && setPage(p)} style={{ width: 32, height: 32, borderRadius: 6, border: "1px solid #e0e0e0", background: p === page ? "#f97316" : "#fff", color: p === page ? "#fff" : "#555", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Work Sans', sans-serif" }}>{p}</button>
                    ))}
                </div>
            </div>

        </div>
    );
}