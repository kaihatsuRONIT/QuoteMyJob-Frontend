// components/ProtectedRoute.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    const role = (user?.user?.role || user?.role)?.toLowerCase();
    if (requiredRole && role !== requiredRole.toLowerCase()) {
      router.replace("/login");
    }
    const isEmailVerified = user?.user?.isEmailVerified ?? user?.isEmailVerified;
    if (!isEmailVerified) {
      router.replace("/verify-email-notice");
      return;
    }
  }, [user, loading, requiredRole]);

  const role = (user?.user?.role || user?.role)?.toLowerCase();
  const isEmailVerified = user?.user?.isEmailVerified ?? user?.isEmailVerified;
  if (loading || !user || (requiredRole && role !== requiredRole.toLowerCase()) || !isEmailVerified) return null;

  return <>{children}</>;
}