import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiSend, FiPaperclip, FiSmile, FiPhone, FiInfo } from 'react-icons/fi';
import { io } from 'socket.io-client';
import api from '@/lib/api';
import { getAccessToken } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

let socket = null;

function ChatWindow({ convo, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!convo) return;

    // connect socket if not connected
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_API_URL, {
        auth: { token: getAccessToken() },
      });
    }

    // join conversation room
    socket.emit('joinConversation', convo.id);

    // load initial messages
    socket.on('messages', (msgs) => {
      setMessages(msgs);
    });

    // receive new messages
    socket.on('newMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    // mark as read
    socket.emit('markRead', convo.id);

    return () => {
      socket.off('messages');
      socket.off('newMessage');
    };
  }, [convo]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f0f2f7', fontFamily: 'Work Sans, sans-serif', minHeight: '100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

      {/* Header */}
      <div style={{ background: '#f0f2f7', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#eef0f8', border: '2px solid #FF7E00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#0d1b2a' }}>
              {convo?.job?.title?.[0] || '?'}
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', border: '2px solid #f0f2f7' }} />
          </div>
          <div>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#0d1b2a' }}>{convo?.job?.title}</span>
            <p style={{ fontSize: '12px', color: '#FF7E00', margin: 0 }}>Conversation</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <FiPhone style={{ color: '#6b7280', fontSize: '18px', cursor: 'pointer' }} />
          <FiInfo style={{ color: '#6b7280', fontSize: '18px', cursor: 'pointer' }} />
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', scrollbarWidth: 'none' }}>
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div key={msg.id} style={{ display: 'flex', flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: '8px' }}>
              {!isMe && (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#0d1b2a', flexShrink: 0 }}>
                  {msg.sender?.role?.[0]}
                </div>
              )}
              <div style={{ maxWidth: '60%' }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: isMe ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
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
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/chat/conversations').then(({ data }) => {
      setConversations(data);
      setSelected(data[0] || null);
    });
  }, []);

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
            const isActive = selected?.id === c.id;
            const lastMsg = c.messages?.[0];
            return (
              <div key={c.id} onClick={() => { setSelected(c); onSelect?.(c); }}
                style={{ display: 'flex', gap: '12px', padding: '12px 10px', borderRadius: '14px', background: isActive ? '#fff' : 'transparent', borderLeft: isActive ? '3px solid #FF7E00' : '3px solid transparent', cursor: 'pointer', transition: 'background 0.15s', boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#eef0f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#0d1b2a', flexShrink: 0 }}>
                  {c.job?.title?.[0] || '?'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#0d1b2a' }}>{c.job?.title}</span>
                    <span style={{ fontSize: '10px', color: '#9ca3af', flexShrink: 0 }}>
                      {lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lastMsg?.content || 'No messages yet'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat window */}
      {selected && <ChatWindow convo={selected} currentUserId={user?.userId} />}
    </div>
  );
}