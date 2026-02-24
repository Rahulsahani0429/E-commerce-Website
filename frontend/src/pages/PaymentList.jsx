import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config';
import AdminLayout from '../components/AdminLayout';
import { useSocket } from '../context/SocketContext';
import './AdminOrders.css'; 

const PaymentList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    
    // Modal states
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRefundModal, setShowRefundModal] = useState(false);
    const [showSendModal, setShowSendModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    
    // Form states
    const [editData, setEditData] = useState({ status: '', notes: '' });

    const { user } = useAuth();
    const navigate = useNavigate();
    const socket = useSocket();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get(`${API_BASE_URL}/api/orders`, config);
                setOrders(data);
                if (data.length > 0 && !selectedPayment) setSelectedPayment(data[0]);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        if (user?.isAdmin) {
            fetchPayments();
        } else if (user) {
            navigate('/');
        }

        if (socket) {
            socket.on('paymentUpdated', (updatedPayment) => {
                setOrders(prev => prev.map(p => p._id === updatedPayment._id ? updatedPayment : p));
                setSelectedPayment(prev => prev?._id === updatedPayment._id ? updatedPayment : prev);
            });

            socket.on('paymentDeleted', (deletedId) => {
                setOrders(prev => prev.filter(p => p._id !== deletedId));
                setSelectedPayment(prev => prev?._id === deletedId ? null : prev);
            });

            return () => {
                socket.off('paymentUpdated');
                socket.off('paymentDeleted');
            };
        }
    }, [user, navigate, socket]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = () => setOpenDropdownId(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleActionClick = (e, id) => {
        e.stopPropagation();
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleViewDetails = (payment) => {
        setSelectedPayment(payment);
        setOpenDropdownId(null);
    };

    const handleEditClick = (payment) => {
        setEditData({ status: payment.paymentStatus || 'PENDING', notes: payment.paymentNotes || '' });
        setSelectedPayment(payment);
        setShowEditModal(true);
        setOpenDropdownId(null);
    };

    const handleUpdatePayment = async (e) => {
        e.preventDefault();
        try {
            setActionLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.put(`${API_BASE_URL}/api/admin/payments/${selectedPayment._id}`, editData, config);
            toast.success('Payment updated successfully');
            setShowEditModal(false);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDownloadReceipt = async (payment) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
                responseType: 'blob'
            };
            const { data } = await axios.get(`${API_BASE_URL}/api/admin/payments/${payment._id}/receipt`, config);
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Receipt-${payment._id.substring(payment._id.length - 6).toUpperCase()}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            toast.error('Failed to download receipt');
        }
    };

    const handleSendReceipt = async () => {
        try {
            setActionLoading(true);
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`${API_BASE_URL}/api/admin/payments/${selectedPayment._id}/send-receipt`, {}, config);
            toast.success('Receipt sent successfully');
            setShowSendModal(false);
        } catch (err) {
            toast.error('Failed to send receipt');
        } finally {
            setActionLoading(false);
        }
    };

    const handleRefund = async () => {
        try {
            setActionLoading(true);
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`${API_BASE_URL}/api/admin/payments/${selectedPayment._id}/refund`, {}, config);
            toast.success('Refund processed');
            setShowRefundModal(false);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Refund failed');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeletePayment = async () => {
        try {
            setActionLoading(true);
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`${API_BASE_URL}/api/admin/payments/${selectedPayment._id}`, config);
            toast.success('Payment deleted');
            setShowDeleteModal(false);
        } catch (err) {
            toast.error('Delete failed');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return <AdminLayout pageTitle="Payments"><div className="loader-container">...</div></AdminLayout>;

    return (
        <AdminLayout pageTitle="Payments">
            <div className="orders-dashboard">
                <div className="table-header-filters">
                    <div className="filter-group">
                        <select className="filter-select">
                            <option>All transactions</option>
                            <option>Paid</option>
                            <option>Pending</option>
                        </select>
                        <select className="filter-select">
                            <option>Last 30 days</option>
                        </select>
                    </div>
                    <select className="filter-select">
                        <option>Sort by Amount</option>
                    </select>
                </div>

                <div className={`orders-master-detail ${selectedPayment ? 'has-selection' : ''}`}>
                    <div className="master-pane">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}><div className="custom-cb"></div></th>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((payment) => (
                                    <tr
                                        key={payment._id}
                                        className={`${selectedPayment?._id === payment._id ? 'selected' : ''} ${openDropdownId === payment._id ? 'row-active' : ''}`}
                                        onClick={() => setSelectedPayment(payment)}
                                    >
                                        <td><div className="custom-cb"></div></td>
                                        <td className="order-id-cell">#TXN{payment._id.substring(payment._id.length - 6).toUpperCase()}</td>
                                        <td>
                                            <div className="customer-cell-flex">
                                                <img src={payment.user?.avatar || `https://i.pravatar.cc/150?u=${payment.user?.email}`} alt="" className="customer-avatar-rect" />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: 600 }}>{payment.user?.name || 'Guest'}</span>
                                                    {payment.receiptSent && <span className="receipt-sent-label">Receipt Sent</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge-flat badge-${(payment.paymentStatus || 'PENDING').toLowerCase()}`}>
                                                {payment.paymentStatus || 'PENDING'}
                                            </span>
                                        </td>
                                        <td>${payment.totalPrice.toFixed(2)}</td>
                                        <td style={{ color: '#9a9fa5' }}>{new Date(payment.createdAt).toLocaleDateString()}</td>
                                        <td className="actions-cell">
                                            <div className="dropdown-container">
                                                <button 
                                                    className="three-dots-btn" 
                                                    onClick={(e) => handleActionClick(e, payment._id)}
                                                >
                                                    •••
                                                </button>
                                                {openDropdownId === payment._id && (
                                                    <div className="action-dropdown" onClick={(e) => e.stopPropagation()}>
                                                        <div className="dropdown-item" onClick={() => handleViewDetails(payment)}>
                                                            <span className="icon">👁️</span> View Details
                                                        </div>
                                                        <div className="dropdown-item" onClick={() => handleEditClick(payment)}>
                                                            <span className="icon">✏️</span> Edit Payment
                                                        </div>
                                                        <div className="dropdown-item" onClick={() => handleDownloadReceipt(payment)}>
                                                            <span className="icon">📥</span> Download Receipt
                                                        </div>
                                                        <div className={`dropdown-item ${payment.receiptSent ? 'disabled' : ''}`} onClick={() => { setSelectedPayment(payment); setShowSendModal(true); setOpenDropdownId(null); }}>
                                                            <span className="icon">📧</span> Send Receipt
                                                        </div>
                                                        <div className={`dropdown-item ${payment.paymentStatus === 'Refunded' ? 'disabled' : ''}`} onClick={() => { setSelectedPayment(payment); setShowRefundModal(true); setOpenDropdownId(null); }}>
                                                            <span className="icon">🔄</span> Issue Refund
                                                        </div>
                                                        <div className="dropdown-item delete" onClick={() => { setSelectedPayment(payment); setShowDeleteModal(true); setOpenDropdownId(null); }}>
                                                            <span className="icon">🗑️</span> Delete Payment
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedPayment && (
                        <aside className="detail-pane">
                            <div className="detail-header-refined">
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Transaction Info</h2>
                                <button className="close-btn" onClick={() => setSelectedPayment(null)}>✕</button>
                            </div>
                            <div className="detail-body-refined">
                                <div className="profile-section-centered">
                                    <img src={selectedPayment.user?.avatar || `https://i.pravatar.cc/150?u=${selectedPayment.user?.email}`} alt="" className="profile-avatar-lg" />
                                    <span className="profile-name-lg">{selectedPayment.user?.name}</span>
                                    <span style={{ color: '#6f767e', fontSize: '0.85rem' }}>Method: Credit Card (Stripe)</span>
                                </div>

                                <div className="items-section">
                                    <span className="section-title-sm">Payment Details</span>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <div className="total-summary-row" style={{ marginBottom: '0.5rem' }}>
                                            <span className="total-label-sm">Subtotal</span>
                                            <span style={{ fontWeight: 700 }}>${selectedPayment.itemsPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="total-summary-row" style={{ marginBottom: '0.5rem' }}>
                                            <span className="total-label-sm">Tax</span>
                                            <span style={{ fontWeight: 700 }}>${selectedPayment.taxPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-footer-refined">
                                <div className="total-summary-row">
                                    <span className="total-label-sm">Total Paid</span>
                                    <span className="total-value-lg">${selectedPayment.totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="footer-actions-grid">
                                    <button className="btn-black">Download Receipt</button>
                                    <button className="btn-yellow">Issue Refund</button>
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Edit Payment</h2>
                            <button className="close-btn" onClick={() => setShowEditModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleUpdatePayment}>
                            <div className="form-group">
                                <label>Transaction Status</label>
                                <select 
                                    value={editData.status} 
                                    onChange={(e) => setEditData({...editData, status: e.target.value})}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="SUCCESS">Success</option>
                                    <option value="FAILED">Failed</option>
                                    <option value="REFUNDED">Refunded</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Internal Notes</label>
                                <textarea 
                                    className="form-control"
                                    value={editData.notes}
                                    onChange={(e) => setEditData({...editData, notes: e.target.value})}
                                    placeholder="Add payment notes..."
                                    rows="4"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary" disabled={actionLoading}>
                                    {actionLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Refund Modal */}
            {showRefundModal && (
                <div className="modal-overlay">
                    <div className="modal-content modal-delete">
                        <div className="modal-icon-warning">🔄</div>
                        <h2>Issue Refund?</h2>
                        <p>Are you sure you want to refund this payment of <strong>${selectedPayment?.totalPrice.toFixed(2)}</strong>?</p>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setShowRefundModal(false)}>Cancel</button>
                            <button className="btn-danger" onClick={handleRefund} disabled={actionLoading}>
                                {actionLoading ? 'Processing...' : 'Confirm Refund'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

             {/* Send Receipt Modal */}
             {showSendModal && (
                <div className="modal-overlay">
                    <div className="modal-content modal-delete">
                        <div className="modal-icon-warning">📧</div>
                        <h2>Send Receipt?</h2>
                        <p>Send digital receipt to <strong>{selectedPayment?.user?.email}</strong>?</p>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setShowSendModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleSendReceipt} disabled={actionLoading}>
                                {actionLoading ? 'Sending...' : 'Send Now'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content modal-delete">
                        <div className="modal-icon-warning">⚠️</div>
                        <h2>Delete Payment?</h2>
                        <p>This action cannot be undone. Remove this record permanently?</p>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="btn-danger" onClick={handleDeletePayment} disabled={actionLoading}>
                                {actionLoading ? 'Deleting...' : 'Confirm Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default PaymentList;
