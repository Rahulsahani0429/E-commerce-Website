import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import AdminLayout from '../components/AdminLayout';
import './AdminTables.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${API_BASE_URL}/api/orders`, config);
      setOrders(data);
      if (data.length > 0 && !selectedOrder) {
        setSelectedOrder(data[0]);
      }
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchOrders();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const statusHandler = async (orderId, status) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(`${API_BASE_URL}/api/orders/${orderId}/${status}`, {}, config);
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  if (loading) return <AdminLayout><div className="loader-container"><div className="loader"></div></div></AdminLayout>;
  if (error) return <AdminLayout><div className="alert alert-danger">{error}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-page-title-row">
        <h1>Orders</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="icon-action-btn">📅 Filter</button>
          <button className="icon-action-btn">📤 Export</button>
        </div>
      </div>

      <div className="master-detail-wrapper">
        {/* Master Pane: Order List Table */}
        <div className="master-pane">
          <table className="profit-pulse-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}><input type="checkbox" /></th>
                <th>Order</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr 
                  key={order._id} 
                  className={selectedOrder?._id === order._id ? 'selected' : ''}
                  onClick={() => handleSelectOrder(order)}
                  style={{ cursor: 'pointer' }}
                >
                  <td><input type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
                  <td style={{ fontWeight: 600 }}>#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                  <td>
                    <div className="table-customer-cell">
                      <img 
                        src={order.user?.avatar || `https://i.pravatar.cc/150?u=${order.user?.email}`} 
                        alt="" 
                        className="table-avatar"
                      />
                      <span className="customer-name-meta">{order.user?.name || 'Guest'}</span>
                    </div>
                  </td>
                  <td>
                    {order.isPaid ? (
                      <span className="status-pill status-paid">Paid</span>
                    ) : order.isDelivered ? (
                      <span className="status-pill status-delivered">Delivered</span>
                    ) : order.isShipped ? (
                      <span className="status-pill status-shipped">Shipped</span>
                    ) : (
                      <span className="status-pill status-pending">Pending</span>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>${order.totalPrice.toFixed(2)}</td>
                  <td style={{ color: '#6b7280' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td><button className="icon-btn">•••</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Pane: Right Side Panel */}
        {selectedOrder && (
          <aside className="detail-pane">
            <div className="detail-header">
              <div>
                <span className="detail-order-number">Order #{selectedOrder._id.substring(selectedOrder._id.length - 6).toUpperCase()}</span>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span className={`status-pill ${selectedOrder.isPaid ? 'status-paid' : 'status-pending'}`}>
                    {selectedOrder.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {new Date(selectedOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              <button className="icon-btn" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <div className="detail-user-card">
              <img 
                src={selectedOrder.user?.avatar || `https://i.pravatar.cc/150?u=${selectedOrder.user?.email}`} 
                alt="" 
                className="detail-user-avatar" 
              />
              <span className="detail-user-name">{selectedOrder.user?.name}</span>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                <button className="icon-action-btn">✉️</button>
                <button className="icon-action-btn">📞</button>
                <button className="icon-action-btn">💬</button>
              </div>
            </div>

            <div className="order-items-list">
              <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Order items</h4>
              {selectedOrder.orderItems.map((item, idx) => (
                <div key={idx} className="order-item-row">
                  <img src={item.image} alt="" className="order-item-img" />
                  <div className="order-item-info">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-price">${item.price.toFixed(2)} x {item.qty}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="detail-footer-totals">
              <div className="total-row">
                <span>Total</span>
                <span>${selectedOrder.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="detail-actions">
              <button className="btn-pulse btn-pulse-dark">Track 👁️</button>
              <button className="btn-pulse btn-pulse-light">Refund ↩️</button>
            </div>
          </aside>
        )}
      </div>

      <style>{`
        .loader-container { min-height: 50vh; display: flex; align-items: center; justify-content: center; }
        .loader { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid var(--admin-primary); border-radius: 50% !important; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </AdminLayout>
  );
};

export default OrderList;
