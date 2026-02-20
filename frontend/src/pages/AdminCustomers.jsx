import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';
import AdminLayout from '../components/AdminLayout';
import './AdminCustomers.css';

const AdminCustomers = () => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCustomers = useCallback(async (isInitial = false) => {
        try {
            if (isInitial) setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data: response } = await axios.get(`${API_BASE_URL}/api/admin/customers`, config);
            setData(response);
            setError('');
        } catch (err) {
            console.error('Error fetching customers:', err);
            if (isInitial) setError(err.response?.data?.message || 'Failed to fetch customers');
        } finally {
            if (isInitial) setLoading(false);
        }
    }, [user.token]);

    useEffect(() => {
        if (user && user.isAdmin) {
            fetchCustomers(true);

            const interval = setInterval(() => {
                fetchCustomers();
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [user, fetchCustomers]);

    const filteredCustomers = data?.customers?.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <AdminLayout pageTitle="Customers"><div className="loader-container">Loading...</div></AdminLayout>;
    if (error) return <AdminLayout pageTitle="Customers"><div className="error-container">{error}</div></AdminLayout>;
    if (!data) return <AdminLayout pageTitle="Customers">No data available</AdminLayout>;

    return (
        <AdminLayout pageTitle="Customers" pageSubtitle="Manage all registered users">
            <div className="customers-container">
                {/* Header Section */}
                <div className="customers-header">
                    <div className="header-left">
                        <h1>Customers</h1>
                        <p>Total {data.summary.totalCustomers} registered users</p>
                    </div>
                    <div className="header-right">
                        <div className="search-wrapper">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                        <button className="btn-add-customer">
                            <span>+</span> Add Customer
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="customers-summary-grid">
                    <div className="customer-stat-card">
                        <div className="stat-icon-box stat-blue">👥</div>
                        <div className="stat-content">
                            <p>Total Customers</p>
                            <h3>{data.summary.totalCustomers}</h3>
                            <span className="growth-pill positive">+12% this month</span>
                        </div>
                    </div>
                    <div className="customer-stat-card">
                        <div className="stat-icon-box stat-green">✅</div>
                        <div className="stat-content">
                            <p>Active Users</p>
                            <h3>{data.summary.activeUsers}</h3>
                            <span className="growth-pill positive">+5% this month</span>
                        </div>
                    </div>
                    <div className="customer-stat-card">
                        <div className="stat-icon-box stat-red">🚫</div>
                        <div className="stat-content">
                            <p>Blocked Users</p>
                            <h3>{data.summary.blockedUsers}</h3>
                            <span className="growth-pill">0% this month</span>
                        </div>
                    </div>
                    <div className="customer-stat-card">
                        <div className="stat-icon-box stat-purple">✨</div>
                        <div className="stat-content">
                            <p>New This Month</p>
                            <h3>{data.summary.newThisMonth}</h3>
                            <span className="growth-pill positive">+8% this month</span>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="customers-table-wrapper">
                    <div className="table-responsive">
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Phone</th>
                                    <th>Orders</th>
                                    <th>Total Spent</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer._id}>
                                        <td>
                                            <div className="user-info-cell">
                                                <img
                                                    src={customer.avatar || `https://i.pravatar.cc/150?u=${customer.email}`}
                                                    alt={customer.name}
                                                    className="user-avatar-small"
                                                />
                                                <div className="user-details">
                                                    <span className="user-name">{customer.name}</span>
                                                    <span className="user-email">{customer.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{customer.phone || '—'}</td>
                                        <td>{customer.totalOrders}</td>
                                        <td>${customer.totalSpent.toFixed(2)}</td>
                                        <td>
                                            <span className={`role-badge ${customer.isAdmin ? 'role-admin' : 'role-client'}`}>
                                                {customer.isAdmin ? 'Admin' : 'Client'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${customer.status === 'Blocked' ? 'status-blocked' : 'status-active'}`}>
                                                {customer.status === 'Blocked' ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon btn-edit" title="Edit">✏️</button>
                                                <button className="btn-icon btn-delete" title="Delete">🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminCustomers;
