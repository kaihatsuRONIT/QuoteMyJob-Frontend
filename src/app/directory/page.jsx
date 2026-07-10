"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/Navbar";
import api from "@/lib/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const categories = ["All", "Plumbing", "Electrical", "Renovation", "Landscaping", "HVAC", "Carpentry", "Painting"];
const locations = [
    { label: "All", lat: null, lng: null },
    { label: "London", lat: 51.5074, lng: -0.1278 },
    { label: "Manchester", lat: 53.4808, lng: -2.2426 },
    { label: "Birmingham", lat: 52.4862, lng: -1.8904 },
    { label: "Leeds", lat: 53.8008, lng: -1.5491 },
    { label: "Bristol", lat: 51.4545, lng: -2.5879 },
    { label: "Edinburgh", lat: 55.9533, lng: -3.1883 },
    { label: "Glasgow", lat: 55.8642, lng: -4.2518 },
    { label: "Liverpool", lat: 53.4084, lng: -2.9916 },
    { label: "Sheffield", lat: 53.3811, lng: -1.4701 },
    { label: "Dublin", lat: 53.3498, lng: -6.2603 },
    { label: "Belfast", lat: 54.5973, lng: -5.9301 },
    { label: "Cardiff", lat: 51.4816, lng: -3.1791 },
];

const tradespeople = [
    { name: "James Holloway", category: "Plumbing", location: "London", rating: 4.9, jobs: 142, status: "Available", avatar: "https://randomuser.me/api/portraits/men/11.jpg", tier: "Premium" },
    { name: "Sarah Chen", category: "Electrical", location: "Manchester", rating: 4.7, jobs: 98, status: "Available", avatar: "https://randomuser.me/api/portraits/women/44.jpg", tier: "Standard" },
    { name: "Marcus Thorne", category: "Renovation", location: "Birmingham", rating: 4.8, jobs: 201, status: "Busy", avatar: "https://randomuser.me/api/portraits/men/75.jpg", tier: "Premium" },
    { name: "Priya Kapoor", category: "Landscaping", location: "Leeds", rating: 4.6, jobs: 67, status: "Available", avatar: "https://randomuser.me/api/portraits/women/68.jpg", tier: "Standard" },
    { name: "Tom Eriksson", category: "HVAC", location: "Bristol", rating: 4.9, jobs: 310, status: "Available", avatar: "https://randomuser.me/api/portraits/men/23.jpg", tier: "Premium" },
    { name: "Aisha Nwosu", category: "Painting", location: "London", rating: 4.5, jobs: 55, status: "Busy", avatar: "https://randomuser.me/api/portraits/women/29.jpg", tier: "Standard" },
    { name: "Ravi Sharma", category: "Plumbing", location: "Noida", rating: 4.8, jobs: 88, status: "Available", avatar: "https://randomuser.me/api/portraits/men/46.jpg", tier: "Premium" },
    { name: "Elena Kovacs", category: "Carpentry", location: "Austin", rating: 4.7, jobs: 120, status: "Available", avatar: "https://randomuser.me/api/portraits/women/52.jpg", tier: "Standard" },
    { name: "Daniel Osei", category: "Electrical", location: "Leeds", rating: 4.9, jobs: 175, status: "Busy", avatar: "https://randomuser.me/api/portraits/men/62.jpg", tier: "Premium" },
];
const tierColors = {
    Premium: { bg: "#fff7ed", color: "#f97316" },
    Standard: { bg: "#f0f0f8", color: "#6366f1" },
};

const statusColors = {
    Available: { bg: "#f0fdf4", color: "#16a34a", dot: "#16a34a" },
    Busy: { bg: "#fef2f2", color: "#ef4444", dot: "#ef4444" },
};
export default function DirectoryPage() {
    return (
        <>
            <NavBar />
            <FindTradesperson />
        </>
    )
}


