import { FiTrendingUp, FiChevronRight } from 'react-icons/fi';
import TransactionHistory from './TransactionHistory';
export default function Earnings() {
    const stats = [
        {
            label: 'TOTAL REVENUE',
            value: '$84,290',
            decimal: '.00',
            badge: { text: '↑12.5%', sub: 'from last month', color: '#22c55e' },
            icon: <FiTrendingUp style={{ fontSize: '20px', color: '#c7d0e8' }} />,
             background:'#F0F3FF'
        },
        {
            label: 'PENDING PAYOUTS',
            value: '$12,450',
            decimal: '.50',
            labelColor: '#FF7E00',
            link: 'VIEW DETAILS',
             background:'#FFFFF'
           
        },
        {
            label: 'ACTIVE QUOTES VALUE',
            value: '$28,100',
            decimal: '.00',
            progress: { value: 60, sub: '6 active projects in negotiation' },
             background:'#F0F3FF'
        },
    ];
    return (
        <>
            {/* Top heading */}
            <div style={{ fontFamily: "Work Sans", padding: "30px" }} className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                    <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "36px", lineHeight: "40px", borderLeft: "4px solid #FF7E00", paddingLeft: "10px" }}>Earnings Overview</h1>
                    <p style={{ color: "#515F78", fontWeight: 400, fontSize: "16px", lineHeight: "24px", maxWidth: "582px", paddingLeft: "15px" }}>Browse high-value leads within your service radius. Each job is verified for
                        professional structural integrity.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', fontFamily: 'Work Sans, sans-serif' }}>
                    {stats.map(({ label, value, decimal, badge, icon, labelColor, link, progress, background }) => (
                        <div key={label} style={{ background: background , borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>

                            {/* Label row */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: labelColor || '#6b7280', letterSpacing: '1.4px', lineHeight:"20px" }}>{label}</span>
                                {icon}
                            </div>

                            {/* Value */}
                            <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '48px', color: '#0d1b2a', lineHeight: "48px" }}>
                                {value}<br />{decimal}
                            </div>

                            {/* Badge */}
                            {badge && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', }}>
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: badge.color, backgroundColor:"#ECFDF5", borderRadius:"10px" }}>{badge.text}</span>
                                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{badge.sub}</span>
                                </div>
                            )}

                            {/* Link */}
                            {link && (
                                <a href="#" style={{ fontSize: '12px', fontWeight: 700, color: '#0d1b2a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px', letterSpacing: '0.05em', paddingTop:"10px" }}>
                                    {link} <FiChevronRight style={{ fontSize: '13px' }} />
                                </a>
                            )}

                            {/* Progress */}
                            {progress && (
                                <div>
                                    <div style={{ background: '#d1d5e8', borderRadius: '999px', height: '6px', marginBottom: '8px' }}>
                                        <div style={{ background: '#FF7E00', width: `${progress.value}%`, height: '100%', borderRadius: '999px' }} />
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{progress.sub}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <TransactionHistory/>
            </div>
        </>
    );
}