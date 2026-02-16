import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    const deliverHandler = async (orderId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.put(`${API_BASE_URL}/api/orders/${orderId}/deliver`, {}, config);
            fetchOrders();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container alert alert-danger">{error}</div>;

    return (
        <div className="container admin-order-list">
            <h1>All Orders</h1>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        <span className="badge badge-success">{order.paidAt.substring(0, 10)}</span>
                                    ) : (
                                        <span className="badge badge-danger">Not Paid</span>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        <span className="badge badge-success">{order.deliveredAt.substring(0, 10)}</span>
                                    ) : (
                                        <span className="badge badge-danger">Not Delivered</span>
                                    )}
                                </td>
                                <td>
                                    <div className="actions">
                                        {!order.isDelivered && order.isPaid && (
                                            <button 
                                                className="deliver-btn"
                                                onClick={() => deliverHandler(order._id)}
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                        <button className="details-btn">Details</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .admin-order-list { padding: 4rem 2rem; }
                .admin-order-list h1 { margin-bottom: 2.5rem; font-size: 2rem; }
                .table-responsive { overflow-x: auto; background: var(--bg-card); border-radius: 1rem; box-shadow: var(--shadow); }
                table { width: 100%; border-collapse: collapse; text-align: left; }
                th, td { padding: 1.25rem; border-bottom: 1px solid var(--border); }
                th { background: rgba(0,0,0,0.02); font-weight: 700; color: var(--primary); font-size: 0.9rem; text-transform: uppercase; }
                tr:hover { background: rgba(0,0,0,0.01); }
                .badge { padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.8rem; font-weight: 600; }
                .badge-success { background: #dcfce7; color: #15803d; }
                .badge-danger { background: #fee2e2; color: #b91c1c; }
                .actions { display: flex; gap: 1rem; }
                .deliver-btn { background: var(--accent); color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 0.25rem; cursor: pointer; font-size: 0.8rem; }
                .details-btn { background: none; border: 1px solid var(--border); padding: 0.4rem 0.8rem; border-radius: 0.25rem; cursor: pointer; font-size: 0.8rem; }

                @media (max-width: 768px) {
                    .admin-order-list { padding: 2rem 1rem; }
                    .admin-order-list h1 { font-size: 1.5rem; margin-bottom: 1.5rem; }
                    th, td { padding: 1rem 0.75rem; font-size: 0.85rem; }
                }
            `}</style>
        </div>
    );
};

export default OrderList;
