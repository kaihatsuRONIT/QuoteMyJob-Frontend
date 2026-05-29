export default function CTABanner() {
    return (
        <section style={{ padding: '32px', fontFamily: 'Work Sans, sans-serif' }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500&display=swap');`}</style>

            <div style={{
                background: 'linear-gradient(135deg, #0d1b2a 60%, #1a2d45 100%)',
                borderRadius: '24px',
                padding: '48px 56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '32px',
            }}>

                {/* Left */}
                <div style={{ maxWidth: '480px' }}>
                    <h2 style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 800,
                        fontSize: 'clamp(28px, 4vw, 42px)',
                        color: '#fff',
                        lineHeight: 1.2,
                        margin: '0 0 16px',
                    }}>
                        Ready to build something{' '}
                        <span style={{ color: '#f5820a' }}>extraordinary?</span>
                    </h2>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '0 0 28px' }}>
                        Join the thousands of homeowners who trust QuoteMyJob for their most important investments.
                    </p>
                    <button style={{
                        background: '#f5820a',
                        color: '#fff',
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 700,
                        fontSize: '15px',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '14px 28px',
                        cursor: 'pointer',
                    }}>
                        Post Your First Job
                    </button>
                </div>

                {/* Right — badge image */}
                <div style={{
                    width: '220px',
                    height: '200px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#FF7E00',
                    backdropFilter: 'blur(10px)',
                }}>
                    <img
                        src="/quality.png"
                        alt="Quality badge"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

            </div>
        </section>
    );
}