"use client"
import { FiClock, FiUser, FiArrowRight, FiSearch } from 'react-icons/fi';
import { FaTag } from 'react-icons/fa';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';

const featured = {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    category: 'TRADE TIPS',
    title: 'How to Win High-Value Contracts in a Competitive Market',
    excerpt: 'Learn the proven strategies top-rated tradespeople use to stand out, price accurately, and secure premium jobs consistently.',
    author: 'David Sterling',
    date: 'May 12, 2025',
    readTime: '6 min read',
};

const posts = [
    {
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
        category: 'KITCHEN',
        title: 'The Ultimate Guide to Kitchen Renovation Quoting',
        excerpt: 'Break down every cost component so your quotes are accurate and profitable every time.',
        author: 'Elena Rossi',
        date: 'Apr 28, 2025',
        readTime: '5 min read',
    },
    {
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        category: 'LANDSCAPING',
        title: 'Seasonal Landscaping Jobs: What to Expect This Summer',
        excerpt: 'A practical breakdown of the most in-demand outdoor projects and how to price them.',
        author: 'Sarah Jenkins',
        date: 'Apr 15, 2025',
        readTime: '4 min read',
    },
    {
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
        category: 'ELECTRICAL',
        title: 'Smart Home Installs: A Growing Revenue Stream for Electricians',
        excerpt: 'Why EV chargers, smart panels, and home automation are the most lucrative jobs right now.',
        author: 'Marcus Thorne',
        date: 'Apr 3, 2025',
        readTime: '7 min read',
    },
    {
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
        category: 'BUSINESS',
        title: '5 Ways to Improve Your Response Rate and Win More Leads',
        excerpt: 'Speed and professionalism are your biggest differentiators. Here\'s how to master both.',
        author: 'David Sterling',
        date: 'Mar 20, 2025',
        readTime: '3 min read',
    },
    {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
        category: 'INTERIORS',
        title: 'Bespoke Joinery: How to Position Yourself as a Premium Provider',
        excerpt: 'Crafting a premium brand identity that attracts clients who value quality over cost.',
        author: 'Elena Rossi',
        date: 'Mar 10, 2025',
        readTime: '5 min read',
    },
    {
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80',
        category: 'TRADE TIPS',
        title: 'Building a 5-Star Profile That Converts Visitors to Clients',
        excerpt: 'Your profile is your storefront. These small tweaks make a massive difference.',
        author: 'Marcus Thorne',
        date: 'Feb 28, 2025',
        readTime: '4 min read',
    },
];

const tags = ['All', 'Trade Tips', 'Kitchen', 'Electrical', 'Landscaping', 'Business', 'Interiors'];

function PostCard({ post }) {
    return (
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
        >
            <div style={{ height: '180px', overflow: 'hidden' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '18px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#FF7E00', letterSpacing: '0.1em' }}>{post.category}</span>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '6px 0 8px', lineHeight: 1.4 }}>{post.title}</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 14px', lineHeight: 1.6 }}>{post.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiUser style={{ fontSize: '11px' }} />{post.author}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiClock style={{ fontSize: '11px' }} />{post.readTime}</span>
                    </div>
                    <span>{post.date}</span>
                </div>
            </div>
        </div>
    );
}

export default function BlogPage() {
    return (
        <>
            <NavBar />
            <div style={{ background: '#f8f9fb', minHeight: '100vh', fontFamily: 'Work Sans, sans-serif' }}>
                {/* Hero */}
                <div style={{ padding: '40px 40px' }}>
                    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', color: '#0d1b2a', margin: '0 0 16px', lineHeight: 1.2 }}>
                            Insights for <span style={{ color: '#FF7E00' }}>Elite Tradespeople</span>
                        </h1>
                        <p style={{ fontSize: '15px', color: 'rgb(68, 68, 68)', margin: '0 0 28px', lineHeight: 1.7 }}>
                            Practical guides, market intelligence, and growth strategies for professionals who take their craft seriously.
                        </p>
                    </div>
                </div>

                <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0px 5px 40px' }}>

                    {/* Tags
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                        {tags.map((tag, i) => (
                            <button key={tag} style={{
                                padding: '7px 16px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                                background: i === 0 ? '#FF7E00' : '#fff',
                                color: i === 0 ? '#fff' : '#374151',
                                fontFamily: 'Work Sans, sans-serif', fontWeight: 500, fontSize: '13px',
                                border: i === 0 ? 'none' : '1px solid #e5e7eb',
                            }}>{tag}</button>
                        ))}
                    </div> */}

                    {/* Featured post */}
                    <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', marginBottom: '32px', cursor: 'pointer', height: '340px' }}>
                        <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#FF7E00', letterSpacing: '0.1em', marginBottom: '8px' }}>{featured.category}</span>
                            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(18px, 2.5vw, 26px)', color: '#fff', margin: '0 0 10px', maxWidth: '600px', lineHeight: 1.3 }}>{featured.title}</h2>
                            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: '0 0 16px', maxWidth: '500px', lineHeight: 1.6 }}>{featured.excerpt}</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiUser />{featured.author}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiClock />{featured.readTime}</span>
                                    <span>{featured.date}</span>
                                </div>
                                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FF7E00', border: 'none', color: '#fff', padding: '9px 18px', borderRadius: '10px', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                                    Read Article <FiArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Post grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                        {posts.map(post => <PostCard key={post.title} post={post} />)}
                    </div>

                    {/* Load more */}
                    <button style={{
                        width: '100%', marginTop: '28px', padding: '14px', borderRadius: '12px',
                        background: '#fff', border: '1px solid #e5e7eb', cursor: 'pointer',
                        fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0d1b2a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    }}>
                        Load More Articles <FiArrowRight />
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}