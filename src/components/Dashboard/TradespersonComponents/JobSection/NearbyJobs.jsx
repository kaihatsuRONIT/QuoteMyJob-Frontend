import { useRouter } from 'next/navigation';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';

export default function LeadCard({ job }) {
  const category = job.categories?.[0]?.category?.name || 'General';
  const location = job.address?.split(',')[1]?.trim() || job.address;
  const postedDate = new Date(job.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const budget = job.budgetMax ? `${`${job.budgetCurrency === "EUR" ? "€" : "£"}`} ${job.budgetMax}` : 'Budget not set';
  const isNew = new Date() - new Date(job.createdAt) < 24 * 60 * 60 * 1000;
  const router = useRouter();
  return (
    <div style={{
      background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0',
      padding: '20px 24px', fontFamily: 'Work Sans, sans-serif', position: 'relative',
    }}>
      {isNew && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: '#FF7E00', color: '#fff', fontSize: '11px', fontWeight: 700,
          padding: '5px 12px', borderRadius: '0 16px 0 10px', letterSpacing: '0.05em',
        }}>
          NEW LEAD
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '20px', color: '#0d1b2a', margin: 0, lineHeight: "28px" }}>
          {job.title}
        </h3>
        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '16px', marginTop: '4px' }}>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '18px', color: '#0d1b2a', margin: '0 0 2px', lineHeight: "28px" }}>{budget}</p>
          <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0 }}>Posted On - {postedDate}</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{ fontSize: '12px', fontWeight: 500, color: '#374151', background: '#D2E0FE', borderRadius: '8px', padding: '4px 10px' }}>
          {category}
        </span>
        <span style={{ fontSize: '12px', color: '#55637D', display: 'flex', alignItems: 'center', gap: '4px', lineHeight: "16px" }}>
          <FiMapPin style={{ fontSize: '11px' }} /> {location}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px', lineHeight: 1.6 }}>{job.description}</p>
        <button onClick={() => router.push(`/tradesperson/dashboard/jobs/${job.id}`)} style={{
          margin: '0 0 16px',
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '11px 22px', borderRadius: '10px', border: 'none',
          background: '#FF7E00', color: '#fff', cursor: 'pointer',
          fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px',
        }}>
          View Job <FiArrowRight />
        </button>
      </div>
      <div style={{ borderTop: '1px solid #f0f0f0', marginBottom: '14px' }} />
    </div>
  );
}