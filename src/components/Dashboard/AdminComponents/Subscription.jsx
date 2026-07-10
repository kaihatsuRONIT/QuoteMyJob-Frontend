import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function Subscription() {
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px", border: "1px solid #e8e8e8", borderRadius: 12, background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>
                <div style={{ maxWidth: 400 }}>
                    <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "45px", fontWeight: 900, color: "#111", margin: "0 0 10px", lineHeight: 1.3 }}>
                        Subscription <span style={{ color: "#f97316" }}>Plans</span>
                        
                    </h2>
                    <p style={{ fontSize: "16px", color: "#9ca3af", margin: 0, lineHeight: 1.6 }}>
                        Configure pricing and features for the Monthly and Yearly tradesperson subscription tiers.
                    </p>
                </div>
            </div>
            <SubscriptionMatrixBody />
        </>
    );
}

function FeatureItem({ label, dark }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 16, color: "#f97316" }}>✅</span>
            <span style={{ fontSize: 13, fontFamily: "'Work Sans', sans-serif", color: dark ? "#fff" : "#111" }}>
                {label}
            </span>
        </div>
    );
}

function PlanEditForm({ plan, onSave, onCancel, saving }) {
    const [price, setPrice] = useState(plan?.price || '');
    const [features, setFeatures] = useState(plan?.features?.join('\n') || '');

    const handleSave = () => {
        onSave({
            duration: plan.duration,
            price: parseFloat(price),
            features: features.split('\n').map(f => f.trim()).filter(Boolean),
        });
    };

    return (
        <div style={{ background: "#fff", border: "2px solid #f97316", borderRadius: 14, padding: "24px 22px" }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 22, fontWeight: 800, color: "#111", margin: "0 0 16px" }}>
                Edit {plan.duration === 'MONTHLY' ? 'Monthly' : 'Yearly'} Plan
            </h2>

            <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Price (£)</div>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" }}
                />
            </div>

            <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Features (one per line)</div>
                <textarea
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    rows={5}
                    style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 12px", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "'Work Sans', sans-serif" }}
                />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{ flex: 1, background: "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: saving ? 0.6 : 1 }}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                    onClick={onCancel}
                    style={{ flex: 1, background: "#fff", color: "#374151", border: "1px solid #e0e0e0", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

function SubscriptionMatrixBody() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingDuration, setEditingDuration] = useState(null);
    const [saving, setSaving] = useState(false);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/admin/plans');
            setPlans(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleSavePlan = async (planData) => {
        try {
            setSaving(true);
            await api.post('/admin/plans', planData);
            toast.success(`${planData.duration === 'MONTHLY' ? 'Monthly' : 'Yearly'} plan updated`);
            setEditingDuration(null);
            await fetchPlans();
        } catch (err) {
            toast.error('Failed to update plan');
        } finally {
            setSaving(false);
        }
    };

    const getPlan = (duration) => plans.find(p => p.duration === duration);

    const tiers = [
        { duration: 'MONTHLY', label: 'Monthly', period: '/ month' },
        { duration: 'YEARLY', label: 'Yearly', period: '/ year', dark: true },
    ];

    if (loading) {
        return (
            <div style={{ padding: "24px 32px" }}>
                <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                    {[1, 2].map(i => (
                        <div key={i} style={{ height: '320px', background: '#f0f2f7', borderRadius: '14px', animation: 'pulse 1.5s infinite' }} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{`
  div::-webkit-scrollbar { display: none; }
`}</style>
            <div style={{ padding: "24px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, alignItems: "start" }}>
                    {tiers.map((tier) => {
                        const plan = getPlan(tier.duration);

                        if (editingDuration === tier.duration) {
                            return (
                                <PlanEditForm
                                    key={tier.duration}
                                    plan={plan || { duration: tier.duration, price: '', features: [] }}
                                    onSave={handleSavePlan}
                                    onCancel={() => setEditingDuration(null)}
                                    saving={saving}
                                />
                            );
                        }

                        return (
                            <div key={tier.duration} style={{
                                background: tier.dark ? "#0f172a" : "#fff",
                                border: "1px solid #e8e8e8",
                                borderRadius: 14,
                                padding: "24px 22px",
                            }}>
                                <span style={{
                                    fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
                                    background: tier.dark ? "#1e293b" : "#f0f0f8",
                                    color: tier.dark ? "#94a3b8" : "#555",
                                    padding: "4px 10px", borderRadius: 20,
                                }}>TRADESPERSON TIER</span>

                                <h2 style={{
                                    fontFamily: "Manrope, sans-serif", fontSize: 32, fontWeight: 900,
                                    color: tier.dark ? "#fff" : "#111", margin: "14px 0 4px",
                                }}>{tier.label.toUpperCase()}</h2>

                                <div style={{ marginBottom: 20 }}>
                                    {plan ? (
                                        <>
                                            <span style={{ fontSize: 22, fontWeight: 800, color: "#f97316", fontFamily: "Manrope, sans-serif" }}>£{Number(plan.price).toFixed(2)}</span>
                                            <span style={{ fontSize: 13, color: tier.dark ? "#94a3b8" : "#888", marginLeft: 6 }}>{tier.period}</span>
                                        </>
                                    ) : (
                                        <span style={{ fontSize: 13, color: '#9ca3af', fontStyle: 'italic' }}>Not configured yet</span>
                                    )}
                                </div>

                                <div style={{ marginBottom: 24, minHeight: '90px', maxHeight: '160px', overflowY: 'auto', scrollbarWidth: 'none' }}>
                                    {plan?.features?.length > 0 ? (
                                        plan.features.map((f, i) => <FeatureItem key={i} label={f} dark={tier.dark} />)
                                    ) : (
                                        <p style={{ fontSize: 13, color: tier.dark ? '#94a3b8' : '#9ca3af' }}>No features added yet.</p>
                                    )}
                                </div>

                                <button
                                    onClick={() => setEditingDuration(tier.duration)}
                                    style={{
                                        width: "100%", padding: "12px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                                        cursor: "pointer", letterSpacing: "0.03em",
                                        background: tier.dark ? "transparent" : "#f97316",
                                        color: "#fff",
                                        border: tier.dark ? "1px solid #fff" : "none",
                                    }}
                                >
                                    {plan ? 'Edit Plan' : 'Set Up Plan'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}