"use client";
import { useState } from "react";
import { useSocket } from "@/context/SocketContext";
import api from "@/lib/api";
import { IoNotificationsOutline } from "react-icons/io5";

export default function NotificationPanel() {
  const { notifications, setNotifications } = useSocket();
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkRead = async (id) => {
    await api.patch(`/notifications/${id}/read`);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllRead = async () => {
    await api.patch('/notifications/read-all');
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
      >
        <IoNotificationsOutline size={22} color="#fff" />
        {unreadCount > 0 && (
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '18px', height: '18px', borderRadius: '50%', background: '#FF7E00', fontSize: '10px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <>
          {/* backdrop */}
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 998 }} />
          <div style={{ position: 'absolute', top: '54px', right: '0', width: '320px', background: '#fff', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', overflow: 'hidden', zIndex: 999 }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '15px', color: '#0d1b2a', margin: 0 }}>Notifications</p>
              {unreadCount > 0 && (
                <button onClick={handleMarkAllRead} style={{ fontSize: '12px', color: '#FF7E00', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer' }}>
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                <p style={{ padding: '24px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>No notifications yet</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleMarkRead(n.id)}
                    style={{ padding: '14px 20px', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', background: n.isRead ? '#fff' : '#FFF7F0', display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: n.isRead ? 'transparent' : '#FF7E00', marginTop: '6px', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13px', color: '#0d1b2a', margin: '0 0 2px' }}>{n.title}</p>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px', lineHeight: 1.5 }}>{n.body}</p>
                      <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>{new Date(n.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}