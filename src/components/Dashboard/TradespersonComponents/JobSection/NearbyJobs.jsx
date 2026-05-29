import { FiMapPin, FiArrowRight } from 'react-icons/fi';

export default function LeadCard({ job }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0',
      padding: '20px 24px', fontFamily: 'Work Sans, sans-serif', position: 'relative',
    }}>
      {/* New Lead badge */}
      {job.isNew && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: '#FF7E00', color: '#fff', fontSize: '11px', fontWeight: 700,
          padding: '5px 12px', borderRadius: '0 16px 0 10px', letterSpacing: '0.05em',
        }}>
          NEW LEAD
        </div>
      )}

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '20px', color: '#0d1b2a', margin: 0, lineHeight:"28px" }}>
          {job.title}
        </h3>
        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '16px', marginTop: '4px' }}>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '18px', color: '#0d1b2a', margin: '0 0 2px', lineHeight:"28px" }}>{job.budget}</p>
          <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0 }}>{job.posted}</p>
        </div>
      </div>

      {/* Category + location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{ fontSize: '12px', fontWeight: 500, color: '#374151', background: '#D2E0FE', borderRadius: '8px', padding: '4px 10px' }}>
          {job.category}
        </span>
        <span style={{ fontSize: '12px', color: '#55637D', display: 'flex', alignItems: 'center', gap: '4px', lineHeight:"16px" }}>
          <FiMapPin style={{ fontSize: '11px' }} /> {job.location}
        </span>
      </div>

      {/* Description */}
      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px', lineHeight: 1.6 }}>{job.description}</p>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #f0f0f0', marginBottom: '14px' }} />

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Avatars */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {job.applicants?.map((initials) => (
            <div key={initials} style={{
              width: '30px', height: '30px', borderRadius: '50%', background: '#e5e7eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: 700, color: '#374151',
            }}>
              {initials}
            </div>
          ))}
        </div>

        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '11px 22px', borderRadius: '10px', border: 'none',
          background: '#FF7E00', color: '#fff', cursor: 'pointer',
          fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px',
        }}>
          Accept Lead <FiArrowRight />
        </button>
      </div>
    </div>
  );
}