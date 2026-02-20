import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import AdminLayout from '../components/AdminLayout';
import './AdminOrders.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

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

  const toggleOrderSelection = (id) => {
    if (selectedOrderIds.includes(id)) {
      setSelectedOrderIds(selectedOrderIds.filter(item => item !== id));
    } else {
      setSelectedOrderIds([...selectedOrderIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedOrderIds.length === filteredOrders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(filteredOrders.map(o => o._id));
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(`${API_BASE_URL}/api/orders/${orderId}/${status}`, {}, config);
      fetchOrders();
      // Update selected order in view
      if (selectedOrder?._id === orderId) {
        const { data } = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, config);
        setSelectedOrder(data);
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Paid') return order.isPaid;
    if (filterStatus === 'Unpaid') return !order.isPaid;
    if (filterStatus === 'Delivered') return order.isDelivered;
    if (filterStatus === 'Cancelled') return order.isCancelled;
    return true;
  });


  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Status', 'Payment', 'Total', 'Date'];
    const csvData = filteredOrders.map(order => [
      order._id,
      order.user?.name || 'Guest',
      order.user?.email || 'N/A',
      getOrderStatusBadge(order).label,
      order.isPaid ? 'Paid' : 'Unpaid',
      order.totalPrice.toFixed(2),
      new Date(order.createdAt).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePaymentChange = async (orderId, newPaymentStatus) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.patch(`${API_BASE_URL}/api/orders/v1/admin/orders/${orderId}/payment`, { paymentStatus: newPaymentStatus }, config);
      fetchOrders();
      if (selectedOrder?._id === orderId) {
        const { data } = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, config);
        setSelectedOrder(data);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update payment status');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.patch(`${API_BASE_URL}/api/orders/v1/admin/orders/${orderId}/status`, { status: newStatus }, config);
      fetchOrders();
      if (selectedOrder?._id === orderId) {
        const { data } = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, config);
        setSelectedOrder(data);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  const getOrderStatusBadge = (order) => {
    const status = order.orderStatus || 'Order Placed';
    if (status === 'Delivered') return { label: 'Delivered', class: 'badge-completed' };
    if (status === 'Shipped') return { label: 'Shipped', class: 'badge-delivered' };
    if (status === 'Processing') return { label: 'Processing', class: 'badge-paid' };
    return { label: 'Order Placed', class: 'badge-paid' };
  };

  const getPaymentStatusBadge = (order) => {
    const status = order.paymentStatus || (order.isPaid ? 'PAID' : 'NOT_PAID');
    if (status === 'PAID') return { label: 'Paid', class: 'badge-completed' };
    return { label: 'Not Paid', class: 'badge-delivered' }; // badge-delivered is orange/red in this CSS
  };

  const printInvoice = () => {
    window.print();
  };

  if (loading) return <AdminLayout><div className="loader-container"><div className="loader"></div></div></AdminLayout>;

  return (
    <AdminLayout pageTitle="Orders">
      <div className="orders-dashboard">
        {/* Filters Header */}
        <div className="table-header-filters">
          <div className="filter-group">
            <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">Any status</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
            <select className="filter-select">
              <option>$100-$1500</option>
            </select>
          </div>
          <select className="filter-select">
            <option>Sort by Date</option>
          </select>
        </div>

        <div className={`orders-master-detail ${selectedOrder ? 'has-selection' : ''}`}>
          <div className="master-pane">
            <table className="orders-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><div className="custom-cb"></div></th>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Order Status</th>
                  <th>Payment</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const oBadge = getOrderStatusBadge(order);
                  const pBadge = getPaymentStatusBadge(order);
                  const isSelected = selectedOrder?._id === order._id;
                  const orderStatuses = ["Order Placed", "Processing", "Shipped", "Delivered"];
                  const paymentStatuses = ["NOT_PAID", "PAID"];

                  return (
                    <tr
                      key={order._id}
                      className={isSelected ? 'selected' : ''}
                      onClick={() => handleSelectOrder(order)}
                    >
                      <td>
                        <input
                          type="checkbox"
                          className="custom-cb"
                          checked={selectedOrderIds.includes(order._id)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleOrderSelection(order._id)}
                        />
                      </td>
                      <td className="order-id-cell">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                      <td>
                        <div className="customer-cell-flex">
                          <img src={order.user?.avatar || `https://i.pravatar.cc/150?u=${order.user?.email}`} alt="" className="customer-avatar-rect" />
                          <span>{order.user?.name || 'Guest'}</span>
                        </div>
                      </td>
                      <td>
                        <select
                          className={`status-badge-flat ${oBadge.class}`}
                          style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                          value={order.orderStatus || "Order Placed"}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          {orderStatuses.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className={`status-badge-flat ${pBadge.class}`}
                          style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                          value={order.paymentStatus || (order.isPaid ? 'PAID' : 'NOT_PAID')}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handlePaymentChange(order._id, e.target.value)}
                        >
                          <option value="NOT_PAID">Not Paid</option>
                          <option value="PAID">Paid</option>
                        </select>
                      </td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td style={{ color: '#9a9fa5' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                      <td><button className="square-icon-btn" style={{ border: 'none', background: 'none' }}>•••</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Right Detail Panel */}
          {selectedOrder && (
            <aside className="detail-pane">
              <div className="detail-header-refined">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Order #{selectedOrder._id.substring(selectedOrder._id.length - 6).toUpperCase()}</h2>
                  <span className={`status-badge-flat ${getOrderStatusBadge(selectedOrder).class}`} style={{ padding: '0.2rem 0.5rem' }}>
                    {getOrderStatusBadge(selectedOrder).label}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#9a9fa5' }}>
                    {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {new Date(selectedOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </span>
                </div>
                <button className="close-btn" onClick={() => setSelectedOrder(null)}>✕</button>
              </div>

              <div className="detail-body-refined">
                <div className="profile-section-centered">
                  <img src={selectedOrder.user?.avatar || `https://i.pravatar.cc/150?u=${selectedOrder.user?.email}`} alt="" className="profile-avatar-lg" />
                  <span className="profile-name-lg">{selectedOrder.user?.name}</span>
                  <div className="contact-button-group">
                    <button className="contact-btn-circle" title="View Profile">✉️</button>
                    <button className="contact-btn-circle" title="Call Customer">📞</button>
                    <button className="contact-btn-circle" title="WhatsApp Message">💬</button>
                  </div>
                </div>

                <div className="items-section">
                  <span className="section-title-sm">Order items</span>
                  <div className="order-items-refined">
                    {selectedOrder.orderItems.map((item, idx) => (
                      <div key={idx} className="item-row-rect">
                        <img src={item.image} alt="" className="item-img-box" />
                        <div className="item-info-flex">
                          <span className="item-name-tiny">{item.name}</span>
                          <span className="item-price-tiny">${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="detail-footer-refined">
                <div className="total-summary-row">
                  <span className="total-label-sm">Total</span>
                  <span className="total-value-lg">${selectedOrder.totalPrice.toFixed(2)}</span>
                </div>
                <div className="footer-actions-grid">
                  <button className="btn-black" onClick={() => navigate(`/order/${selectedOrder._id}`)}>
                    Track
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </button>
                  <button className="btn-yellow" onClick={() => alert('Refund process initiated')}>
                    Refund
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderList;
