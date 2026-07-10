import { TbClipboardCheck } from 'react-icons/tb';
import { FiUserPlus, FiEyeOff } from 'react-icons/fi';
import { FiFilter, FiCheckSquare, FiAward, FiMail, FiAlertCircle } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import InspectNode from './InspectNode';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminVerification() {
    const [inspectNode, setInspectNode] = useState(false);
    const [selectedTradesperson, setSelectedTradesperson] = useState(null);
    const [tradespeople, setTradespeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchAllTradespersons = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/admin/tradespeople');
            setTradespeople(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllTradespersons();
    }, []);

    const handleVerify = async (id, isVerified) => {
        try {
            setUpdatingId(id);
            await api.patch(`/admin/tradespeople/${id}/verify`, { isVerified });
            toast.success(isVerified ? 'Tradesperson verified' : 'Verification revoked');
            await fetchAllTradespersons();
        } catch (err) {
            console.error(err);
            toast.error('Failed to update verification');
        } finally {
            setUpdatingId(null);
        }
    };

    const pendingCount = tradespeople.filter(t => !t.isVerified).length;
    const verifiedCount = tradespeople.filter(t => t.isVerified).length;
    const noCategoryCount = tradespeople.filter(t => !t.categories?.length).length;

    const stats = [
        { icon: TbClipboardCheck, label: 'PENDING VERIFICATIONS', value: pendingCount.toString(), badge: pendingCount > 0 ? 'ACTION' : 'CLEAR', badgeColor: '#f59e0b', badgeBg: 'rgba(245,158,11,0.1)', border: '#f59e0b' },
        { icon: FiUserPlus, label: 'VERIFIED TRADESPEOPLE', value: verifiedCount.toString(), badge: 'LIVE', badgeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.1)', border: '#22c55e' },
        { icon: FiEyeOff, label: 'MISSING CATEGORY', value: noCategoryCount.toString(), badge: noCategoryCount > 0 ? 'ALERT' : 'OK', badgeColor: '#ef4444', badgeBg: 'rgba(239,68,68,0.1)', border: '#ef4444' },
    ];

    if (inspectNode) {
        return <InspectNode tradesperson={selectedTradesperson} onBack={() => setInspectNode(false)} onVerify={handleVerify} updatingId={updatingId} />;
    }

    return (
        <div style={{ padding: '36px 40px', fontFamily: 'Work Sans, sans-serif' }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "48px", fontWeight: 900, color: "#0f172a", margin: "0 0 10px", lineHeight: "48px", letterSpacing: "0.5px", minWidth: "335px" }}>Tradesperson <span style={{ color: "#f97316" }}>Verification</span></h2>
            <p style={{ fontSize: '16px', color: '#9ca3af', margin: '0 0 32px', maxWidth: '420px', lineHeight: "28px", fontWeight: "400" }}>
                Validate industry credentials and manage system-wide compliance through the central verification engine.
            </p>
            {
                loading ? <SkeletonTable /> : (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                            {stats.map(({ icon: Icon, label, value, badge, badgeColor, badgeBg, border }) => (
                                <div key={label} style={{ background: '#f0f2f7', borderRadius: '16px', padding: '20px', borderLeft: `4px solid ${border}` }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <Icon style={{ fontSize: '22px', color: '#6b7280' }} />
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: badgeColor, background: badgeBg, borderRadius: '6px', padding: '3px 8px' }}>
                                            {badge}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 6px' }}>{label}</p>
                                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '32px', color: '#0d1b2a', margin: 0 }}>{value}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', padding: '40px 0', fontFamily: 'Work Sans, sans-serif' }}>
                            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #f0f0f0' }}>
                                    <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '20px', color: '#0d1b2a', margin: 0, lineHeight: "28px" }}>Verification Queue</h3>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
                                        <FiFilter style={{ fontSize: '13px' }} /> Filter
                                    </button>
                                </div>

                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                            {['PROFESSIONAL NAME', 'CATEGORY', 'CREDENTIALS', 'STATUS', 'ACTION'].map(col => (
                                                <th key={col} style={{ textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', padding: '10px 16px' }}>{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tradespeople.length === 0 ? (
                                            <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>No tradespeople found.</td></tr>
                                        ) : (
                                            tradespeople.map((p) => {
                                                const hasCredentials = p.licenseNo && p.insuranceDoc;
                                                const statusColor = p.isVerified ? '#22c55e' : '#FF7E00';
                                                const statusLabel = p.isVerified ? 'Verified' : 'Pending';

                                                return (
                                                    <tr key={p.id} style={{ borderBottom: '1px solid #f8f9fb' }}>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                <img
                                                                    src={p.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=eef0f8&color=0d1b2a`}
                                                                    alt={p.name}
                                                                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                                                                />
                                                                <div>
                                                                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#0d1b2a', margin: '0 0 2px' }}>{p.name}</p>
                                                                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
                                                                        Joined {new Date(p.user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <span style={{ fontSize: '12px', fontWeight: 700, color: p.categories?.length > 0 ? "#000000c4" : "#ff00009e" }}>
                                                                {p.categories?.length > 0 ? p.categories[0].category.name : "No Category Assigned"}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            {hasCredentials
                                                                ? <div style={{ display: 'flex', gap: '6px' }}>
                                                                    <FiAward style={{ color: '#6b7280', fontSize: '16px' }} title="License on file" />
                                                                    <FiMail style={{ color: '#6b7280', fontSize: '16px' }} title="Insurance on file" />
                                                                </div>
                                                                : <FiAlertCircle style={{ color: '#ef4444', fontSize: '16px' }} title="Missing credentials" />
                                                            }
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <span style={{ fontSize: '12px', fontWeight: 700, color: statusColor, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: statusColor, display: 'inline-block', flexShrink: 0 }} />
                                                                {statusLabel}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                            <span
                                                                onClick={() => { setSelectedTradesperson(p); setInspectNode(true); }}
                                                                style={{ fontSize: '11px', fontWeight: 700, color: '#FF7E00', cursor: 'pointer', letterSpacing: '0.04em' }}
                                                            >
                                                                INSPECT
                                                            </span>
                                                            {!p.isVerified ? (
                                                                <button
                                                                    onClick={() => handleVerify(p.id, true)}
                                                                    disabled={updatingId === p.id}
                                                                    style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: '#22c55e', border: 'none', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', opacity: updatingId === p.id ? 0.6 : 1 }}
                                                                >
                                                                    {updatingId === p.id ? '...' : 'APPROVE'}
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleVerify(p.id, false)}
                                                                    disabled={updatingId === p.id}
                                                                    style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', background: 'transparent', border: '1px solid #ef4444', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', opacity: updatingId === p.id ? 0.6 : 1 }}
                                                                >
                                                                    {updatingId === p.id ? '...' : 'REVOKE'}
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
}

function SkeletonTable() {
    return (
        <div style={{ padding: '36px 40px' }}>
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
            <div style={{ width: '300px', height: '40px', background: '#e5e7eb', borderRadius: '8px', marginBottom: '12px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '420px', height: '16px', background: '#e5e7eb', borderRadius: '8px', marginBottom: '32px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
                {[1, 2, 3].map(i => (
                    <div key={i} style={{ height: '110px', background: '#f0f2f7', borderRadius: '16px', animation: 'pulse 1.5s infinite' }} />
                ))}
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
                {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ display: 'flex', gap: '20px', padding: '16px 20px', borderBottom: '1px solid #f8f9fb' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                        <div style={{ width: '150px', height: '14px', background: '#e5e7eb', borderRadius: '6px', marginTop: '10px', animation: 'pulse 1.5s infinite' }} />
                        <div style={{ width: '100px', height: '14px', background: '#e5e7eb', borderRadius: '6px', marginTop: '10px', animation: 'pulse 1.5s infinite' }} />
                        <div style={{ width: '80px', height: '14px', background: '#e5e7eb', borderRadius: '6px', marginTop: '10px', animation: 'pulse 1.5s infinite' }} />
                    </div>
                ))}
            </div>
        </div>
    );
}