"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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

export default function LifeCycle() {
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    api.get(`/admin/jobs?page=${page}&limit=${limit}`)
      .then(({ data }) => { setJobs(data.jobs); setTotal(data.total); })
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ padding: '24px 32px', background: '#fff', fontFamily: "'Work Sans', sans-serif", minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: "45px", fontWeight: 800, color: '#111', margin: '0 0 4px' }}>Job Lifecycle <span style={{ color: "#f97316" }}>Tracking</span></h2>
        <p style={{ fontSize: "16px", color: '#9ca3af', margin: 0 }}>Real-time status of all service requests across the network.</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <div style={{ width: '32px', height: '32px', border: '3px solid #f0f0f0', borderTop: '3px solid #f97316', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {jobs.map((job) => {
            const status = statusStyles[job.status] || statusStyles.OPEN;
            const acceptedQuote = job.quotes.find(q => q.status === 'ACCEPTED');
            const category = job.categories[0]?.category?.name || 'General';

            return (
              <div
                key={job.id}
                onClick={() => router.push(`/admin/dashboard/lifecycle/${job.id}`)}
                style={{ border: '1px solid #e8e8e8', borderRadius: '14px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', transition: 'box-shadow 0.15s', background: '#fafafa' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                {/* Customer avatar */}
                <div style={{ flexShrink: 0 }}>
                  {job.customer.avatar ? (
                    <img src={job.customer.avatar} alt={job.customer.name} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope', fontWeight: 700, fontSize: '16px', color: '#0d1b2a' }}>
                      {job.customer.name?.[0]}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: 0 }}>{job.title}</h3>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#f97316', background: '#fff7ed', borderRadius: '6px', padding: '2px 8px' }}>{category}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                    {job.customer.name} · {new Date(job.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · {job._count.quotes} quotes
                  </p>
                </div>

                {/* Accepted tradesperson */}
                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                  {acceptedQuote ? (
                    <>
                      {acceptedQuote.tradesperson.avatar ? (
                        <img src={acceptedQuote.tradesperson.avatar} alt={acceptedQuote.tradesperson.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '0 auto 4px' }} />
                      ) : (
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', color: '#0d1b2a', margin: '0 auto 4px' }}>
                          {acceptedQuote.tradesperson.name?.[0]}
                        </div>
                      )}
                      <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>{acceptedQuote.tradesperson.name}</p>
                    </>
                  ) : (
                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>No tradesperson</p>
                  )}
                </div>

                {/* Budget */}
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '16px', color: '#0d1b2a', margin: '0 0 4px' }}>
                    {job.budgetCurrency === 'EUR' ? '€' : '£'}{Number(job.budgetMax).toLocaleString()}
                  </p>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>{job.paymentStatus}</p>
                </div>

                {/* Status */}
                <span style={{ fontSize: '11px', fontWeight: 700, color: status.color, background: status.bg, borderRadius: '8px', padding: '4px 10px', flexShrink: 0 }}>
                  {job.status}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
        <span style={{ fontSize: '13px', color: '#888' }}>Showing <strong>{Math.min((page - 1) * limit + 1, total)}–{Math.min(page * limit, total)}</strong> of <strong>{total}</strong> jobs</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e0e0e0', background: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiChevronLeft style={{ fontSize: '14px', color: '#6b7280' }} />
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'Manrope', fontWeight: 700, fontSize: '13px', background: page === n ? '#f97316' : '#fff', color: page === n ? '#fff' : '#374151', border: page === n ? 'none' : '1px solid #e0e0e0' }}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e0e0e0', background: '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiChevronRight style={{ fontSize: '14px', color: '#6b7280' }} />
          </button>
        </div>
      </div>
    </div>
  );
}

