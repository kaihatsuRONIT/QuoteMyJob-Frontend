"use client";
import { MdDashboard, MdMessage, MdVerified, MdGridView } from 'react-icons/md';
import { FaBriefcase, FaSearch, FaDollarSign, FaShoppingBag, FaHome, FaPlus } from 'react-icons/fa';
import { RiUserLine, RiLogoutBoxLine, RiPriceTag3Line } from 'react-icons/ri';
import { BiSupport } from 'react-icons/bi';
import Link from 'next/link';
import { FiBarChart2, FiUsers } from 'react-icons/fi';
import { TbRefreshDot } from 'react-icons/tb';
import { BsLadder } from 'react-icons/bs';
import { HiOutlineDocumentReport } from 'react-icons/hi';

const tradeNav = [
    { icon: FaHome, label: 'Home', sectionLabel: "Home", href: '/' },
    { icon: MdDashboard, label: 'Dashboard', sectionLabel: "overview", href: '/overview' },
    { icon: FaBriefcase, label: 'Applied Jobs', sectionLabel: "applied-jobs", href: '/applied-jobs' },
    { icon: FaSearch, label: 'Find Jobs', sectionLabel: "find-jobs", href: '/find-jobs' },
    { icon: MdMessage, label: 'Messages', sectionLabel: "messages", href: '/messages' },
    { icon: FaDollarSign, label: 'Earnings', sectionLabel: "earnings", href: '/earnings' },
];

const customerNav = [
    { icon: FaHome, label: 'Home', sectionLabel: "Home", href: '/' },
    { icon: FaShoppingBag, label: 'Jobs Posted', sectionLabel: "jobs-posted", href: '/jobs-posted' },
    { icon: MdMessage, label: 'Messages', sectionLabel: "messages", href: '/messages' },
];

const adminNav = [
    { icon: MdVerified, label: 'Verification', sectionLabel: 'verification', href: '/verification' },
    { icon: MdGridView, label: 'Categories', sectionLabel: 'categories', href: '/categories' },
    { icon: RiPriceTag3Line, label: 'Plans', sectionLabel: 'plans', href: '/plans' },
    { icon: FiUsers, label: 'Client Nodes', sectionLabel: 'clients', href: '/clients' },
    { icon: TbRefreshDot, label: 'Life Cycle', sectionLabel: 'lifecycle', href: '/lifecycle' },
];

export default function DashboardSidebar({ user, activeLabel = "Home" }) {
    const nav = user?.role === 'customer' ? customerNav : user?.role === 'admin' ? adminNav : tradeNav;
    return (
        <aside style={{
            width: '200px',
            height: '100vh',
            position: "fixed",
            background: '#0d1b2a',
            display: 'flex',
            flexDirection: 'column',
            padding: '28px 16px',
            fontFamily: 'Work Sans, sans-serif',
        }} className='border-r-1 border-gray-600'>

            {/* Profile */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{
                        width: '64px', height: '64px', borderRadius: '50%',
                        border: '2px solid #FF7E00', overflow: 'hidden',
                        background: '#1a2d45', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        {user?.avatar
                            ? <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <RiUserLine style={{ color: '#fff', fontSize: '28px' }} />
                        }
                    </div>
                    <div style={{
                        position: 'absolute', bottom: 0, right: 0,
                        width: '18px', height: '18px', borderRadius: '50%',
                        background: '#FF7E00', border: '2px solid #0d1b2a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <FaPlus style={{ color: '#fff', fontSize: '8px' }} />
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', margin: 0 }}>
                        Pro Workspace
                    </p>
                    <p style={{ fontSize: '10px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.1em', margin: '2px 0 0', textTransform: 'uppercase' }}>
                        The Digital Foreman
                    </p>
                </div>
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                {nav.map(({ icon: Icon, label, sectionLabel, href }) => {
                    const active = sectionLabel === activeLabel;
                    return (
                        <Link key={label} href={label === 'Home' ? '/' : `/${user?.role}/dashboard${href}`} style={{ textDecoration: 'none' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '10px 14px', borderRadius: '10px', cursor: 'pointer',
                                background: active ? '#FF7E00' : 'transparent',
                                transition: 'background 0.2s',
                            }}
                                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                            >
                                <Icon style={{ color: active ? '#fff' : '#6b7280', fontSize: '15px', flexShrink: 0 }} />
                                <span style={{ fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? '#fff' : '#9ca3af' }}>
                                    {label}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* New Quote button */}
                <button style={{ background: '#FF7E00', border: 'none', borderRadius: '12px', padding: '13px', width: '100%', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
                    {user?.role === 'admin'
                        ? <><HiOutlineDocumentReport style={{ fontSize: '14px' }} /> GENERATE REPORT</>
                        : <><FaPlus style={{ fontSize: '11px' }} /> New Quote</>
                    }
                </button>

                <a href="/support" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 14px', borderRadius: '10px' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    <BiSupport style={{ color: '#6b7280', fontSize: '15px' }} />
                    <span style={{ fontSize: '13px', color: '#9ca3af' }}>Support</span>
                </a>

                <a href="/logout" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 14px', borderRadius: '10px' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    <RiLogoutBoxLine style={{ color: '#6b7280', fontSize: '15px' }} />
                    <span style={{ fontSize: '13px', color: '#9ca3af' }}>Logout</span>
                </a>
            </div>
        </aside>
    );
}