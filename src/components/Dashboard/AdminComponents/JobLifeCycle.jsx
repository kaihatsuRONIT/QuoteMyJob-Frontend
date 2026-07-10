"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiMapPin, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import api from '@/lib/api';

const statusStyles = {
  OPEN:            { color: '#0061A4', bg: '#E7EEFF' },
  CLOSED:          { color: '#D06600', bg: '#FFF1E6' },
  ASSIGNED:        { color: '#15803D', bg: '#DCFCE7' },
  COMPLETED:       { color: '#15803D', bg: '#DCFCE7' },
  UNRESOLVED:      { color: '#ef4444', bg: '#FEE2E2' },
  CANCELLED:       { color: '#515F78', bg: '#DFE8FF' },
  NO_AVAILABILITY: { color: '#9ca3af', bg: '#F3F4F6' },
};

const quoteStatusStyles = {
  PENDING:   { color: '#D06600', bg: '#FFF1E6' },
  ACCEPTED:  { color: '#15803D', bg: '#DCFCE7' },
  REJECTED:  { color: '#ef4444', bg: '#FEE2E2' },
  WITHDRAWN: { color: '#515F78', bg: '#DFE8FF' },
};

function TimelineStep({ done, active, label, date }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        {done ? (
          <MdCheckCircle style={{ fontSize: '24px', color: '#22c55e' }} />
        ) : active ? (
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f97316' }} />
          </div>
        ) : (
          <MdRadioButtonUnchecked style={{ fontSize: '24px', color: '#d1d5db' }} />
        )}
      </div>
      <div style={{ paddingBottom: '24px' }}>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: done || active ? '#0d1b2a' : '#9ca3af', margin: '0 0 2px' }}>{label}</p>
        {date && <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{date}</p>}
      </div>
    </div>
  );
}

export default function JobLifecycleDetailPage() {
  const { jobOrQuoteId } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/admin/jobs/${jobOrQuoteId}`)
      .then(({ data }) => setJob(data))
      .catch(() => router.back())
      .finally(() => setLoading(false));
  }, [jobOrQuoteId]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '32px', height: '32px', border: '3px solid #f0f0f0', borderTop: '3px solid #f97316', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!job) return null;

  const status = statusStyles[job.status] || statusStyles.OPEN;
  const category = job.categories?.[0]?.category?.name || 'General';
  const acceptedQuote = job.quotes?.find(q => q.status === 'ACCEPTED');
  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : null;

  const timelineSteps = [
    { label: 'Job Posted', date: fmt(job.createdAt), done: true },
    { label: 'Quotes Received', date: job._count?.quotes > 0 ? `${job._count.quotes} quote(s)` : null, done: job._count?.quotes > 0 },
    { label: 'Window Closed', date: fmt(job.windowEndsAt), done: ['CLOSED', 'ASSIGNED', 'COMPLETED', 'UNRESOLVED'].includes(job.status) },
    { label: 'Quote Accepted', date: fmt(job.assignedAt), done: ['ASSIGNED', 'COMPLETED'].includes(job.status) },
    { label: 'Tradesperson Marked Complete', date: job.tradespersonMarkedComplete ? 'Confirmed' : null, done: job.tradespersonMarkedComplete },
    { label: 'Payment Received', date: fmt(job.paidAt), done: job.paymentStatus === 'PAID' },
    { label: 'Job Completed', date: job.status === 'COMPLETED' ? fmt(job.paidAt) : null, done: job.status === 'COMPLETED' },
  ];

  const activeIndex = timelineSteps.findLastIndex(s => s.done);

  return (
    <div style={{ background: '#f8f9fb', minHeight: '100vh', fontFamily: 'Work Sans, sans-serif', padding: '32px' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

      <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', fontSize: '13px', fontWeight: 700, color: '#6b7280', cursor: 'pointer', marginBottom: '24px', fontFamily: 'Work Sans' }}>
        <FiArrowLeft /> Back to Lifecycle
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', maxWidth: '1100px' }}>

        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Job Header */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#f97316', background: '#fff7ed', borderRadius: '6px', padding: '3px 8px' }}>{category}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: status.color, background: status.bg, borderRadius: '6px', padding: '3px 8px' }}>{job.status}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: job.paymentStatus === 'PAID' ? '#15803D' : '#9ca3af', background: job.paymentStatus === 'PAID' ? '#DCFCE7' : '#F3F4F6', borderRadius: '6px', padding: '3px 8px' }}>{job.paymentStatus}</span>
                </div>
                <h1 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '26px', color: '#0d1b2a', margin: 0 }}>{job.title}</h1>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '24px', color: '#0d1b2a', margin: '0 0 4px' }}>
                  {job.budgetCurrency === 'EUR' ? '€' : '£'}{Number(job.budgetMax).toLocaleString()}
                </p>
                <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>Budget</p>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, margin: '0 0 16px' }}>{job.description}</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiMapPin style={{ color: '#f97316' }} /> {job.address}
              </span>
              <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiCalendar style={{ color: '#f97316' }} /> Needed by {fmt(job.estimatedDate) || 'Flexible'}
              </span>
              <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiClock style={{ color: '#f97316' }} /> Window ends {fmt(job.windowEndsAt)}
              </span>
            </div>
          </div>

          {/* Customer */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 16px' }}>CUSTOMER</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {job.customer?.avatar ? (
                <img src={job.customer.avatar} alt={job.customer.name} style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope', fontWeight: 700, fontSize: '18px', color: '#0d1b2a' }}>
                  {job.customer?.name?.[0]}
                </div>
              )}
              <div>
                <p style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '16px', color: '#0d1b2a', margin: '0 0 2px' }}>{job.customer?.name}</p>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Posted {fmt(job.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Quotes */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 16px' }}>QUOTES ({job._count?.quotes})</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {job.quotes?.map(q => {
                const qs = quoteStatusStyles[q.status] || quoteStatusStyles.PENDING;
                return (
                  <div key={q.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: '#f8f9fb', borderRadius: '12px' }}>
                    {q.tradesperson?.avatar ? (
                      <img src={q.tradesperson.avatar} alt={q.tradesperson.name} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope', fontWeight: 700, fontSize: '14px', color: '#0d1b2a', flexShrink: 0 }}>
                        {q.tradesperson?.name?.[0]}
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '14px', color: '#0d1b2a', margin: '0 0 2px' }}>{q.tradesperson?.name}</p>
                      {q.note && <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{q.note}</p>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '16px', color: '#0d1b2a', margin: '0 0 4px' }}>£{Number(q.price).toLocaleString()}</p>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: qs.color, background: qs.bg, borderRadius: '6px', padding: '2px 8px' }}>{q.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Media */}
          {job.media?.length > 0 && (
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 16px' }}>PHOTOS</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {job.media.map(m => (
                  <img key={m.id} src={m.url} alt="" style={{ width: '120px', height: '90px', borderRadius: '10px', objectFit: 'cover' }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column - Timeline */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px', height: 'fit-content', position: 'sticky', top: '24px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 24px' }}>JOB LIFECYCLE</p>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '2px', background: '#f0f0f0', zIndex: 0 }} />
            {timelineSteps.map((step, i) => (
              <TimelineStep
                key={step.label}
                done={step.done}
                active={!step.done && i === activeIndex + 1}
                label={step.label}
                date={step.date}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}