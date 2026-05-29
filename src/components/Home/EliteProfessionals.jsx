import { FaStar, FaCheckCircle } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const professionals = [
  {
    name: 'David Sterling',
    role: 'Master Electrician',
    exp: '12 yrs exp',
    rating: 4.9,
    reviews: 124,
    tags: ['WIRING', 'SMART HOME'],
    cover: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
    avatar: '/person-1.jpg',
  },
  {
    name: 'Elena Rossi',
    role: 'Interior Architect',
    exp: '8 yrs exp',
    rating: 5.0,
    reviews: 89,
    tags: ['DESIGN', '3D LAYOUTS'],
    cover: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    avatar: '/person-1.jpg',
  },
  {
    name: 'Marcus Thorne',
    role: 'Master Joiner',
    exp: '20 yrs exp',
    rating: 4.8,
    reviews: 210,
    tags: ['BESPOKE', 'CABINETRY'],
    cover: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    avatar: '/person-1.jpg',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Garden Architect',
    exp: '10 yrs exp',
    rating: 4.9,
    reviews: 56,
    tags: ['HARDSCAPE', 'ECO-DESIGN'],
    cover: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    avatar: '/person-1.jpg',
  },
];

export default function EliteProfessionals() {
  return (
    <section style={{ background: '#fff', padding: '48px 32px', fontFamily: 'Work Sans, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');
        .ep-card { background: #fff; border-radius: 20px; border: 1px solid #f0f0f0; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06); display: flex; flex-direction: column; }
        .ep-cover { position: relative; height: 220px; }
        .ep-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ep-rating { position: absolute; top: 14px; right: 14px; background: #fff; border-radius: 999px; padding: 5px 12px; display: flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 600; font-family: 'Work Sans', sans-serif; box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
        .ep-avatar-wrap { position: absolute; bottom: -16px; left: 20px; width: 75px; height: 75px; }
        .ep-avatar { width: 40px; height: 40px; border-radius: 12px; object-fit: cover; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.15); display: block;  }
        .ep-badge { position: absolute; bottom: -6px; right: -6px; background: #f5820a; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; }
        .ep-body { padding: 36px 20px 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .ep-name { font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 18px; color: #0d1b2a; margin: 0; }
        .ep-role { font-size: 13px; color: #515F78; margin: 0; font-weight:500; }
        .ep-tags { display: flex; gap: 6px; flex-wrap: wrap;}
        .ep-tag { font-size: 11px; font-weight: 600; color: #37415198; background-color:#D2E0FE; border-radius: 6px; padding: 4px 10px; letter-spacing: 0.04em; }
        .ep-btn { width: 100%; padding: 12px; border-radius: 12px; background: #f0f2f7; border: none; font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 14px; color: #0d1b2a; cursor: pointer; transition: background 0.2s; margin-top: auto; }
        .ep-btn:hover { background: #e2e5ed; }
        .ep-view-all { font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 15px; color: #0d1b2a; display: flex; align-items: center; gap: 6px; cursor: pointer; text-decoration: none; border-bottom: 2px solid #f5820a; padding-bottom: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '32px', color: '#0d1b2a', margin: '0 0 6px' }}>
            Elite Professionals
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
            Vetted tradespeople with a track record of excellence.
          </p>
        </div>
        <a href="#" className="ep-view-all">
          View all experts <FiArrowRight />
        </a>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {professionals.map((p) => (
          <div className="ep-card" key={p.name}>
            <div className="ep-cover">
              <img src={p.cover} alt={p.name} />
              <div className="ep-rating">
                <FaStar style={{ color: '#f5820a' }} />
                {p.rating} ({p.reviews})
              </div>
              <div className="ep-avatar-wrap">
                <img src={p.avatar} alt={p.name} className="ep-avatar" />
                <div className="ep-badge">
                  <FaCheckCircle style={{ color: '#fff', fontSize: '10px' }} />
                </div>
              </div>
            </div>
            <div className="ep-body">
              <div>
                <p className="ep-name">{p.name}</p>
                <p className="ep-role">{p.role} • {p.exp}</p>
              </div>
              <div className="ep-tags">
                {p.tags.map(t => <span key={t} className="ep-tag">{t}</span>)}
              </div>
              <button className="ep-btn">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}