function FindTradesperson() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("All");
    const [tradespeople, setTradespeople] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasSearched, setHasSearched] = useState(false);
    const limit = 6;
    const [hasMore, setHasMore] = useState(true);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);


    const fetchTradespeople = async (pageNum = 1, append = false) => {
        try {
            if (!append) setLoading(true);
            const params = { page: pageNum, limit };
            if (search) params.businessName = search;
            if (selectedCategory !== 'All') {
                const cat = categories.find(c => c.name === selectedCategory);
                if (cat) params.categoryId = cat.id;
            }
            const { data } = await api.get('/users/tradespeople/search', { params });
            setTradespeople(prev => append ? [...prev, ...data] : data);
            setHasMore(data.length === limit);
        } catch (error) {
            console.log(error);
        } finally {
            if (!append) setLoading(false);
        }
    };

    const handleSearch = () => {
        setPage(1);
        fetchTradespeople(1, false);
    };

    const handleLoadMore = async () => {
        setLoadMoreLoading(true);
        const nextPage = page + 1;
        setPage(nextPage);
        await fetchTradespeople(nextPage, true);
        setLoadMoreLoading(false);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await api.get('/categories');
            setCategories(data);
            setCategoryOptions(["All", ...data.map(c => c.name)]);
        };
        fetchCategories();
    }, []);

    // initial load only
    useEffect(() => {
        fetchTradespeople();
    }, []);

    console.log(tradespeople)

    return (
        <div style={{ padding: "0px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif", minHeight: "100vh" }}>

            {/* Hero */}
            <div style={{ background: '#f8f9fb', padding: '45px 32px 40px', textAlign: 'left' }}>
                <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '60px', color: '#0d1b2a', margin: '0 0 16px', lineHeight: "60px", letterSpacing: "-1px", maxWidth: "768px" }}>
                    Hire the <span style={{ color: '#f97316' }}>Architects</span> of your home's future.
                </h1>
                <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '480px', margin: '0 0 32px', lineHeight: 1.7 }}>
                    Our vetted directory connects you with the industry's elite tradespeople. Verified credentials, exceptional craftsmanship, and absolute reliability.
                </p>

                {/* Search bar */}
                <div style={{ background: '#fff', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', padding: '8px', display: 'flex', alignItems: 'center', gap: '8px', minWidth: '20vw' }}>
                    <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px' }}>
                        <span style={{ color: '#94a3b8' }}>🔍</span>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by business name..."
                            style={{ border: 'none', outline: 'none', fontSize: 14, fontFamily: "'Work Sans', sans-serif", width: '100%', color: '#111', background: 'transparent' }}
                        />
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ background: '#f0f3ff', border: 'none', borderRadius: '10px', padding: '12px 16px', fontSize: 14, fontWeight: 600, fontFamily: "'Work Sans', sans-serif", color: '#0d1b2a', outline: 'none', cursor: 'pointer' }}
                    >
                        <option value="All">All Trade Categories</option>
                        {categoryOptions.filter(c => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <button
                        onClick={handleSearch}
                        style={{ background: '#0d1b2a', border: 'none', borderRadius: '10px', padding: '12px 28px', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: "'Work Sans', sans-serif", whiteSpace: 'nowrap' }}
                    >
                        Filter
                    </button>
                </div>
            </div>

            {
                loading ? <SkeletonCards /> : (
                    <>
                        {/* Results Count */}
                        <div style={{ fontSize: 13, color: "#888", marginBottom: 16, paddingLeft: "40px" }}>
                            Showing <strong style={{ color: "#111" }}>{tradespeople.length}</strong> tradesperson{tradespeople.length !== 1 ? "s" : ""}
                            {selectedCategory !== "All" && <> in <strong style={{ color: "#f97316" }}>{selectedCategory}</strong></>}
                        </div>

                        {/* Grid */}
                        {tradespeople.length > 0 ? (
                            <>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30, width: '100%', padding: '0 40px' }}>
                                    {tradespeople.map((p) => <TradesCard key={p.id} person={p} />)}
                                </div>
                                {hasMore && (
                                    <div style={{ textAlign: 'center', margin: '32px 0px' }}>
                                        <button
                                            onClick={handleLoadMore}
                                            style={{ padding: '12px 32px', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#374151', cursor: 'pointer' }}
                                        >
                                            {loadMoreLoading ? "Loading..." : "Load More"}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}>
                                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                                <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, fontWeight: 700, color: "#555", marginBottom: 4 }}>No results found</div>
                                <div style={{ fontSize: 13 }}>Try adjusting your filters</div>
                            </div>
                        )}
                    </>
                )
            }

        </div>
    );
}
function TradesCard({ person }) {
    const category = person.categories?.[0]?.category?.name || 'General';
    const businessName = person.businessName || category;
    const rating = person.averageRating || 0;
    const totalReviews = person.totalReviews || 0;
    const router = useRouter();

    return (
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 16, padding: "20px", fontFamily: "'Work Sans', sans-serif", display: "flex", flexDirection: "column", gap: 14, width: "382px" }}>

            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ position: "relative" }}>
                    <img src={person.avatar} alt={person.name} style={{ width: 64, height: 64, borderRadius: 14, objectFit: "cover" }} />
                    <span style={{ position: "absolute", bottom: -4, right: -4, background: "#0d1b2a", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", border: "2px solid #fff" }}>✓</span>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                        <span style={{ color: "#f97316", fontSize: 14 }}>★</span>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 16, color: "#111" }}>{rating.toFixed(1)}</span>
                    </div>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0", letterSpacing: "0.04em" }}>{totalReviews} REVIEWS</p>
                </div>
            </div>

            {/* Info */}
            <div>
                <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 800, color: "#0d1b2a", margin: "0 0 4px" }}>{businessName}</h3>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#f97316", margin: 0 }}>{person.name}</p>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#475569", background: "#f0f3ff", padding: "5px 12px", borderRadius: 20 }}>{category}</span>
                {person.isVerified && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#475569", background: "#f0f3ff", padding: "5px 12px", borderRadius: 20 }}>LICENSED</span>
                )}
            </div>

            {/* Button */}
            <button onClick={() => router.push(`/tradesperson-profile/${person.id}`)} style={{ width: "100%", background: "#0d1b2a", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope, sans-serif" }}>
                View Profile
            </button>

        </div>
    );
}
function SkeletonCards() {
    return (
        <section style={{ background: '#fff', padding: '48px 32px', fontFamily: 'Work Sans, sans-serif' }}>
            <style>{`
                @keyframes shimmer {
                    0% { background-position: -600px 0; }
                    100% { background-position: 600px 0; }
                }
                .sk {
                    background: linear-gradient(90deg, #e8e8e8 25%, #f2f2f2 50%, #e8e8e8 75%);
                    background-size: 600px 100%;
                    animation: shimmer 1.6s infinite;
                    border-radius: 6px;
                }
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="sk" style={{ height: 32, width: 220, borderRadius: 8 }} />
                    <div className="sk" style={{ height: 14, width: 300 }} />
                </div>
                <div className="sk" style={{ height: 18, width: 120, marginTop: 6 }} />
            </div>

            {/* Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {/* Top row — avatar + rating */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div className="sk" style={{ width: 64, height: 64, borderRadius: 14 }} />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                                <div className="sk" style={{ height: 16, width: 60 }} />
                                <div className="sk" style={{ height: 12, width: 70 }} />
                            </div>
                        </div>

                        {/* Name + role */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div className="sk" style={{ height: 18, width: '80%' }} />
                            <div className="sk" style={{ height: 13, width: '55%' }} />
                        </div>

                        {/* Tags */}
                        <div style={{ display: 'flex', gap: 8 }}>
                            <div className="sk" style={{ height: 26, width: 80, borderRadius: 20 }} />
                            <div className="sk" style={{ height: 26, width: 70, borderRadius: 20 }} />
                        </div>

                        {/* Button */}
                        <div className="sk" style={{ height: 44, width: '100%', borderRadius: 10, marginTop: 'auto' }} />
                    </div>
                ))}
            </div>
        </section>
    );
}