import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiSend, FiPaperclip, FiSmile, FiMoreVertical, FiCalendar, FiMessageCircle } from 'react-icons/fi';
import { io } from 'socket.io-client';
import api, { getAccessToken } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

let socket = null;

function EmptyChatState() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8f9fb', fontFamily: 'Work Sans, sans-serif', minHeight: '100vh', gap: '12px' }}>
      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FiMessageCircle style={{ fontSize: '28px', color: '#9ca3af' }} />
      </div>
      <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#9ca3af', letterSpacing: '0.06em', margin: 0 }}>
        SELECT A CHAT TO DISPLAY
      </p>
    </div>
  );
}

function SkeletonConversationList() {
  return (
    <>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '12px', padding: '14px 12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e5e7eb', flexShrink: 0, animation: 'pulse 1.5s infinite' }} />
          <div style={{ flex: 1 }}>
            <div style={{ width: '70%', height: '13px', borderRadius: '4px', background: '#e5e7eb', marginBottom: '6px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '50%', height: '11px', borderRadius: '4px', background: '#e5e7eb', marginBottom: '6px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '85%', height: '12px', borderRadius: '4px', background: '#e5e7eb', animation: 'pulse 1.5s infinite' }} />
          </div>
        </div>
      ))}
    </>
  );
}

function ChatWindow({ convo, currentUserId }) {
  const router = useRouter()
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const { user } = useAuth();
  const role = (user?.user?.role || user?.role)?.toLowerCase();
  const otherParty = role === 'customer' ? convo.tradesperson : convo.customer;
  const otherPartyName = role === 'customer' ? (otherParty?.businessName || otherParty?.name) : otherParty?.name;
  const otherPartyAvatar = otherParty?.avatar;
  const isCompleted = convo.job?.status === 'COMPLETED';

  useEffect(() => {
    if (!convo) return;

    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_API_URL, {
        auth: { token: getAccessToken() },
      });
    }

    socket.emit('joinConversation', convo.id);

    socket.on('messages', (msgs) => {
      setMessages(msgs);
    });

    socket.on('newMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.emit('markRead', convo.id);

    return () => {
      socket.off('messages');
      socket.off('newMessage');
    };
  }, [convo]);

  const send = () => {
    if (!input.trim() || !socket) return;
    socket.emit('sendMessage', {
      conversationId: convo.id,
      content: input,
      type: 'TEXT',
    });
    setInput('');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8f9fb', fontFamily: 'Work Sans, sans-serif', height: "88vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

      {/* Header */}
      <div style={{ background: '#fff', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {otherPartyAvatar ? (
            <img src={otherPartyAvatar} alt={otherPartyName} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a' }}>
              {otherPartyName?.[0] || '?'}
            </div>
          )}
          <div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a', margin: 0 }}>{otherPartyName || 'Customer'}</p>
            <p style={{ fontSize: '11px', color: '#FF7E00', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✓ {convo.job?.title}
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
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', scrollbarWidth: 'none' }}>
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div key={msg.id} style={{ display: 'flex', flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: '10px' }}>
              {!isMe && (
                otherPartyAvatar ? (
                  <img src={otherPartyAvatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#0d1b2a', flexShrink: 0 }}>
                    {otherPartyName?.[0] || '?'}
                  </div>
                )
              )}
              {isMe && (
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0d1b2a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>ME</span>
                </div>
              )}
              <div style={{ maxWidth: '65%' }}>
                <div style={{
                  padding: '12px 16px', borderRadius: isMe ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                  background: isMe ? '#0d1b2a' : '#fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}>
                  <p style={{ fontSize: '14px', color: isMe ? '#fff' : '#374151', margin: 0, lineHeight: 1.6 }}>{msg.content}</p>
                </div>
                <p style={{ fontSize: '10px', color: '#9ca3af', margin: '4px 4px 0', textAlign: isMe ? 'right' : 'left' }}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {isCompleted ? (
          <div style={{ background: '#fff', borderTop: '1px solid #f0f0f0', padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 12px' }}>This job has been completed. Conversation is closed.</p>
            {role === 'customer' && (
              <button onClick={() => router.push(`/customer/dashboard/jobs-posted`)} style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: '#FF7E00', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                Leave a Review
              </button>
            )}
          </div>
        ) : (
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
        )}
    </div>
  );
}

export default function MessageComponent({ onSelect }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const role = (user?.user?.role || user?.role)?.toLowerCase();

  useEffect(() => {
    api.get('/chat/conversations').then(({ data }) => {
      setConversations(data);
    }).finally(() => setLoading(false));
  }, []);

  const handleSelect = (c) => {
    setSelected(c);
    onSelect?.(c);
  };

  const filteredConversations = conversations.filter((c) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    const jobTitle = c.job?.title?.toLowerCase() || '';
    const otherPartyName = c.customer?.name?.toLowerCase() || '';
    return jobTitle.includes(query) || otherPartyName.includes(query);
  });

  return (
    <div style={{ display: 'flex', flex: 1, fontFamily: 'Work Sans, sans-serif' }}>

      <div style={{ width: '300px', flexShrink: 0, background: '#f0f2f7', maxHeight:"200vh", display: 'flex', flexDirection: 'column' }}>

        {/* Fixed header area */}
        <div style={{ padding: '28px 16px 16px' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '24px', color: '#0d1b2a', margin: '0 0 20px' }}>Messages</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', borderRadius: '12px', padding: '11px 16px' }}>
            <FiSearch style={{ color: '#9ca3af', fontSize: '16px', flexShrink: 0 }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Work Sans, sans-serif', fontSize: '14px', color: '#374151', width: '100%' }}
            />
          </div>
        </div>

        {/* Scrollable list area */}
        <div style={{ flex: '1 1 0', minHeight: 0, overflowY: 'scroll', padding: '0 16px 16px' }}>
          {loading ? (
            <SkeletonConversationList />
          ) : filteredConversations.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#9ca3af', textAlign: 'center', marginTop: '20px' }}>No conversations found.</p>
          ) : (
            filteredConversations.map((c) => {
              const isActive = selected?.id === c.id;
              const lastMsg = c.messages?.[0];
              const otherParty = role === 'customer' ? c.tradesperson : c.customer;
              const otherPartyName = role === 'customer' ? (otherParty?.businessName || otherParty?.name) : otherParty?.name;
              const otherPartyAvatar = otherParty?.avatar;

              return (
                <div key={c.id} onClick={() => handleSelect(c)} style={{ display: 'flex', gap: '12px', padding: '14px 12px', borderRadius: '14px', background: isActive ? '#fff' : 'transparent', borderLeft: isActive ? '3px solid #FF7E00' : '3px solid transparent', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    {otherPartyAvatar ? (
                      <img src={otherPartyAvatar} alt={otherPartyName} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#0d1b2a' }}>
                        {otherPartyName?.[0] || '?'}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0d1b2a' }}>{otherPartyName || 'Customer'}</span>
                      <span style={{ fontSize: '11px', color: '#9ca3af', flexShrink: 0 }}>
                        {lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#FF7E00', margin: '0 0 4px' }}>{c.job?.title}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lastMsg?.content || 'No messages yet'}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Chat window */}
      {selected ? <ChatWindow convo={selected} currentUserId={user?.userId} /> : <EmptyChatState />}
    </div>
  );
}


