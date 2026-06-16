"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/Navbar";
import api from "@/lib/api";
import { FaMapMarkerAlt } from "react-icons/fa";

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
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("All");
    const [tradespeople, setTradespeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasSearched, setHasSearched] = useState(false);

    const filtered = tradespeople.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = selectedCategory === "All" || p.categories.some(c => c.category.name === selectedCategory);
        return matchSearch && matchCategory;
    });

    const handleSearch = async () => {
        try {
            setLoading(true);
            const params = {};
            if (selectedLocation.lat) {
                params.lat = selectedLocation.lat;
                params.lng = selectedLocation.lng;
                params.radiusMiles = 40;
            }
            const { data } = await api.get('/users/tradespeople/search', { params });
            setTradespeople(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    console.log(tradespeople)

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await api.get('/categories');
            setCategoryOptions(["All", ...data.map(c => c.name)]);
        };
        fetchCategories();
    }, []);

    // initial load only
    useEffect(() => {
        const fetchTradespeople = async () => {
            try {
                setLoading(true);
                const { data } = await api.get('/users/tradespeople/search');
                setTradespeople(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTradespeople();
        
    }, []);

    return (
        <div style={{ padding: "24px 32px", background: "#fff", fontFamily: "'Work Sans', sans-serif", minHeight: "100vh" }}>

            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 26, fontWeight: 800, color: "#111", margin: "0 0 6px" }}>Find a Tradesperson</h2>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Search and filter verified professionals across the Foreman network.</p>
            </div>

            {/* Filters */}
            <div style={{ background: "#f7f8fa", border: "1px solid #e8e8e8", borderRadius: 12, padding: "20px", marginBottom: 24, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>

                {/* Search */}
                <div style={{ flex: 2, minWidth: 200 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Search</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 14px" }}>
                        <span style={{ color: "#aaa" }}>🔍</span>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name..."
                            style={{ border: "none", outline: "none", fontSize: 13, fontFamily: "'Work Sans', sans-serif", width: "100%", color: "#111" }}
                        />
                    </div>
                </div>

                {/* Category */}
                <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Category</div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ width: "100%", background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 14px", fontSize: 13, fontFamily: "'Work Sans', sans-serif", color: "#111", outline: "none" }}
                    >
                        {categoryOptions.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </div>

                {/* Location */}
                <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Location</div>
                    <select
                        value={selectedLocation.label}
                        onChange={(e) => setSelectedLocation(locations.find(l => l.label === e.target.value))}
                        style={{ width: "100%", background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 14px", fontSize: 13, fontFamily: "'Work Sans', sans-serif", color: "#111", outline: "none" }}
                    >
                        {locations.map((l) => <option key={l.label} value={l.label}>{l.label}</option>)}
                    </select>
                </div>

                {/* Reset */}
                <button
                    onClick={() => { setSearch(""); setSelectedCategory("All"); setSelectedLocation(locations[0]); }}
                    style={{ background: "none", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 16px", fontSize: 12, fontWeight: 600, color: "#888", cursor: "pointer", fontFamily: "'Work Sans', sans-serif", whiteSpace: "nowrap" }}
                >
                    Reset Filters
                </button>
                {/* SEARCH */}
                <button
                    onClick={handleSearch}
                    style={{ background: "#0f172a", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "'Work Sans', sans-serif", whiteSpace: "nowrap" }}
                >
                    Search
                </button>

            </div>

            {/* Results Count */}
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
                Showing <strong style={{ color: "#111" }}>{filtered.length}</strong> tradesperson{filtered.length !== 1 ? "s" : ""}
                {selectedCategory !== "All" && <> in <strong style={{ color: "#f97316" }}>{selectedCategory}</strong></>}
                {selectedLocation.label !== "All" && <> near <strong style={{ color: "#f97316" }}>{selectedLocation.label}</strong></>}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                    {filtered.map((p) => <TradesCard key={p.name} person={p} />)}
                </div>
            ) : (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                    <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, fontWeight: 700, color: "#555", marginBottom: 4 }}>No results found</div>
                    <div style={{ fontSize: 13 }}>Try adjusting your filters</div>
                </div>
            )}

        </div>
    );
}
function TradesCard({ person }) {
    const category = person.categories?.[0]?.category?.name || 'General';
    const tier = person.isVerified ? 'Premium' : 'Standard';
    // const status = 'Available'; // no status field in response
    return (
        <div style={{ background: "#f7f8fa", border: "1px solid #e8e8e8", borderRadius: 14, padding: "20px", fontFamily: "'Work Sans', sans-serif", display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ position: "relative" }}>
                    <img src={person.avatar} alt={person.name} style={{ width: 54, height: 54, borderRadius: 10, objectFit: "cover" }} />
                    <span style={{ position: "absolute", bottom: -4, right: -4, background: "#f97316", borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, border: "2px solid #f7f8fa" }}>★</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "#fff7ed", color: "#f97316" }}>{tier}</span>
            </div>

            {/* Info */}
            <div>
                <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{person.name}</h3>
                <div style={{ fontSize: 12, color: "#888" }} className="flex flex-row gap-1"><FaMapMarkerAlt className="mt-1"/> {person.city}</div>
            </div>

            {/* Category + Status */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#f97316", background: "#fff7ed", padding: "3px 10px", borderRadius: 6 }}>{category}</span>
                {/* <span style={{ fontSize: 11, fontWeight: 600, background: statusColors[person.status].bg, color: statusColors[person.status].color, padding: "3px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColors[person.status].dot }} />
                    {person.status}
                </span> */}
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#111", fontFamily: "Manrope, sans-serif" }}>⭐ {person.rating}</div>
                    <div style={{ fontSize: 10, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>Rating</div>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#111", fontFamily: "Manrope, sans-serif" }}>{person.jobs}</div>
                    <div style={{ fontSize: 10, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>Jobs Done</div>
                </div>
            </div>

            {/* Button */}
            <button style={{ width: "100%", background: "#0f172a", color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Work Sans', sans-serif" }}>
                View Profile →
            </button>

        </div>
    );
}