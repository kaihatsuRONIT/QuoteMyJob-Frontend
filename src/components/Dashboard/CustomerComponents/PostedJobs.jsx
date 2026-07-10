import api from '@/lib/api';
import { useEffect, useState } from 'react';
import { BsLightningChargeFill } from 'react-icons/bs';
import { FiTool, FiFileText, FiCheckCircle } from 'react-icons/fi';
import { MdCheckCircle, MdOutlinePlumbing } from 'react-icons/md';
import ConfirmDialog from '@/components/ConfirmDialog';
import toast from 'react-hot-toast';
import EditJobModal from './EditJobModal';
import { useRouter } from 'next/navigation';
import CompletedJobs from './CompletedJobs';

export default function PostedJobs({ onTabChange }) {
    const [jobs, setJobs] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [targetJobId, setTargetJobId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [categories, setCategories] = useState([])
    const [reopenDialog, setReopenDialog] = useState(null);
    const [reopening, setReopening] = useState(false);
    const [loading, setLoading] = useState(true);

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
    const handlePay = async (jobId) => {
        try {
            const { data } = await api.post(`/jobs/${jobId}/pay`);
            window.location.href = data.url;
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Failed to start payment');
        }
    };
    useEffect(() => {
        const fetchJobs = async () => {
            const { data } = await api.get("/jobs/my");
            setJobs(data)
            setLoading(false);
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
                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '48px', color: '#0d1b2a', margin: '0 0 6px' }}>Posted <span style={{ color: "#f97316" }}>Jobs</span></h2>
                    <p style={{ fontSize: '15px', color: '#9ca3af', margin: 0 }}>History of your completed home improvement projects.</p>
                </div>
                <a href='new-job'
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 22px', borderRadius: '12px', border: 'none', background: '#0d1b2a', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
                >
                    + Post a New Job
                </a>
            </div>

            {/* Tabs
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
            </div> */}
            <div style={{ borderBottom: '1px solid #f0f0f0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px 40px', fontFamily: 'Work Sans, sans-serif' }}>
                {loading ? (
                    Array.from({ length: 2 }).map((_, i) => <SkeletonJobCard key={i} />)
                ) : jobs.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', textAlign: 'center' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '28px' }}>
                            📋
                        </div>
                        <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#374151', margin: '0 0 6px' }}>
                            No posted jobs yet
                        </p>
                        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                            Once you post a job, it will show up here.
                        </p>
                    </div>
                ) : (
                    jobs.map((job) => (
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
                                tradespersonMarkedComplete: job.tradespersonMarkedComplete,
                                amount: job.acceptedQuotePrice, // need this from backend
                            }}
                            onDelete={() => handleDeleteClick(job.id)}
                            isDeleting={deletingId === job.id}
                            onEdit={() => setEditingJob(job)}
                            onReopen={() => setReopenDialog(job)}
                            onPay={handlePay}
                        />
                    ))
                )}
            </div>
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

function JobOrderCard({ job, onDelete, onEdit, isDeleting, onReopen, onPay }) {
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

                        {job.status === 'assigned' && job.tradespersonMarkedComplete ? (
                            <button
                                onClick={() => onPay(job.id)}
                                disabled={job.paying}
                                style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#22c55e', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', cursor: job.paying ? 'not-allowed' : 'pointer' }}
                            >
                                {job.paying ? 'Redirecting...' : `PAY £${Number(job.amount).toFixed(2)} NOW`}
                            </button>
                        ) : (
                            <div
                                onClick={() => job.status === 'no_availability' ? onReopen() : router.push(`quotes/${job.id}`)}
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px 16px', borderRadius: '10px', border: 'none', background: job.status === 'NO_AVAILABILITY' ? '#ef4444' : '#FF7E00', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textDecoration: 'none' }}
                            >
                                <FiFileText style={{ fontSize: '13px' }} />
                                {job.status === 'open' ? 'VIEW QUOTES' : job.status === 'assigned' ? 'TALK TO TRADESPERSON' : job.status === 'no_availability' ? 'REOPEN JOB' : 'CONTACT US'}
                            </div>
                        )}

                        {!['assigned'].includes(job.status) && (
                            <>
                                <button onClick={onEdit} style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #FF7E00', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#FF7E00', cursor: 'pointer' }}>
                                    EDIT JOB
                                </button>
                                <button onClick={onDelete} style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #ef4444', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#ef4444', cursor: 'pointer' }}>
                                    DELETE JOB
                                </button>
                            </>
                        )}
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

function SkeletonJobCard() {
    return (
        <div style={{ background: '#f0f2f7', borderRadius: '16px', padding: '24px', display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>

            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#e5e7eb', flexShrink: 0, animation: 'pulse 1.5s infinite' }} />

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                    <div style={{ width: '160px', height: '20px', borderRadius: '20px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                    <div style={{ width: '80px', height: '20px', borderRadius: '20px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                    <div style={{ width: '100px', height: '20px', borderRadius: '20px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                </div>

                <div style={{ width: '280px', height: '24px', borderRadius: '6px', background: '#e5e7eb', marginBottom: '12px', animation: 'pulse 1.5s infinite' }} />

                <div style={{ width: '100%', height: '14px', borderRadius: '6px', background: '#e5e7eb', marginBottom: '8px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '95%', height: '14px', borderRadius: '6px', background: '#e5e7eb', marginBottom: '8px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '70%', height: '14px', borderRadius: '6px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
            </div>

            <div style={{ width: '160px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                <div style={{ width: '120px', height: '24px', borderRadius: '6px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '160px', height: '40px', borderRadius: '10px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '160px', height: '40px', borderRadius: '10px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '160px', height: '40px', borderRadius: '10px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
            </div>
        </div>
    );
}