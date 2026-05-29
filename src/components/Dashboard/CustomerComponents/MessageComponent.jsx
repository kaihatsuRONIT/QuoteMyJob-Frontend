import { useState } from 'react';
import { FiSearch, FiSend, FiPaperclip, FiSmile, FiPhone, FiInfo } from 'react-icons/fi';

const conversations = [
  {
    name: 'Alex Thompson',
    job: 'Kitchen Renovation',
    jobId: '#3921',
    message: "I've attached the quote for the custom cabinetry and layout...",
    time: '12:45 PM',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
    active: true,
    online: true,
    role: 'MASTER PLUMBER',
  },
  {
    name: 'Sarah Miller',
    job: 'Roof Leak Repair',
    jobId: '#3890',
    message: 'The shingles are ordered, should be arriving tomorrow.',
    time: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    active: false,
    online: false,
    role: 'ROOFER',
  },
  {
    name: 'James Wilson',
    job: 'Rewiring – Bedroom 1',
    jobId: '#3870',
    message: 'Great, see you at 8:00 AM on Tuesday then.',
    time: 'Mon',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&q=80',
    active: false,
    online: false,
    role: 'ELECTRICIAN',
  },
];

const initialMessages = [
  { id: 1, from: 'client', text: "Hello! I've had a chance to review the photos of your kitchen pipes. It looks like we'll need to reroute the main drain to accommodate the new sink location.", time: '10:15 AM' },
  { id: 2, from: 'me', text: "That makes sense. Will that add significant time to the project? I'm hoping to have the flooring guys in by next Thursday.", time: '10:22 AM' },
  { id: 3, from: 'client', text: "It shouldn't delay us. I've sketched a quick blueprint of the proposed rerouting. Have a look at this:", time: '10:45 AM' },
  { id: 4, from: 'client', type: 'image', image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&q=80', time: '10:45 AM' },
  { id: 5, from: 'me', text: "Looks good. Go ahead with that plan. I've just uploaded the photos of the cabinet samples as well.", time: '10:50 AM' },
  { id: 6, from: 'client', text: "Got them. Those cabinets will look great with the navy hardware. I've attached the final quote for this phase below.", time: '11:02 AM', isNew: true },
];

function ChatWindow({ convo }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const newIndex = messages.findIndex(m => m.isNew);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), from: 'me', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f0f2f7', fontFamily: 'Work Sans, sans-serif', minHeight: '100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

      {/* Header */}
      <div style={{ background: '#f0f2f7', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <img src={convo.avatar} alt={convo.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', display: 'block', border: '2px solid #FF7E00' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', border: '2px solid #f0f2f7' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a' }}>{convo.name}</span>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#6366f1', background: 'rgba(99,102,241,0.1)', borderRadius: '6px', padding: '2px 8px' }}>{convo.role}</span>
            </div>
            <p style={{ fontSize: '12px', color: '#FF7E00', margin: 0 }}>Project: {convo.job}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <FiPhone style={{ color: '#6b7280', fontSize: '18px', cursor: 'pointer' }} />
          <FiInfo style={{ color: '#6b7280', fontSize: '18px', cursor: 'pointer' }} />
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', scrollbarWidth: 'none' }}>

        {/* Date divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', background: '#e2e5ee', borderRadius: '999px', padding: '4px 14px' }}>OCTOBER 24, 2023</span>
        </div>

        {messages.map((msg, i) => (
          <div key={msg.id}>
            {/* New messages divider */}
            {msg.isNew && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF7E00', background: 'rgba(255,126,0,0.08)', borderRadius: '999px', padding: '4px 14px' }}>NEW MESSAGES</span>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: msg.from === 'me' ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: '8px' }}>
              {msg.from === 'client' && (
                <img src={convo.avatar} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div style={{ maxWidth: '60%' }}>
                {msg.type === 'image' ? (
                  <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={msg.image} alt="attachment" style={{ width: '220px', height: '150px', objectFit: 'cover', display: 'block' }} />
                  </div>
                ) : (
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: msg.from === 'me' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    background: msg.from === 'me' ? '#0d1b2a' : '#fff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }}>
                    <p style={{ fontSize: '14px', color: msg.from === 'me' ? '#fff' : '#374151', margin: 0, lineHeight: 1.6 }}>{msg.text}</p>
                  </div>
                )}
                <p style={{ fontSize: '10px', color: '#9ca3af', margin: '4px 4px 0', textAlign: msg.from === 'me' ? 'right' : 'left' }}>{msg.time}</p>
              </div>
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

export default function MessageComponent({ onSelect }) {
  const [selected, setSelected] = useState(conversations[0]);

  return (
    <div style={{ display: 'flex', flex: 1, fontFamily: 'Work Sans, sans-serif' }}>

      {/* Sidebar */}
      <div style={{ width: '300px', flexShrink: 0, background: '#f8f9fb', minHeight: '100vh', padding: '28px 16px', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', color: '#0d1b2a', margin: '0 0 16px' }}>Conversations</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#eef0f8', borderRadius: '12px', padding: '10px 14px', marginBottom: '20px' }}>
          <FiSearch style={{ color: '#9ca3af', fontSize: '15px', flexShrink: 0 }} />
          <input placeholder="Search discussions..." style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Work Sans, sans-serif', fontSize: '13px', color: '#374151', width: '100%' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {conversations.map((c) => {
            const isActive = selected?.name === c.name;
            return (
              <div key={c.name} onClick={() => { setSelected(c); onSelect?.(c); }}
                style={{ display: 'flex', gap: '12px', padding: '12px 10px', borderRadius: '14px', background: isActive ? '#fff' : 'transparent', borderLeft: isActive ? '3px solid #FF7E00' : '3px solid transparent', cursor: 'pointer', transition: 'background 0.15s', boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={c.avatar} alt={c.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                  {c.online && <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', border: '2px solid #f8f9fb' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#0d1b2a' }}>{c.name}</span>
                    <span style={{ fontSize: '10px', color: '#9ca3af', flexShrink: 0 }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#FF7E00', margin: '0 0 3px' }}>{c.job}</p>
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