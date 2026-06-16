import { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiChevronDown, FiEdit2, FiCamera, FiMap } from 'react-icons/fi';
import { FaTools } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdNavigate } from 'react-icons/io';
import api from '@/lib/api';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const libraries = ['places'];

const steps = ['Service', 'Details', 'Schedule', 'Confirm'];

const services = [
    'Plumbing', 'Electrical', 'Carpentry', 'Landscaping',
    'Roofing', 'Painting', 'Kitchen Fitting', 'Boiler Repair',
];

export default function PostJobWizard() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [service, setService] = useState('');
    const [categories, SetCategories] = useState([]);
    const [photos, setPhotos] = useState([])
    const [title,setTitle] = useState("")
    const [desc, setDesc] = useState("");
    const [photoError, setPhotoError] = useState('');
    const [estimatedDate, setEstimatedDate] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [county, setCounty] = useState('');
    const [postcode, setPostcode] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [mapCenter, setMapCenter] = useState({ lat: 51.5074, lng: -0.1278 });
    const [markerPosition, setMarkerPosition] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const currencies = [
        { code: 'GBP', symbol: '£', label: 'British Pound' },
        { code: 'EUR', symbol: '€', label: 'Euro (Ireland)' },
    ];

    const [budget, setBudget] = useState('');
    const [currency, setCurrency] = useState('GBP');

    const next = () => setCurrentStep(s => Math.min(steps.length - 1, s + 1));
    const back = () => setCurrentStep(s => Math.max(0, s - 1));

    const fillAddressFields = (place) => {
        const components = place.address_components;
        const get = (type) => components?.find(c => c.types.includes(type))?.long_name || '';
        setStreetAddress(`${get('street_number')} ${get('route')}`.trim());
        setCity(get('locality') || get('postal_town'));
        setCounty(get('administrative_area_level_2') || get('administrative_area_level_1'));
        setPostcode(get('postal_code'));
    };

    const onPlaceChanged = () => {
        if (!autocomplete) return;
        const place = autocomplete.getPlace();
        if (!place.geometry) return;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMapCenter({ lat, lng });
        setMarkerPosition({ lat, lng });
        fillAddressFields(place);
    };

    const onMapClick = async (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setMarkerPosition({ lat, lng });
        setMapCenter({ lat, lng });

        // reverse geocode
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results[0]) {
                fillAddressFields(results[0]);
            }
        });
    };

    const handleCurrentLocation = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            setMarkerPosition({ lat, lng });
            setMapCenter({ lat, lng });

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    fillAddressFields(results[0]);
                }
            });
        });
    };
    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const fullAddress = `${streetAddress}, ${city}, ${county}, ${postcode}`;
            const selectedCategory = categories.find(c => c.name === service);

            let mediaUrls = [];
            if (photos.length > 0) {
                mediaUrls = await Promise.all(
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
            }

            await api.post('/jobs', {
                title: title,
                description: desc,
                address: fullAddress,
                lat: markerPosition?.lat || 51.5074,
                lng: markerPosition?.lng || -0.1278,
                categoryIds: [selectedCategory.id],
                estimatedDate: estimatedDate || undefined,
                mediaUrls,
                budgetMax: budget ? parseFloat(budget) : undefined,
                budgetCurrency: currency,
            });

            toast.success('Job posted successfully!');
            router.push('/customer/dashboard/jobs-posted');
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Failed to post job');
        } finally {
            setSubmitting(false);
        }
    };
    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await api.get("/categories");
            console.log(data)
            SetCategories(data);
        }
        fetchCategories();
    }, [])
    if (!isLoaded) return <div>Loading map...</div>;
    return (
        <>
            <div style={{ minHeight: '100vh', background: '#f0f2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Work Sans, sans-serif' }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

                <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '700px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>

                    {/* Back button */}
                    {currentStep > 0 && (
                        <button onClick={back} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FF7E00', border: 'none', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 700, color: '#fff', cursor: 'pointer', marginBottom: '20px' }}>
                            <FiArrowLeft style={{ fontSize: '12px' }} /> BACK
                        </button>
                    )}

                    {/* Step content */}
                    {currentStep === 0 && (
                        <div>
                            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '36px', color: '#0D1C32', margin: '0 0 4px', lineHeight: "40px", letterSpacing: "-0.9px" }}>Let's get started.</h2>
                            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '26px', color: '#D06600', margin: '0 0 12px' }}>What do you need help with?</h3>
                            <p style={{ fontSize: '13px', color: '#515F78', margin: '0 0 24px', lineHeight: 1.6 }}>
                                Provide a few details to help us find the right professional for your trade service.
                            </p>

                            <label style={{ fontSize: '11px', fontWeight: 700, color: '#0D1C32', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>WHAT SERVICE DO YOU NEED?</label>
                            <div style={{ position: 'relative', marginBottom: '6px' }}>
                                <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                                    <FaTools style={{ color: '#FF7E00', fontSize: '14px' }} />
                                </div>
                                <select
                                    value={service}
                                    onChange={e => setService(e.target.value)}
                                    style={{ width: '100%', padding: '13px 40px 13px 40px', borderRadius: '12px', border: 'none', background: '#eef0f8', fontFamily: 'Work Sans, sans-serif', fontSize: '14px', color: service ? '#0d1b2a' : '#9ca3af', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                                >
                                    <option value="" disabled>Search for a service...</option>
                                    {categories.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                </select>
                                <FiChevronDown style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '16px', pointerEvents: 'none' }} />
                            </div>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 24px', fontStyle: 'italic' }}>e.g., Boiler repair, light fitting, or floor installation</p>

                            <label style={{ fontSize: '11px', fontWeight: 700, color: '#0D1C32', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>WHEN DO YOU NEED IT?</label>
                            <div style={{ position: 'relative', marginBottom: '6px', width: 'fit-content' }}>
                                {/* <CiClock1 style={{ position: 'absolute', top: '39%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '14px', ml }} /> */}
                                <input type="date" value={estimatedDate} onChange={(e) => setEstimatedDate(e.target.value)} style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: 'none', background: '#eef0f8', fontFamily: 'Work Sans, sans-serif', fontSize: '14px', color: '#374151', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' }} />
                            </div>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 32px', fontStyle: "italic" }}>Date and Time are subjected to be changed depending upon quote progress.</p>

                            <label style={{ fontSize: '11px', fontWeight: 700, color: '#0D1C32', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>WHAT IS YOUR BUDGET?</label>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    style={{ padding: '13px 12px', borderRadius: '12px', border: 'none', background: '#eef0f8', fontFamily: 'Work Sans, sans-serif', fontSize: '14px', color: '#374151', outline: 'none', cursor: 'pointer' }}
                                >
                                    {currencies.map((c) => (
                                        <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    placeholder="e.g. 1000"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    style={{ flex: 1, padding: '13px 16px', borderRadius: '12px', border: 'none', background: '#eef0f8', fontFamily: 'Work Sans, sans-serif', fontSize: '14px', color: '#374151', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 32px', fontStyle: 'italic' }}>Please enter the maximum budget you can allocate to the job.</p>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div style={{ minHeight: '220px' }}>
                            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '36px', color: '#0D1C32', margin: '0 0 8px', lineHeight: "40px", letterSpacing: "-0.9px" }}>
                                Describe your <span style={{ color: '#FF7E00' }}>Project?</span>
                            </h2>
                            <p style={{ fontSize: '13px', color: '#515F78', margin: '0 0 24px', lineHeight: 1.6 }}>
                                Provide as much detail to help professionals give you an accurate quote.
                            </p>

                            <label style={{ fontFamily: "Manrope", fontSize: '14px', fontWeight: 700, color: '#0B1A30', letterSpacing: '0.08em', display: 'block', marginBottom: '8px', lineHeight: "20px" }}>JOB TITLE</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type='text'
                                    placeholder="e.g. Kitchen Pipe Repairing"
                                    style={{ flex: 1, padding: '13px 16px', borderRadius: '12px', border: 'none', background: '#eef0f8', fontFamily: 'Work Sans, sans-serif', fontSize: '14px', color: '#374151', outline: 'none', boxSizing: 'border-box', marginBottom:"10px" }}
                                    onChange={e => setTitle(e.target.value)}
                                    value={title}
                                />
                            </div>
                            <label style={{ fontFamily: "Manrope", fontSize: '14px', fontWeight: 700, color: '#0B1A30', letterSpacing: '0.08em', display: 'block', marginBottom: '8px', lineHeight: "20px" }}>JOB DESCRIPTION</label>
                            <div style={{ position: 'relative' }}>
                                <textarea
                                    maxLength={1000}
                                    placeholder="e.g. I need a qualified plumber to install a new bathroom suite, including a bath, shower, and toilet. All materials provided..."
                                    rows={7}
                                    style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: '#eef0f8', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', color: '#374151', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                                    onChange={e => setDesc(e.target.value)}
                                    value={desc}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                                    <span style={{ fontSize: '11px', color: '#FF7E00', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        ⓘ Detailed descriptions get 3x more quotes.
                                    </span>
                                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{desc.length} / 1000 characters</span>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', }}>
                                <div style={{ marginTop: '20px', marginBottom: '32px' }}>
                                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>ADD PHOTOS</label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', borderRadius: '12px', background: '#eef0f8', cursor: 'pointer', border: '2px dashed #d1d5db' }}>
                                        <span style={{ fontSize: '20px' }}>📷</span>
                                        <div>
                                            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#0d1b2a', margin: '0 0 2px' }}>Upload Photos</p>
                                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>Click to browse or drag and drop images here</p>
                                        </div>
                                        <input type="file" accept="image/*" multiple className="hidden" onChange={e => {
                                            const combined = [...photos, ...e.target.files];
                                            if (combined.length > 5) {
                                                setPhotoError('Maximum 5 photos allowed.');
                                            } else {
                                                setPhotoError('');
                                                setPhotos(combined);
                                            }
                                        }} />
                                    </label>
                                    {photoError && <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px' }}>{photoError}</p>}
                                    {photos.length > 0 && (
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                                            {Array.from(photos).map((file, i) => (
                                                <div key={i} style={{ position: 'relative' }}>
                                                    <img src={URL.createObjectURL(file)} alt="" style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', display: 'block' }} />
                                                    <span onClick={() => {
                                                        setPhotos(prev => prev.filter((_, j) => j !== i));
                                                        setPhotoError('');
                                                    }} style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', borderRadius: '50%', background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✕</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div style={{ minHeight: '220px' }}>
                            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '36px', color: '#0d1b2a', margin: '0 0 8px', lineHeight: "45px" }}>
                                Where is the job <span style={{ color: '#FF7E00' }}>located?</span>
                            </h2>
                            <p style={{ fontSize: '13px', color: '#515F78', margin: '0 0 24px', lineHeight: 1.6 }}>
                                Provide the exact site address so our tradespeople can calculate travel time and local permit requirements.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                {/* Left — form */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {/* Autocomplete */}
                                    <div>
                                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Search Address</label>
                                        <Autocomplete
                                            onLoad={ac => setAutocomplete(ac)}
                                            onPlaceChanged={onPlaceChanged}
                                        >
                                            <input
                                                placeholder="Start typing an address..."
                                                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: 'none', background: '#eef0f8', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', color: '#374151', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                        </Autocomplete>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Street Address</label>
                                        <input value={streetAddress} onChange={e => setStreetAddress(e.target.value)} placeholder="e.g., 42 Blueprint Way" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: 'none', background: '#eef0f8', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', color: '#374151', outline: 'none', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>City</label>
                                        <input value={city} onChange={e => setCity(e.target.value)} placeholder="London" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: 'none', background: '#eef0f8', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', color: '#374151', outline: 'none', boxSizing: 'border-box' }} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>State/County</label>
                                            <input value={county} onChange={e => setCounty(e.target.value)} placeholder="Greater London" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: 'none', background: '#eef0f8', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', color: '#374151', outline: 'none', boxSizing: 'border-box' }} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Postcode</label>
                                            <input value={postcode} onChange={e => setPostcode(e.target.value)} placeholder="SW1A 1AA" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: 'none', background: '#eef0f8', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', color: '#374151', outline: 'none', boxSizing: 'border-box' }} />
                                        </div>
                                    </div>

                                    {/* Current location button */}
                                    <button
                                        onClick={handleCurrentLocation}
                                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}
                                    >
                                        <IoMdNavigate style={{ color: '#FF7E00' }} /> Use My Current Location
                                    </button>
                                </div>

                                {/* Right — real map */}
                                <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', minHeight: '320px' }}>
                                    <GoogleMap
                                        mapContainerStyle={{ width: '100%', height: '100%', minHeight: '320px' }}
                                        center={mapCenter}
                                        zoom={13}
                                        onClick={onMapClick}
                                        onLoad={map => setMapInstance(map)}
                                    >
                                        {markerPosition && <Marker position={markerPosition} />}
                                    </GoogleMap>

                                    {/* Selected site label */}
                                    {streetAddress && (
                                        <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(255,255,255,0.95)', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0d1b2a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <IoMdNavigate style={{ color: '#fff', fontSize: '14px' }} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', margin: '0 0 2px', letterSpacing: '0.08em' }}>SELECTED SITE</p>
                                                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#0d1b2a', margin: 0 }}>{city} {postcode}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div style={{ minHeight: '220px', paddingBottom: "20px" }}>
                            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '36px', color: '#0d1b2a', margin: '0 0 6px', lineHeight: "40px" }}>
                                Review Your <span style={{ color: '#FF7E00' }}>Job</span>
                            </h2>
                            <p style={{ fontSize: '13px', color: '#515F78', margin: '0 0 24px' }}>Final look before sending the foreman</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.8fr', gap: '16px' }}>

                                {/* Left */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                                    {/* Job Summary */}
                                    <div style={{ background: '#eef0f8', borderRadius: '14px', padding: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#55637D', letterSpacing: '0.08em', background: "#fff", padding: "2px 4px", borderRadius: "10px" }}>JOB SUMMARY</span>
                                            <FiEdit2 style={{ fontSize: '13px', color: '#9ca3af', cursor: 'pointer' }} />
                                        </div>
                                        <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '20px', color: '#0D1C32', margin: '0 0 4px', lineHeight: "32px" }}>{service || 'Plumbing and Drainage Services'}</p>
                                    </div>

                                    {/* Description */}
                                    <div style={{ background: '#eef0f8', borderRadius: '14px', padding: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#55637D', letterSpacing: '0.08em', background: "#fff", padding: "2px 4px", borderRadius: "10px" }}>DETAILED DESCRIPTION</span>
                                            <FiEdit2 style={{ fontSize: '13px', color: '#9ca3af', cursor: 'pointer' }} />
                                        </div>
                                        <p style={{ fontSize: '13px', color: '#374151', margin: 0, lineHeight: 1.7 }}>
                                            {desc || 'There is a significant leak originating from the main riser in the ground floor utility closet. Water is starting to pool and seep into the adjacent hallway flooring. Need immediate professional intervention to shut off the supply correctly and replace the fractured copper piping section. The leak occurred suddenly this morning.'}
                                        </p>
                                    </div>

                                    {/* Photos */}
                                    <div style={{ background: '#eef0f8', borderRadius: '14px', padding: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#55637D', letterSpacing: '0.08em', background: "#fff", padding: "2px 4px", borderRadius: "10px" }}>VISUAL DOCUMENTATION</span>
                                            <FiCamera style={{ fontSize: '13px', color: '#9ca3af', cursor: 'pointer' }} />
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {Array.from(photos).map((file, i) => (
                                                <img key={i} src={URL.createObjectURL(file)} alt="" style={{ width: '100px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                                            ))}
                                            <div style={{ width: '100px', height: '80px', borderRadius: '8px', border: '2px dashed #d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: '4px' }}>
                                                <span style={{ fontSize: '20px', color: '#9ca3af' }}>+</span>
                                                <span style={{ fontSize: '10px', color: '#9ca3af' }}>Add More</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                                    {/* Location */}
                                    <div style={{ background: '#eef0f8', borderRadius: '14px', padding: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#55637D', letterSpacing: '0.08em', background: "#fff", padding: "2px 4px", borderRadius: "10px" }}>LOCATION</span>
                                            <FiMap style={{ fontSize: '13px', color: '#9ca3af' }} />
                                        </div>
                                        <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0d1b2a', margin: '0 0 2px' }}>{city}, {postcode}</p>
                                        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 10px' }}>{streetAddress}</p>
                                        <div style={{ borderRadius: '10px', overflow: 'hidden', height: '110px', position: 'relative' }}>
                                            {isLoaded && markerPosition ? (
                                                <GoogleMap
                                                    mapContainerStyle={{ width: '100%', height: '110px' }}
                                                    center={markerPosition}
                                                    zoom={15}
                                                    options={{ disableDefaultUI: true, gestureHandling: 'none', zoomControl: false }}
                                                >
                                                    <Marker position={markerPosition} />
                                                </GoogleMap>
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', background: '#5a9ea0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <FaMapMarkerAlt style={{ fontSize: '48px', color: '#e53e3e', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Ready to post */}
                                    <div style={{ background: '#0d1b2a', borderRadius: '14px', padding: '18px' }}>
                                        <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#fff', margin: '0 0 8px' }}>Ready to post?</p>
                                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0 0 16px', lineHeight: 1.6 }}>
                                            Once submitted, local verified professionals will be notified and can start providing quotes immediately.
                                        </p>
                                        <button onClick={handleSubmit} disabled={submitting} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: '#FF7E00', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                            {submitting ? 'Posting...' : 'Submit Job Post'}<FiArrowRight />
                                        </button>
                                        <button onClick={back} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                            <FiArrowLeft /> Back to Location
                                        </button>
                                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '12px 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            🔒 Your data is secured with architectural-grade encryption.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    {/* Continue button */}
                    <button
                        onClick={currentStep === steps.length - 1 ? handleSubmit : next}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '12px', border: 'none', background: '#FF7E00', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}
                    >
                        {currentStep === steps.length - 1 ? 'Post Job' : 'Continue'} <FiArrowRight />
                    </button>
                </div>
            </div>
        </>
    );
}