"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdPerson, MdEmail, MdPhone, MdLocationOn, MdLock, MdLockClock, MdVisibilityOff, MdVisibility } from "react-icons/md";
import { IoMdNavigate } from "react-icons/io";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import api from "@/lib/api";

const libraries = ['places'];

export default function SignUp() {
  const [role, setRole] = useState("customer");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", password: "", confirmPassword: ""
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 51.5074, lng: -0.1278 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data));
  }, []);

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: "8px",
    border: "1px solid #e2e8f0", fontSize: "14px", color: "#475569",
    fontFamily: "Work Sans, sans-serif", outline: "none",
    background: "#f0f3ff", boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: "11px", fontWeight: "700", letterSpacing: "1px",
    color: "#0f172a", display: "flex", alignItems: "center",
    gap: "5px", marginBottom: "8px",
  };

  const fillAddress = (place, lat, lng) => {
    const components = place.address_components;
    const get = (type) => components?.find(c => c.types.includes(type))?.long_name || '';
    const address = `${get('street_number')} ${get('route')}, ${get('locality') || get('postal_town')}, ${get('postal_code')}, ${get('country')}`.trim().replace(/^,\s*/, '');
    setFormData(prev => ({ ...prev, address }));
    if (lat && lng) {
      setMarkerPosition({ lat, lng });
      setMapCenter({ lat, lng });
    }
  };

  const onPlaceChanged = () => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    if (!place.geometry) return;
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    fillAddress(place, lat, lng);
  };

  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    setMapCenter({ lat, lng });
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) fillAddress(results[0], lat, lng);
    });
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setMarkerPosition({ lat, lng });
      setMapCenter({ lat, lng });
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) fillAddress(results[0], lat, lng);
      });
    });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register(
        formData.name, formData.email, formData.password,
        role.toUpperCase(), formData.phone, formData.address,
        role === 'tradesperson' ? selectedCategoryId : undefined
      );
      router.push("/");
    } catch (e) {
      setError(e?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f5f6fa",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Work Sans', sans-serif", padding: "40px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: "620px" }}>

        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "500", color: "#475569", textDecoration: "none", marginBottom: "32px" }}>← Back to Home</a>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          {role === "customer" ? (
            <>
              <h1 style={{ fontSize: "40px", fontWeight: "600", fontFamily: "Manrope, sans-serif", color: "#0f172a", margin: "0 0 12px" }}>Join the Digital Foreman</h1>
              <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>Your dream project is just a few quotes away.</p>
            </>
          ) : (
            <>
              <IoShieldCheckmark style={{ margin: '0 auto' }} size={30} />
              <h1 style={{ fontSize: "40px", fontWeight: "600", fontFamily: "Manrope, sans-serif", color: "black", margin: "0 0 12px" }}>Build Your Future</h1>
              <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.7, margin: '0 auto', textAlign: 'center', maxWidth: "350px" }}>Join the elite network of professional tradespeople and secure high-value contracts today.</p>
            </>
          )}
        </div>

        <div style={{ background: "#fff", borderRadius: "20px", padding: "36px 40px", boxShadow: "0px 8px 10px -6px #0D1C320D, 0px 20px 25px -5px #0D1C320D" }}>

          {/* Toggle */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#f0f3ff", borderRadius: "10px", padding: "4px", marginBottom: "28px" }}>
            {[{ key: "customer", label: "As a Customer" }, { key: "tradesperson", label: "As a Tradesperson" }].map((r) => (
              <button key={r.key} onClick={() => setRole(r.key)} style={{ padding: "10px", borderRadius: "8px", border: "none", background: role === r.key ? "#fff" : "transparent", color: "#0f172a", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", boxShadow: role === r.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.2s" }}>{r.label}</button>
            ))}
          </div>

          {/* Name */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}><MdPerson size={13} /> FULL NAME</label>
            <input type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} style={inputStyle} />
          </div>

          {/* Email + Phone */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}><MdEmail size={13} /> EMAIL ADDRESS</label>
              <input type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}><MdPhone size={13} /> PHONE NUMBER</label>
              <input type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} style={inputStyle} />
            </div>
          </div>

          {/* Category — tradesperson only */}
          {role === 'tradesperson' && (
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>CATEGORY</label>
              <select value={selectedCategoryId} onChange={e => setSelectedCategoryId(e.target.value)} style={inputStyle}>
                <option value="" disabled>Select your trade category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          )}

          {/* Address + Map */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}><MdLocationOn size={13} /> {role === 'tradesperson' ? 'BUSINESS/HOME ADDRESS' : 'FULL ADDRESS'}</label>

            {isLoaded ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Autocomplete onLoad={ac => setAutocomplete(ac)} onPlaceChanged={onPlaceChanged}>
                  <input placeholder="Search address..." style={inputStyle} />
                </Autocomplete>
                <textarea
                  placeholder="Full address will appear here"
                  rows={2}
                  value={formData.address}
                  onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                  style={{ ...inputStyle, resize: "none" }}
                />
                <button type="button" onClick={handleCurrentLocation} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff", fontFamily: "Work Sans, sans-serif", fontSize: "13px", fontWeight: 600, color: "#374151", cursor: "pointer", width: "fit-content" }}>
                  <IoMdNavigate style={{ color: "#f97316" }} /> Use My Current Location
                </button>
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "220px", borderRadius: "10px" }}
                  center={mapCenter}
                  zoom={13}
                  onClick={onMapClick}
                >
                  {markerPosition && <Marker position={markerPosition} />}
                </GoogleMap>
              </div>
            ) : (
              <textarea
                placeholder="Enter your full address"
                rows={2}
                value={formData.address}
                onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                style={{ ...inputStyle, resize: "none" }}
              />
            )}
          </div>

          {/* Passwords */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
            {[
              { label: "Password", icon: <MdLock />, show: showPass, toggle: () => setShowPass(!showPass) },
              { label: "Confirm Password", icon: <MdLockClock />, show: showConfirm, toggle: () => setShowConfirm(!showConfirm) },
            ].map((f) => (
              <div key={f.label}>
                <div className="flex flex-row gap-1">{f.icon}<label style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a", display: "block", marginBottom: "8px" }}>{f.label}</label></div>
                <div style={{ position: "relative" }}>
                  <input
                    type={f.show ? "text" : "password"}
                    value={f.label === "Password" ? formData.password : formData.confirmPassword}
                    onChange={e => setFormData(prev => ({ ...prev, [f.label === "Password" ? "password" : "confirmPassword"]: e.target.value }))}
                    style={{ ...inputStyle, paddingRight: "40px" }}
                  />
                  <span onClick={f.toggle} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#94a3b8" }}>
                    {f.show ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {error && <p style={{ color: "red", fontSize: "13px", marginBottom: "12px" }}>{error}</p>}

          <button onClick={handleRegister} style={{ width: "100%", padding: "15px", background: "#f97316", color: "#fff", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", marginBottom: "20px" }}>
            Create Account
          </button>

          <p style={{ textAlign: "center", fontSize: "14px", color: "#64748b", margin: 0 }}>
            Already Have an Account? <a href="/login" style={{ color: "#f97316", fontWeight: "600", textDecoration: "none" }}>Login Here</a>
          </p>
        </div>

        <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "32px" }}>
          {["Help Center", "Privacy Policy", "Cookies"].map((item) => (
            <a key={item} href="#" style={{ fontSize: "13px", color: "#64748b", textDecoration: "none" }}>{item}</a>
          ))}
        </div>
        <p className="text-center" style={{ fontSize: "12px", color: "#94a3b8", marginTop: "12px" }}>© 2026 QuoteMyJob. Built for Professionals.</p>
      </div>
    </div>
  );
}