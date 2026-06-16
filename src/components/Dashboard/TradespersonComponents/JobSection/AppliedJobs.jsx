import { useEffect, useState } from 'react';
import { FiChevronDown, FiFileText } from 'react-icons/fi';
import { MdHandshake } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa';
import JobCard from './JobCard';
import { BsArrowDown } from 'react-icons/bs';
import Link from 'next/link';
import api from '@/lib/api';

const tabs = ['All Jobs', 'Pending', 'Accepted', 'Completed'];


export default function AppliedJobs() {
  const [activeTab, setActiveTab] = useState('All Jobs');
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const LIMIT = 10;
  const stats = [
    { icon: FiFileText, iconBg: '#F0F3FF', iconColor: '#FF7E00', label: 'Active Quotes', value: quotes.filter(q => q.status === 'PENDING').length.toString() },
    { icon: MdHandshake, iconBg: '#E7EEFF', iconColor: '#55637D', label: 'Response Rate', value: '94%' },
    { icon: FaDollarSign, iconBg: '#FFF1E6', iconColor: '#D06600', label: 'Pending Volume', value: `£${quotes.filter(q => q.status === 'PENDING').reduce((sum, q) => sum + parseFloat(q.price), 0).toLocaleString('en-GB')}` },
  ];;
  useEffect(() => {
    fetchQuotes(1);
  }, []);

  const fetchQuotes = async (pageNum = 1) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/quotes/?page=${pageNum}&limit=${LIMIT}`);
      if (pageNum === 1) {
        setQuotes(data.quotes);
      } else {
        setQuotes((prev) => [...prev, ...data.quotes]);
      }
      setHasMore(data.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchQuotes(next);
  };

  const filtered = quotes.filter(q => {
    if (activeTab === 'All Jobs') return true;
    if (activeTab === 'Pending') return q.status === 'PENDING';
    if (activeTab === 'Accepted') return q.status === 'ACCEPTED';
    if (activeTab === 'Completed') return q.job.status === 'COMPLETED';
    return true;
  });
  return (
    <>
      <style>{`
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`}</style>
      <div style={{ background: '#f8f9fb', padding: '36px 40px', fontFamily: 'Work Sans, sans-serif' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#FF7E00', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: "Manrope", lineHeight: "20px" }}>
              Track & Manage
            </p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '36px', color: '#0d1b2a', margin: '0 0 8px', lineHeight: "40px", letterSpacing: "-0.9px" }}>
              Your Applied Jobs
            </h2>
            <p style={{ fontSize: '18px', color: '#515F78', margin: 0, maxWidth: '455px', lineHeight: "28px", fontWeight: "400" }}>
              Monitor the status of your sent quotations and stay updated on active project leads.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', background: '#f0f2f7', borderRadius: '12px', padding: '4px', gap: '2px' }}>
            {tabs.map(tab => {
              const active = tab === activeTab;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '8px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  background: active ? '#fff' : 'transparent',
                  fontFamily: 'Manrope, sans-serif', fontWeight: active ? 700 : 400,
                  fontSize: '13px', color: active ? '#0d1b2a' : '#9ca3af',
                  boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s',
                }}>
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {stats.map(({ icon: Icon, iconBg, iconColor, label, value }) => (
            <div key={label} style={{
              background: '#fff', borderRadius: '14px', padding: '20px 24px',
              border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon style={{ fontSize: '25px', color: iconColor }} />
              </div>
              <div>
                <p style={{ fontWeight: "500", fontSize: '14px', color: '#9ca3af', margin: '0 0 4px', lineHeight: "20px" }}>{label}</p>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', color: '#0d1b2a', margin: 0 }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Job Cards */}
      <div>
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '14px', padding: '40px' }}>No applications found.</p>
        ) : (
          filtered.map((quote) => (
            <div key={quote.id} style={{ padding: '24px', background: '#f8f9fb' }}>
              <JobCard job={{
                image: quote.job.media?.[0]?.url || '/kitchen.png',
                title: quote.job.title,
                status: quote.status,
                date: new Date(quote.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                location: quote.job.address?.split(',')[1]?.trim() || quote.job.address,
                description: quote.job.description,
                quote: `£${parseFloat(quote.price).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`,
                jobId: quote.job.id,
              }} />
            </div>
          ))
        )}
      </div>

      {hasMore && (
        <button
          onClick={handleLoadMore}
          style={{
            minWidth: '10vh', padding: '14px', borderRadius: '12px',
            background: '#f0f2f7', border: 'none', cursor: 'pointer',
            fontFamily: 'Manrope, sans-serif', fontWeight: 700,
            fontSize: '14px', color: '#0d1b2a',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
          className='mx-auto mb-10'
        >
          Load More Applications <FiChevronDown />
        </button>
      )}
    </>
  );
}

// Skeleton card component
const SkeletonCard = () => (
  <div style={{ padding: '24px', background: '#f8f9fb' }}>
    <div style={{ background: '#fff', borderRadius: '16px', padding: '20px 24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: '#e5e7eb', flexShrink: 0, animation: 'pulse 1.5s infinite' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ width: '60%', height: '16px', borderRadius: '8px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
        <div style={{ width: '40%', height: '12px', borderRadius: '8px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
        <div style={{ width: '80%', height: '12px', borderRadius: '8px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
        <div style={{ width: '80px', height: '24px', borderRadius: '8px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
        <div style={{ width: '60px', height: '32px', borderRadius: '8px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
      </div>
    </div>
  </div>
);