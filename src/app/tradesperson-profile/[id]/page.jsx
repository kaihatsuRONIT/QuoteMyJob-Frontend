"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import api from '@/lib/api';
import NavBar from '@/components/Navbar';
import { SiTicktick } from 'react-icons/si';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

const libraries = ['places'];

export default function TradespersonProfilePage() {
    const { id } = useParams();
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/users/tradespeople/${id}`)
            .then(({ data }) => setProfile(data))
            .finally(() => setLoading(false));
    }, [id]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    if(loading) return <TradespersonProfileSkeleton/>
    if (!profile) return null;
    return (
        <>
            <NavBar />
            <div style={{ background: '#f8f9fb', minHeight: '100vh', fontFamily: 'Work Sans, sans-serif' }}>
                <div style={{ padding: '16px 32px', borderBottom: '1px solid #e5e7eb', background: '#fff' }}>
                    <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', fontSize: '13px', fontWeight: 700, color: '#0d1b2a', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <FiArrowLeft /> Back to Directory
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '32px', padding: '40px 32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img src={profile.avatar || '/placeholder-avatar.png'} alt={profile.name} style={{ width: '365px', height: '365px', borderRadius: '16px', objectFit: 'cover' }} />
                        {profile.isVerified && (
                            <div style={{ position: 'absolute', bottom: '-12px', right: '-12px', background: '#0d1b2a', borderRadius: '8px', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '6px', }}>
                                <span style={{ fontSize: '14px' }}><SiTicktick size={20} color='orange' /></span>
                                <div>
                                    <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.6)', margin: 0, letterSpacing: '0.06em' }}>STATUS</p>
                                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#fff', margin: 0 }}>PRO VERIFIED</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignSelf: 'stretch', paddingBottom: "40px" }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '60px', color: '#0d1b2a', margin: 0, lineHeight: "60px" }}>{profile.businessName}</h1>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0d1b2a', background: '#D2E0FE', borderRadius: '999px', padding: '5px 12px' }}>
                                ★ {profile.averageRating.toFixed(1)} Rating ({profile.totalReviews} Reviews)
                            </span>
                        </div>
                        <p style={{ fontSize: '20px', color: '#515F78', margin: '0 0 24px', lineHeight: "28px", maxWidth: '600px' }}>
                            {`${profile.categories?.[0]?.category?.name || 'Tradesperson'} specialist.`}
                        </p>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '10px', border: 'none', background: '#0d1b2a', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
                                <FiMail /> Post a Job
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 280px', gap: '32px', padding: '0 32px 60px' }}>

                    {/* Left column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '20px' }}>
                            <p style={{ fontSize: '16px', fontWeight: 900, color: '#0B1A30', letterSpacing: '0.08em', margin: '0 0 16px', lineHeight: "32px" }}>PROFESSIONAL STATS</p>
                            {[
                                { label: 'Industry Experience', value: '15+ Years' },
                                { label: 'Projects Completed', value: `${profile.projectsCompleted}+` },
                                { label: 'Response Time', value: '< 2 Hours' },
                                { label: 'Insurance', value: profile.isVerified ? '✓ Verified' : 'Not Verified' },
                            ].map((stat, i) => (
                                <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f0f0' : 'none' }}>
                                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{stat.label}</span>
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: stat.label === 'Insurance' && profile.isVerified ? '#22c55e' : '#0d1b2a' }}>{stat.value}</span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 12px' }}>CORE COMPETENCIES</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {profile.categories.map(c => (
                                    <span key={c.categoryId} style={{ fontSize: '12px', fontWeight: 600, color: '#374151', background: '#eef0f8', borderRadius: '8px', padding: '6px 12px' }}>
                                        {c.category.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Middle column column */}
                    <div>
                        <div style={{ borderLeft: '4px solid #FF7E00', paddingLeft: '16px', marginBottom: '24px' }}>
                            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '28px', color: '#0d1b2a', margin: 0, lineHeight: 1.3 }}>
                                {profile.name || 'Trusted local professional.'}
                            </h2>
                        </div>
                        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.8, marginBottom: '32px' }}>{profile.bio}</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: 0 }}>VERIFIED CLIENT FEEDBACK</p>
                            {profile.totalReviews > 0 && (
                                <a href="#" style={{ fontSize: '13px', fontWeight: 700, color: '#FF7E00', textDecoration: 'none' }}>View All {profile.totalReviews} Reviews →</a>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {profile.reviews.slice(0, 3).map((r, i) => (
                                <div key={r.id} style={{
                                    background: i === 2 ? '#0d1b2a' : '#fff',
                                    borderRadius: '14px', padding: '20px',
                                    gridColumn: i === 2 ? '1 / -1' : 'auto',
                                    border: i === 2 ? 'none' : '1px solid #f0f0f0',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <span style={{ color: '#FF7E00', fontSize: '13px' }}>{'★'.repeat(r.rating)}</span>
                                        <span style={{ fontSize: '11px', color: i === 2 ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}>
                                            {new Date(r.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '13px', color: i === 2 ? '#fff' : '#374151', lineHeight: 1.6, margin: '0 0 16px', fontStyle: 'italic' }}>"{r.comment}"</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: i === 2 ? 'rgba(255,255,255,0.1)' : '#eef0f8' }} />
                                        <div>
                                            <p style={{ fontSize: '13px', fontWeight: 700, color: i === 2 ? '#fff' : '#0d1b2a', margin: 0 }}>{r.customer.name}</p>
                                            <p style={{ fontSize: '11px', color: i === 2 ? 'rgba(255,255,255,0.5)' : '#9ca3af', margin: 0 }}>Verified Project: {r.job.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column - new map */}
                    <div>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 12px' }}>LOCATION</p>
                        {isLoaded && profile.lat && profile.lng ? (
                            <GoogleMap
                                mapContainerStyle={{ width: '100%', height: '220px', borderRadius: '14px' }}
                                center={{ lat: profile.lat, lng: profile.lng }}
                                zoom={12}
                                options={{ disableDefaultUI: true, gestureHandling: 'greedy' }}
                            >
                                <Marker position={{ lat: profile.lat, lng: profile.lng }} />
                            </GoogleMap>
                        ) : (
                            <div style={{ width: '100%', height: '220px', borderRadius: '14px', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '13px' }}>
                                Location not available
                            </div>
                        )}
                        <p style={{ fontSize: '13px', color: '#6b7280', margin: '12px 0 0' }}>{profile.city || profile.address}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

function TradespersonProfileSkeleton() {
    return (
        <div style={{ background: "#f5f6fa", minHeight: "100vh", paddingBottom: 40, fontFamily: "'Work Sans', sans-serif" }}>
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
            <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "28px 32px", display: "flex", alignItems: "flex-start", gap: 32 }}>
                <div className="sk" style={{ width: 220, height: 280, borderRadius: 16, flexShrink: 0 }} />
                <div style={{ flex: 1, paddingTop: 8, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div className="sk" style={{ height: 36, width: 280, borderRadius: 8 }} />
                        <div className="sk" style={{ height: 28, width: 140, borderRadius: 20 }} />
                    </div>
                    <div className="sk" style={{ height: 18, width: 200 }} />
                    <div className="sk" style={{ height: 44, width: 148, borderRadius: 10, marginTop: 4 }} />
                    <div style={{ marginTop: 8, background: "#f5f6fa", borderRadius: 10, padding: "14px 18px", display: "inline-flex", alignItems: "center", gap: 10, width: "fit-content" }}>
                        <div className="sk" style={{ width: 18, height: 18, borderRadius: "50%" }} />
                        <div className="sk" style={{ width: 100, height: 14 }} />
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: "28px 32px", display: "grid", gridTemplateColumns: "260px 1fr 200px", gap: 24, alignItems: "start" }}>

                {/* Left — Professional Stats */}
                <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="sk" style={{ height: 13, width: 120 }} />
                    {["140px", "100px", "120px"].map((w, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div className="sk" style={{ height: 13, width: w }} />
                            <div className="sk" style={{ height: 13, width: 60 }} />
                        </div>
                    ))}
                </div>

                {/* Center — Bio + Reviews */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 12, padding: "20px 24px" }}>
                        <div style={{ borderLeft: "3px solid #e5e7eb", paddingLeft: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                            <div className="sk" style={{ height: 16, width: "100%" }} />
                            <div className="sk" style={{ height: 16, width: "90%" }} />
                            <div className="sk" style={{ height: 16, width: "75%" }} />
                        </div>
                        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                            <div className="sk" style={{ height: 13, width: "100%" }} />
                            <div className="sk" style={{ height: 13, width: "85%" }} />
                        </div>
                    </div>

                    <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 12, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                        <div className="sk" style={{ height: 13, width: 140 }} />
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                <div className="sk" style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }} />
                                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                                    <div className="sk" style={{ height: 13, width: 120 }} />
                                    <div className="sk" style={{ height: 12, width: 80 }} />
                                    <div className="sk" style={{ height: 12, width: "100%" }} />
                                    <div className="sk" style={{ height: 12, width: "75%" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — Location */}
                <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                    <div className="sk" style={{ height: 13, width: 60 }} />
                    <div className="sk" style={{ height: 80, borderRadius: 8 }} />
                    <div className="sk" style={{ height: 13, width: 100 }} />
                </div>

            </div>
        </div>
    );
}