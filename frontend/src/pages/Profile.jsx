import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Profile = () => {
    const { user, updateUserInfo } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        setLoading(true);
        setMessage(null);
        setSuccess(false);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put(
                `${API_BASE_URL}/api/auth/profile`,
                { name, email, password },
                config
            );

            // Flatten data and update context/localStorage
            const userData = { ...data.user, token: data.token || user.token };
            updateUserInfo(userData);
            
            setSuccess(true);
            setLoading(false);
            setPassword(''); // Clear password fields after update
            setConfirmPassword('');
        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    return (
        <div className="container profile-page">
            <div className="profile-card">
                <h2>User Profile</h2>
                {message && <div className="alert alert-danger">{message}</div>}
                {success && <div className="alert alert-success">Profile Updated</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
                <div style={{marginTop: '2rem', textAlign: 'center'}}>
                    <Link to="/profile/orders" className="btn btn-light" style={{width: '100%'}}>My Orders</Link>
                </div>
            </div>
            <style>{`
                .profile-page { padding: 4rem 2rem; display: flex; flex-direction: column; align-items: center; }
                .profile-card {
                    background: var(--bg-card);
                    padding: 3rem;
                    border-radius: 1rem;
                    box-shadow: var(--shadow-lg);
                    width: 100%;
                    max-width: 500px;
                }
                .profile-card h2 { margin-bottom: 2rem; text-align: center; }
                .form-group { margin-bottom: 1.5rem; }
                .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; }
                .form-group input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1px solid var(--border);
                    border-radius: 0.5rem;
                }
                .alert { padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; text-align: center; }
                .alert-danger { background: #fee2e2; color: #b91c1c; }
                .alert-success { background: #dcfce7; color: #15803d; }

                @media (max-width: 768px) {
                    .profile-page { padding: 2rem 1rem; }
                    .profile-card { padding: 2rem; }
                    .profile-card h2 { font-size: 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default Profile;
