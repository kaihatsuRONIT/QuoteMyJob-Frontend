import { useState } from 'react';
import { FiFilter, FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const transactions = [
  { date: 'Oct 24, 2023', job: 'Panel Upgrade - 200AMP', inv: '#INV-8821', customer: 'Sarah Henderson', initials: 'SH', amount: '$2,450.00', status: 'PAID' },
  { date: 'Oct 22, 2023', job: 'EV Charger Installation', inv: '#INV-8819', customer: 'Michael Wright', initials: 'MW', amount: '$850.00', status: 'PROCESSING' },
  { date: 'Oct 18, 2023', job: 'Kitchen Rewiring', inv: '#INV-8815', customer: 'James Lee', initials: 'JL', amount: '$5,200.00', status: 'DISPUTED' },
  { date: 'Oct 15, 2023', job: 'Emergency Call-out', inv: '#INV-8810', customer: 'Robert Palmer', initials: 'RP', amount: '$350.00', status: 'PAID' },
];

const statusStyle = {
  PAID:       { color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
  PROCESSING: { color: '#FF7E00', bg: 'rgba(255,126,0,0.1)' },
  DISPUTED:   { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
};

export default function TransactionHistory() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px', fontFamily: 'Work Sans, sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '18px', color: '#0d1b2a', margin: 0 }}>Transaction History</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[{ icon: FiFilter, label: 'Filter' }, { icon: FiDownload, label: 'Export' }].map(({ icon: Icon, label }) => (
            <button key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Work Sans, sans-serif', fontWeight: 500, fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
              <Icon style={{ fontSize: '13px' }} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
            {['DATE', 'JOB NAME', 'CUSTOMER', 'AMOUNT', 'STATUS', 'ACTIONS'].map(col => (
              <th key={col} style={{ textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', padding: '10px 12px' }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f8f9fb' }}>
              <td style={{ padding: '18px 12px', fontSize: '13px', color: '#6b7280', whiteSpace: 'nowrap' }}>{t.date}</td>
              <td style={{ padding: '18px 12px' }}>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0d1b2a', margin: '0 0 3px' }}>{t.job}</p>
                <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>{t.inv}</p>
              </td>
              <td style={{ padding: '18px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#374151', flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <span style={{ fontSize: '13px', color: '#374151' }}>{t.customer}</span>
                </div>
              </td>
              <td style={{ padding: '18px 12px', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a' }}>{t.amount}</td>
              <td style={{ padding: '18px 12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: statusStyle[t.status].color, background: statusStyle[t.status].bg, borderRadius: '8px', padding: '4px 10px' }}>
                  {t.status}
                </span>
              </td>
              <td style={{ padding: '18px 12px' }}>
                <button style={{ fontSize: '12px', fontWeight: 600, color: '#0d1b2a', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
        <span style={{ fontSize: '13px', color: '#9ca3af' }}>Showing 4 of 128 transactions</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiChevronLeft style={{ fontSize: '14px', color: '#6b7280' }} />
          </button>
          {[1, 2, 3].map(n => (
            <button key={n} onClick={() => setPage(n)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', background: page === n ? '#0d1b2a' : '#fff', color: page === n ? '#fff' : '#374151', border: page === n ? 'none' : '1px solid #e5e7eb' }}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(3, p + 1))} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiChevronRight style={{ fontSize: '14px', color: '#6b7280' }} />
          </button>
        </div>
      </div>
    </div>
  );
}