"use client";
import QuotationInbox from "@/components/Dashboard/CustomerComponents/QuotationInbox";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
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
export default function QuotationPage() {
    const { userRole, section } = useParams();
    const [user, setUser] = useState(userRole === "tradesperson" ? tradeUser : customerUser);
    return (
        <>
            <div style={{ display: 'flex' }}>
                <DashboardSidebar user={user}/>
                <div style={{ flex: 1, marginLeft: "200px" }}>
                    <DashboardNavbar user={user} />
                    <QuotationInbox/>
                    <Footer />
                </div>
            </div>
        </>
    );
}