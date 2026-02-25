import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import { connectSocket, disconnectSocket } from '../utils/socket';
import api from '../utils/api.js';
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
    const [showCompose, setShowCompose] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);
    const [form, setForm] = useState({ title: '', message: '', type: 'system', recipientId: '' });

    const fetchNotifications = useCallback(async (isReset = false, currentPage = page) => {
        try {
            if (isReset) {
                setLoading(true);
            }
            
            const { data } = await api.get("/notifications/admin", {
                params: { status: filter, page: currentPage, limit: 10 }
            });

            if (isReset) {
                setNotifications(data.notifications);
            } else {
                setNotifications(prev => {
                    const newNotifs = data.notifications.filter(
                        newNotif => !prev.some(oldNotif => oldNotif._id === newNotif._id)
                    );
                    return [...prev, ...newNotifs];
                });
            }

            setUnreadCount(data.unreadCount);
            setHasMore(data.hasMore);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            if (error.response?.status === 401) {
                // If token is invalid, log out
                // logout(); // Only if we are sure
            }
        } finally {
            setLoading(false);
        }
    }, [user.token, filter, page]);

    // Initial load and filter change
    useEffect(() => {
        setPage(1);
        fetchNotifications(true, 1);
    }, [filter]);

    // Page change logic
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchNotifications(false, nextPage);
    };

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
            await api.patch(`/notifications/${id}/read`, {});
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await api.patch("/notifications/read-all", {});
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            await api.post("/notifications/send", {
                title: form.title,
                message: form.message,
                type: form.type,
                recipientId: form.recipientId.trim() || null,
            });
            setSendSuccess(true);
            setForm({ title: '', message: '', type: 'system', recipientId: '' });
            setTimeout(() => { setSendSuccess(false); setShowCompose(false); }, 2000);
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification: ' + (error.response?.data?.message || error.message));
        } finally {
            setSending(false);
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
                        <div style={{ display:'flex', gap:'0.5rem' }}>
                            <button className="btn-mark-all" onClick={markAllAsRead}>Mark all read</button>
                            <button
                                onClick={() => setShowCompose(v => !v)}
                                style={{ padding:'0.45rem 1rem', borderRadius:'6px', background: showCompose ? '#e0e7ff' : '#4338ca', color: showCompose ? '#4338ca' : '#fff', fontWeight:700, border:'none', cursor:'pointer', fontSize:'0.85rem' }}
                            >
                                {showCompose ? '✕ Close' : '✉️ Send Notification'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Compose Panel */}
                {showCompose && (
                    <form onSubmit={handleSend} style={{ background:'#f8faff', border:'1px solid #c7d7fe', borderRadius:'12px', padding:'1.25rem 1.5rem', marginBottom:'1.25rem', display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                        <h3 style={{ margin:0, fontSize:'1rem', color:'#3730a3', fontWeight:700 }}>📣 Send Notification to Users</h3>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                            <div style={{ display:'flex', flexDirection:'column', gap:'0.3rem' }}>
                                <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#374151' }}>Title *</label>
                                <input
                                    required
                                    placeholder="e.g. Flash Sale Live!"
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    style={{ padding:'0.5rem 0.75rem', borderRadius:'6px', border:'1px solid #c7d7fe', fontSize:'0.9rem', outline:'none' }}
                                />
                            </div>
                            <div style={{ display:'flex', flexDirection:'column', gap:'0.3rem' }}>
                                <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#374151' }}>Type</label>
                                <select
                                    value={form.type}
                                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                                    style={{ padding:'0.5rem 0.75rem', borderRadius:'6px', border:'1px solid #c7d7fe', fontSize:'0.9rem', background:'#fff' }}
                                >
                                    <option value="system">🔔 System</option>
                                    <option value="order">📦 Order</option>
                                    <option value="payment">💰 Payment</option>
                                    <option value="stock">📉 Stock</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:'0.3rem' }}>
                            <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#374151' }}>Message *</label>
                            <textarea
                                required
                                rows={3}
                                placeholder="Notification message..."
                                value={form.message}
                                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                style={{ padding:'0.5rem 0.75rem', borderRadius:'6px', border:'1px solid #c7d7fe', fontSize:'0.9rem', resize:'vertical', outline:'none' }}
                            />
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:'0.3rem' }}>
                            <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#374151' }}>User ID <span style={{color:'#6b7280',fontWeight:400}}>(leave blank to broadcast to ALL users)</span></label>
                            <input
                                placeholder="MongoDB ObjectId of specific user (optional)"
                                value={form.recipientId}
                                onChange={e => setForm(f => ({ ...f, recipientId: e.target.value }))}
                                style={{ padding:'0.5rem 0.75rem', borderRadius:'6px', border:'1px solid #c7d7fe', fontSize:'0.9rem', outline:'none' }}
                            />
                        </div>
                        <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
                            <button
                                type="submit"
                                disabled={sending || sendSuccess}
                                style={{ padding:'0.55rem 1.5rem', borderRadius:'6px', background: sendSuccess ? '#16a34a' : '#4338ca', color:'#fff', fontWeight:700, border:'none', cursor:'pointer', fontSize:'0.9rem', transition:'all 0.2s' }}
                            >
                                {sending ? 'Sending...' : sendSuccess ? '✓ Sent!' : 'Send Now'}
                            </button>
                            {sendSuccess && <span style={{ color:'#16a34a', fontSize:'0.85rem', fontWeight:600 }}>Notification delivered to users ✓</span>}
                        </div>
                    </form>
                )}

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
                    <button className="btn-load-more" onClick={handleLoadMore}>
                        Load More
                    </button>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminNotifications;
