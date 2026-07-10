import { FiCalendar, FiMapPin, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const statusStyles = {
    'PENDING': { color: '#D06600', bg: '#FFF1E6' },
    'ACCEPTED': { color: '#15803D', bg: '#DCFCE7' },
    'REJECTED': { color: '#ff7474', bg: '#FEE2E2' },
    'WITHDRAWN': { color: '#515F78', bg: '#DFE8FF' },
    'COMPLETED': { color: '#15803D', bg: '#DCFCE7' },
    'OPEN': { color: '#0061A4', bg: '#E7EEFF' },
    'CLOSED': { color: '#D06600', bg: '#FFF1E6' },
    'ASSIGNED': { color: '#15803D', bg: '#DCFCE7' },
    'UNRESOLVED': { color: '#ef4444', bg: '#FEE2E2' },
    'CANCELLED': { color: '#515F78', bg: '#DFE8FF' },
    'NO_AVAILABILITY': { color: '#9ca3af', bg: '#F3F4F6' },
};

export default function JobCard({ job }) {
    const status = ['WITHDRAWN', 'REJECTED'].includes(job.quoteStatus)
        ? statusStyles[job.quoteStatus]
        : (statusStyles[job.status] || statusStyles['PENDING']);
    const router = useRouter();
    const [marking, setMarking] = useState(false);
    const [marked, setMarked] = useState(job.tradespersonMarkedComplete || false);

    const handleMarkComplete = async () => {
        setMarking(true);
        try {
            await api.patch(`/jobs/${job.jobId}/complete`);
            toast.success('Marked as complete. Customer can now proceed with payment.');
            setMarked(true);
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Failed to mark as complete');
        } finally {
            setMarking(false);
        }
    };

    return (
        <div style={{
            background: '#fff', borderRadius: '16px 0 0 16px', border: '1px solid #f0f0f0', display: 'flex', gap: '20px', alignItems: 'stretch',
            fontFamily: 'Work Sans, sans-serif', maxHeight: "273px"
        }}>

            {/* Image */}
            <div style={{ width: 'auto', flexShrink: 0, overflow: 'hidden', height: "273px", borderRadius: '16px 0 0 16px' }}>
                <img src={job.image} alt={job.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', margin: "auto 0" }}>

                {/* Title + status */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '24px', color: '#0B1A30', margin: 0, lineHeight: "32px" }}>
                        {job.title}
                    </h3>
                    <span style={{
                        fontSize: '11px', fontWeight: 700, color: status.color, background: status.bg,
                        borderRadius: '999px', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0,
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: status.color, display: 'inline-block' }} />
                        {job.quoteStatus === 'WITHDRAWN' ? 'WITHDRAWN' : job.quoteStatus === 'REJECTED' ? 'REJECTED' : job.status}
                    </span>
                </div>

                {/* Meta */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontWeight: "500", fontSize: '14px', color: '#515F78', display: 'flex', alignItems: 'center', gap: '5px', lineHeight: "20px" }}>
                        <FiCalendar /> Applied {job.date}
                    </span>
                    <span style={{ fontWeight: "500", fontSize: '14px', color: '#515F78', display: 'flex', alignItems: 'center', gap: '5px', lineHeight: "20px" }}>
                        <FiMapPin /> {job.location}
                    </span>
                </div>

                {/* Description */}
                <p style={{ fontWeight: "400", fontSize: '16px', color: '#6b7280', margin: 0, lineHeight: "26px" }}>{job.description}</p>

                {/* Divider */}
                <div style={{ borderTop: '1px solid #f0f0f0', marginTop: '4px' }} />

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                        Your Quote: <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '24px', color: '#0B1A30', lineHeight: "32px" }}>{job.quote}</span>
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {job.status !== 'COMPLETED' && job.quoteStatus !== 'REJECTED' && job.quoteStatus !== 'WITHDRAWN' && (
                            <button onClick={() => router.push(`/tradesperson/dashboard/chats`)} style={{
                                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                                borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff',
                                fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '13px', color: '#0d1b2a', cursor: 'pointer',
                            }}>
                                <FiMessageSquare /> Message
                            </button>
                        )}
                        {job.status === 'ASSIGNED' && job.quoteStatus === 'ACCEPTED' && (
                            <button
                                onClick={handleMarkComplete}
                                disabled={marking || marked}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                                    borderRadius: '10px', border: 'none',
                                    background: marked ? '#e5e7eb' : '#22c55e',
                                    fontFamily: 'Manrope, sans-serif', fontWeight: 700,
                                    fontSize: '13px', color: marked ? '#9ca3af' : '#fff',
                                    cursor: (marking || marked) ? 'not-allowed' : 'pointer',
                                }}
                            >
                                <FiCheckCircle /> {marked ? 'Awaiting Customer' : marking ? 'Marking...' : 'Mark as Complete'}
                            </button>
                        )}
                        <button style={{
                            padding: '9px 18px', borderRadius: '10px', border: 'none',
                            background: '#0d1b2a', fontFamily: 'Manrope, sans-serif', fontWeight: 700,
                            fontSize: '13px', color: '#fff', cursor: 'pointer',

                        }}
                            onClick={() => router.push(`/tradesperson/dashboard/jobs/${job.jobId}`)}
                        >
                            View Details
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}