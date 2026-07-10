"use client";
import AdminVerification from "@/components/Dashboard/AdminComponents/AdminVerification";
import DirectoryHeader from "@/components/Dashboard/AdminComponents/Directory";
import LifeCycle from "@/components/Dashboard/AdminComponents/LifeCycleTrack";
import Payments from "@/components/Dashboard/AdminComponents/Payment";
import SchemaBuilder from "@/components/Dashboard/AdminComponents/SchemaBuilder";
import Subscription from "@/components/Dashboard/AdminComponents/Subscription";
import CompletedJobs from "@/components/Dashboard/CustomerComponents/CompletedJobs";
// import MessageComponent from "@/components/Dashboard/CustomerComponents/MessageComponent";
import PostedJobs from "@/components/Dashboard/CustomerComponents/PostedJobs";
import PostJobWizard from "@/components/Dashboard/CustomerComponents/PostJobWizard";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
// import NotificationPanel from "@/components/Dashboard/NotificationPanel";
import Earnings from "@/components/Dashboard/TradespersonComponents/EarningSection/Earnings";
import AppliedJobs from "@/components/Dashboard/TradespersonComponents/JobSection/AppliedJobs";
import FindJobs from "@/components/Dashboard/TradespersonComponents/JobSection/FindJobs";
import MessagesSidebar from "@/components/Dashboard/TradespersonComponents/MessagesSection/MessageComponent";
import TradespersonDashboard from "@/components/Dashboard/TradespersonComponents/Overview";
import SubscriptionPanel from "@/components/Dashboard/TradespersonComponents/SubscriptionPanel";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const validSections = {
    tradesperson: ['overview', 'subscription', 'applied-jobs', 'find-jobs', 'chats', 'earnings'],
    customer: ['jobs-posted', 'chats', 'new-job','jobs-completed'],
    admin: ['verification', 'categories', 'plans', 'clients', 'lifecycle', 'payments'],
};
export default function DashboardHome() {

    const { userRole, section } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [activeLabel, setActiveLabel] = useState(section || "Home");
    const isChatView = activeLabel === "chats";

    useEffect(() => {
        if (!userRole || !section) return;
        const allowed = validSections[userRole];
        if (!allowed || !allowed.includes(section)) {
            console.log('redirecting from DashboardHome', { userRole, section, allowed });
            router.replace(`/${userRole}/dashboard/${allowed?.[0] || 'overview'}`);
        }
    }, [userRole, section]);
    return (
        <div style={{ display: 'flex' }}>
            <DashboardSidebar user={user} activeLabel={activeLabel} />
            <div style={{ flex: 1, marginLeft: "200px", display: 'flex', flexDirection: 'column', maxHeight: '100vh' }}>
                <DashboardNavbar user={user} />
                <div style={{ flex: 1, overflow: isChatView ? 'hidden' : 'auto' }}>
                    {userRole === "tradesperson" && activeLabel === "overview" && <TradespersonDashboard />}
                    {userRole === "tradesperson" && activeLabel === "subscription" && <SubscriptionPanel />}
                    {userRole === "tradesperson" && activeLabel === "applied-jobs" && <AppliedJobs />}
                    {userRole === "tradesperson" && activeLabel === "find-jobs" && <FindJobs />}
                    {userRole === "tradesperson" && activeLabel === "chats" && <MessagesSidebar />}
                    {userRole === "tradesperson" && activeLabel === "earnings" && <Earnings />}
                    {userRole === "customer" && activeLabel === "jobs-posted" && <PostedJobs />}
                    {userRole === "customer" && activeLabel === "chats" && <MessagesSidebar />}
                    {userRole === "customer" && activeLabel === "new-job" && <PostJobWizard />}
                    {userRole === "customer" && activeLabel === "jobs-completed" && <CompletedJobs />}
                    {userRole === "admin" && activeLabel === "verification" && <AdminVerification />}
                    {userRole === "admin" && activeLabel === "categories" && <SchemaBuilder />}
                    {userRole === "admin" && activeLabel === "plans" && <Subscription />}
                    {userRole === "admin" && activeLabel === "clients" && <DirectoryHeader />}
                    {userRole === "admin" && activeLabel === "lifecycle" && <LifeCycle />}
                    {userRole === "admin" && activeLabel === "payments" && <Payments />}
                    {!isChatView && <Footer />}
                </div>
            </div>
        </div>
    );
}