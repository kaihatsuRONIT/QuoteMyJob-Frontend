import { FiCalendar, FiMapPin, FiMessageSquare } from 'react-icons/fi';

const statusStyles = {
    'PENDING REVIEW': { color: '#D06600', bg: '#FFF1E6' },
    'INTERVIEWING': { color: '#0061A4', bg: '#E7EEFF' },
    'NOT SELECTED': { color: '#515F78', bg: '#DFE8FF' },
    'COMPLETED': { color: '#15803D', bg: '#DCFCE7' },
};

export default function JobCard({ job }) {
    const status = statusStyles[job.status] || statusStyles['PENDING REVIEW'];

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
                        {job.status}
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
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
                            borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff',
                            fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '13px', color: '#0d1b2a', cursor: 'pointer',
                        }}>
                            <FiMessageSquare /> Message
                        </button>
                        <button style={{
                            padding: '9px 18px', borderRadius: '10px', border: 'none',
                            background: '#0d1b2a', fontFamily: 'Manrope, sans-serif', fontWeight: 700,
                            fontSize: '13px', color: '#fff', cursor: 'pointer',
                        }}>
                            View Details
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
