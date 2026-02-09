import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get('http://localhost:5000/api/auth', config);
            setUsers(data);
            setLoading(false);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser && currentUser.isAdmin) {
            fetchUsers();
        } else {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                };
                await axios.delete(`http://localhost:5000/api/auth/${id}`, config);
                fetchUsers();
            } catch (error) {
                alert(error.response?.data?.message || error.message);
            }
        }
    };

    const toggleAdminHandler = async (userToUpdate) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser.token}`,
                },
            };
            await axios.put(
                `http://localhost:5000/api/auth/${userToUpdate._id}`,
                { ...userToUpdate, isAdmin: !userToUpdate.isAdmin },
                config
            );
            fetchUsers();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container alert alert-danger">{error}</div>;

    return (
        <div className="container admin-user-list">
            <h1>Users Management</h1>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>
                                    {user.isAdmin ? (
                                        <span className="badge badge-success">Yes</span>
                                    ) : (
                                        <span className="badge badge-danger">No</span>
                                    )}
                                </td>
                                <td>
                                    <div className="actions">
                                        <button 
                                            className="toggle-btn"
                                            onClick={() => toggleAdminHandler(user)}
                                        >
                                            Toggle Admin
                                        </button>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => deleteHandler(user._id)}
                                            disabled={user._id === currentUser._id}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .admin-user-list { padding: 4rem 2rem; }
                .admin-user-list h1 { margin-bottom: 2.5rem; font-size: 2rem; }
                .table-responsive { overflow-x: auto; background: var(--bg-card); border-radius: 1rem; box-shadow: var(--shadow); }
                table { width: 100%; border-collapse: collapse; text-align: left; }
                th, td { padding: 1.25rem; border-bottom: 1px solid var(--border); }
                th { background: rgba(0,0,0,0.02); font-weight: 700; color: var(--primary); font-size: 0.9rem; text-transform: uppercase; }
                tr:hover { background: rgba(0,0,0,0.01); }
                .badge { padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.8rem; font-weight: 600; }
                .badge-success { background: #dcfce7; color: #15803d; }
                .badge-danger { background: #fee2e2; color: #b91c1c; }
                .actions { display: flex; gap: 1rem; }
                .toggle-btn { background: none; border: none; color: #2563eb; font-weight: 600; cursor: pointer; }
                .delete-btn { background: none; border: none; color: #dc2626; font-weight: 600; cursor: pointer; }
                .delete-btn:disabled { color: var(--border); cursor: not-allowed; }

                @media (max-width: 768px) {
                    .admin-user-list { padding: 2rem 1rem; }
                    .admin-user-list h1 { font-size: 1.5rem; margin-bottom: 1.5rem; }
                    th, td { padding: 1rem 0.75rem; font-size: 0.85rem; }
                }
            `}</style>
        </div>
    );
};

export default UserList;
