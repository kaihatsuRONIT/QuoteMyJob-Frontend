import { useEffect } from 'react';
import { FaStar, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import { MdElectricBolt } from 'react-icons/md';
import { PiPaintBrushBroadDuotone } from 'react-icons/pi';

const leads = [
  {
    category: 'KITCHEN FITTING',
    categoryColor: '#FF7E00',
    time: '2h ago',
    title: 'Complete Kitchen Renovation',
    desc: '"Looking for a full refit including plumbing and tiling for a mid-sized Victorian kitchen..."',
    location: 'Woking (12 miles)',
  },
  {
    category: 'CARPENTRY',
    categoryColor: '#FF7E00',
    time: '5h ago',
    title: 'Bespoke Living Room Shelving',
    desc: '"Wall-to-wall integrated bookshelf design needed for modern flat. Birch plywood finis..."',
    location: 'Farnham (18 miles)',
  },
];

const activeJobs = [
  {
    icon: PiPaintBrushBroadDuotone,
    title: 'Full Interior Repaint',
    client: 'Sarah Jenkins',
    due: 'Due: Friday',
    status: 'IN PROGRESS',
    statusColor: '#047857',
    statusBg: '#D1FAE5',
    next: 'Next: Final Inspection',
  },
  {
    icon: MdElectricBolt,
    title: 'Rewiring & Fuse Box',
    client: 'Mark Thompson',
    due: 'Starts: Monday',
    status: 'SCHEDULED',
    statusColor: '#3b82f6',
    statusBg: 'rgba(59,130,246,0.1)',
    next: 'Next: Material Delivery',
  },
];

export default function Overview({ user }) {
    useEffect(()=>{
        console.log("tradesperson dashboard mounted")
    },[])
  return (
    <div style={{ background: '#f8f9fb', minHeight: '100vh', padding: '36px 40px', fontFamily: 'Work Sans, sans-serif' }}>

      {/* Header */}
      <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '48px', color: '#0d1b2a', margin: '0 0 8px', lineHeight:"48px",letterSpacing:"-1.2px" }}>
        Welcome Back, <span style={{ color: '#FF7E00' }}>{user?.name || 'Alex'}.</span>
      </h1>
      <p style={{ fontSize: '18px', color: '#6b7280', margin: '0 0 32px', maxWidth: '480px', lineHeight: "28px" }}>
        You have 4 new leads within your 40-mile radius and 2 active jobs requiring attention today.
      </p>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>

        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Pro Metrics */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a' }}>Pro Metrics</span>
              <span style={{ background: '#e0e7ff', color: '#4d4d4d', fontSize: '11px', fontWeight: 600, borderRadius: '999px', padding: '3px 10px' }}>This Month</span>
            </div>
            <p style={{ fontSize: '14px', color: '#515F78', margin: '0 0 4px' }}>Total Earnings</p>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '28px', color: '#0d1b2a', margin: '0 0 4px' }}>£8,420.00</p>
            <p style={{ fontSize: '12px', color: '#22c55e', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FaArrowUp style={{ fontSize: '10px' }} /> +12.4% from last month
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#515F78', margin: '0 0 4px' }}>Trust Score</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0d1b2a' }}>4.9</span>
                  {[...Array(5)].map((_, i) => <FaStar key={i} style={{ color: '#FF7E00', fontSize: '11px' }} />)}
                </div>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#515F78', margin: '0 0 4px' }}>Response Rate</p>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '20px', color: '#0d1b2a', margin: 0 }}>98%</p>
              </div>
            </div>
          </div>

          {/* Quote Accuracy */}
          <div style={{ background: '#0d1b2a', borderRadius: '16px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.08 }}>
              <FaStar style={{ fontSize: '80px', color: '#FF7E00' }} />
            </div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#fff', margin: '0 0 8px' }}>Quote Accuracy</p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0 0 16px', lineHeight: 1.5 }}>
              You are in the top 5% of earners in your area.
            </p>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '999px', height: '6px', marginBottom: '8px' }}>
              <div style={{ background: '#FF7E00', width: '72%', height: '100%', borderRadius: '999px' }} />
            </div>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Target: 95% for Top Rated Status</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* New Leads Nearby */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '24px', color: '#0d1b2a', margin: '0 0 4px', lineHeight:"32px" }}>New Leads Nearby</h3>
                <p style={{ fontSize: '12px', color: '#515F78', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FaMapMarkerAlt style={{ fontSize: '11px' }} /> Within your 40-mile radius (Guildford, UK)
                </p>
              </div>
              <a href="#" style={{ fontSize: '13px', fontWeight: 600, color: '#FF7E00', textDecoration: 'none' }}>View All Leads</a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              {leads.map((lead) => (
                <div key={lead.title} style={{ border: '1px solid #f0f0f0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: lead.categoryColor, background: 'rgba(255,126,0,0.08)', borderRadius: '6px', padding: '3px 8px', letterSpacing: '0.05em' }}>
                      {lead.category}
                    </span>
                    <span style={{fontWeight:"400", fontSize: '12px', color: '#515F78',lineHeight:"16px" }}>{lead.time}</span>
                  </div>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#0D1C32', margin: '0 0 6px', lineHeight:"24px" }}>{lead.title}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 10px', lineHeight: 1.5 }}>{lead.desc}</p>
                  <p style={{ fontSize: '12px',fontWeight:"500", color: '#0D1C32', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '4px', lineHeight:"16px" }}>
                    <FaMapMarkerAlt style={{ fontSize: '11px' }} /> {lead.location}
                  </p>
                  <button style={{
                    width: '100%', padding: '9px', borderRadius: '8px',
                    background: '#F0F3FF', border: 'none', cursor: 'pointer',
                    fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#0d1b2a',
                  }}>
                    Accept Lead
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Jobs Overview */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #f0f0f0' }}>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '17px', color: '#0d1b2a', margin: '0 0 16px' }}>Active Jobs Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeJobs.map((job) => (
                <div key={job.title} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#E7EEFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <job.icon style={{ fontSize: '18px', color: '#6b7280' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#0d1b2a', margin: '0 0 3px', lineHeight:"24px" }}>{job.title}</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Client: {job.client} • {job.due}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: job.statusColor, background: job.statusBg, borderRadius: '6px', padding: '3px 8px', display: 'inline-block', marginBottom: '4px' }}>
                      {job.status}
                    </span>
                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>{job.next}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}