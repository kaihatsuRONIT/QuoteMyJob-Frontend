import NotificationPanel from "@/components/Dashboard/NotificationPanel";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  return <ProtectedRoute>{children}<Toaster
    position="bottom-right"
    toastOptions={{
      style: {
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        background: '#0d1b2a',
        color: '#fff',
      },
    }}
  /></ProtectedRoute>;
}