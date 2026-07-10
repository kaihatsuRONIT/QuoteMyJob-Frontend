'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowRight } from 'react-icons/fi';
import api from '@/lib/api';

function TradesCard({ person }) {
    const category = person.categories?.[0]?.category?.name || 'General';
    const businessName = person.businessName || category;
    const rating = person.averageRating || 0;
    const totalReviews = person.totalReviews || 0;
    const router = useRouter();

    return (
        <div style={{
            background: '#fff', border: '1px solid #e8e8e8', borderRadius: 16,
            padding: '20px', fontFamily: "'Work Sans', sans-serif",
            display: 'flex', flexDirection: 'column', gap: 14,
        }}>
            {/* Top */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ position: 'relative' }}>
                    {person.avatar
                        ? <img src={person.avatar} alt={person.name} style={{ width: 64, height: 64, borderRadius: 14, objectFit: 'cover' }} />
                        : <div style={{ width: 64, height: 64, borderRadius: 14, background: '#f0f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#94a3b8' }}>🔧</div>
                    }
                    {person.isVerified && (
                        <span style={{ position: 'absolute', bottom: -4, right: -4, background: '#0d1b2a', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', border: '2px solid #fff' }}>✓</span>
                    )}
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                        <span style={{ color: '#f97316', fontSize: 14 }}>★</span>
                        <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 16, color: '#111' }}>{rating.toFixed(1)}</span>
                    </div>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 0', letterSpacing: '0.04em' }}>{totalReviews} REVIEWS</p>
                </div>
            </div>

            {/* Info */}
            <div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 800, color: '#0d1b2a', margin: '0 0 4px' }}>{businessName}</h3>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#f97316', margin: 0 }}>{person.name}</p>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', background: '#f0f3ff', padding: '5px 12px', borderRadius: 20 }}>
                    {category}
                </span>
                {person.isVerified && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', background: '#f0f3ff', padding: '5px 12px', borderRadius: 20 }}>
                        LICENSED
                    </span>
                )}
            </div>

            {/* Button */}
            <button
                onClick={() => router.push(`/tradesperson-profile/${person.id}`)}
                style={{ width: '100%', background: '#0d1b2a', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', marginTop: 'auto' }}
            >
                View Profile
            </button>
        </div>
    );
}

export default function EliteProfessionals() {
    const [tradespeople, setTradespeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get('/users/tradespeople/search', {
                    params: { page: 1 },
                });
                setTradespeople((data || []).slice(0, 4));
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    if(loading) return <EliteProfessionalsSkeleton/>
    return (
        <section style={{ background: '#fff', padding: '48px 32px', fontFamily: 'Work Sans, sans-serif' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');
                .ep-view-all { font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 15px; color: #0d1b2a; display: flex; align-items: center; gap: 6px; cursor: pointer; text-decoration: none; border-bottom: 2px solid #f5820a; padding-bottom: 2px; }
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '32px', color: '#0d1b2a', margin: '0 0 6px' }}>
                        Elite Professionals
                    </h2>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                        Vetted tradespeople with a track record of excellence.
                    </p>
                </div>
                <a className="ep-view-all" onClick={() => router.push('/directory')}>
                    View all experts <FiArrowRight />
                </a>
            </div>

            {/* Cards */}
            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} style={{ background: '#f8f9fb', borderRadius: 16, height: 280, animation: 'pulse 1.5s ease-in-out infinite' }} />
                    ))}
                    <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
                </div>
            ) : tradespeople.length === 0 ? (
                <p style={{ color: '#9ca3af', fontSize: 14, textAlign: 'center', padding: '32px 0' }}>No tradespeople found.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {tradespeople.map((p) => (
                        <TradesCard key={p.id} person={p} />
                    ))}
                </div>
            )}
        </section>
    );
}
function EliteProfessionalsSkeleton() {
    return (
        <section style={{ background: '#fff', padding: '48px 32px', fontFamily: 'Work Sans, sans-serif' }}>
            <style>{`
                @keyframes shimmer {
                    0% { background-position: -600px 0; }
                    100% { background-position: 600px 0; }
                }
                .sk {
                    background: linear-gradient(90deg, #e8e8e8 25%, #f2f2f2 50%, #e8e8e8 75%);
                    background-size: 600px 100%;
                    animation: shimmer 1.6s infinite;
                    border-radius: 6px;
                }
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="sk" style={{ height: 32, width: 220, borderRadius: 8 }} />
                    <div className="sk" style={{ height: 14, width: 300 }} />
                </div>
                <div className="sk" style={{ height: 18, width: 120, marginTop: 6 }} />
            </div>

            {/* Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {/* Top row — avatar + rating */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div className="sk" style={{ width: 64, height: 64, borderRadius: 14 }} />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                                <div className="sk" style={{ height: 16, width: 60 }} />
                                <div className="sk" style={{ height: 12, width: 70 }} />
                            </div>
                        </div>

                        {/* Name + role */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div className="sk" style={{ height: 18, width: '80%' }} />
                            <div className="sk" style={{ height: 13, width: '55%' }} />
                        </div>

                        {/* Tags */}
                        <div style={{ display: 'flex', gap: 8 }}>
                            <div className="sk" style={{ height: 26, width: 80, borderRadius: 20 }} />
                            <div className="sk" style={{ height: 26, width: 70, borderRadius: 20 }} />
                        </div>

                        {/* Button */}
                        <div className="sk" style={{ height: 44, width: '100%', borderRadius: 10, marginTop: 'auto' }} />
                    </div>
                ))}
            </div>
        </section>
    );
}