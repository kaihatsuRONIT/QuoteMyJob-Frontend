export default function ConfirmDialog({ title, message, confirmLabel = "Confirm", danger = false, loading = false, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, fontFamily: 'Work Sans, sans-serif'
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
      }}>
        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '18px', color: '#0d1b2a', margin: '0 0 10px' }}>
          {title}
        </h3>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 24px', lineHeight: 1.6 }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onCancel}
            disabled={loading}
            style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#374151', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{ flex: 1, padding: '11px', borderRadius: '10px', border: 'none', background: danger ? '#ef4444' : '#FF7E00', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#fff', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Deleting...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}