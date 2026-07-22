// app/verify-email-notice/page.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/api";

export default function VerifyEmailNoticePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sending, setSending] = useState(false);

  const handleResend = async () => {
    try {
      setSending(true);
      await api.post('/auth/resend-verification');
      alert('Verification email sent! Please check your inbox.');
    } catch {
      alert('Failed to resend email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fb', fontFamily: 'Work Sans, sans-serif', padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '48px 40px', maxWidth: '440px', width: '100%', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</div>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', color: '#0d1b2a', margin: '0 0 10px' }}>Verify your email</h2>
        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, margin: '0 0 24px' }}>
          We sent a verification link to <strong style={{ color: '#0d1b2a' }}>{user?.user?.email ?? user?.email}</strong>. Please check your inbox to access your dashboard.
        </p>
        <button
          onClick={handleResend}
          disabled={sending}
          style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: '#FF7E00', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', cursor: sending ? 'not-allowed' : 'pointer', opacity: sending ? 0.7 : 1, marginBottom: '10px' }}
        >
          {sending ? 'Sending...' : 'Resend Verification Email'}
        </button>
        <button
          onClick={async () => { await logout(); router.push('/login'); }}
          style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer', color: '#374151' }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}