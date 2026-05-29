import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

export default function DashboardNavbar({ user }) {
    return (
        <nav style={{
            background: '#0B1A30',
            padding: '0 40px',
            height: '89px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>

            {/* Logo */}
            <Link href={"/"}>
                <img
                    className="h-20 w-auto object-cover"
                    src="/websiteLogo.png"
                    alt="QuoteMyJob"
                />
            </Link>

            <div className='flex flex-row gap-6'>
                {/* Search */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '999px',
                    padding: '10px 20px',
                    width: '320px',
                }}>
                    <FiSearch style={{ color: '#9ca3af', fontSize: '16px', flexShrink: 0 }} />
                    <input
                        type="text"
                        placeholder="Search active listings..."
                        style={{
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            fontFamily: 'Work Sans, sans-serif',
                            fontSize: '14px',
                            color: '#374151',
                            width: '100%',
                        }}
                    />
                </div>

                {/* Profile icon */}
                {
                    user?.avatar ? (
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            overflow: 'hidden',
                        }}>
                            <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ) : (
                        <FaRegUserCircle size={40} style={{ color: '#fff', fontSize: '22px' }} />
                    )
                }
            </div>
        </nav>
    );
}