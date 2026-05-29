import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FaTools, FaDollarSign } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import LeadCard from './NearbyJobs';

export default function FindJobs({ onApply }) {
    const [trade, setTrade] = useState('All Trades');
    const [miles, setMiles] = useState('Within 40 miles');
    const [budget, setBudget] = useState('Budget: Any');

    const filters = [
        { icon: FaTools, value: trade, setter: setTrade, options: ['All Trades', 'Plumbing', 'Electrical', 'Carpentry', 'Landscaping'] },
        { icon: MdLocationOn, value: miles, setter: setMiles, options: ['Within 10 miles', 'Within 20 miles', 'Within 40 miles', 'Within 60 miles'] },
        { icon: FaDollarSign, value: budget, setter: setBudget, options: ['Budget: Any', 'Under £500', '£500–£2,000', '£2,000–£10,000', '£10,000+'] },
    ];
    const jobs = [
        {
            isNew: true,
            title: 'Modern Kitchen Refurbishment',
            budget: '£4,500 - £6,000',
            posted: 'Posted 22 mins ago',
            category: 'Renovation',
            location: 'Wimbledon (4.2 miles away)',
            description: 'Complete overhaul of a 20sqm kitchen. Includes cabinetry installation, marble countertop fitting, and integrated lighting. Detailed blueprints available upon...',
            applicants: ['JP', 'MK'],
        },
        {
            isNew: false,
            title: 'Emergency Pipe Burst & Ceiling Repair',
            budget: '£850 - £1,200',
            posted: 'Posted 3 hours ago',
            category: 'Plumbing',
            location: 'Chelsea (1.8 miles away)',
            description: 'Emergency callout required for a residential property. Main riser leak has caused structural damage to the kitchen ceiling. Materials on site...',
            verifiedLead: true,
        },
        {
            isNew: false,
            title: 'Industrial Electrical Panel Upgrade',
            budget: '£12,000+',
            posted: 'Posted 5 hours ago',
            category: 'Electrical',
            location: 'Greenwich (8.5 miles away)',
            description: 'Warehouse facility requiring a full 3-phase power distribution upgrade. Must be NICEIC registered. Work must be completed during weekend hours...',
            highValue: true,
        },
    ];
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
                        <div className='pr-5'>
                            {jobs.map((job, i) => <LeadCard key={i} job={job} />)}
                        </div>
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
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#515F78' }}>42 Active Jobs</span>
                            </div>

                            {/* Map placeholder */}
                            <div style={{ position: 'relative', height: '256px', background: '#1a2d45', overflow: 'hidden', borderRadius: "7px" }}>
                                {/* Dark map grid lines */}
                                <img src='/map.png' alt='map-uk.png' style={{ width: "auto", height: "100%" }} />
                                {/* Expand Map btn */}
                                <div style={{
                                    position: 'absolute', bottom: '40%', left: '50%', transform: 'translateX(-50%)',
                                    background: 'rgba(255,255,255,0.95)', borderRadius: '999px', padding: '7px 16px',
                                    display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                }}>
                                    <FiSearch style={{ fontSize: '12px', color: '#6b7280' }} />
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#0d1b2a' }}>Expand Map</span>
                                </div>
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