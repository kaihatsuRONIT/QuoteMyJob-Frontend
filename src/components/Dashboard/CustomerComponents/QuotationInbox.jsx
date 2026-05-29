import { FaStar } from 'react-icons/fa';
import { FiCalendar, FiClock, FiFileText } from 'react-icons/fi';
import { IoShieldCheckmark } from 'react-icons/io5';
import { MdSupportAgent } from 'react-icons/md';

export default function QuotationInbox({ job }) {
    const defaultProposals = [
        { name: 'David Miller', company: 'Master Plumber', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&q=80', rating: 4.9, reviews: 124, availability: 'Starts tomorrow', duration: '2 days to complete', quote: '£230' },
        { name: 'Sarah Jenkins', company: 'Flow Masters LTD', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', rating: 5.0, reviews: 89, availability: 'Available Monday', duration: '1 day to complete', quote: '£275' },
        { name: 'Marcus Thorne', company: 'Thorne Plumbing & Gas', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80', rating: 4.8, reviews: 215, availability: 'Starts today', duration: '3 hours to complete', quote: '£210' },
    ];
    return (
        <div style={{ padding: '32px 40px', fontFamily: 'Work Sans, sans-serif', maxWidth:"1104px", margin:"0 auto" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

            {/* Badge */}
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#55637D', background: '#D2E0FE', borderRadius: '999px', padding: '4px 12px', lineHeight:"16px" }}>
                &lt; ACTIVE REQUEST
            </span>

            {/* Title */}
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '48px', color: '#FF7E00', margin: '10px 0 6px', lineHeight:"48px", letterSpacing:"-0.96px" }}>
                Quotation Inbox
            </h2>
            <p style={{ fontSize: '14px', color: '#9ca3af', margin: '0 0 28px' }}>
                Compare quotes for: <strong style={{ color: '#0d1b2a' }}>{job?.title || 'Leaking Kitchen Sink Repair'}</strong>
            </p>

            {/* Info row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.4fr', gap: '16px' }}>

                {/* Job Specification */}
                <div style={{ background: '#f0f2f7', borderRadius: '16px', padding: '20px 24px' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', margin: '0 0 16px' }}>JOB SPECIFICATION</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        {[
                            { label: 'Project', value: job?.project || 'Kitchen Plumbing' },
                            { label: 'Budget Range', value: job?.budget || '£200 - £300' },
                            { label: 'Location', value: job?.location || 'London, SE1' },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px' }}>{label}</p>
                                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: 0 }}>{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status */}
                <div style={{ background: '#0d1b2a', borderRadius: '16px', padding: '20px 24px' }}>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: '0 0 6px' }}>Status</p>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '20px', color: '#fff', margin: '0 0 10px' }}>Reviewing Quotes</p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF7E00', display: 'inline-block' }} />
                        {job?.respondents || 3} Professionals responded
                    </p>
                </div>

            </div>

            {/* Received Proposals */}
            <div style={{marginTop:"48px"}}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0d1b2a', margin: '0 0 16px', borderLeft: '4px solid #FF7E00', paddingLeft: '12px', lineHeight:"32px" }}>
                    Received Proposals
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(job?.proposals || defaultProposals).map((p, i) => (
                        <div key={i} style={{ background: '#ffffff', borderRadius: '16px', overflow: 'hidden' }}>
                            {/* Main row */}
                            <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                {/* Avatar */}
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <img src={p.avatar} alt={p.name} style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover', display: 'block' }} />
                                    <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', width: '20px', height: '20px', borderRadius: '50%', background: '#0d1b2a', border: '2px solid #f0f2f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '9px', color: '#fff' }}>✓</span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '0 0 3px' }}>
                                        {p.name} <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: '13px' }}>· {p.company}</span>
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                                        <FaStar style={{ color: '#FF7E00', fontSize: '12px' }} />
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#0d1b2a' }}>{p.rating}</span>
                                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>({p.reviews} reviews)</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <span style={{ fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <FiCalendar style={{ fontSize: '11px' }} /> {p.availability}
                                        </span>
                                        <span style={{ fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <FiClock style={{ fontSize: '11px' }} /> {p.duration}
                                        </span>
                                    </div>
                                </div>

                                {/* Quote + actions */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 2px' }}>QUOTE TOTAL</p>
                                        <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', color: '#0d1b2a', margin: 0 }}>{p.quote}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#22c55e', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Accept</button>
                                        <button style={{ padding: '8px 18px', borderRadius: '8px', border: '1px solid #FF7E00', background: '#fff', color: '#FF7E00', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Reject</button>
                                    </div>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Work Sans, sans-serif', fontWeight: 500, fontSize: '12px', color: '#374151', cursor: 'pointer' }}>
                                        <FiFileText style={{ fontSize: '12px' }} /> Attached Document
                                    </button>
                                </div>
                            </div>

                            {/* Message Pro */}
                            <button style={{ width: '100%', padding: '12px', border: 'none', border: '1px solid #C5C6CD', background: '#F2F6FE', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0B1A30', cursor: 'pointer', lineHeight:"20px" }}>
                                Message Pro
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer info */}
            <div style={{ borderTop: '2px solid #E7EEFF', marginTop: '70px', padding:"30px 0", display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {[
                    { Icon: IoShieldCheckmark , title: 'Foreman Guarantee', desc: "All professionals are identity-verified and public liability insured. Your payment is held in escrow until you're satisfied." },
                    { Icon: MdSupportAgent, title: 'Dedicated Concierge', desc: 'Need help deciding? Our expert project managers are available to review these quotes with you for free.' },
                ].map(({ Icon, title, desc }) => (
                    <div key={title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '20px' }}>
                            <Icon color='black'/>
                        </div>
                        <div>
                            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '18px', color: '#0d1b2a', margin: '0 0 6px', lineHeight:"28px" }}>{title}</p>
                            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}