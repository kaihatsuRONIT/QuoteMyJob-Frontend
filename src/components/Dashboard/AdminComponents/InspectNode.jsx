import { FiMail, FiDownload, FiCalendar, FiRefreshCw, FiShield, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';

export default function InspectNode({ tradesperson, onBack, onVerify, updatingId }) {
    if (!tradesperson) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <p style={{ color: '#9ca3af' }}>No tradesperson selected.</p>
                <button onClick={onBack} style={{ marginTop: '16px', padding: '8px 16px', background: '#FF7E00', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    Back
                </button>
            </div>
        );
    }

    const {
        id,
        name,
        avatar,
        businessName,
        bio,
        licenseNo,
        insuranceDoc,
        isVerified,
        createdAt,
        city,
        address,
        radiusMiles,
        categories = [],
        subscriptions = [],
        user = {},
    } = tradesperson;

    const activeSubscription = subscriptions.find(s => s.status === 'ACTIVE');
    const joinedDate = new Date(createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const credentials = [
        {
            id: "license",
            title: "Trade License",
            sub: licenseNo || "NOT PROVIDED",
            status: licenseNo ? "provided" : "missing",
        },
        {
            id: "insurance",
            title: "Insurance Document",
            sub: insuranceDoc ? "DOCUMENT ON FILE" : "NOT PROVIDED",
            status: insuranceDoc ? "provided" : "missing",
            link: insuranceDoc,
        },
    ];

    return (
        <>
            <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FF7E00', border: 'none', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 700, color: '#fff', cursor: 'pointer', margin: '20px 20px' }}>
                <FiArrowLeft style={{ fontSize: '12px' }} /> BACK
            </button>
            <div style={{ padding: '36px 40px', fontFamily: 'Work Sans, sans-serif' }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '14px', color: '#FF7E00', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 20px' }}>
                    {businessName || 'INDEPENDENT TRADESPERSON'}
                </p>

                {/* Profile header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: '16px', overflow: 'hidden', background: '#eef0f8', border: '2px solid #e5e7eb' }}>
                                <img
                                    src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=eef0f8&color=0d1b2a&size=200`}
                                    alt={name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            {isVerified && (
                                <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: '#FF7E00', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #fff' }}>
                                    <MdVerified style={{ color: '#fff', fontSize: '14px' }} />
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '32px', color: '#0d1b2a', margin: '0 0 6px' }}>{name}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '15px', color: '#6b7280' }}>{user.email}</span>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF7E00', display: 'inline-block' }} />
                                <span style={{
                                    fontSize: '12px', fontWeight: 700,
                                    color: isVerified ? '#22c55e' : '#FF7E00',
                                    background: isVerified ? 'rgba(34,197,94,0.1)' : 'rgba(255,126,0,0.1)',
                                    borderRadius: '8px', padding: '4px 10px'
                                }}>
                                    {isVerified ? 'VERIFIED PROFESSIONAL' : 'PENDING VERIFICATION'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '14px', color: '#0d1b2a', cursor: 'pointer' }}>
                            <FiMail style={{ fontSize: '15px' }} /> Email
                        </button>
                        {!isVerified ? (
                            <button
                                onClick={() => onVerify(id, true)}
                                disabled={updatingId === id}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', border: 'none', background: '#22c55e', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', cursor: 'pointer', opacity: updatingId === id ? 0.6 : 1 }}
                            >
                                <MdVerified style={{ fontSize: '15px' }} /> {updatingId === id ? 'Updating...' : 'Approve & Verify'}
                            </button>
                        ) : (
                            <button
                                onClick={() => onVerify(id, false)}
                                disabled={updatingId === id}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', border: '1px solid #ef4444', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#ef4444', cursor: 'pointer', opacity: updatingId === id ? 0.6 : 1 }}
                            >
                                {updatingId === id ? 'Updating...' : 'Revoke Verification'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Main grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>

                    {/* Left — Profile details */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '22px', color: '#0d1b2a', margin: 0 }}>Profile Details</h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '28px' }}>
                            {[
                                { label: 'JOINED', value: joinedDate },
                                { label: 'LOCATION', value: city || address || 'Not provided' },
                                { label: 'SERVICE RADIUS', value: `${radiusMiles} miles` },
                                { label: 'CATEGORIES', value: categories.length > 0 ? categories.map(c => c.category.name).join(', ') : 'None assigned' },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 6px' }}>{label}</p>
                                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0d1b2a', margin: 0 }}>{value}</p>
                                </div>
                            ))}
                        </div>

                        {bio && (
                            <div style={{ background: '#f0f2f7', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <FiShield style={{ color: '#FF7E00', fontSize: '16px' }} />
                                </div>
                                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{bio}</p>
                            </div>
                        )}
                    </div>

                    {/* Right — Subscription */}
                    <div style={{ background: '#0d1b2a', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#FF7E00', letterSpacing: '0.1em', margin: 0 }}>SUBSCRIPTION STATUS</p>

                        {activeSubscription ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '28px', color: '#fff', margin: 0, lineHeight: 1.2 }}>
                                        {activeSubscription.plan === 'YEARLY' ? 'Yearly Plan' : 'Monthly Plan'}
                                    </h2>
                                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>£{Number(activeSubscription.price).toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <FiCalendar style={{ color: '#FF7E00', fontSize: '15px', flexShrink: 0 }} />
                                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                                            Active since {new Date(activeSubscription.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <FiRefreshCw style={{ color: '#FF7E00', fontSize: '15px', flexShrink: 0 }} />
                                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                                            Expires {new Date(activeSubscription.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px 0' }}>
                                <FiAlertCircle style={{ color: '#ef4444', fontSize: '28px' }} />
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', textAlign: 'center', margin: 0 }}>No active subscription</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Credentials */}
                <div style={{ marginTop: '40px' }}>
                    <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 22, fontWeight: 700, color: "#111", marginBottom: 20 }}>Submitted Credentials</h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                        {credentials.map((c) => (
                            <div key={c.id} style={{ background: "#f8f9fb", border: "1px solid #e8e8e8", borderRadius: 12, padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                    <div>
                                        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: "#0d1b2a", margin: '0 0 4px' }}>{c.title}</p>
                                        <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.04em", margin: 0 }}>{c.sub}</p>
                                    </div>
                                    {c.status === "provided" ? (
                                        <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 600 }}>✓ ON FILE</span>
                                    ) : (
                                        <FiAlertCircle style={{ color: '#ef4444', fontSize: '18px' }} />
                                    )}
                                </div>
                                {c.link && (
                                    <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#FF7E00', fontWeight: 700, textDecoration: 'none' }}>
                                        View Document →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}