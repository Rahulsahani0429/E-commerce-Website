import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';
import AdminLayout from '../components/AdminLayout';
import { connectSocket, disconnectSocket } from '../utils/socket';
import './AdminNotifications.css';

const AdminNotifications = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, unread, read
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const fetchNotifications = useCallback(async (reset = false) => {
        try {
            if (reset) setLoading(true);
            const { data } = await axios.get(`${API_BASE_URL}/api/notifications/admin`, {
                headers: { Authorization: `Bearer ${user.token}` },
                params: { status: filter, page: reset ? 1 : page, limit: 20 }
            });

            if (reset) {
                setNotifications(data.items);
                setPage(1);
            } else {
                setNotifications(prev => [...prev, ...data.items]);
            }

            setUnreadCount(data.unreadCount);
            setHasMore(data.total > (reset ? 1 : page) * 20);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    }, [user.token, filter, page]);

    useEffect(() => {
        fetchNotifications(true);
    }, [filter]);

    useEffect(() => {
        if (!user) return;

        const socket = connectSocket(user.token);

        socket.on("notification:new", (newNotif) => {
            // Prepend if filter matches or is "all"
            setNotifications(prev => {
                const alreadyExists = prev.some(n => n._id === newNotif._id);
                if (alreadyExists) return prev;

                if (filter === 'read') return prev;
                return [newNotif, ...prev];
            });
            setUnreadCount(prev => prev + 1);

            // Show browser notification if permitted
            if (Notification.permission === "granted") {
                new window.Notification(newNotif.title, { body: newNotif.message });
            }
        });

        return () => {
            disconnectSocket();
        };
    }, [user, filter]);

    const markAsRead = async (id, e) => {
        if (e) e.stopPropagation();
        try {
            await axios.patch(`${API_BASE_URL}/api/notifications/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.patch(`${API_BASE_URL}/api/notifications/read-all`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const handleNotifClick = (notif) => {
        if (!notif.isRead) markAsRead(notif._id);

        if (notif.type === 'order_created' || notif.type === 'order_status_changed' || notif.type === 'payment_updated') {
            navigate(`/admin/orders/${notif.meta.orderId}`);
        } else if (notif.type === 'low_stock') {
            navigate(`/admin/products/${notif.meta.productId}`);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'order_created': return <div className="notif-icon icon-order">📦</div>;
            case 'payment_updated': return <div className="notif-icon icon-payment">💵</div>;
            case 'order_status_changed': return <div className="notif-icon icon-status">⏳</div>;
            case 'low_stock': return <div className="notif-icon icon-stock">⚠️</div>;
            default: return <div className="notif-icon">🔔</div>;
        }
    };

    const formatTime = (date) => {
        const now = new Date();
        const past = new Date(date);
        const diffInMs = now - past;
        const diffInMin = Math.floor(diffInMs / 60000);

        if (diffInMin < 1) return 'Just now';
        if (diffInMin < 60) return `${diffInMin}m ago`;

        const diffInHours = Math.floor(diffInMin / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;

        return past.toLocaleDateString();
    };

    return (
        <AdminLayout pageTitle="Notifications" pageSubtitle="Real-time alerts and activity logs">
            <div className="notifications-container">
                <div className="notif-header">
                    <div className="notif-title-section">
                        <h1>Inbox</h1>
                        {unreadCount > 0 && <span className="unread-badge">{unreadCount} New</span>}
                    </div>
                    <div className="notif-actions">
                        <div className="notif-tabs">
                            <button className={`tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                            <button className={`tab-btn ${filter === 'unread' ? 'active' : ''}`} onClick={() => setFilter('unread')}>Unread</button>
                            <button className={`tab-btn ${filter === 'read' ? 'active' : ''}`} onClick={() => setFilter('read')}>Read</button>
                        </div>
                        <button className="btn-mark-all" onClick={markAllAsRead}>Mark all read</button>
                    </div>
                </div>

                <div className="notif-list">
                    {loading && notifications.length === 0 ? (
                        <div className="loader-container">Loading notifications...</div>
                    ) : notifications.length === 0 ? (
                        <div className="empty-state">
                            <span style={{ fontSize: '3rem' }}>📭</span>
                            <p>No notifications found</p>
                        </div>
                    ) : (
                        notifications.map((notif) => (
                            <div
                                key={notif._id}
                                className={`notif-item ${!notif.isRead ? 'unread' : ''}`}
                                onClick={() => handleNotifClick(notif)}
                            >
                                {!notif.isRead && <span className="unread-dot"></span>}
                                {getIcon(notif.type)}
                                <div className="notif-content">
                                    <h3 className="notif-title">{notif.title}</h3>
                                    <p className="notif-message">{notif.message}</p>
                                    <span className="notif-time">{formatTime(notif.createdAt)}</span>
                                </div>
                                {!notif.isRead && (
                                    <div className="item-actions">
                                        <button className="btn-read-toggle" onClick={(e) => markAsRead(notif._id, e)}>
                                            Mark read
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {hasMore && !loading && (
                    <button className="btn-load-more" onClick={() => setPage(p => p + 1)}>
                        Load More
                    </button>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminNotifications;
