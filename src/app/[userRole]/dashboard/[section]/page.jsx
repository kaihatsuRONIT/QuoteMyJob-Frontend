"use client";
import AdminVerification from "@/components/Dashboard/AdminComponents/AdminVerification";
import DirectoryHeader from "@/components/Dashboard/AdminComponents/Directory";
import LifeCycle from "@/components/Dashboard/AdminComponents/LifeCycleTrack";
import SchemaBuilder from "@/components/Dashboard/AdminComponents/SchemaBuilder";
import Subscription from "@/components/Dashboard/AdminComponents/Subscription";
import MessageComponent from "@/components/Dashboard/CustomerComponents/MessageComponent";
import PostedJobs from "@/components/Dashboard/CustomerComponents/PostedJobs";
import PostJobWizard from "@/components/Dashboard/CustomerComponents/PostJobWizard";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import Earnings from "@/components/Dashboard/TradespersonComponents/EarningSection/Earnings";
import AppliedJobs from "@/components/Dashboard/TradespersonComponents/JobSection/AppliedJobs";
import FindJobs from "@/components/Dashboard/TradespersonComponents/JobSection/FindJobs";
import MessagesSidebar from "@/components/Dashboard/TradespersonComponents/MessagesSection/MessageComponent";
import TradespersonDashboard from "@/components/Dashboard/TradespersonComponents/Overview";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import { useState } from "react";
const tradeUser = {
    name: 'David Sterling',
    role: 'tradesperson',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
};

const customerUser = {
    name: 'Sarah Jenkins',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
};

const adminUser = {
    name: 'Ronit Khanna',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
};

export default function DashboardHome() {
    const { userRole, section } = useParams();
    const [user, setUser] = useState(
        userRole === "tradesperson" ? tradeUser :
            userRole === "admin" ? adminUser :
                customerUser
    );
    const [activeLabel, setActiveLabel] = useState(section || "Home");
    console.log(userRole)
    console.log(activeLabel)
    return (
        <div style={{ display: 'flex' }}>
            <DashboardSidebar user={user} activeLabel={activeLabel} />
            <div style={{ flex: 1, marginLeft: "200px" }}>
                <DashboardNavbar user={user} />
                {userRole === "tradesperson" && activeLabel === "overview" && <TradespersonDashboard />}
                {userRole === "tradesperson" && activeLabel === "applied-jobs" && <AppliedJobs />}
                {userRole === "tradesperson" && activeLabel === "find-jobs" && <FindJobs />}
                {userRole === "tradesperson" && activeLabel === "messages" && <MessagesSidebar />}
                {userRole === "tradesperson" && activeLabel === "earnings" && <Earnings />}
                {userRole === "customer" && activeLabel === "jobs-posted" && <PostedJobs />}
                {userRole === "customer" && activeLabel === "messages" && <MessageComponent />}
                {userRole === "customer" && activeLabel === "new-job" && <PostJobWizard />}
                {userRole === "admin" && activeLabel === "verification" && <AdminVerification/>}
                {userRole === "admin" && activeLabel === "categories" && <SchemaBuilder/>}
                {userRole === "admin" && activeLabel === "plans" && <Subscription/>}
                {userRole === "admin" && activeLabel === "clients" && <DirectoryHeader/>}
                {userRole === "admin" && activeLabel === "lifecycle" && <LifeCycle/>}
                <Footer />
            </div>
        </div>
    );
}