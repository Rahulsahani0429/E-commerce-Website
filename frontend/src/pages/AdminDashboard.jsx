import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';
import AdminLayout from '../components/AdminLayout';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`${API_BASE_URL}/api/admin/dashboard`, config);
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard statistics');
        setLoading(false);
      }
    };

    if (user && user.isAdmin) {
      fetchStats();
    }
  }, [user]);

  if (loading) return <AdminLayout><div className="loader-container"><div className="loader"></div></div></AdminLayout>;
  if (error) return <AdminLayout><div className="error-container">{error}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-dashboard-container">
        <h1>Dashboard Overview</h1>
        
        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-icon icon-revenue">💰</div>
            <div className="stat-details">
              <h3>Total Revenue</h3>
              <div className="stat-value">${stats.totalRevenue.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon icon-orders">🛒</div>
            <div className="stat-details">
              <h3>Total Orders</h3>
              <div className="stat-value">{stats.totalOrders}</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon icon-products">📦</div>
            <div className="stat-details">
              <h3>Total Products</h3>
              <div className="stat-value">{stats.totalProducts}</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon icon-users">👥</div>
            <div className="stat-details">
              <h3>Total Users</h3>
              <div className="stat-value">{stats.totalUsers}</div>
            </div>
          </div>
        </div>

        <div className="recent-orders-section">
          <h2>Recent Orders</h2>
          <div className="table-wrapper">
            <table className="recent-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td data-label="Order ID">#{order._id.substring(order._id.length - 8).toUpperCase()}</td>
                    <td data-label="Customer">{order.user?.name || 'Guest'}</td>
                    <td data-label="Date">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td data-label="Total">${order.totalPrice.toFixed(2)}</td>
                    <td data-label="Status">
                      <span className={`status-badge ${order.isPaid ? 'status-paid' : 'status-unpaid'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                    <td data-label="Action">
                      <Link to={`/admin/orders`} className="view-btn">View All</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>{`
        .loader-container { min-height: 50vh; display: flex; align-items: center; justify-content: center; }
        .loader { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #2874f0; border-radius: 50% !important; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .error-container { color: #dc2626; padding: 2rem; background: #fef2f2; border-radius: 8px; font-weight: 600; }
      `}</style>
    </AdminLayout>
  );
};

export default AdminDashboard;
