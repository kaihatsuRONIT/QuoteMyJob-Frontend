import { FiMail, FiDownload, FiCalendar, FiRefreshCw, FiShield, FiArrowLeft } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';

export default function InspectNode({ professional = {}, onBack }) {
    const {
        refName = 'MARCUS THRONE',
        name = 'Julian Sterling',
        role = 'Lead Structural Engineer',
        avatar = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
        networkId = '#QMJ-882-X90',
        identitySync = 'Encrypted Phase 4',
        verificationStatus = 'Cleared',
        telecomSignature = 'TS-8812-VOD-UK',
        authHash = '0x7F2...88A',
        authDate = 'Oct 24, 2023',
        tier = 'Premium Tier',
        tierType = 'Enterprise',
        activeSince = 'Oct 2021',
    } = professional;

    const credentials = [
        {
            id: "gov",
            title: "Government ID / Passport",
            sub: "EXPIRES JAN 2028",
            status: "unverified",
            imgBg: "linear-gradient(135deg, #0d2244 0%, #1a3d6e 60%, #2a5298 100%)",
            preview: "gov",
        },
        {
            id: "struct",
            title: "Structural Engineering License",
            sub: "VALIDATED: STATE BOARD",
            status: "verified",
            imgBg: "linear-gradient(135deg, #2d1a00 0%, #5c3a00 50%, #8b6914 100%)",
            preview: "coin",
        },
        {
            id: "proof",
            title: "Proof of Address",
            sub: "UTILITY BILL – AUG 2023",
            status: "unverified",
            imgBg: "linear-gradient(135deg, #0a0a14 0%, #1a1a2e 60%, #0d0d1a 100%)",
            preview: "face",
        },
    ];

    const deployments = [
        { id: "#DEP-0992", title: "Metropolitan Bridge Survey", sub: "London District 4", date: "Oct 12, 2023", amount: "£12,450.00", status: "resolved" },
        { id: "#DEP-0854", title: "High-Rise Wind Analysis", sub: "Canary Wharf Cluster", date: "Sep 28, 2023", amount: "£8,900.00", status: "resolved" },
        { id: "#DEP-0711", title: "Heritage Site Foundation Review", sub: "Westminster Zone B", date: "Sep 15, 2023", amount: "£5,200.00", status: "auditing" },
    ];

    return (
        <>
            <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FF7E00', border: 'none', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 700, color: '#fff', cursor: 'pointer', margin: '20px 20px', }}>
                <FiArrowLeft style={{ fontSize: '12px' }} /> BACK
            </button>
            <div style={{ padding: '36px 40px', fontFamily: 'Work Sans, sans-serif' }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

                {/* Ref name */}
                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '14px', color: '#FF7E00', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 20px' }}>{refName}</p>

                {/* Profile header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: '16px', overflow: 'hidden', background: '#eef0f8', border: '2px solid #e5e7eb' }}>
                                <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: '#FF7E00', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #fff' }}>
                                <MdVerified style={{ color: '#fff', fontSize: '14px' }} />
                            </div>
                        </div>
                        <div>
                            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '32px', color: '#0d1b2a', margin: '0 0 6px' }}>{name}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '15px', color: '#6b7280' }}>{role}</span>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF7E00', display: 'inline-block' }} />
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#6366f1', background: 'rgba(99,102,241,0.1)', borderRadius: '8px', padding: '4px 10px' }}>VERIFIED PROFESSIONAL</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '14px', color: '#0d1b2a', cursor: 'pointer' }}>
                            <FiMail style={{ fontSize: '15px' }} /> Secure Message
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', border: 'none', background: '#0d1b2a', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', cursor: 'pointer' }}>
                            <FiDownload style={{ fontSize: '15px' }} /> Export Dossier
                        </button>
                    </div>
                </div>

                {/* Main grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>

                    {/* Left — Network Infrastructure */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '22px', color: '#0d1b2a', margin: 0 }}>Network Infrastructure</h2>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#FF7E00', letterSpacing: '0.1em' }}>SECURE SYNC ACTIVE</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
                            {[
                                { label: 'NETWORK ID', value: networkId },
                                { label: 'IDENTITY SYNC', value: identitySync },
                                { label: 'VERIFICATION STATUS', value: verificationStatus, green: true },
                                { label: 'TELECOM SIGNATURE', value: telecomSignature },
                            ].map(({ label, value, green }) => (
                                <div key={label}>
                                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 6px' }}>{label}</p>
                                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0d1b2a', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        {green && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />}
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Auth hash */}
                        <div style={{ background: '#f0f2f7', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <FiShield style={{ color: '#FF7E00', fontSize: '16px' }} />
                            </div>
                            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
                                System biometric verification confirmed on {authDate}. Authentication hash:{' '}
                                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0d1b2a', background: '#e5e7eb', borderRadius: '4px', padding: '1px 6px' }}>{authHash}</span>
                            </p>
                        </div>
                    </div>

                    {/* Right — Subscription Matrix */}
                    <div style={{ background: '#0d1b2a', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#FF7E00', letterSpacing: '0.1em', margin: 0 }}>SUBSCRIPTION MATRIX</p>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '28px', color: '#fff', margin: 0, lineHeight: 1.2 }}>{tier}</h2>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{tierType}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { icon: FiCalendar, text: `Active since ${activeSince}` },
                                { icon: FiRefreshCw, text: 'Annual renewal cycle' },
                                { icon: FiShield, text: 'Unlimited priority quotes' },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Icon style={{ color: '#FF7E00', fontSize: '15px', flexShrink: 0 }} />
                                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{text}</span>
                                </div>
                            ))}
                        </div>

                        <button style={{ marginTop: 'auto', width: '100%', padding: '13px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '12px', cursor: 'pointer', letterSpacing: '0.08em' }}>
                            MANAGE ENTERPRISE PLAN
                        </button>
                    </div>
                </div>

                <div style={{ fontFamily: "'Work Sans', sans-serif", padding: 24, background: "#fff" }}>

                    {/* Credential Artifacts */}
                    <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 22, fontWeight: 700, color: "#111", marginBottom: 20 }}>Credential Artifacts</h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
                        {credentials.map((c) => (
                            <div key={c.id} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, overflow: "hidden" }}>
                                <div style={{ height: 160, background: c.imgBg, position: "relative" }}>
                                    <CardPreview type={c.preview} />
                                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 14px", background: "linear-gradient(to top, rgba(0,0,0,0.72), transparent)" }}>
                                        <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>{c.title}</div>
                                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 2 }}>{c.sub}</div>
                                    </div>
                                </div>
                                <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                                    {c.status === "verified" ? (
                                        <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>✓ VERIFIED</span>
                                    ) : (
                                        <>
                                            <button style={{ background: "#f97316", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: "0.03em" }}>VERIFY</button>
                                            <button style={{ background: "transparent", color: "#555", border: "1px solid #d0d0d0", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>ARCHIVE</button>
                                        </>
                                    )}
                                    <button style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 18 }} aria-label="View">👁</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Operational History */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                        <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 22, fontWeight: 700, color: "#111" }}>Operational History</h2>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 7, padding: "7px 12px", fontSize: 12, fontWeight: 600, color: "#444", cursor: "pointer", letterSpacing: "0.04em" }}>
                            ALL DEPLOYMENTS ▾
                        </div>
                    </div>

                    <div style={{ border: "1px solid #efefef", borderRadius: 12, overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    {["Deployment ID", "Project Reference", "Resolution Date", "Financials", "Status"].map((h) => (
                                        <th key={h} style={{ fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #f0f0f0" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {deployments.map((d, i) => (
                                    <tr key={d.id} style={{ borderBottom: i < deployments.length - 1 ? "1px solid #f6f6f6" : "none" }}>
                                        <td style={{ padding: 16, fontSize: 13, color: "#555", fontWeight: 500 }}>{d.id}</td>
                                        <td style={{ padding: 16 }}>
                                            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 14, color: "#111" }}>{d.title}</div>
                                            <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{d.sub}</div>
                                        </td>
                                        <td style={{ padding: 16, fontSize: 13, color: "#666" }}>{d.date}</td>
                                        <td style={{ padding: 16, fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 14 }}>{d.amount}</td>
                                        <td style={{ padding: 16 }}>
                                            <span style={{
                                                background: d.status === "resolved" ? "#f0fdf4" : "#fffbeb",
                                                color: d.status === "resolved" ? "#15803d" : "#b45309",
                                                fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, letterSpacing: "0.03em"
                                            }}>
                                                {d.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ padding: "14px 16px", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "flex-end" }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "#f97316", display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>VIEW FULL LEDGER →</span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}


function CardPreview({ type }) {
    if (type === "gov") return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <div style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "10px 14px", minWidth: 140 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 6, fontFamily: "Manrope, sans-serif" }}>M</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>Safety at work</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Border Services</div>
                {[90, 70, 80].map((w, i) => <div key={i} style={{ height: 5, borderRadius: 2, background: "rgba(255,255,255,0.2)", margin: "3px 0", width: w }} />)}
            </div>
        </div>
    );
    if (type === "coin") return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #d4aa50, #8b6914 60%, #5c3a00)", border: "3px solid #d4aa50", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#d4aa50", fontWeight: 700 }}>⚙</div>
        </div>
    );
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <div style={{ width: 64, height: 88, background: "rgba(255,255,255,0.05)", borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%", border: "1px solid rgba(255,255,255,0.08)" }} />
        </div>
    );
}