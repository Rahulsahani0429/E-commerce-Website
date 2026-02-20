import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';
import AdminLayout from '../components/AdminLayout';
import './AdminReports.css';

const AdminReports = () => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filter States
    const [range, setRange] = useState('30d');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const fetchReports = useCallback(async () => {
        try {
            setLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
                params: { range }
            };

            if (range === 'custom') {
                config.params.from = fromDate;
                config.params.to = toDate;
            }

            const { data: response } = await axios.get(`${API_BASE_URL}/api/admin/reports`, config);
            setData(response);
            setError('');
        } catch (err) {
            console.error('Error fetching reports:', err);
            setError(err.response?.data?.message || 'Failed to fetch report data');
        } finally {
            setLoading(false);
        }
    }, [user.token, range, fromDate, toDate]);

    useEffect(() => {
        if (user && user.isAdmin) {
            fetchReports();
        }
    }, [user, range]); // only auto-refetch on range change; custom triggers are manual

    const handleApplyCustomDate = () => {
        if (fromDate && toDate) fetchReports();
    };

    const exportToCSV = () => {
        if (!data?.table) return;

        const headers = ['Date', 'Orders', 'Revenue'];
        const rows = data.table.map(row => [row.date, row.orders, row.revenue]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `report_${range}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const COLORS = ['#4338ca', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    if (loading && !data) return <AdminLayout pageTitle="Reports"><div className="loader-container">Generating Reports...</div></AdminLayout>;
    if (error) return <AdminLayout pageTitle="Reports"><div className="error-container">{error}</div></AdminLayout>;

    return (
        <AdminLayout pageTitle="Reports" pageSubtitle="Financial and performance analytics">
            <div className="reports-container">

                {/* Header & Filters */}
                <div className="reports-header">
                    <div className="header-left">
                        <h1>Reports</h1>
                        <p>Analysis for {range === 'custom' ? `${fromDate} to ${toDate}` : range}</p>
                    </div>

                    <div className="reports-filters">
                        <div className="filter-group">
                            <span className="filter-label">Range:</span>
                            <select
                                className="select-filter"
                                value={range}
                                onChange={(e) => setRange(e.target.value)}
                            >
                                <option value="7d">Last 7 Days</option>
                                <option value="30d">Last 30 Days</option>
                                <option value="12m">Last 12 Months</option>
                                <option value="custom">Custom Range</option>
                            </select>
                        </div>

                        {range === 'custom' && (
                            <div className="filter-group">
                                <input type="date" className="date-input" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                                <span className="filter-label">to</span>
                                <input type="date" className="date-input" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                                <button className="btn-apply" onClick={handleApplyCustomDate}>Apply</button>
                            </div>
                        )}

                        <button className="btn-export" onClick={exportToCSV}>
                            📥 Export CSV
                        </button>
                    </div>
                </div>

                {data && (
                    <>
                        {/* KPI Grid */}
                        <div className="reports-kpi-grid">
                            <div className="kpi-card">
                                <div className="kpi-icon kpi-blue">💰</div>
                                <div className="kpi-info">
                                    <span className="kpi-label">Total Revenue</span>
                                    <span className="kpi-value">${data.kpis.totalRevenue.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-icon kpi-green">🛒</div>
                                <div className="kpi-info">
                                    <span className="kpi-label">Total Orders</span>
                                    <span className="kpi-value">{data.kpis.totalOrders}</span>
                                </div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-icon kpi-purple">👥</div>
                                <div className="kpi-info">
                                    <span className="kpi-label">New Customers</span>
                                    <span className="kpi-value">{data.kpis.newCustomers}</span>
                                </div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-icon kpi-orange">🔄</div>
                                <div className="kpi-info">
                                    <span className="kpi-label">Refunds</span>
                                    <span className="kpi-value">${data.kpis.refunds}</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Charts */}
                        <div className="charts-grid">
                            <div className="chart-item">
                                <div className="chart-header">
                                    <h3 className="chart-title">Revenue Trend</h3>
                                </div>
                                <div className="h-400">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data.charts.revenueTrend.labels.map((l, i) => ({ name: l, value: data.charts.revenueTrend.values[i] }))}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                            <Line type="monotone" dataKey="value" stroke="#4338ca" strokeWidth={3} dot={{ r: 4, fill: '#4338ca' }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="chart-item">
                                <div className="chart-header">
                                    <h3 className="chart-title">Order Status</h3>
                                </div>
                                <div className="h-400">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.charts.ordersByStatus}
                                                innerRadius={80}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="count"
                                                nameKey="status"
                                            >
                                                {data.charts.ordersByStatus.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend verticalAlign="bottom" height={36} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Charts */}
                        <div className="secondary-charts">
                            <div className="chart-item">
                                <div className="chart-header">
                                    <h3 className="chart-title">Payment Methods</h3>
                                </div>
                                <div className="h-300">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.charts.paymentMethods}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="count"
                                                nameKey="method"
                                            >
                                                {data.charts.paymentMethods.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="chart-item">
                                <div className="chart-header">
                                    <h3 className="chart-title">Top Selling Products</h3>
                                </div>
                                <div className="top-products-list">
                                    {data.charts.topProducts.map((prod, idx) => (
                                        <div className="product-rank-item" key={idx}>
                                            <span className="rank-number">{idx + 1}</span>
                                            <div className="product-info">
                                                <span className="product-name">{prod.name}</span>
                                                <span className="product-meta">{prod.soldQty} units sold</span>
                                            </div>
                                            <span className="product-revenue">${prod.revenue.toLocaleString()}</span>
                                        </div>
                                    ))}
                                    {data.charts.topProducts.length === 0 && <p className="text-center py-4">No product data</p>}
                                </div>
                            </div>
                        </div>

                        {/* Daily Report Table */}
                        <div className="reports-table-card">
                            <h3 className="table-title">Performance Summary</h3>
                            <div className="table-responsive">
                                <table className="custom-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Orders</th>
                                            <th>Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.table.map((row, idx) => (
                                            <tr key={idx}>
                                                <td>{row.date}</td>
                                                <td>{row.orders}</td>
                                                <td>${row.revenue.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminReports;
