"use client";
import JobLifecycleDetailPage from "@/components/Dashboard/AdminComponents/JobLifeCycle";
import LifeCycle from "@/components/Dashboard/AdminComponents/LifeCycleTrack";
import QuotationInbox from "@/components/Dashboard/CustomerComponents/QuotationInbox";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import JobDetailPage from "@/components/Dashboard/TradespersonComponents/JobSection/JobDetailPage";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function QuotationPage() {
    const { userRole, section, jobOrQuoteId } = useParams();
    const { user } = useAuth();
    const router = useRouter();
    console.log(userRole)
    useEffect(() => {
        const valid =
            (userRole === 'tradesperson' && section === 'jobs') ||
            (userRole === 'customer' && section === 'quotes') ||
            (userRole === 'admin' && section === 'lifecycle');
        if (!valid) {
            console.log('redirecting from QuotationPage', { userRole, section });
            router.replace(`/${userRole}/dashboard/overview`);
        }
    }, [userRole, section]);

    if (userRole === 'tradesperson' && section === 'jobs') {
        return (
            <div style={{ display: 'flex' }}>
                <DashboardSidebar user={user} />
                <div style={{ flex: 1, marginLeft: "200px" }}>
                    <DashboardNavbar user={user} />
                    <JobDetailPage jobId={jobOrQuoteId} />
                    <Footer />
                </div>
            </div>
        );
    }

    if (userRole === 'customer' && section === 'quotes') {
        return (
            <div style={{ display: 'flex' }}>
                <DashboardSidebar user={user} />
                <div style={{ flex: 1, marginLeft: "200px" }}>
                    <DashboardNavbar user={user} />
                    <QuotationInbox jobId={jobOrQuoteId} />
                    <Footer />
                </div>
            </div>
        );
    }
    if (userRole === 'admin' && section === 'lifecycle') {
        return (
            <div style={{ display: 'flex' }}>
                <DashboardSidebar user={user} />
                <div style={{ flex: 1, marginLeft: "200px" }}>
                    <DashboardNavbar user={user} />
                    <JobLifecycleDetailPage/>
                    <Footer />
                </div>
            </div>
        );
    }

    return null;
}