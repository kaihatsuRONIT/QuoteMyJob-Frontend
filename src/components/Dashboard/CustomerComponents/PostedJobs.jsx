import api from '@/lib/api';
import { useEffect, useState } from 'react';
import { BsLightningChargeFill } from 'react-icons/bs';
import { FiTool, FiFileText, FiCheckCircle } from 'react-icons/fi';
import { MdCheckCircle, MdOutlinePlumbing } from 'react-icons/md';
import ConfirmDialog from '@/components/ConfirmDialog';
import toast from 'react-hot-toast';
import EditJobModal from './EditJobModal';
import { useRouter } from 'next/navigation';

export default function PostedJobs({ onTabChange }) {
    const [activeTab, setActiveTab] = useState('Active Jobs');
    const [jobs, setJobs] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [targetJobId, setTargetJobId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [categories, setCategories] = useState([])
    const [reopenDialog, setReopenDialog] = useState(null);
    const [reopening, setReopening] = useState(false);

    const handleReopen = async () => {
        try {
            setReopening(true);
            await api.patch(`/jobs/${reopenDialog.id}/reopen`);
            setReopenDialog(null);
            toast.success('Your Job is Live!!');
        } catch (err) {
            toast.error('Unable to reopen job')
            console.error('Failed to reopen job:', err);
        } finally {
            setReopening(false);
        }
    };

    const handleTab = (tab) => {
        setActiveTab(tab);
        onTabChange?.(tab);
    };
    const handleDeleteClick = (jobId) => {
        setTargetJobId(jobId);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        try {
            await api.delete(`/jobs/${targetJobId}`);
            setJobs(prev => prev.filter(j => j.id !== targetJobId));
            toast.success('Job deleted successfully');
            setConfirmOpen(false);
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Failed to delete job');
        } finally {
            setIsDeleting(false);
        }
    };
    useEffect(() => {
        const fetchJobs = async () => {
            const { data } = await api.get("/jobs/my");
            setJobs(data)
            console.log(data)
        }
        const fetchCategories = async () => {
            await api.get('/categories').then(({ data }) => setCategories(data));
        }
        fetchJobs();
        fetchCategories();
    }, [])
    return (
        <div style={{ background: '#fff', padding: '28px 40px 0', fontFamily: 'Work Sans, sans-serif' }}>
            {confirmOpen && (
                <ConfirmDialog
                    title="Delete Job"
                    message="Are you sure you want to delete this job? This action cannot be undone."
                    confirmLabel="Delete"
                    danger
                    loading={isDeleting}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setConfirmOpen(false)}
                />
            )}
            {editingJob && (
                <EditJobModal
                    job={editingJob}
                    categories={categories}
                    onClose={() => setEditingJob(null)}
                />
            )}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '28px', color: '#0d1b2a', margin: '0 0 6px' }}>My Posted Jobs</h2>
                    <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>History of your completed home improvement projects.</p>
                </div>
                <a href='new-job'
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 22px', borderRadius: '12px', border: 'none', background: '#0d1b2a', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
                >
                    + Post a New Job
                </a>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '28px' }}>
                {['Active Jobs', 'Completed Jobs'].map(tab => {
                    const active = tab === activeTab;
                    return (
                        <button key={tab} onClick={() => handleTab(tab)} style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 12px',
                            fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px',
                            color: active ? '#FF7E00' : '#9ca3af',
                            borderBottom: active ? '2px solid #FF7E00' : '2px solid transparent',
                            transition: 'all 0.2s',
                        }}>
                            {tab}
                        </button>
                    );
                })}
            </div>
            <div style={{ borderBottom: '1px solid #f0f0f0' }} />

            {activeTab === 'Completed Jobs' ? (
                <div style={{ padding: '24px 0' }}>

                    {/* Completed cards grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                        {[
                            { ref: '#ORD-8842', title: 'Garden Landscaping', date: 'Completed Sep 28, 2023', type: 'CONTRACTOR', contractor: 'Alex Thompson', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80', cost: '£120' },
                            { ref: '#ORD-7721', title: 'Annual Boiler Service', date: 'Completed Oct 05, 2023', type: 'COMPANY', contractor: 'Metro Plumbing', cost: '£120' },
                            { ref: '#ORD-7721', title: 'Fuse Box Upgrade', date: 'Completed Oct 05, 2023', type: 'CONTRACTOR', contractor: 'Sparky Bros Ltd', cost: '£120' },
                        ].map((job, i) => (
                            <div key={i} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.1)', borderRadius: '6px', padding: '3px 8px' }}>COMPLETED</span>
                                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>REF: {job.ref}</span>
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#0d1b2a', margin: '0 0 4px' }}>{job.title}</h3>
                                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>📅 {job.date}</p>
                                </div>
                                <div style={{ background: '#f8f9fb', borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {job.avatar
                                        ? <img src={job.avatar} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                                        : <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔧</div>
                                    }
                                    <div>
                                        <p style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', margin: '0 0 2px', letterSpacing: '0.06em' }}>{job.type}</p>
                                        <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#0d1b2a', margin: 0 }}>{job.contractor}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <p style={{ fontSize: '10px', color: '#9ca3af', margin: '0 0 2px', letterSpacing: '0.06em' }}>FINAL COST</p>
                                        <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#0d1b2a', margin: 0 }}>{job.cost}</p>
                                    </div>
                                    <a href="#" style={{ fontSize: '12px', fontWeight: 600, color: '#FF7E00', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View Invoice ↗</a>
                                </div>
                                <button style={{ width: '100%', padding: '11px', borderRadius: '10px', border: 'none', background: '#0d1b2a', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                    📋 Leave a Review
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Project Insights */}
                    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px', marginBottom: '24px' }}>
                        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '18px', color: '#0d1b2a', margin: '0 0 6px' }}>Project Insights</h3>
                        <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 20px' }}>You've saved an average of 15% on projects this year by comparing professional quotes on ForemanDash.</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                            <div>
                                <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px', letterSpacing: '0.06em' }}>TOTAL SPENT</p>
                                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', color: '#0d1b2a', margin: 0 }}>£12,840</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px', letterSpacing: '0.06em' }}>COMPLETED</p>
                                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', color: '#FF7E00', margin: 0 }}>12</p>
                            </div>
                            <div style={{ marginLeft: 'auto', width: '70px', height: '52px', borderRadius: '14px', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FiCheckCircle style={{ color: "white", fontSize: "30px" }} />
                            </div>
                        </div>
                    </div>

                    {/* Bottom two cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={{ background: '#0d1b2a', borderRadius: '16px', padding: '28px', position: 'relative', overflow: 'hidden' }}>
                            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', color: '#fff', margin: '0 0 10px' }}>Need something else fixed?</h3>
                            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', lineHeight: 1.6 }}>Our network of verified professionals is ready for your next project. Post a new job and receive quotes within hours.</p>
                            <button style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: '#FF7E00', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer', letterSpacing: '0.05em' }}>
                                POST A NEW JOB
                            </button>
                        </div>
                        <div style={{ background: '#f0f2f7', borderRadius: '16px', padding: '28px' }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FF7E00', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                                <span style={{ fontSize: '22px' }}>🛡️</span>
                            </div>
                            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '18px', color: '#0d1b2a', margin: '0 0 10px' }}>Guaranteed Work</h3>
                            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>Every job booked through Blueprint Forge is protected by our Professional Satisfaction Guarantee. We ensure the right pros for the right price, every single time.</p>
                        </div>
                    </div>

                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px 40px', fontFamily: 'Work Sans, sans-serif' }}>
                    {jobs.map((job) => (
                        <JobOrderCard
                            key={job.id}
                            job={{
                                id: job.id,
                                title: job.title,
                                desc: job.description,
                                category: job.categories[0]?.category?.name || 'ELECTRICAL',
                                date: new Date(job.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                                status: job.status.toLowerCase(),
                                quotations: job._count.quotes,
                            }}
                            onDelete={() => handleDeleteClick(job.id)}
                            isDeleting={deletingId === job.id}
                            onEdit={() => setEditingJob(job)}
                            onReopen={() => setReopenDialog(job)}
                        />
                    ))}
                </div>
            )}
            {reopenDialog && (
                <div
                    onClick={() => setReopenDialog(null)}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: '#fff', borderRadius: '20px', padding: '32px', width: '440px', maxWidth: '90vw', fontFamily: 'Work Sans, sans-serif' }}
                    >
                        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '20px', color: '#0d1b2a', margin: '0 0 8px' }}>Reopen Job?</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 24px', lineHeight: 1.6 }}>
                            Do you want to reopen <strong style={{ color: '#0d1b2a' }}>{reopenDialog.title}</strong> with the same details? The job will be visible to tradespeople for another 24 hours.
                        </p>

                        <div style={{ padding: '16px', background: '#f0f2f7', borderRadius: '12px', marginBottom: '24px' }}>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', margin: '0 0 4px' }}>JOB TITLE</p>
                            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '0 0 12px' }}>{reopenDialog.title}</p>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', margin: '0 0 4px' }}>LOCATION</p>
                            <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>{reopenDialog.address}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={handleReopen}
                                disabled={reopening}
                                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: '#FF7E00', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer', opacity: reopening ? 0.7 : 1 }}
                            >
                                {reopening ? 'Reopening...' : 'Yes, Reopen Job'}
                            </button>
                            <button
                                onClick={() => setReopenDialog(null)}
                                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff', color: '#374151', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



const categoryStyles = {
    PLUMBING: { color: '#FF7E00', bg: 'rgba(255,126,0,0.08)' },
    ELECTRICAL: { color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
    CARPENTRY: { color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
    MAINTENANCE: { color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
};
const statusStyle = {
    open: { color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
    assigned: { color: '#FF7E00', bg: 'rgba(255,126,0,0.08)' },
    unresolved: { color: '#ff4815', bg: 'rgba(255, 55, 0, 0.2)' },
};

const categoryIcons = {
    PLUMBING: MdOutlinePlumbing,
    ELECTRICAL: BsLightningChargeFill,
    CARPENTRY: FiTool,
    MAINTENANCE: FiFileText,
};

const jobs = [
    {
        category: 'PLUMBING', date: 'Posted Oct 24, 2023',
        title: 'Leaking Kitchen Sink Repair',
        desc: 'Emergency repair needed for a secondary kitchen sink with significant water damage risk.',
        status: 'active', quotations: 3,
    },
    {
        category: 'ELECTRICAL', date: 'Posted Oct 20, 2023',
        title: 'Full Living Room Rewire',
        desc: 'Complete electrical overhaul including new socket placements and ceiling light installation.',
        status: 'active', quotations: 3,
    },
    {
        category: 'CARPENTRY', date: 'Posted Oct 15, 2023',
        title: 'Broken Garden Fence Repair',
        desc: 'Replacement of three storm-damaged panels and stabilization of existing wooden posts.',
        status: 'active', quotations: 3,
    },
    {
        category: 'MAINTENANCE', date: 'Posted Oct 05, 2023',
        title: 'Broken Garden Fence Repair',
        desc: 'Full diagnostic check and maintenance for a residential Combi-boiler system.',
        status: 'active', quotations: 5
    },
];

function JobOrderCard({ job, onDelete, onEdit, isDeleting, onReopen }) {
    const Icon = categoryIcons[job.category] || FiTool;
    const catStyle = categoryStyles[job.category] || categoryStyles.PLUMBING;
    const statusBadge = statusStyle[job.status] || statusStyle.open
    const isCompleted = job.status === 'completed';
    const isActive = ['open', 'closed', 'assigned'].includes(job.status);
    const isInactive = ['completed', 'cancelled', 'unresolved', 'no_availability'].includes(job.status);
    const router = useRouter();


    return (
        <div style={{ background: '#f0f2f7', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px', fontFamily: 'Work Sans, sans-serif', maxHeight: "400vh" }}>

            {/* Icon */}
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon style={{ fontSize: '22px', color: '#374151' }} />
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: catStyle.color, background: catStyle.bg, borderRadius: '6px', padding: '3px 8px', letterSpacing: '0.06em' }}>
                        {job.category}
                    </span>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{job.date}</span>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: statusBadge.color, background: statusBadge.bg, borderRadius: '6px', padding: '3px 8px', letterSpacing: '0.06em' }}>
                        {(job.status).toUpperCase()}
                    </span>
                </div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '20px', color: '#0d1b2a', margin: '0 0 6px', lineHeight: "36px" }}>{job.title}</h3>
                <p style={{ fontSize: '16px', color: '#6b7280', margin: 0, lineHeight: "22px", maxWidth: '420px' }}>{job.desc}</p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0, minWidth: '160px' }}>
                {!isCompleted ? (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', alignSelf: 'flex-end' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.08em' }}>QUOTATIONS</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#FF7E00', background: 'rgba(255,126,0,0.1)', borderRadius: '6px', padding: '2px 8px' }}>
                                {job.quotations} RECEIVED
                            </span>
                        </div>
                        <div
                            onClick={() => job.status === 'no_availability' ? onReopen() : router.push(`quotes/${job.id}`)}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px 16px', borderRadius: '10px', border: 'none', background: job.status === 'NO_AVAILABILITY' ? '#ef4444' : '#FF7E00', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textDecoration: 'none' }}
                        >
                            <FiFileText style={{ fontSize: '13px' }} />
                            {job.status === 'open' ? 'VIEW QUOTES' : job.status === 'assigned' ? 'TALK TO TRADESPERSON' : job.status === 'no_availability' ? 'REOPEN JOB' : 'CONTACT US'}
                        </div>
                        <button onClick={onEdit} style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #FF7E00', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#FF7E00', cursor: 'pointer' }}>
                            EDIT JOB
                        </button>
                        <button onClick={onDelete} style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #ef4444', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#ef4444', cursor: 'pointer' }}>
                            DELETE JOB
                        </button>
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', alignSelf: 'flex-end' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.08em' }}>STATUS</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.1)', borderRadius: '6px', padding: '2px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MdCheckCircle style={{ fontSize: '11px' }} /> JOB COMPLETED
                            </span>
                        </div>
                        <button style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#0d1b2a', cursor: 'pointer' }}>
                            VIEW HISTORY
                        </button>
                        <button style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #22c55e', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#22c55e', cursor: 'pointer' }}>
                            LEAVE REVIEW
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}