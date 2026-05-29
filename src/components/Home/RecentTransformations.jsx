import { CiClock1 } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";

const projects = {
    left: {
        image: '/img-1.png',
        category: 'REMODEL',
        title: 'Modern Minimalist Loft',
        location: 'London',
        completed: 'Completed Dec 2023',
    },
    topRight: {
        image: '/img-2.png',
        category: 'KITCHEN',
        title: 'Gourmet Culinary Studio',
    },
    bottomRight1: {
        image: '/img-3.png',
        title: 'Twilight Garden',
    },
    bottomRight2: {
        image: '/img-4.png',
        title: 'Artisan Joinery',
    },
};

export default function RecentTransformations() {
    return (
        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
            <section style={{ background: '#f0f2f7', padding: '48px 24px 48px', fontFamily: 'Work Sans, sans-serif'}}>
                <style>{`
        .rt-card { position: relative; overflow: hidden; border-radius: 20px; }
        .rt-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .rt-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; }
        .rt-tag { font-family: 'Work Sans', sans-serif; font-size: 11px; font-weight: 600; color: #f5820a; letter-spacing: 0.08em; margin-bottom: 4px; }
        .rt-title { font-family: 'Manrope', sans-serif; font-weight: 700; color: #fff; }
        .rt-meta { font-family: 'Work Sans', sans-serif; font-size: 11px; color: rgba(255,255,255,0.7); display: flex; gap: 12px; margin-top: 6px; align-items: center; }
        .rt-meta span { display: flex; align-items: center; gap: 4px; }
      `}</style>

                <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '29px', color: '#0d1b2a', marginBottom: '4px' }}>
                    Recent Transformations
                </h2>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
                    Explore the caliber of work delivered through QuoteMyJob.
                </p>

                {/* Outer grid: left | right */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', height: 'auto' }}>

                    {/* LEFT — full height tall card */}
                    <div className="rt-card" style={{ height: '100%' }}>
                        <img src={projects.left.image} alt={projects.left.title} />
                        <div className="rt-overlay" style={{
                            background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
                            padding: '32px'
                        }}>
                            <p className="rt-tag">{projects.left.category}</p>
                            <p className="rt-title" style={{ fontSize: '20px' }}>{projects.left.title}</p>
                            <div className="rt-meta">
                                <span><LuMapPin /> {projects.left.location}</span>
                                <span><CiClock1 /> {projects.left.completed}</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — top card + bottom two cards stacked */}
                    <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '12px', height: 'auto' }}>

                        {/* Top right — full width */}
                        <div className="rt-card">
                            <img src={projects.topRight.image} alt={projects.topRight.title} />
                            <div className="rt-overlay" style={{
                                background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
                                padding: '24px'
                            }}>
                                <p className="rt-tag">{projects.topRight.category}</p>
                                <p className="rt-title" style={{ fontSize: '20px' }}>{projects.topRight.title}</p>
                            </div>
                        </div>

                        {/* Bottom right — two equal cards side by side */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div className="rt-card">
                                <img src={projects.bottomRight1.image} alt={projects.bottomRight1.title} />
                                <div className="rt-overlay" style={{
                                    background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)',
                                    padding: '24px'
                                }}>
                                    <p style={{ fontSize: '20px', color:"white" }}>{projects.bottomRight1.title}</p>
                                </div>
                            </div>
                            <div className="rt-card">
                                <img src={projects.bottomRight2.image} alt={projects.bottomRight2.title} />
                                <div className="rt-overlay" style={{
                                    background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)',
                                    padding: '24px'
                                }}>
                                    <p style={{ fontSize: '20px', color:"white", }}>{projects.bottomRight2.title}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}