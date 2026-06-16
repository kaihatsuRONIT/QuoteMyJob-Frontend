import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FaTools, FaDollarSign } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import LeadCard from './NearbyJobs';
import api from '@/lib/api';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { GrUserWorker } from 'react-icons/gr';

const libraries = ['places'];
export default function FindJobs({ onApply }) {
    const [trade, setTrade] = useState('All Trades');
    const [miles, setMiles] = useState('Within 40 miles');
    const [budget, setBudget] = useState('Budget: Any');
    const [jobs, setJobs] = useState([]);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const filters = [
        { icon: FaTools, value: trade, setter: setTrade, options: ['All Trades', 'Plumbing', 'Electrical', 'Carpentry', 'Landscaping'] },
        { icon: MdLocationOn, value: miles, setter: setMiles, options: ['Within 10 miles', 'Within 20 miles', 'Within 40 miles', 'Within 60 miles'] },
        { icon: FaDollarSign, value: budget, setter: setBudget, options: ['Budget: Any', 'Under £500', '£500–£2,000', '£2,000–£10,000', '£10,000+'] },
    ];
    useEffect(() => {
        const fetchNearbyJobs = async () => {
            const data = await api.get("/jobs/available");
            setJobs(data.data)
            console.log(data)
        }
        fetchNearbyJobs();
    }, [])
    return (
        <>
            <div style={{ fontFamily: "Work Sans", padding: "30px" }} className="flex flex-col gap-10">
                {/* Top heading */}
                <div className="flex flex-col gap-2">
                    <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "36px", lineHeight: "40px" }}>Available Contracts</h1>
                    <p style={{ color: "#515F78", fontWeight: 400, fontSize: "16px", lineHeight: "24px", maxWidth: "582px" }}>Browse high-value leads within your service radius. Each job is verified for
                        professional structural integrity.</p>
                </div>
                <div className='flex flex-row justify-between'>
                    {/* Filter Bar and New Jobs list */}
                    <div className='flex flex-col gap-5'>
                        <div style={{
                            background: '#f0f2f7', borderRadius: '16px', padding: '16px',
                            display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center',
                            fontFamily: 'Work Sans, sans-serif', maxWidth: "48vw", minHeight: "10vh"
                        }}>
                            {filters.map(({ icon: Icon, value, setter, options }) => (
                                <div key={value} style={{ position: 'relative' }}>
                                    <div style={{
                                        background: '#fff', borderRadius: '12px', padding: '12px 16px',
                                        display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                                        minWidth: '150px', border: '1px solid #e5e7eb',
                                    }}>
                                        <Icon style={{ color: '#FF7E00', fontSize: '16px', flexShrink: 0 }} />
                                        <select
                                            value={value}
                                            onChange={e => setter(e.target.value)}
                                            style={{
                                                border: 'none', outline: 'none', background: 'transparent',
                                                fontFamily: 'Work Sans, sans-serif', fontSize: '13px', fontWeight: 500,
                                                color: '#0d1b2a', cursor: 'pointer', flex: 1, appearance: 'none',
                                            }}
                                        >
                                            {options.map(o => <option key={o}>{o}</option>)}
                                        </select>
                                        <FiChevronDown style={{ color: '#9ca3af', fontSize: '14px', flexShrink: 0 }} />
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => onApply?.({ trade, miles, budget })}
                                style={{
                                    padding: '12px 24px', borderRadius: '12px', border: 'none',
                                    background: '#515F78', color: '#fff', cursor: 'pointer',
                                    fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px',
                                }}
                            >
                                Apply Filters
                            </button>
                        </div>
                        {jobs.length > 0 ? (
                            <div className='w-240'>
                                {jobs.map((job, i) => <LeadCard key={i} job={job} />)}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '16px', textAlign: 'center' }}>
                                <GrUserWorker size={64} color='#9ca3af' />
                                <h1 style={{ fontSize: '24px', color: '#6b7280', fontFamily: 'Manrope, sans-serif', fontWeight: 700, maxWidth: '320px', margin: 0 }}>
                                    No related jobs found in your area
                                </h1>
                            </div>
                        )}
                    </div>
                    {/* Right Map and Vertical Bar */}
                    <aside style={{
                        width: '288px',
                        flexShrink: 0,
                        position: 'sticky',
                        top: '0',
                        minHeight: '100vh',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        padding: '20px 16px',
                        fontFamily: 'Work Sans, sans-serif',
                        scrollbarWidth: 'none',
                    }}>
                        {/* Radius View */}
                        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden', padding: "2px", minHeight: "370px" }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <MdGridView style={{ color: '#FF7E00', fontSize: '18px' }} />
                                    <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#0d1b2a', lineHeight: "24px" }}>Radius View</span>
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#515F78' }}>{jobs.length} Active Jobs</span>
                            </div>

                            {/* Map placeholder */}
                            <div style={{ position: 'relative', height: '256px', overflow: 'hidden', borderRadius: "7px" }}>
                                {isLoaded ? (
                                    <GoogleMap
                                        mapContainerStyle={{ width: '100%', height: '256px' }}
                                        center={jobs.length > 0 ? { lat: jobs[0].lat, lng: jobs[0].lng } : { lat: 51.5074, lng: -0.1278 }}
                                        zoom={11}
                                        options={{ disableDefaultUI: true, gestureHandling: 'greedy' }}
                                    >
                                        {jobs.map(job => (
                                            <Marker
                                                key={job.id}
                                                position={{ lat: job.lat, lng: job.lng }}
                                                title={job.title}
                                            />
                                        ))}
                                    </GoogleMap>
                                ) : (
                                    <div style={{ width: '100%', height: '256px', background: '#1a2d45', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ color: '#fff', fontSize: '13px' }}>Loading map...</span>
                                    </div>
                                )}
                            </div>

                            <p style={{ fontSize: '12px', color: '#6b7280', padding: '5px 16px', margin: 0, lineHeight: "19.5px" }}>
                                Most activity centered in <strong style={{ color: '#0d1b2a' }}>Chelsea</strong> and <strong style={{ color: '#0d1b2a' }}>Kensington</strong> this morning.
                            </p>
                        </div>

                        {/* Market Strength */}
                        <div style={{ background: '#0D1C32', borderRadius: '8px', padding: '24px 20px', minHeight: "198px" }}>
                            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff', margin: '0 0 14px', lineHeight: "28px" }}>Market Strength</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Average Quote Success</span>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>72%</span>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '999px', height: '6px', marginBottom: '16px' }}>
                                <div style={{ background: '#FF7E00', width: '72%', height: '100%', borderRadius: '999px' }} />
                            </div>
                            <p style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
                                Top Requested Trade
                            </p>
                            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '16px', color: '#FF7E00', margin: 0 }}>
                                Structural Masonry
                            </p>
                        </div>

                        {/* Pro Tip */}
                        <div style={{ background: '#DFE8FF', borderRadius: '16px', borderLeft: '1px solid #f0f0f0', borderLeft: '4px solid #FF7E00', padding: '16px', }}>
                            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#0d1b2a', margin: '0 0 8px', lineHeight: "24px" }}>Pro Tip</p>
                            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px', lineHeight: 1.6 }}>
                                Projects with "Verified Blueprints" receive 40% more detailed quotes. Filter for these to ensure high-margin accuracy.
                            </p>
                            <a href="#" style={{ fontSize: '12px', fontWeight: 700, color: '#FF7E00', textDecoration: 'none', letterSpacing: '0.05em' }}>
                                LEARN MORE
                            </a>
                        </div>

                    </aside>
                </div>
            </div>
        </>
    );
}