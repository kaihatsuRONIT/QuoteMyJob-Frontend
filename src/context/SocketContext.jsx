"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import api, { getAccessToken } from "@/lib/api";
import toast from "react-hot-toast";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!user) return;

        // fetch existing unread notifications on login
        api.get('/notifications').then(({ data }) => {
            setNotifications(data);
            const unread = data.filter((n) => !n.isRead);
            if (unread.length > 0) {
                toast(`You have ${unread.length} unread notification${unread.length > 1 ? 's' : ''}`, {
                    icon: '🔔',
                    duration: 5000,
                    style: {
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 700,
                        background: '#0d1b2a',
                        color: '#fff',
                    },
                });
            }
        });

        const s = io(process.env.NEXT_PUBLIC_API_URL, {
            auth: { token: getAccessToken() },
        });

        s.on('connect', () => {
            s.emit('joinNotifications');
        });

        s.on('newNotification', (notification) => {
            setNotifications((prev) => [notification, ...prev]);
            toast(notification.title, {
                icon: '🔔',
                style: {
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 700,
                    background: '#0d1b2a',
                    color: '#fff',
                },
            });
        });

        setSocket(s);

        return () => s.disconnect();
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket, notifications, setNotifications }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);