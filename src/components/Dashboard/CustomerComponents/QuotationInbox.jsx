import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiCalendar, FiClock, FiFileText } from 'react-icons/fi';
import { IoShieldCheckmark } from 'react-icons/io5';
import { MdSupportAgent } from 'react-icons/md';


export default function QuotationInbox({ jobId, token }) {
    const [job, setJob] = useState(null);
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accepting, setAccepting] = useState(null);
    const [selectedQuote, setSelectedQuote] = useState(null);
    const router = useRouter()

    useEffect(() => {
        console.log('jobId:', jobId);
        if (!jobId) return;
        fetchJobAndQuotes();
    }, [jobId]);

    const fetchJobAndQuotes = async () => {
        try {
            setLoading(true);
            const [jobRes, quotesRes] = await Promise.all([
                api.get(`/jobs/${jobId}`),
                api.get(`/quotes/${jobId}`),
            ]);
            setJob(jobRes.data);
            setQuotes(Array.isArray(quotesRes.data) ? quotesRes.data : []);
        } catch (err) {
            console.error('Failed to fetch job/quotes:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (quoteId) => {
        try {
            setAccepting(quoteId);
            await api.patch(`/quotes/${quoteId}/accept`);
            await fetchJobAndQuotes();
        } catch (err) {
            console.error('Failed to accept quote:', err);
        } finally {
            setAccepting(null);
        }
    };

    const handleReject = async (quoteId) => {
        try {
            await api.patch(`/quotes/${quoteId}/withdraw`);
            await fetchJobAndQuotes();
        } catch (err) {
            console.error('Failed to reject quote:', err);
        }
    };

    if (loading) return <div style={{ padding: '32px 40px', fontFamily: 'Work Sans, sans-serif' }}>Loading...</div>;
    if (!job) return <div style={{ padding: '32px 40px', fontFamily: 'Work Sans, sans-serif' }}>Job not found.</div>;

    const category = job?.categories?.[0]?.category?.name || '—';
    const budget = job?.budgetMax ? `${job?.budgetCurrency === 'EUR' ? '€' : '£'}${job.budgetMax}` : 'Not specified';
    const location = job?.address || '—';
    const status = job?.status || '—';

    return (
        <div style={{ padding: '32px 40px', fontFamily: 'Work Sans, sans-serif', maxWidth: '1104px', margin: '0 auto' }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

            {/* Badge */}
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#55637D', background: '#D2E0FE', borderRadius: '999px', padding: '4px 12px', lineHeight: '16px' }}>
                &lt; ACTIVE REQUEST
            </span>

            {/* Title */}
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '48px', color: '#FF7E00', margin: '10px 0 6px', lineHeight: '48px', letterSpacing: '-0.96px' }}>
                Quotation Inbox
            </h2>
            <p style={{ fontSize: '14px', color: '#9ca3af', margin: '0 0 28px' }}>
                Compare quotes for: <strong style={{ color: '#0d1b2a' }}>{job?.title}</strong>
            </p>

            {/* Info row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.4fr', gap: '16px' }}>
                <div style={{ background: '#f0f2f7', borderRadius: '16px', padding: '20px 24px' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', margin: '0 0 16px' }}>JOB SPECIFICATION</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        {[
                            { label: 'Category', value: category },
                            { label: 'Max Budget', value: budget },
                            { label: 'Location', value: location },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px' }}>{label}</p>
                                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: 0 }}>{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ background: '#0d1b2a', borderRadius: '16px', padding: '20px 24px' }}>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: '0 0 6px' }}>Status</p>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '20px', color: '#fff', margin: '0 0 10px' }}>{status}</p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF7E00', display: 'inline-block' }} />
                        {quotes.length} Professional{quotes.length !== 1 ? 's' : ''} responded
                    </p>
                </div>
            </div>

            {/* Received Proposals */}
            <div style={{ marginTop: '48px' }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0d1b2a', margin: '0 0 16px', borderLeft: '4px solid #FF7E00', paddingLeft: '12px', lineHeight: '32px' }}>
                    Received Proposals
                </h3>

                {quotes.length === 0 ? (
                    <p style={{ color: '#9ca3af', fontSize: '14px' }}>No quotes received yet.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {quotes.map((q) => {
                            const t = q.tradesperson;
                            const avgRating = t?.reviews?.length
                                ? (t.reviews.reduce((sum, r) => sum + r.rating, 0) / t.reviews.length).toFixed(1)
                                : '—';
                            const reviewCount = t?.reviews?.length || 0;
                            const currency = job?.budgetCurrency === 'EUR' ? '€' : '£';

                            return (
                                <div key={q.id} style={{ background: '#ffffff', borderRadius: '16px', overflow: 'hidden' }}>
                                    <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        {/* Avatar */}
                                        <div style={{ position: 'relative', flexShrink: 0 }}>
                                            <img
                                                src={t?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t?.name || 'T')}&background=eef0f8&color=0d1b2a`}
                                                alt={t?.name}
                                                style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover', display: 'block' }}
                                            />
                                            {t?.isVerified && (
                                                <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', width: '20px', height: '20px', borderRadius: '50%', background: '#0d1b2a', border: '2px solid #f0f2f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <span style={{ fontSize: '9px', color: '#fff' }}>✓</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '0 0 3px' }}>
                                                {t?.name} <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: '13px' }}>· {t?.businessName || 'Independent'}</span>
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                                                <FaStar style={{ color: '#FF7E00', fontSize: '12px' }} />
                                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0d1b2a' }}>{avgRating}</span>
                                                <span style={{ fontSize: '12px', color: '#9ca3af' }}>({reviewCount} reviews)</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '16px' }}>
                                                {q.estimatedDays && (
                                                    <span style={{ fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <FiClock style={{ fontSize: '11px' }} /> {q.estimatedDays} day{q.estimatedDays !== 1 ? 's' : ''} to complete
                                                    </span>
                                                )}
                                                {q.note && (
                                                    <span style={{ fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <FiFileText style={{ fontSize: '11px' }} /> {q.note}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Quote + actions */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 2px' }}>QUOTE TOTAL</p>
                                                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', color: '#0d1b2a', margin: 0 }}>{currency}{Number(q.price).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Tradesperson Note */}
                                    <button
                                        onClick={() => setSelectedQuote(q)}
                                        style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Work Sans, sans-serif', fontWeight: 500, fontSize: '12px', color: '#374151', cursor: 'pointer', marginBottom: "15px" }}
                                    >
                                        Tradesperson Note
                                    </button>
                                    {/* Accept/Reject */}
                                    {q.status === 'PENDING' && (job.status === 'OPEN' || job.status === 'CLOSED') && (
                                        <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
                                            <button
                                                onClick={() => handleAccept(q.id)}
                                                disabled={accepting === q.id}
                                                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#22c55e', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer', opacity: accepting === q.id ? 0.7 : 1 }}
                                            >
                                                {accepting === q.id ? 'Accepting...' : 'Accept'}
                                            </button>
                                            <button
                                                onClick={() => handleReject(q.id)}
                                                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #FF7E00', background: '#fff', color: '#FF7E00', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                    {q.status === 'ACCEPTED' && (
                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e', display: 'block', marginBottom: '15px' }}>✓ Accepted</span>
                                    )}
                                    {q.status === 'REJECTED' && (
                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', display: 'block', marginBottom: '15px' }}>✗ Rejected</span>
                                    )}
                                    {/* Message Pro */}
                                    <button onClick={()=> router.push("/customer/dashboard/chats")} style={{ width: '100%', padding: '12px', border: '1px solid #C5C6CD', background: '#F2F6FE', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0B1A30', cursor: 'pointer', lineHeight: '20px' }}>
                                        Message Pro
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer info */}
            <div style={{ borderTop: '2px solid #E7EEFF', marginTop: '70px', padding: '30px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {[
                    { Icon: IoShieldCheckmark, title: 'Foreman Guarantee', desc: "All professionals are identity-verified and public liability insured. Your payment is held in escrow until you're satisfied." },
                    { Icon: MdSupportAgent, title: 'Dedicated Concierge', desc: 'Need help deciding? Our expert project managers are available to review these quotes with you for free.' },
                ].map(({ Icon, title, desc }) => (
                    <div key={title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '20px' }}>
                            <Icon color='black' />
                        </div>
                        <div>
                            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '18px', color: '#0d1b2a', margin: '0 0 6px', lineHeight: '28px' }}>{title}</p>
                            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedQuote && (
                <div
                    onClick={() => setSelectedQuote(null)}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: '#fff', borderRadius: '20px', padding: '32px', width: '480px', maxWidth: '90vw', fontFamily: 'Work Sans, sans-serif' }}
                    >
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '20px', color: '#0d1b2a', margin: 0 }}>Quote Details</h3>
                            <button onClick={() => setSelectedQuote(null)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
                        </div>

                        {/* Tradesperson */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', padding: '16px', background: '#f0f2f7', borderRadius: '12px' }}>
                            <img
                                src={selectedQuote.tradesperson?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedQuote.tradesperson?.name || 'T')}&background=eef0f8&color=0d1b2a`}
                                alt={selectedQuote.tradesperson?.name}
                                style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                            />
                            <div>
                                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '0 0 2px' }}>{selectedQuote.tradesperson?.name}</p>
                                <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>{selectedQuote.tradesperson?.businessName || 'Independent'}</p>
                            </div>
                        </div>

                        {/* Details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div style={{ padding: '16px', background: '#f0f2f7', borderRadius: '12px' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 6px' }}>QUOTE PRICE</p>
                                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '24px', color: '#FF7E00', margin: 0 }}>
                                        {job?.budgetCurrency === 'EUR' ? '€' : '£'}{Number(selectedQuote.price).toLocaleString()}
                                    </p>
                                </div>
                                <div style={{ padding: '16px', background: '#f0f2f7', borderRadius: '12px' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 6px' }}>COMPLETION TIME</p>
                                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '24px', color: '#0d1b2a', margin: 0 }}>
                                        {selectedQuote.estimatedDays ? `${selectedQuote.estimatedDays}d` : '—'}
                                    </p>
                                </div>
                            </div>

                            <div style={{ padding: '16px', background: '#f0f2f7', borderRadius: '12px' }}>
                                <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 8px' }}>NOTE FROM TRADESPERSON</p>
                                <p style={{ fontSize: '14px', color: '#374151', margin: 0, lineHeight: 1.7 }}>
                                    {selectedQuote.note || 'No note provided.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}