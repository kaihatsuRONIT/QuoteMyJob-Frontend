"use client";
import { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function SubscriptionPanel() {
    const [plans, setPlans] = useState([]);
    const [currentSub, setCurrentSub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    useEffect(() => {
        Promise.all([
            api.get('/subscriptions/plans'),
            api.get('/subscriptions/my'),
        ])
            .then(([plansRes, subRes]) => {
                setPlans(plansRes.data);
                setCurrentSub(subRes.data);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const handleSubscribe = async (duration) => {
        setActionLoading(true);
        try {
            const { data } = await api.post('/subscriptions/checkout', { duration });
            window.location.href = data.url;
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Failed to start checkout');
            setActionLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!confirm('Are you sure you want to cancel your subscription?')) return;
        setActionLoading(true);
        try {
            await api.patch('/subscriptions/cancel');
            toast.success('Subscription cancelled');
            setCurrentSub(null);
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Failed to cancel subscription');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return (
        <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '32px', height: '32px', border: '3px solid #f0f0f0', borderTop: '3px solid #FF7E00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    return (
        <div style={{ padding: '36px 40px', fontFamily: 'Work Sans, sans-serif' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#FF7E00', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: "Manrope", lineHeight: "20px" }}>
                Grow Your Business
            </p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '36px', color: '#0d1b2a', margin: '0 0 32px', lineHeight: "40px", letterSpacing: "-0.9px" }}>
                Subscription Plans
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '900px', margin: "0px auto" }}>
                {plans.map((plan) => {
                    const isCurrent = currentSub?.plan === plan.duration;
                    const isPopular = plan.duration === 'YEARLY';
                    const isSelected = selectedPlan === plan.duration;

                    return (
                        <div
                            key={plan.id}
                            onClick={() => !currentSub && setSelectedPlan(plan.duration)}
                            style={{
                                background: isCurrent ? '#0d1b2a' : '#fff',
                                borderRadius: '18px',
                                border: isCurrent
                                    ? 'none'
                                    : isSelected
                                        ? '2px solid #FF7E00'
                                        : '1px solid #f0f0f0',
                                boxShadow: isSelected && !isCurrent ? '0 4px 20px rgba(255,126,0,0.15)' : 'none',
                                padding: '36px',
                                position: 'relative',
                                cursor: currentSub ? 'default' : 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {isPopular && !isCurrent && (
                                <span style={{ position: 'absolute', top: '0', right: '0', background: '#FF7E00', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '5px 14px', borderRadius: '0 18px 0 12px', letterSpacing: '0.05em' }}>
                                    BEST VALUE
                                </span>
                            )}

                            <span style={{ fontSize: '11px', fontWeight: 700, color: isCurrent ? 'rgba(255,255,255,0.6)' : '#9ca3af', background: isCurrent ? 'rgba(255,255,255,0.1)' : '#eef0f8', borderRadius: '6px', padding: '4px 10px', letterSpacing: '0.06em' }}>
                                {plan.duration} PLAN
                            </span>

                            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '34px', color: isCurrent ? '#fff' : '#0d1b2a', margin: '16px 0 0' }}>
                                £{Number(plan.price).toFixed(0)}
                                <span style={{ fontSize: '14px', fontWeight: 500, color: isCurrent ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}> / {plan.duration === 'MONTHLY' ? '30 days' : 'year'}</span>
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px 0 24px' }}>
                                {plan.features.map((feature, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FiCheck style={{ color: '#FF7E00', fontSize: '14px', flexShrink: 0 }} />
                                        <span style={{ fontSize: '13px', color: isCurrent ? 'rgba(255,255,255,0.8)' : '#374151' }}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {isCurrent ? (
                                currentSub.cancelAtPeriodEnd ? (
                                    <div>
                                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0 0 12px' }}>
                                            Your subscription is set to end on {new Date(currentSub.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}.
                                        </p>
                                        <button disabled style={{ width: '100%', padding: '13px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'not-allowed' }}>
                                            Cancellation Scheduled
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleCancel}
                                        disabled={actionLoading}
                                        style={{ width: '100%', padding: '13px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', cursor: actionLoading ? 'not-allowed' : 'pointer' }}
                                    >
                                        {actionLoading ? 'Cancelling...' : 'Cancel Subscription'}
                                    </button>
                                )
                            ) : (
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleSubscribe(plan.duration); }}
                                    disabled={actionLoading || !!currentSub}
                                    style={{
                                        width: '100%', padding: '13px', borderRadius: '10px', border: 'none',
                                        background: currentSub ? '#e5e7eb' : isSelected ? '#FF7E00' : '#0d1b2a',
                                        color: currentSub ? '#9ca3af' : '#fff',
                                        fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px',
                                        cursor: currentSub ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {actionLoading ? 'Loading...' : currentSub ? 'Switch plan via cancel first' : 'Subscribe'}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
            {currentSub && (
                <div style={{ marginTop: '48px', maxWidth: '900px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <div style={{ width: '4px', height: '20px', background: '#FF7E00', borderRadius: '2px' }} />
                        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '28px', color: '#0d1b2a', margin: 0 }}>
                            Your subscription includes
                        </h3>
                    </div>
                    <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                            {plans.find(p => p.duration === currentSub.plan)?.features.map((feature, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255,126,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <FiCheck style={{ color: '#FF7E00', fontSize: '14px' }} />
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {currentSub && (
                <div style={{ marginTop: '24px', background: '#f8f9fb', borderRadius: '14px', padding: '20px', maxWidth: '700px' }}>
                    <p style={{ fontSize: '18px', color: '#6b7280', margin: 0 }}>
                        Your <strong style={{ color: '#0d1b2a' }}>{currentSub.plan}</strong> plan renews on{' '}
                        <strong style={{ color: '#0d1b2a' }}>{new Date(currentSub.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>.
                    </p>
                </div>
            )}
        </div>
    );
}