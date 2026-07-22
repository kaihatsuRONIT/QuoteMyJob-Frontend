"use client"
import { useEffect, useState } from 'react';
import { FiCamera, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { IoMdNavigate } from 'react-icons/io';

const libraries = ['places'];

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const isTrader = user?.user?.role === 'TRADESPERSON';

  const [form, setForm] = useState({
    name: '', phone: '', avatar: '', businessName: '',
    bio: '', licenseNo: '', insuranceDoc: '', address: '', lat: null,
    lng: null,
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('');
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [mapCenter, setMapCenter] = useState({ lat: 51.5074, lng: -0.1278 });
  const [markerPosition, setMarkerPosition] = useState(user?.lat && user?.lng ? { lat: user.lat, lng: user.lng } : null);
  const [mapInstance, setMapInstance] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      let avatarUrl = form.avatar;

      if (avatarFile) {
        const { data: uploadData } = await api.post('/upload/presigned-url', {
          folder: 'avatars',
          filename: avatarFile.name,
          contentType: avatarFile.type,
        });
        await fetch(uploadData.uploadUrl, {
          method: 'PUT',
          body: avatarFile,
          headers: { 'Content-Type': avatarFile.type },
        });
        avatarUrl = uploadData.publicUrl;
        console.log(avatarUrl)
      }

      const endpoint = isTrader ? '/users/me/tradesperson' : '/users/me/customer';
      const payload = isTrader
        ? { name: form.name, phone: form.phone, businessName: form.businessName, bio: form.bio, licenseNo: form.licenseNo, insuranceDoc: form.insuranceDoc, address: form.address, avatar: avatarUrl, lat: form.lat, lng: form.lng, categoryIds: selectedCategoryIds }
        : { name: form.name, phone: form.phone, avatar: avatarUrl, address: form.address }
      await api.patch(endpoint, payload);
      setSaved(true);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: '10px',
    border: '1px solid #e5e7eb', background: '#f8f9fb',
    fontFamily: 'Work Sans, sans-serif', fontSize: '14px',
    color: '#374151', outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle = {
    fontSize: '12px', fontWeight: 600, color: '#6b7280',
    display: 'block', marginBottom: '6px',
  };

  const fillAddress = (place, lat, lng) => {
    const components = place.address_components;
    const get = (type) => components?.find(c => c.types.includes(type))?.long_name || '';
    const address = `${get('street_number')} ${get('route')}, ${get('locality') || get('postal_town')}, ${get('postal_code')}`.trim();
    setForm(prev => ({ ...prev, address, lat, lng }));
  };

  const onPlaceChanged = () => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    if (!place.geometry) return;
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setMapCenter({ lat, lng });
    setMarkerPosition({ lat, lng });
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

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user?.name || '',
      phone: user?.phone || '',
      avatar: user?.avatar || '',
      businessName: user?.businessName || '',
      bio: user?.bio || '',
      licenseNo: user?.licenseNo || '',
      insuranceDoc: user?.insuranceDoc || '',
      address: user?.address || '',
    });
    setAvatarPreview(user?.avatar || '');
    if (user?.categories) {
      setSelectedCategoryIds(user.categories.map(c => c.categoryId));
    }
  }, [user]);
  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data));
  }, []);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fb' }}>
      <div style={{ width: '36px', height: '36px', border: '3px solid #f0f0f0', borderTop: '3px solid #FF7E00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
  return (
    <>
      <NavBar />
      <div style={{ background: '#f8f9fb', minHeight: '100vh', fontFamily: 'Work Sans, sans-serif' }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 24px' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '26px', color: '#0d1b2a', margin: '0 0 4px' }}>My Profile</h1>
              <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Manage your personal information</p>
            </div>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '10px', background: '#ff4444', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer' }}>
              Logout <FiArrowRight />
            </button>
          </div>

          {/* Avatar */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', background: '#eef0f8', border: '2px solid #FF7E00' }}>
                {avatarPreview
                  ? <img src={avatarPreview} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#9ca3af' }}>👤</div>
                }
              </div>
              <label style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderRadius: '50%', background: '#FF7E00', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <FiCamera style={{ color: '#fff', fontSize: '11px' }} />
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
              </label>
            </div>
            <div>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#0d1b2a', margin: '0 0 4px' }}>{form.name || 'Your Name'}</p>
              <p style={{ fontSize: '12px', color: '#FF7E00', margin: '0 0 4px', fontWeight: 600, textTransform: 'capitalize' }}>{user?.user?.role}</p>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Click camera icon to update photo</p>
            </div>
          </div>

          {/* Basic Info */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '0 0 20px' }}>Basic Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={labelStyle}>FULL NAME</label>
                <input style={inputStyle} value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Your full name" />
              </div>
              <div>
                <label style={labelStyle}>PHONE NUMBER</label>
                <input style={inputStyle} value={form.phone || ''} onChange={e => handleChange('phone', e.target.value)} placeholder="+44 7700 000000" />
              </div>
            </div>
          </div>

          {/* Tradesperson-only fields */}
          {isTrader && (
            <>
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px', marginBottom: '16px' }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '0 0 20px' }}>Business Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>BUSINESS NAME</label>
                    <input style={inputStyle} value={form.businessName || ''} onChange={e => handleChange('businessName', e.target.value)} placeholder="Your business name" />
                  </div>
                  <div>
                    <label style={labelStyle}>BIO</label>
                    <textarea style={{ ...inputStyle, resize: 'none' }} rows={3} value={form.bio || ''} onChange={e => handleChange('bio', e.target.value)} placeholder="Tell clients about yourself..." />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={labelStyle}>LICENSE NO.</label>
                      <input style={inputStyle} value={form.licenseNo || ''} onChange={e => handleChange('licenseNo', e.target.value)} placeholder="LIC-XXXX" />
                    </div>
                    <div>
                      <label style={labelStyle}>INSURANCE DOC URL</label>
                      <input style={inputStyle} value={form.insuranceDoc || ''} onChange={e => handleChange('insuranceDoc', e.target.value)} placeholder="https://..." />
                    </div>
                    <div>
                      <label style={labelStyle}>CATEGORIES</label>
                      <select
                        onChange={e => {
                          const id = e.target.value;
                          if (id && !selectedCategoryIds.includes(id)) {
                            setSelectedCategoryIds(prev => [...prev, id]);
                          }
                          e.target.value = '';
                        }}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#f8f9fb', fontFamily: 'Work Sans, sans-serif', fontSize: '14px', color: '#374151', outline: 'none' }}
                      >
                        <option value="">Select a category to add...</option>
                        {categories.filter(c => !selectedCategoryIds.includes(c.id)).map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>

                      {/* Selected tags */}
                      {selectedCategoryIds.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                          {selectedCategoryIds.map(id => {
                            const cat = categories.find(c => c.id === id);
                            return cat ? (
                              <span key={id} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '20px', background: '#FF7E00', color: '#fff', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', fontWeight: 600 }}>
                                {cat.name}
                                <span onClick={() => setSelectedCategoryIds(prev => prev.filter(i => i !== id))} style={{ cursor: 'pointer', fontWeight: 700, fontSize: '12px' }}>✕</span>
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* Map implementation */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', padding: '24px', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: '0 0 20px' }}>ADDRESS</h3>
            {isLoaded ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Autocomplete search */}
                <div>
                  <label style={labelStyle}>SEARCH ADDRESS</label>
                  <Autocomplete onLoad={ac => setAutocomplete(ac)} onPlaceChanged={onPlaceChanged}>
                    <input
                      placeholder="Start typing an address..."
                      style={inputStyle}
                    />
                  </Autocomplete>
                </div>

                {/* Manual address input */}
                <div>
                  <label style={labelStyle}>ADDRESS</label>
                  <input style={inputStyle} value={form.address || ''} onChange={e => handleChange('address', e.target.value)} placeholder="e.g. 10 Downing Street, London" />
                </div>

                {/* Current location button */}
                <button
                  onClick={handleCurrentLocation}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer', width: 'fit-content' }}
                >
                  <IoMdNavigate style={{ color: '#FF7E00' }} /> Use My Current Location
                </button>

                {/* Map */}
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '260px', borderRadius: '12px' }}
                  center={mapCenter}
                  zoom={13}
                  onClick={onMapClick}
                  onLoad={map => setMapInstance(map)}
                >
                  {markerPosition && <Marker position={markerPosition} />}
                </GoogleMap>
              </div>
            ) : (
              <div>Loading map...</div>
            )}
          </div>

          {error && <p style={{ color: 'red', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: '#FF7E00', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? 'Saving...' : saved ? '✓ Changes Saved' : 'Save Changes'}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}