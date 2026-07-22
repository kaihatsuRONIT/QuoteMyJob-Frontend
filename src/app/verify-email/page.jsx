"use client";
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      return;
    }

    api.get(`/auth/verify-email?token=${token}`)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [searchParams]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'Work Sans, sans-serif', textAlign: 'center', padding: '20px' }}>
      {status === 'verifying' && <p>Verifying your email...</p>}
      {status === 'success' && (
        <>
          <h2 style={{ color: '#22c55e', fontFamily: 'Manrope, sans-serif' }}>Email Verified!</h2>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>Your account is now active.</p>
          <button onClick={() => router.push('/')} style={{ padding: '12px 24px', background: '#FF7E00', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
            Go to Home
          </button>
        </>
      )}
      {status === 'error' && (
        <>
          <h2 style={{ color: '#ef4444', fontFamily: 'Manrope, sans-serif' }}>Verification Failed</h2>
          <p style={{ color: '#6b7280' }}>This link is invalid or has already been used.</p>
        </>
      )}
    </div>
  );
}