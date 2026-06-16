"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiMapPin, FiCalendar, FiClock, FiArrowLeft, FiX } from 'react-icons/fi';
import { MdCheckCircle, MdMessage } from 'react-icons/md';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const libraries = ['places'];

export default function JobDetailPage({ jobId }) {
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myQuote, setMyQuote] = useState(null);
  const [quoteModal, setQuoteModal] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleWithdraw = async () => {
    try {
      await api.patch(`/quotes/${myQuote.id}/withdraw`);
      toast.success('Quote withdrawn');
      setMyQuote(null);
    } catch (e) {
      if (e?.response?.status === 400) {
        setMyQuote(null); // already withdrawn, clear state
      } else {
        toast.error(e?.response?.data?.message || 'Failed to withdraw quote');
      }
    }
  };

  useEffect(() => {
    Promise.all([
      api.get(`/jobs/${jobId}`),
      api.get(`/quotes/${jobId}/my-quote`),
    ])
      .then(([jobRes, quoteRes]) => {
        setJob(jobRes.data);
        setMyQuote(quoteRes.data);
      })
      .catch(() => toast.error('Failed to load job'))
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '36px', height: '36px', border: '3px solid #f0f0f0', borderTop: '3px solid #FF7E00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!job) return null;

  const category = job.categories?.[0]?.category?.name || 'General';
  const budget = job.budgetMax ? `${job.budgetCurrency === "GBP" ? "£" : "€"} ${job.budgetMax}` : 'Budget not set';
  const postedDate = new Date(job.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const estimatedDate = job.estimatedDate ? new Date(job.estimatedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Flexible';
  const windowEnds = new Date(job.windowEndsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return (
    <>
      <div style={{ background: '#f8f9fb', minHeight: '100vh', fontFamily: 'Work Sans, sans-serif', padding: '32px 24px' }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Back */}
          <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', fontSize: '14px', color: '#6b7280', cursor: 'pointer', marginBottom: '24px', fontFamily: 'Work Sans, sans-serif' }}>
            <FiArrowLeft /> Back to Jobs
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>

            {/* Left */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Header card */}
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#FF7E00', background: 'rgba(255,126,0,0.1)', borderRadius: '6px', padding: '3px 8px' }}>{category}</span>
                    <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '26px', color: '#0d1b2a', margin: '10px 0 4px' }}>{job.title}</h1>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Posted {postedDate}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', color: '#0d1b2a', margin: '0 0 4px' }}>{budget}</p>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.1)', borderRadius: '6px', padding: '3px 8px' }}>{myQuote.status}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', color: '#55637D', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiMapPin style={{ fontSize: '11px' }} /> {job.address}
                  </span>
                  <span style={{ fontSize: '12px', color: '#55637D', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiCalendar style={{ fontSize: '11px' }} /> Needed by {estimatedDate}
                  </span>
                  <span style={{ fontSize: '12px', color: '#55637D', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiClock style={{ fontSize: '11px' }} /> Window closes {windowEnds}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px' }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '0 0 12px' }}>Job Description</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.8, margin: 0 }}>{job.description}</p>
              </div>

              {/* Photos */}
              {job.media?.length > 0 && (
                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px' }}>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '0 0 12px' }}>Photos</h3>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {job.media.map(m => (
                      <img key={m.id} src={m.url} alt="" style={{ width: '120px', height: '90px', borderRadius: '10px', objectFit: 'cover' }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px' }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '0 0 12px' }}>Location</h3>
                {isLoaded && (
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '220px', borderRadius: '10px' }}
                    center={{ lat: job.lat, lng: job.lng }}
                    zoom={14}
                    options={{ disableDefaultUI: true, gestureHandling: 'greedy' }}
                  >
                    <Marker position={{ lat: job.lat, lng: job.lng }} />
                  </GoogleMap>
                )}
              </div>
            </div>

            {/* Right */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Quote CTA */}
              <div style={{ background: '#0d1b2a', borderRadius: '16px', padding: '24px' }}>
                {
                  myQuote ? (<>
                    <div style={{ borderRadius: '10px', padding: '14px', marginBottom: '12px' }}>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: '#d7d7d7', margin: '0 0 8px', letterSpacing: '0.06em' }}>YOUR QUOTE</p>
                      <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '20px', color: '#ffffff', margin: '0 0 4px' }}>£{parseFloat(myQuote.price).toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
                      {myQuote.estimatedDays && <p style={{ fontSize: '12px', color: '#ffffff', margin: '0 0 4px' }}>{myQuote.estimatedDays} days estimated</p>}
                      {myQuote.note && <p style={{ fontSize: '12px', color: '#ffffff', margin: 0, lineHeight: 1.5 }}>{myQuote.note}</p>}
                    </div>
                  </>) : (<>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', margin: '0 0 8px' }}>Ready to quote?</p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', lineHeight: 1.6 }}>
                      Submit your best price and note to win this job.
                    </p>
                  </>)
                }
                {myQuote ? (
                  <>
                    <button
                      onClick={['WITHDRAWN', 'REJECTED', 'ACCEPTED'].includes(myQuote.status) ? undefined : handleWithdraw}
                      disabled={['WITHDRAWN', 'REJECTED', 'ACCEPTED'].includes(myQuote.status)}
                      style={{
                        width: '100%',
                        padding: '13px',
                        borderRadius: '10px',
                        border: 'none',
                        background: myQuote.status === 'WITHDRAWN' ? '#e5e7eb' : myQuote.status === 'REJECTED' ? '#fef2f2' : myQuote.status === 'ACCEPTED' ? '#f0fdf4' : '#ef4444',
                        color: myQuote.status === 'WITHDRAWN' ? '#9ca3af' : myQuote.status === 'REJECTED' ? '#ef4444' : myQuote.status === 'ACCEPTED' ? '#22c55e' : '#fff',
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 700,
                        fontSize: '14px',
                        cursor: ['WITHDRAWN', 'REJECTED', 'ACCEPTED'].includes(myQuote.status) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {myQuote.status === 'WITHDRAWN' && 'You have withdrawn from this job'}
                      {myQuote.status === 'REJECTED' && 'Your quote was rejected'}
                      {myQuote.status === 'ACCEPTED' && '✓ Your quote was accepted'}
                      {myQuote.status === 'PENDING' && 'Withdraw Quote'}
                    </button>
                    {myQuote.status === 'ACCEPTED' && (
                      <button
                        onClick={() => router.push(`/tradesperson/dashboard/chat/${job.id}`)}
                        style={{ width: '100%', padding: '13px', borderRadius: '10px', border: 'none', background: '#FF7E00', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer', marginTop: '10px' }}
                      >
                        <div className='flex flex-row gap-2 justify-center'>
                          <MdMessage className='mt-[3.3px]' size={20}/>
                          <h1>Message Customer</h1>
                        </div>
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => setQuoteModal(true)}
                    style={{ width: '100%', padding: '13px', borderRadius: '10px', border: 'none', background: '#FF7E00', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
                  >
                    Accept Lead & Quote
                  </button>
                )}
              </div>

              {/* Job stats */}
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px' }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '0 0 16px' }}>Job Stats</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>Quotes received</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0d1b2a' }}>{job._count?.quotes || 0}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>Window closes</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0d1b2a' }}>{windowEnds}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>Estimated date</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0d1b2a' }}>{estimatedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {quoteModal && <QuoteModal jobId={jobId} onClose={() => setQuoteModal(false)} onSuccess={() => { setQuoteModal(false); toast.success('Quote submitted!'); router.push('/tradesperson/dashboard/overview'); }} />}
    </>
  );
}

function QuoteModal({ jobId, onClose, onSuccess }) {
  const [form, setForm] = useState({ price: '', note: '', estimatedDays: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.price) { toast.error('Price is required'); return; }
    setSubmitting(true);
    try {
      await api.post(`/quotes/${jobId}`, {
        price: parseFloat(form.price),
        note: form.note || undefined,
        estimatedDays: form.estimatedDays ? parseInt(form.estimatedDays) : undefined,
      });
      onSuccess();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to submit quote');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: '10px',
    border: '1px solid #e5e7eb', background: '#f8f9fb',
    fontFamily: 'Work Sans, sans-serif', fontSize: '14px',
    color: '#374151', outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle = {
    fontSize: '11px', fontWeight: 700, color: '#6b7280',
    display: 'block', marginBottom: '6px', letterSpacing: '0.06em',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px', fontFamily: 'Work Sans, sans-serif' }}>
      <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '480px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '20px', color: '#0d1b2a', margin: 0 }}>Submit Quote</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><FiX size={22} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>YOUR PRICE (GBP) *</label>
            <input type="number" style={inputStyle} value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="e.g. 350" />
          </div>
          <div>
            <label style={labelStyle}>ESTIMATED DAYS TO COMPLETE</label>
            <input type="number" style={inputStyle} value={form.estimatedDays} onChange={e => setForm(p => ({ ...p, estimatedDays: e.target.value }))} placeholder="e.g. 3" />
          </div>
          <div>
            <label style={labelStyle}>NOTE TO CUSTOMER</label>
            <textarea rows={4} style={{ ...inputStyle, resize: 'none' }} value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} placeholder="Describe your approach, experience, or anything relevant..." />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button onClick={onClose} disabled={submitting} style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={submitting} style={{ flex: 1, padding: '13px', borderRadius: '12px', border: 'none', background: '#FF7E00', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Submitting...' : 'Submit Quote'}
          </button>
        </div>
      </div>
    </div>
  );
}