import { useState, useEffect } from 'react';
import api from '@/lib/api';
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
    const [tradespeople, setTradespeople] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [locationSearch, setLocationSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/admin/tradespeople?verifiedOnly=true').then(({ data }) => {
            setTradespeople(data);
            setFiltered(data);
        }).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let result = tradespeople;
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(t =>
                t.name?.toLowerCase().includes(q) ||
                t.businessName?.toLowerCase().includes(q) ||
                t.licenseNo?.toLowerCase().includes(q)
            );
        }
        if (locationSearch.trim()) {
            const q = locationSearch.toLowerCase();
            result = result.filter(t =>
                t.city?.toLowerCase().includes(q) ||
                t.address?.toLowerCase().includes(q)
            );
        }
        setFiltered(result);
    }, [search, locationSearch, tradespeople]);

    if (inspectedNode) return <InspectNode node={inspectedNode} onBack={() => setInspectedNode(null)} onVerify={async (id, isVerified) => {
        await api.patch(`/admin/tradespeople/${id}/verify`, { isVerified });
        const { data } = await api.get('/admin/tradespeople');
        setTradespeople(data);
        setInspectedNode(data.find(t => t.id === id) || null);
    }} updatingId={null} />;

    return (
        <>
            <div style={{ padding: "24px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                    <div>
                        <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "45px", fontWeight: 800, color: "#111", margin: "0 0 6px" }}>
                            Directory: <span style={{ color: "#f97316" }}>Tradespeople</span>
                        </h2>
                        <p style={{ fontSize: "16px", color: "#9ca3af", margin: 0 }}>
                            Browse, audit and manage all registered tradespeople on the platform.
                        </p>
                    </div>
                    <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 28, color: "#f97316" }}>
                        {filtered.length} <span style={{ fontSize: 13, fontWeight: 600, color: '#9ca3af' }}>total</span>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={{ background: "#f7f8fa", border: "1px solid #e8e8e8", borderRadius: 10, padding: "14px 16px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Search</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 16, color: "#aaa" }}>🔍</span>
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search by name, business, or license..."
                                style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#555", fontFamily: "'Work Sans', sans-serif", width: "100%" }}
                            />
                        </div>
                    </div>

                    <div style={{ background: "#f7f8fa", border: "1px solid #e8e8e8", borderRadius: 10, padding: "14px 16px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Filter by Location</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 16, color: "#aaa" }}>📍</span>
                            <input
                                value={locationSearch}
                                onChange={e => setLocationSearch(e.target.value)}
                                placeholder="City or address..."
                                style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#555", fontFamily: "'Work Sans', sans-serif", width: "100%" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <DirectoryBody tradespeople={filtered} loading={loading} onInspect={setInspectedNode} />
        </>
    );
}

function SkeletonCard() {
    return (
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: "20px" }}>
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 10, background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: 80, height: 24, borderRadius: 6, background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
            </div>
            <div style={{ width: '70%', height: 18, borderRadius: 6, background: '#e5e7eb', marginBottom: 8, animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '50%', height: 12, borderRadius: 6, background: '#e5e7eb', marginBottom: 16, animation: 'pulse 1.5s infinite' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                <div style={{ height: 60, borderRadius: 8, background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: 60, borderRadius: 8, background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
            </div>
            <div style={{ height: 36, borderRadius: 8, background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
        </div>
    );
}

function TradespersonCard({ t, onInspect }) {
    const activeSubscription = t.subscriptions?.find(s => s.status === 'ACTIVE');
    const avgRating = t.reviews?.length
        ? (t.reviews.reduce((sum, r) => sum + r.rating, 0) / t.reviews.length).toFixed(1)
        : null;
    const completedJobs = t.quotes?.filter(q => q.status === 'ACCEPTED').length || 0;

    return (
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: "20px", fontFamily: "'Work Sans', sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ position: "relative" }}>
                    <img
                        src={t.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=eef0f8&color=0d1b2a&size=56`}
                        alt={t.name}
                        style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover" }}
                    />
                    {t.isVerified && (
                        <span style={{ position: "absolute", bottom: -4, right: -4, background: "#22c55e", borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, border: "2px solid #fff", color: '#fff' }}>✓</span>
                    )}
                </div>
                <div style={{ textAlign: "right" }}>
                    <span style={{
                        background: activeSubscription ? '#fff7ed' : '#f3f4f6',
                        color: activeSubscription ? '#f97316' : '#9ca3af',
                        fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 6
                    }}>
                        {activeSubscription ? activeSubscription.plan : 'NO PLAN'}
                    </span>
                    {avgRating && (
                        <div style={{ fontSize: 16, fontWeight: 800, color: '#f97316', fontFamily: "Manrope, sans-serif" }}>⭐ {avgRating}</div>
                    )}
                </div>
            </div>

            <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>{t.name}</h3>
            {t.businessName && <p style={{ fontSize: 13, color: '#f97316', fontWeight: 600, margin: '0 0 4px' }}>{t.businessName}</p>}
            <div style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>📍 {t.city || t.address || 'Location not set'}</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                <div style={{ background: "#f7f8fa", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Categories</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>
                        {t.categories?.length > 0 ? t.categories[0].category.name : '—'}
                    </div>
                </div>
                <div style={{ background: "#f7f8fa", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Status</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.isVerified ? '#22c55e' : '#f97316', display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.isVerified ? '#22c55e' : '#f97316', display: "inline-block" }} />
                        {t.isVerified ? 'Verified' : 'Pending'}
                    </div>
                </div>
            </div>

            {t.licenseNo && (
                <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>License No.</div>
                    <div style={{ background: "#0f172a", borderRadius: 6, padding: "8px 12px", fontSize: 11, color: "#22c55e", fontFamily: "monospace", letterSpacing: "0.04em" }}>{t.licenseNo}</div>
                </div>
            )}

            <button
                onClick={() => onInspect(t)}
                style={{ width: "100%", background: "#0f172a", color: "#fff", border: "none", borderRadius: 8, padding: "12px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Work Sans', sans-serif" }}
            >
                Inspect Tradesperson
            </button>
        </div>
    );
}

function DirectoryBody({ tradespeople, loading, onInspect }) {
    return (
        <div style={{ padding: "0 32px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 24 }}>
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                ) : tradespeople.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
                        <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16 }}>No tradespeople found.</p>
                    </div>
                ) : (
                    tradespeople.map(t => <TradespersonCard key={t.id} t={t} onInspect={onInspect} />)
                )}
            </div>

            <div style={{ background: "#0f172a", borderRadius: 14, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Tradesperson Activity Audit</h3>
                    <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>Review all tradesperson activity, verification status and subscription data.</p>
                </div>
                <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Work Sans', sans-serif", whiteSpace: "nowrap" }}>
                    🖥 Export Audit Log
                </button>
            </div>
        </div>
    );
}


function InspectNode({ node, onBack }) {
    const [quotes, setQuotes] = useState([]);
    const [rating, setRating] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get(`/reviews/tradesperson/${node.id}/rating`),
            api.get(`/admin/tradespeople/${node.id}/quotes`),
        ]).then(([ratingRes, quotesRes]) => {
            setRating(ratingRes.data);
            setQuotes(quotesRes.data);
        }).catch(console.error).finally(() => setLoading(false));
    }, [node.id]);

    const activeSubscription = node.subscriptions?.find(s => s.status === 'ACTIVE');
    const joinedDate = new Date(node.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

    const paidQuotes = quotes.filter(q => q.job?.paymentStatus === 'PAID');
    const totalEarnings = paidQuotes.reduce((sum, q) => sum + Number(q.job?.paidAmount || q.price), 0);

    return (
        <>
            <div style={{ padding: "24px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>
                <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 13, color: "#555", cursor: "pointer", marginBottom: 12, fontFamily: "'Work Sans', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                    ← Back to Directory
                </button>

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
                    <div>
                        <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 26, fontWeight: 800, color: "#111", margin: "0 0 4px" }}>
                            {node.name}
                        </h2>
                        <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Internal ID: {node.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <button
                            onClick={() => api.patch(`/admin/users/${node.userId}/toggle-active`)}
                            style={{ display: "flex", alignItems: "center", gap: 6, background: node.user?.isActive ? "#e53e3e" : "#22c55e", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Work Sans', sans-serif" }}
                        >
                            {node.user?.isActive ? '🚫 Suspend' : '✓ Reactivate'}
                        </button>
                    </div>
                </div>

                {/* Info Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>

                    {/* Left: Profile Card */}
                    <div style={{ border: "1px solid #e8e8e8", borderRadius: 14, padding: "24px", display: "flex", gap: 24, alignItems: "flex-start", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", fontSize: 80, opacity: 0.06 }}>🪪</div>

                        <div style={{ position: "relative", flexShrink: 0 }}>
                            <img
                                src={node.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(node.name)}&background=eef0f8&color=0d1b2a&size=80`}
                                alt={node.name}
                                style={{ width: 80, height: 96, borderRadius: 12, objectFit: "cover" }}
                            />
                            <div style={{ position: "absolute", bottom: -8, right: -8, background: node.isVerified ? "#22c55e" : "#f97316", borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: '#fff', border: '2px solid #fff' }}>
                                {node.isVerified ? '✓' : '!'}
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px", flex: 1 }}>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Full Name</div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: "#111", fontFamily: "Manrope, sans-serif" }}>{node.name}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Status</div>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: node.isVerified ? "#f0fdf4" : "#fff7ed", border: `1px solid ${node.isVerified ? "#bbf7d0" : "#fed7aa"}`, borderRadius: 20, padding: "4px 12px", fontSize: 13, fontWeight: 600, color: node.isVerified ? "#16a34a" : "#f97316" }}>
                                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: node.isVerified ? "#16a34a" : "#f97316", display: "inline-block" }} />
                                    {node.isVerified ? 'Verified' : 'Pending'}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Business</div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", fontFamily: "Manrope, sans-serif" }}>{node.businessName || '—'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Member Since</div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", fontFamily: "Manrope, sans-serif" }}>{joinedDate}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Location</div>
                                <div style={{ fontSize: 14, color: "#555" }}>{node.city || node.address || '—'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Categories</div>
                                <div style={{ fontSize: 14, color: "#555" }}>{node.categories?.map(c => c.category.name).join(', ') || '—'}</div>
                            </div>
                            {node.licenseNo && (
                                <div style={{ gridColumn: '1/-1' }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>License No.</div>
                                    <div style={{ background: "#0f172a", borderRadius: 6, padding: "6px 12px", fontSize: 12, color: "#22c55e", fontFamily: "monospace", display: "inline-block" }}>{node.licenseNo}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Earnings Card */}
                    <div style={{ background: "#0f172a", borderRadius: 14, padding: "24px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Platform Lifetime Earnings</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: "#f97316", fontFamily: "Manrope, sans-serif", marginBottom: 6 }}>
                            £{totalEarnings.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                        </div>
                        <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>
                            Across {paidQuotes.length} paid job{paidQuotes.length !== 1 ? 's' : ''}
                        </div>
                        <div style={{ borderTop: "1px solid #1e293b", paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 13, color: "#94a3b8" }}>Avg Rating</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "Manrope, sans-serif" }}>
                                    {rating?.average ? `⭐ ${Number(rating.average).toFixed(1)} (${rating.total})` : 'No reviews'}
                                </span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 13, color: "#94a3b8" }}>Subscription</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: activeSubscription ? "#22c55e" : "#9ca3af", fontFamily: "Manrope, sans-serif" }}>
                                    {activeSubscription ? `${activeSubscription.plan} (Active)` : 'None'}
                                </span>
                            </div>
                            {activeSubscription && (
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: 13, color: "#94a3b8" }}>Expires</span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{fmt(activeSubscription.endDate)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Job History */}
            <div style={{ padding: "0 32px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>
                <div style={{ border: "1px solid #e8e8e8", borderRadius: 14, overflow: "hidden" }}>
                    <div style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0" }}>
                        <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>Job History</h3>
                        <span style={{ background: "#f7f8fa", border: "1px solid #e8e8e8", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.04em" }}>
                            {quotes.length} QUOTES TOTAL
                        </span>
                    </div>

                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>Loading...</div>
                    ) : quotes.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>No job history yet.</div>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                                    {["Job Title", "Category", "Quote Price", "Date", "Job Status", "Payment"].map(h => (
                                        <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {quotes.map((q, i) => {
                                    const jobStatus = q.job?.status || '—';
                                    const paymentStatus = q.job?.paymentStatus || 'UNPAID';
                                    return (
                                        <tr key={q.id} style={{ borderBottom: i < quotes.length - 1 ? "1px solid #f6f6f6" : "none" }}>
                                            <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 600, color: "#333" }}>{q.job?.title || '—'}</td>
                                            <td style={{ padding: "14px 20px", fontSize: 13, color: "#f97316", fontWeight: 600 }}>
                                                {q.job?.categories?.[0]?.category?.name || '—'}
                                            </td>
                                            <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 700, color: "#111", fontFamily: "Manrope, sans-serif" }}>
                                                £{Number(q.price).toLocaleString()}
                                            </td>
                                            <td style={{ padding: "14px 20px", fontSize: 13, color: "#666" }}>
                                                {new Date(q.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td style={{ padding: "14px 20px" }}>
                                                <span style={{
                                                    fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, letterSpacing: "0.04em",
                                                    background: jobStatus === 'COMPLETED' ? '#f0fdf4' : jobStatus === 'ASSIGNED' ? '#eff6ff' : '#f7f8fa',
                                                    color: jobStatus === 'COMPLETED' ? '#16a34a' : jobStatus === 'ASSIGNED' ? '#2563eb' : '#6b7280',
                                                }}>
                                                    {jobStatus}
                                                </span>
                                            </td>
                                            <td style={{ padding: "14px 20px" }}>
                                                <span style={{
                                                    fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6,
                                                    background: paymentStatus === 'PAID' ? '#f0fdf4' : '#fff7ed',
                                                    color: paymentStatus === 'PAID' ? '#16a34a' : '#f97316',
                                                }}>
                                                    {paymentStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}