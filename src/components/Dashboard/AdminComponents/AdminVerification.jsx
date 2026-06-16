import { TbClipboardCheck } from 'react-icons/tb';
import { FiUserPlus, FiEyeOff } from 'react-icons/fi';
import { FiFilter, FiCheckSquare, FiAward, FiMail, FiAlertCircle } from 'react-icons/fi';
import { MdVerified, MdElectricBolt } from 'react-icons/md';
import { FaFire } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import InspectNode from './InspectNode';
import api from '@/lib/api';

const stats = [
    { icon: TbClipboardCheck, label: 'PENDING VERIFICATIONS', value: '148', badge: '+12%', badgeColor: '#f59e0b', badgeBg: 'rgba(245,158,11,0.1)', border: '#f59e0b' },
    { icon: FiUserPlus, label: 'REGISTRATIONS TODAY', value: '32', badge: 'NEW', badgeColor: '#6366f1', badgeBg: 'rgba(99,102,241,0.1)', border: '#6366f1' },
    { icon: FiEyeOff, label: 'FAILED AUDITS', value: '07', badge: 'ALERT', badgeColor: '#ef4444', badgeBg: 'rgba(239,68,68,0.1)', border: '#ef4444' },
];
const barData = [
    { day: 'MON', height: 40, color: '#c7d0e8' },
    { day: 'TUE', height: 55, color: '#c7d0e8' },
    { day: 'WED', height: 80, color: '#FF7E00' },
    { day: 'THU', height: 45, color: '#c7d0e8' },
    { day: 'FRI', height: 60, color: '#c7d0e8' },
    { day: 'SAT', height: 35, color: '#c7d0e8' },
    { day: 'SUN', height: 70, color: '#0d1b2a' },
];
const professionals = [
    { name: 'Marcus Thorne', joined: '2h ago', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&q=80', trade: 'MASTER PLUMBER', tradeColor: '#6366f1', credentials: true, status: 'Pending', statusColor: '#FF7E00', action: 'INSPECT NODE' },
    { name: 'Elena Rodriguez', joined: '5h ago', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80', trade: 'ELECTRICIAN', tradeColor: '#3b82f6', credentials: true, status: 'Reviewing', statusColor: '#374151', action: 'INSPECT NODE' },
    { name: 'Simon G.', joined: '1d ago', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80', trade: 'HVAC SPECIALIST', tradeColor: '#6b7280', credentials: false, status: 'ACTION REQUIRED', statusColor: '#ef4444', action: 'INSPECT NODE' },
    { name: 'Simon G.', joined: '1d ago', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80', trade: 'HVAC SPECIALIST', tradeColor: '#6b7280', credentials: false, status: 'ACTION REQUIRED', statusColor: '#ef4444', action: 'INSPECT NODE' },
    { name: 'Simon G.', joined: '1d ago', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80', trade: 'HVAC SPECIALIST', tradeColor: '#6b7280', credentials: false, status: 'ACTION REQUIRED', statusColor: '#ef4444', action: 'INSPECT NODE' },
    { name: 'Simon G.', joined: '1d ago', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80', trade: 'HVAC SPECIALIST', tradeColor: '#6b7280', credentials: false, status: 'ACTION REQUIRED', statusColor: '#ef4444', action: 'INSPECT NODE' },
    { name: 'Simon G.', joined: '1d ago', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80', trade: 'HVAC SPECIALIST', tradeColor: '#6b7280', credentials: false, status: 'ACTION REQUIRED', statusColor: '#ef4444', action: 'INSPECT NODE' },
];

export default function AdminVerification() {
    const [inspectNode, SetInspectNode] = useState(false);
    const [tradespeople, setTradespeople] = useState([]);
    const [pending, setIsPending] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(inspectNode)
    useEffect(() => {
        const fetchAllTradespersons = async () => {
            try {
                const { data } = await api.get('/admin/tradespeople');
                setTradespeople(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllTradespersons();
    }, []);

    if (loading) return <h1 className='mx-auto my-auto'>Loading...</h1>
    return (
        <>
            {
                inspectNode ? (
                    <InspectNode onBack={() => SetInspectNode(false)} />
                ) : (
                    <>
                        <div style={{ padding: '36px 40px', fontFamily: 'Work Sans, sans-serif' }} >
                            <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

                            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '56px', color: '#0d1b2a', margin: '0 0 8px', lineHeight: "56px", letterSpacing: "-1.4px" }}>
                                Architectural Oversight
                            </h1>
                            <p style={{ fontSize: '18px', color: '#9ca3af', margin: '0 0 32px', maxWidth: '420px', lineHeight: "28px", fontWeight: "400" }}>
                                Validate industry credentials and manage system-wide compliance through the central verification engine.
                            </p>

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

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', padding: '40px 40px 40px', fontFamily: 'Work Sans, sans-serif' }}>

                                {/* Left — Queue */}
                                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
                                    {/* Header */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #f0f0f0' }}>
                                        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '20px', color: '#0d1b2a', margin: 0, lineHeight: "28px" }}>Verification Queue</h3>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
                                                <FiFilter style={{ fontSize: '13px' }} /> Filter
                                            </button>
                                            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#0d1b2a', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#fff', cursor: 'pointer' }}>
                                                <FiCheckSquare style={{ fontSize: '13px' }} /> Bulk Approve
                                            </button>
                                        </div>
                                    </div>

                                    {/* Table */}
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                                {['PROFESSIONAL NAME', 'CATEGORY', 'CREDENTIALS', 'STATUS', 'ACTION'].map(col => (
                                                    <th key={col} style={{ textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', padding: '10px 16px' }}>{col}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tradespeople.map((p, i) => (
                                                <tr key={i} style={{ borderBottom: '1px solid #f8f9fb' }}>
                                                    <td style={{ padding: '14px 16px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <img src={p.avatar} alt={p.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                                                            <div>
                                                                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#0d1b2a', margin: '0 0 2px' }}>{p.name}</p>
                                                                <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
                                                                    Joined {new Date(p.user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '14px 16px' }}>
                                                        <span style={{ fontSize: '12px', fontWeight: 700, color: `${p?.categories?.length > 0 ? "#000000c4" : "#ff00009e"}`, borderRadius: '6px', padding: '4px 8px', whiteSpace: 'nowrap' }}>
                                                            {p?.categories?.length > 0 ? p.categories[0].category.name : "No Category Assigned"}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '14px 16px' }}>
                                                        {p.credentials
                                                            ? <div style={{ display: 'flex', gap: '6px' }}>
                                                                <FiAward style={{ color: '#6b7280', fontSize: '16px' }} />
                                                                <FiMail style={{ color: '#6b7280', fontSize: '16px' }} />
                                                            </div>
                                                            : <FiAlertCircle style={{ color: '#ef4444', fontSize: '16px' }} />
                                                        }
                                                    </td>
                                                    <td style={{ padding: '14px 16px' }}>
                                                        <span style={{ fontSize: '12px', fontWeight: 700, color: p.statusColor, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: p.statusColor, display: 'inline-block', flexShrink: 0 }} />
                                                            {p.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '14px 16px' }}>
                                                        <span onClick={() => SetInspectNode(true)} style={{ fontSize: '11px', fontWeight: 700, color: '#FF7E00', cursor: 'pointer', letterSpacing: '0.04em' }}>{p.action}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Right column */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                                    {/* Market Pulse */}
                                    <div style={{ background: '#0d1b2a', borderRadius: '16px', padding: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', margin: 0 }}>Market Pulse</h3>
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            {[
                                                { tag: 'NOW POSTING', tagColor: '#FF7E00', title: 'Industrial HVAC Overhaul', sub: '✓ Verified Client', subColor: '#22c55e' },
                                                { tag: 'INCOMING BID', tagColor: '#3b82f6', title: 'Residential Rewiring Project', sub: '⚠ Pro Unverified', subColor: '#f59e0b' },
                                                { tag: 'JUST COMPLETED', tagColor: '#22c55e', title: 'Luxury Bath Install', sub: '✓ Compliance Passed', subColor: '#22c55e' },
                                            ].map(({ tag, tagColor, title, sub, subColor }) => (
                                                <div key={title} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '14px' }}>
                                                    <p style={{ fontSize: '10px', fontWeight: 700, color: tagColor, letterSpacing: '0.08em', margin: '0 0 4px' }}>{tag}</p>
                                                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#fff', margin: '0 0 4px' }}>{title}</p>
                                                    <p style={{ fontSize: '11px', color: subColor, margin: 0 }}>{sub}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <button style={{ width: '100%', marginTop: '16px', padding: '11px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '12px', cursor: 'pointer', letterSpacing: '0.06em' }}>
                                            VIEW FULL ACTIVITY
                                        </button>
                                    </div>

                                    {/* Approval Velocity */}
                                    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '20px' }}>
                                        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '0 0 16px' }}>Approval Velocity</h3>
                                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px', marginBottom: '8px' }}>
                                            {barData.map(({ day, height, color }) => (
                                                <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                                    <div style={{ width: '100%', height: `${height}px`, background: color, borderRadius: '4px 4px 0 0' }} />
                                                    <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 600 }}>{day}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
                                            Average response time: <strong style={{ color: '#0d1b2a' }}>4.2 Hours</strong>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div >
                    </>
                )
            }
        </>
    );
}