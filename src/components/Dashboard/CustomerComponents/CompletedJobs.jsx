"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";

const PAGE_SIZE = 12;

function formatDate(d) {
    return new Date(d).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric",
    });
}

function formatCurrency(amount, currency = "GBP") {
    const sym = currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$";
    return sym + Number(amount).toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export default function CompletedJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("/jobs/my");
                const completed = (res.data || []).filter((j) => j.status === "COMPLETED");
                setJobs(completed);
            } catch (e) {
                setError("Failed to load jobs.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const totalSpent = jobs.reduce(
        (s, j) => s + (Number(j.paidAmount) || Number(j.acceptedQuotePrice) || 0), 0
    );

    const totalPages = Math.ceil(jobs.length / PAGE_SIZE);
    const slice = jobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const goPage = (p) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    if (error) return (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#ef4444", fontSize: "14px" }}>
            {error}
        </div>
    );

    return (
        <div className="px-5">

            {/* Project Insights */}
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px", marginBottom: "28px" }}>
                <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "48px", color: "#0d1b2a", margin: "0 0 6px" }}>
                    Project <span style={{ color: "#f97316" }}>Completed</span>
                </h3>
                <p style={{ fontSize: "17px", color: "#9ca3af", margin: "0 0 20px" }}>
                    Your completed jobs overview.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px" }}>
                    <div>
                        <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 4px", letterSpacing: "0.06em" }}>TOTAL SPENT</p>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "42px", color: "#0d1b2a", margin: 0 }}>
                            {formatCurrency(totalSpent)}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 4px", letterSpacing: "0.06em" }}>COMPLETED</p>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "42px", color: "#FF7E00", margin: 0 }}>
                            {jobs.length}
                        </p>
                    </div>
                </div>
            </div>

            {
                loading ? <SkeletonJobCard /> : (
                    <>
                        {/* Job Cards Grid */}
                        {slice.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "48px 0", color: "#9ca3af", fontSize: "14px" }}>
                                No completed jobs yet.
                            </div>
                        ) : (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
                                {slice.map((job) => {
                                    const cost = job.paidAmount || job.acceptedQuotePrice;
                                    const cats = (job.categories || [])
                                        .map((c) => c.category?.name || c.name || "")
                                        .filter(Boolean)
                                        .join(", ");

                                    return (
                                        <div key={job.id} style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f0f0f0", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <span style={{ fontSize: "10px", fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,0.1)", borderRadius: "6px", padding: "3px 8px" }}>
                                                    COMPLETED
                                                </span>
                                                <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                                                    REF: #{job.id.slice(0, 8).toUpperCase()}
                                                </span>
                                            </div>

                                            <div>
                                                <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "16px", color: "#0d1b2a", margin: "0 0 4px" }}>
                                                    {job.title}
                                                </h3>
                                                <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0, display: "flex", alignItems: "center", gap: "4px" }}>
                                                    📅 Completed {formatDate(job.paidAt || job.updatedAt)}
                                                </p>
                                            </div>

                                            <div style={{ background: "#f8f9fb", borderRadius: "10px", padding: "10px 12px", display: "flex", alignItems: "center", gap: "10px" }}>
                                                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#eef0f8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    🔧
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: "10px", fontWeight: 600, color: "#9ca3af", margin: "0 0 2px", letterSpacing: "0.06em" }}>
                                                        {cats || "TRADE"}
                                                    </p>
                                                    <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "13px", color: "#0d1b2a", margin: 0 }}>
                                                        Assigned tradesperson
                                                    </p>
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <div>
                                                    <p style={{ fontSize: "10px", color: "#9ca3af", margin: "0 0 2px", letterSpacing: "0.06em" }}>FINAL COST</p>
                                                    <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "16px", color: "#0d1b2a", margin: 0 }}>
                                                        {cost ? formatCurrency(cost, job.budgetCurrency) : "—"}
                                                    </p>
                                                </div>
                                                {/* <a href="#" style={{ fontSize: "12px", fontWeight: 600, color: "#FF7E00", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                    View Invoice ↗
                  </a> */}
                                            </div>

                                            <button
                                                style={{ width: "100%", padding: "11px", borderRadius: "10px", border: "none", background: "#0d1b2a", color: "#fff", fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                                                onClick={() => {
                                                    // TODO: open review modal or navigate to review page
                                                    console.log("Leave review for job:", job.id);
                                                }}
                                            >
                                                📋 Leave a Review
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                <button
                                    onClick={() => goPage(page - 1)}
                                    disabled={page === 1}
                                    style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "transparent", cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.4 : 1, fontSize: "16px" }}
                                >
                                    ‹
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => goPage(p)}
                                        style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid #e5e7eb", background: p === page ? "#f97316" : "transparent", color: p === page ? "#fff" : "#0d1b2a", fontWeight: p === page ? 700 : 400, cursor: "pointer", fontSize: "13px" }}
                                    >
                                        {p}
                                    </button>
                                ))}

                                <button
                                    onClick={() => goPage(page + 1)}
                                    disabled={page === totalPages}
                                    style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "transparent", cursor: page === totalPages ? "not-allowed" : "pointer", opacity: page === totalPages ? 0.4 : 1, fontSize: "16px" }}
                                >
                                    ›
                                </button>
                            </div>
                        )}
                    </>
                )
            }

        </div>
    );
}

function SkeletonJobCard() {
    return (
        <div style={{ background: '#f0f2f7', borderRadius: '16px', padding: '24px', display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>

            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#e5e7eb', flexShrink: 0, animation: 'pulse 1.5s infinite' }} />

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                    <div style={{ width: '160px', height: '20px', borderRadius: '20px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                    <div style={{ width: '80px', height: '20px', borderRadius: '20px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                    <div style={{ width: '100px', height: '20px', borderRadius: '20px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                </div>

                <div style={{ width: '280px', height: '24px', borderRadius: '6px', background: '#e5e7eb', marginBottom: '12px', animation: 'pulse 1.5s infinite' }} />

                <div style={{ width: '100%', height: '14px', borderRadius: '6px', background: '#e5e7eb', marginBottom: '8px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '95%', height: '14px', borderRadius: '6px', background: '#e5e7eb', marginBottom: '8px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '70%', height: '14px', borderRadius: '6px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
            </div>

            <div style={{ width: '160px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                <div style={{ width: '120px', height: '24px', borderRadius: '6px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '160px', height: '40px', borderRadius: '10px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '160px', height: '40px', borderRadius: '10px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '160px', height: '40px', borderRadius: '10px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
            </div>
        </div>
    );
}