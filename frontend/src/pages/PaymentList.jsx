import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import AdminLayout from '../components/AdminLayout';
import './AdminOrders.css'; // Reuse the same modern styles

const PaymentList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get(`${API_BASE_URL}/api/orders`, config);
                // For demonstration, we show orders as "Payments/Transactions"
                setOrders(data);
                if (data.length > 0) setSelectedPayment(data[0]);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        if (user?.isAdmin) fetchPayments();
        else navigate('/login');
    }, [user, navigate]);

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
                                        className={selectedPayment?._id === payment._id ? 'selected' : ''}
                                        onClick={() => setSelectedPayment(payment)}
                                    >
                                        <td><div className="custom-cb"></div></td>
                                        <td className="order-id-cell">#TXN{payment._id.substring(payment._id.length - 6).toUpperCase()}</td>
                                        <td>
                                            <div className="customer-cell-flex">
                                                <img src={payment.user?.avatar || `https://i.pravatar.cc/150?u=${payment.user?.email}`} alt="" className="customer-avatar-rect" />
                                                <span>{payment.user?.name || 'Guest'}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge-flat ${payment.isPaid ? 'badge-completed' : 'badge-paid'}`}>
                                                {payment.isPaid ? 'Success' : 'Pending'}
                                            </span>
                                        </td>
                                        <td>${payment.totalPrice.toFixed(2)}</td>
                                        <td style={{ color: '#9a9fa5' }}>{new Date(payment.createdAt).toLocaleDateString()}</td>
                                        <td><button className="square-icon-btn" style={{ border: 'none', background: 'none' }}>•••</button></td>
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
        </AdminLayout>
    );
};

export default PaymentList;
