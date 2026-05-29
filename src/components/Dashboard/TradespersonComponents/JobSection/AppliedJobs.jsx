import { useState } from 'react';
import { FiChevronDown, FiFileText } from 'react-icons/fi';
import { MdHandshake } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa';
import JobCard from './JobCard';
import { BsArrowDown } from 'react-icons/bs';
import Link from 'next/link';

const tabs = ['All Jobs', 'Pending', 'Accepted', 'Completed'];

const stats = [
  { icon: FiFileText, iconBg: '#F0F3FF', iconColor: '#FF7E00', label: 'Active Quotes', value: '12' },
  { icon: MdHandshake, iconBg: '#E7EEFF', iconColor: '#55637D', label: 'Response Rate', value: '94%' },
  { icon: FaDollarSign, iconBg: '#FFF1E6', iconColor: '#D06600', label: 'Pending Volume', value: '£42,850' },
];

const jobs = [
  {
    image: '/kitchen.png',
    title: 'Full Kitchen Renovation',
    status: 'PENDING REVIEW',
    date: 'Oct 12, 2023',
    location: 'Surrey, GU21',
    description: 'Complete rip-out of existing units and installation of premium bespoke cabinetry, island, and high-end appliances. Requires gas and electrical...',
    quote: '£24,500.00'
  },
  {
    image: '/wardrobe.png',
    title: 'Bespoke Shelving & Storage',
    status: 'INTERVIEWING',
    date: 'Jan 14, 2024',
    location: 'Hampstead, NW3',
    description: 'Custom-built oak shelving units for a home library. Includes hidden LED lighting and integrated desk space. High precision finishing required...',
    quote: '£4,200.00'
  },
  {
    image: '/construction.png',
    title: 'Garden Studio Electrical Installation',
    status: 'NOT SELECTED',
    date: 'Sep 28, 2023',
    location: 'Hampstead, NW3',
    description: 'Full electrical fit-out for a detached garden studio, including consumer unit installation, internal/external lighting, and high-speed data cabling. All…',
    quote: '£3,850.00'
  },
  {
    image: '/wires.png',
    title: 'Full House Rewire',
    status: 'COMPLETED',
    date: 'Sep 24, 2023',
    location: 'Hampstead, NW3',
    description: 'Complete replacement of electrical systems in a 4-bedroom Victorian terrace.Smart home integration and garden lighting required.',
    quote: '£8,750.00'
  }
];

export default function AppliedJobs() {
  const [activeTab, setActiveTab] = useState('All Jobs');

  return (
    <>
      <div style={{ background: '#f8f9fb', padding: '36px 40px', fontFamily: 'Work Sans, sans-serif' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#FF7E00', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: "Manrope", lineHeight: "20px" }}>
              Track & Manage
            </p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '36px', color: '#0d1b2a', margin: '0 0 8px', lineHeight: "40px", letterSpacing: "-0.9px" }}>
              Your Applied Jobs
            </h2>
            <p style={{ fontSize: '18px', color: '#515F78', margin: 0, maxWidth: '455px', lineHeight: "28px", fontWeight: "400" }}>
              Monitor the status of your sent quotations and stay updated on active project leads.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', background: '#f0f2f7', borderRadius: '12px', padding: '4px', gap: '2px' }}>
            {tabs.map(tab => {
              const active = tab === activeTab;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '8px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  background: active ? '#fff' : 'transparent',
                  fontFamily: 'Manrope, sans-serif', fontWeight: active ? 700 : 400,
                  fontSize: '13px', color: active ? '#0d1b2a' : '#9ca3af',
                  boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s',
                }}>
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {stats.map(({ icon: Icon, iconBg, iconColor, label, value }) => (
            <div key={label} style={{
              background: '#fff', borderRadius: '14px', padding: '20px 24px',
              border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon style={{ fontSize: '25px', color: iconColor }} />
              </div>
              <div>
                <p style={{ fontWeight: "500", fontSize: '14px', color: '#9ca3af', margin: '0 0 4px', lineHeight: "20px" }}>{label}</p>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', color: '#0d1b2a', margin: 0 }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Job Cards */}
      <div>
        {
          jobs.map((job, index) => {
            return <div key={index} style={{ padding: '24px', background: '#f8f9fb' }}>
              <JobCard job={job} />
            </div>
          })
        }
      </div>

      <button style={{
        minWidth: '10vh', padding: '14px', borderRadius: '12px',
        background: '#f0f2f7', border: 'none', cursor: 'pointer',
        fontFamily: 'Manrope, sans-serif', fontWeight: 700,
        fontSize: '14px', color: '#0d1b2a',
        display: 'flex', alignItems: 'center', gap: '8px',
      }} className='mx-auto mb-10' >
        Load More Applications <FiChevronDown />
      </button>
    </>
  );
}