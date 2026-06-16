// components/EditJobModal.jsx
"use client";

import { useState, useEffect } from 'react';
import { FiX, FiCamera } from 'react-icons/fi';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { IoMdNavigate } from 'react-icons/io';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const libraries = ['places'];

export default function EditJobModal({ job, categories, onClose }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [form, setForm] = useState({
    title: job.title || '',
    description: job.description || '',
    estimatedDate: job.estimatedDate ? job.estimatedDate.split('T')[0] : '',
    budgetMax: job.budgetMax || '',
    budgetCurrency: job.budgetCurrency || 'GBP',
    address: job.address || '',
    categoryId: job.categories?.[0]?.category?.id || '',
  });

  const [photos, setPhotos] = useState([]);
  const [existingMedia, setExistingMedia] = useState(job.media || []);
  const [photoError, setPhotoError] = useState('');
  const [saving, setSaving] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: job.lat || 51.5074, lng: job.lng || -0.1278 });
  const [markerPosition, setMarkerPosition] = useState(job.lat && job.lng ? { lat: job.lat, lng: job.lng } : null);
  const [autocomplete, setAutocomplete] = useState(null);

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: '10px',
    border: '1px solid #e5e7eb', background: '#f8f9fb',
    fontFamily: 'Work Sans, sans-serif', fontSize: '14px',
    color: '#374151', outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle = {
    fontSize: '11px', fontWeight: 700, color: '#6b7280',
    display: 'block', marginBottom: '6px', letterSpacing: '0.06em',
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

  const handleSave = async () => {
    setSaving(true);
    try {
      let mediaUrls = existingMedia.map(m => m.url);

      if (photos.length > 0) {
        const uploaded = await Promise.all(
          Array.from(photos).map(async (file) => {
            const { data } = await api.post('/upload/presigned-url', {
              folder: 'jobs',
              filename: file.name,
              contentType: file.type,
            });
            await fetch(data.uploadUrl, {
              method: 'PUT',
              body: file,
              headers: { 'Content-Type': file.type },
            });
            return data.publicUrl;
          })
        );
        mediaUrls = [...mediaUrls, ...uploaded];
      }

      await api.patch(`/jobs/${job.id}`, {
        title: form.title,
        description: form.description,
        address: form.address,
        lat: markerPosition?.lat,
        lng: markerPosition?.lng,
        categoryIds: [form.categoryId],
        estimatedDate: form.estimatedDate || undefined,
        budgetMax: form.budgetMax ? parseFloat(form.budgetMax) : undefined,
        budgetCurrency: form.budgetCurrency,
        mediaUrls,
      });

      toast.success('Job updated successfully');
      onClose();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to update job');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      fontFamily: 'Work Sans, sans-serif', padding: '24px',
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '720px',
        maxHeight: '90vh', overflowY: 'auto', padding: '32px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', color: '#0d1b2a', margin: 0 }}>Edit Job</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
            <FiX size={22} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Category */}
          <div>
            <label style={labelStyle}>CATEGORY</label>
            <select value={form.categoryId} onChange={e => setForm(p => ({ ...p, categoryId: e.target.value }))} style={inputStyle}>
              <option value="" disabled>Select a category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Title */}
          <div>
            <label style={labelStyle}>JOB TITLE</label>
            <input style={inputStyle} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Fix leaking pipe" />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>DESCRIPTION</label>
            <textarea
              rows={4}
              style={{ ...inputStyle, resize: 'none' }}
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Describe the job in detail..."
            />
          </div>

          {/* Date + Budget */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>ESTIMATED DATE</label>
              <input type="date" style={inputStyle} value={form.estimatedDate} onChange={e => setForm(p => ({ ...p, estimatedDate: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>MAX BUDGET</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select value={form.budgetCurrency} onChange={e => setForm(p => ({ ...p, budgetCurrency: e.target.value }))} style={{ ...inputStyle, width: '80px' }}>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                </select>
                <input type="number" style={inputStyle} value={form.budgetMax} onChange={e => setForm(p => ({ ...p, budgetMax: e.target.value }))} placeholder="500" />
              </div>
            </div>
          </div>

          {/* Photos */}
          <div>
            <label style={labelStyle}>PHOTOS</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {existingMedia.map((m, i) => (
                <div key={m.id} style={{ position: 'relative' }}>
                  <img src={m.url} alt="" style={{ width: '72px', height: '72px', borderRadius: '8px', objectFit: 'cover' }} />
                  <span onClick={() => setExistingMedia(prev => prev.filter((_, j) => j !== i))}
                    style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', borderRadius: '50%', background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✕</span>
                </div>
              ))}
              {Array.from(photos).map((file, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img src={URL.createObjectURL(file)} alt="" style={{ width: '72px', height: '72px', borderRadius: '8px', objectFit: 'cover' }} />
                  <span onClick={() => setPhotos(prev => prev.filter((_, j) => j !== i))}
                    style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', borderRadius: '50%', background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✕</span>
                </div>
              ))}
              <label style={{ width: '72px', height: '72px', borderRadius: '8px', border: '2px dashed #d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: '4px' }}>
                <FiCamera style={{ color: '#9ca3af', fontSize: '18px' }} />
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>Add</span>
                <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => {
                  const combined = [...photos, ...Array.from(e.target.files)];
                  if (combined.length + existingMedia.length > 5) {
                    setPhotoError('Maximum 5 photos allowed.');
                  } else {
                    setPhotoError('');
                    setPhotos(combined);
                  }
                }} />
              </label>
            </div>
            {photoError && <p style={{ fontSize: '12px', color: '#ef4444', margin: 0 }}>{photoError}</p>}
          </div>

          {/* Location */}
          <div>
            <label style={labelStyle}>LOCATION</label>
            {isLoaded ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Autocomplete onLoad={ac => setAutocomplete(ac)} onPlaceChanged={onPlaceChanged}>
                  <input placeholder="Search address..." style={inputStyle} />
                </Autocomplete>
                <input style={inputStyle} value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="Full address" />
                <button onClick={handleCurrentLocation} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer', width: 'fit-content' }}>
                  <IoMdNavigate style={{ color: '#FF7E00' }} /> Use My Current Location
                </button>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '200px', borderRadius: '12px' }}
                  center={mapCenter}
                  zoom={13}
                  onClick={onMapClick}
                >
                  {markerPosition && <Marker position={markerPosition} />}
                </GoogleMap>
              </div>
            ) : <div>Loading map...</div>}
          </div>

        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button onClick={onClose} disabled={saving} style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '13px', borderRadius: '12px', border: 'none', background: '#FF7E00', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  );
}