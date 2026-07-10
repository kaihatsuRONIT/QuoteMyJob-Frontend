import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function Payments() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('paid');

    useEffect(() => {
        api.get('/admin/payments')
            .then(({ data }) => setData(data))
            .finally(() => setLoading(false));
    }, []);

    const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

    const SkeletonRow = () => (
        <tr>
            {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} style={{ padding: '14px 20px' }}>
                    <div style={{ height: 14, borderRadius: 4, background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                </td>
            ))}
        </tr>
    );

    return (
        <div style={{ padding: '32px', fontFamily: "'Work Sans', sans-serif", background: '#f8f9fb', minHeight: '100vh' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
            `}</style>

            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 36, color: '#0d1b2a', margin: '0 0 6px' }}>Payments</h1>
            <p style={{ fontSize: 14, color: '#9ca3af', margin: '0 0 32px' }}>Track all platform transactions, pending payments and revenue.</p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} style={{ height: 100, background: '#e5e7eb', borderRadius: 14, animation: 'pulse 1.5s infinite' }} />
                    ))
                ) : (
                    [
                        { label: 'TOTAL REVENUE', value: `£${Number(data?.stats.totalRevenue || 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, color: '#22c55e', bg: '#f0fdf4' },
                        { label: 'PAID JOBS', value: data?.stats.totalPaidJobs || 0, color: '#2563eb', bg: '#eff6ff' },
                        { label: 'PENDING PAYMENTS', value: data?.stats.pendingPayments || 0, color: '#f97316', bg: '#fff7ed' },
                        { label: 'PENDING AMOUNT', value: `£${Number(data?.stats.pendingAmount || 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, color: '#9333ea', bg: '#faf5ff' },
                    ].map(({ label, value, color, bg }) => (
                        <div key={label} style={{ background: '#fff', borderRadius: 14, padding: '20px', border: '1px solid #f0f0f0' }}>
                            <p style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', margin: '0 0 8px' }}>{label}</p>
                            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 28, color, margin: 0 }}>{value}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#fff', borderRadius: 10, padding: 4, width: 'fit-content', border: '1px solid #f0f0f0' }}>
                {[{ key: 'paid', label: 'Paid Jobs' }, { key: 'pending', label: 'Pending Payments' }].map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                        padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
                        background: activeTab === tab.key ? '#0d1b2a' : 'transparent',
                        color: activeTab === tab.key ? '#fff' : '#6b7280',
                        fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13,
                    }}>
                        {tab.label}
                        <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 700, color: activeTab === tab.key ? '#FF7E00' : '#9ca3af' }}>
                            {tab.key === 'paid' ? data?.paidJobs?.length || 0 : data?.pendingJobs?.length || 0}
                        </span>
                    </button>
                ))}
            </div>

            {/* Table */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #f0f0f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                            {['Job Title', 'Job ID', 'Customer', 'Tradesperson', 'Amount', activeTab === 'paid' ? 'Paid On' : 'Completed On', 'Status'].map(h => (
                                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
                        ) : (activeTab === 'paid' ? data?.paidJobs : data?.pendingJobs)?.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
                                    No {activeTab === 'paid' ? 'paid' : 'pending'} jobs found.
                                </td>
                            </tr>
                        ) : (
                            (activeTab === 'paid' ? data?.paidJobs : data?.pendingJobs)?.map((job, i) => {
                                const tradesperson = job.quotes?.[0]?.tradesperson;
                                const isPaid = activeTab === 'paid';
                                return (
                                    <tr key={job.id} style={{ borderBottom: '1px solid #f8f9fb' }}>
                                        <td style={{ padding: '14px 20px', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13, color: '#0d1b2a' }}>{job.title}</td>
                                        <td style={{ padding: '14px 20px', fontSize: 12, color: '#9ca3af', fontFamily: 'monospace' }}>{job.id.slice(0, 8).toUpperCase()}</td>
                                        <td style={{ padding: '14px 20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0d1b2a', flexShrink: 0 }}>
                                                    {job.customer?.name?.[0]}
                                                </div>
                                                <span style={{ fontSize: 13, color: '#374151' }}>{job.customer?.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '14px 20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0d1b2a', flexShrink: 0 }}>
                                                    {tradesperson?.name?.[0] || '?'}
                                                </div>
                                                <span style={{ fontSize: 13, color: '#374151' }}>{tradesperson?.businessName || tradesperson?.name || '—'}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '14px 20px', fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 14, color: '#0d1b2a' }}>
                                            £{Number(isPaid ? job.paidAmount : job.budgetMax || 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td style={{ padding: '14px 20px', fontSize: 13, color: '#6b7280' }}>
                                            {isPaid ? fmt(job.paidAt) : fmt(job.updatedAt)}
                                        </td>
                                        <td style={{ padding: '14px 20px' }}>
                                            <span style={{
                                                fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6,
                                                background: isPaid ? '#f0fdf4' : '#fff7ed',
                                                color: isPaid ? '#16a34a' : '#f97316',
                                            }}>
                                                {isPaid ? 'PAID' : 'AWAITING PAYMENT'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}