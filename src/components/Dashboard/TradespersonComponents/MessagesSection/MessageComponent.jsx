import { useState } from 'react';
import { FiSearch, FiSend, FiPaperclip, FiSmile, FiMoreVertical, FiCalendar } from 'react-icons/fi';

const conversations = [
  {
    name: 'Sarah Miller',
    job: 'Full Kitchen Renovation',
    jobId: '#3921',
    message: 'The countertops look perfect! Whe...',
    time: '12:45 PM',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    active: true,
    online: true,
  },
  {
    name: 'James Wilson',
    job: 'Deck Structural Repair',
    jobId: '#3890',
    message: "I've attached the latest site photos...",
    time: 'YESTERDAY',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&q=80',
    active: false,
    online: false,
  },
  {
    name: 'Elena Rodriguez',
    job: 'Electrical Inspection',
    jobId: '#3870',
    message: 'Is Monday still okay for the walkthrough?',
    time: 'TUE',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
    active: false,
    online: false,
  },
];

const initialMessages = [
  { id: 1, from: 'client', text: 'Good morning! I just saw the progress photos you uploaded to the dashboard. The cabinet installation looks incredible. The navy blue finish is exactly what we wanted.', time: '10:15 AM' },
  { id: 2, from: 'me', text: "I'm glad you like them, Sarah! The grain alignment came out perfectly. We should have the brass hardware installed by Friday afternoon.", time: '10:22 AM', seen: true },
  { id: 3, from: 'me', type: 'image', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80', caption: 'HARDWARE_SAMPLE.JPG', time: '10:23 AM' },
  { id: 4, from: 'client', text: 'The countertops look perfect! When can we expect the marble slab for the island to arrive? My husband wants to make sure we\'re home for that.', time: '12:45 PM' },
];

function ChatWindow({ convo }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), from: 'me', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8f9fb', fontFamily: 'Work Sans, sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

      {/* Header */}
      <div style={{ background: '#fff', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={convo.avatar} alt={convo.name} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />
          <div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: 0 }}>{convo.name}</p>
            <p style={{ fontSize: '11px', color: '#FF7E00', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✓ Job {convo.jobId}: {convo.job}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '12px', color: '#0d1b2a', cursor: 'pointer' }}>
            <FiCalendar style={{ fontSize: '13px' }} /> Schedule Site Visit
          </button>
          <FiMoreVertical style={{ color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }} />
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', scrollbarWidth: 'none' }}>

        {/* Date divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', background: '#ebebf0', borderRadius: '999px', padding: '4px 14px' }}>TODAY</span>
        </div>

        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: msg.from === 'me' ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: '10px' }}>
            {msg.from === 'client' && (
              <img src={convo.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
            )}
            {msg.from === 'me' && (
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0d1b2a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>PF</span>
              </div>
            )}
            <div style={{ maxWidth: '65%' }}>
              {msg.type === 'image' ? (
                <div style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                  <img src={msg.image} alt={msg.caption} style={{ width: '200px', height: '140px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.5)', padding: '6px 10px' }}>
                    <span style={{ fontSize: '10px', color: '#fff', fontWeight: 600 }}>{msg.caption}</span>
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: '12px 16px', borderRadius: msg.from === 'me' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                  background: msg.from === 'me' ? '#0d1b2a' : '#fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}>
                  <p style={{ fontSize: '14px', color: msg.from === 'me' ? '#fff' : '#374151', margin: 0, lineHeight: 1.6 }}>{msg.text}</p>
                </div>
              )}
              <p style={{ fontSize: '10px', color: '#9ca3af', margin: '4px 4px 0', textAlign: msg.from === 'me' ? 'right' : 'left' }}>
                {msg.time}{msg.seen ? ' · Seen' : ''}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ background: '#fff', borderTop: '1px solid #f0f0f0', padding: '14px 20px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          style={{ width: '100%', border: 'none', outline: 'none', fontFamily: 'Work Sans, sans-serif', fontSize: '14px', color: '#374151', marginBottom: '10px', background: 'transparent' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <FiPaperclip style={{ color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }} />
            <FiSmile style={{ color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>ENTER TO SEND</span>
            <button onClick={send} style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#FF7E00', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiSend style={{ color: '#fff', fontSize: '15px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MessageComponent({ activeConvo, onSelect }) {
  const [selected, setSelected] = useState(conversations[0]);

  const handleSelect = (c) => {
    setSelected(c);
    onSelect?.(c);
  };

  return (
    <div style={{ display: 'flex', flex: 1, fontFamily: 'Work Sans, sans-serif' }}>

      {/* Sidebar */}
      <div style={{ width: '300px', flexShrink: 0, background: '#f0f2f7', minHeight: '100vh', padding: '28px 16px' }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '24px', color: '#0d1b2a', margin: '0 0 20px' }}>Messages</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', borderRadius: '12px', padding: '11px 16px', marginBottom: '20px' }}>
          <FiSearch style={{ color: '#9ca3af', fontSize: '16px', flexShrink: 0 }} />
          <input placeholder="Search conversations..." style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Work Sans, sans-serif', fontSize: '14px', color: '#374151', width: '100%' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {conversations.map((c) => {
            const isActive = selected?.name === c.name;
            return (
              <div key={c.name} onClick={() => handleSelect(c)} style={{ display: 'flex', gap: '12px', padding: '14px 12px', borderRadius: '14px', background: isActive ? '#fff' : 'transparent', borderLeft: isActive ? '3px solid #FF7E00' : '3px solid transparent', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={c.avatar} alt={c.name} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', display: 'block' }} />
                  {c.online && <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', border: '2px solid #f0f2f7' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0d1b2a' }}>{c.name}</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af', flexShrink: 0 }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#FF7E00', margin: '0 0 4px' }}>{c.job}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat window */}
      {selected && <ChatWindow convo={selected} />}
    </div>
  );
}