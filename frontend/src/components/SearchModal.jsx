import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose, userToken }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ users: [], products: [], orders: [], payments: [] });
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    // Auto-focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        } else {
            setQuery('');
            setResults({ users: [], products: [], orders: [], payments: [] });
        }
    }, [isOpen]);

    const performSearch = useCallback(async (searchQuery) => {
        if (!searchQuery || searchQuery.length < 2) {
            setResults({ users: [], products: [], orders: [], payments: [] });
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.get("/search", {
                params: { q: searchQuery }
            });
            setResults(data);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim().length >= 2) {
                performSearch(query.trim());
            } else {
                setResults({ users: [], products: [], orders: [], payments: [] });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, performSearch]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleResultClick = (path) => {
        navigate(path);
        onClose();
    };

    if (!isOpen) return null;

    const hasResults = results.users.length > 0 || 
                       results.products.length > 0 || 
                       results.orders.length > 0 || 
                       results.payments.length > 0;

    return (
        <div className="search-modal-overlay" onClick={onClose}>
            <div 
                className="search-modal-container" 
                onClick={(e) => e.stopPropagation()} 
                ref={modalRef}
            >
                <div className="search-input-wrapper">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search orders, products, customers..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && (
                        <button className="clear-search" onClick={() => setQuery('')}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    )}
                </div>

                <div className="search-results-content">
                    {loading ? (
                        <div className="search-status-message">
                            <div className="spinner"></div>
                            <span>Searching...</span>
                        </div>
                    ) : query.length < 2 ? (
                        <div className="search-status-message">
                            <span>Type at least 2 characters to search...</span>
                        </div>
                    ) : !hasResults ? (
                        <div className="search-status-message">
                            <span>No results found for "{query}"</span>
                        </div>
                    ) : (
                        <div className="results-groups-container">
                            {results.products.length > 0 && (
                                <div className="results-group">
                                    <h3>Products</h3>
                                    {results.products.map(product => (
                                        <div key={product._id} className="result-item" onClick={() => handleResultClick(`/admin/products/${product._id}/edit`)}>
                                            <img src={product.image} alt={product.name} />
                                            <div className="result-info">
                                                <span className="result-title">{product.name}</span>
                                                <span className="result-subtitle">{product.category}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.users.length > 0 && (
                                <div className="results-group">
                                    <h3>Customers</h3>
                                    {results.users.map(user => (
                                        <div key={user._id} className="result-item" onClick={() => handleResultClick(`/admin/customers`)}>
                                            <div className="result-avatar">
                                                {user.avatar ? <img src={user.avatar} alt={user.name} /> : user.name.charAt(0)}
                                            </div>
                                            <div className="result-info">
                                                <span className="result-title">{user.name}</span>
                                                <span className="result-subtitle">{user.email}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.orders.length > 0 && (
                                <div className="results-group">
                                    <h3>Orders</h3>
                                    {results.orders.map(order => (
                                        <div key={order._id} className="result-item" onClick={() => handleResultClick(`/admin/orders/${order._id}`)}>
                                            <div className="result-icon order">#</div>
                                            <div className="result-info">
                                                <span className="result-title">Order #{order._id.substring(order._id.length - 6)}</span>
                                                <span className="result-subtitle">Status: {order.orderStatus} • ₹{order.totalPrice}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.payments.length > 0 && (
                                <div className="results-group">
                                    <h3>Payments</h3>
                                    {results.payments.map(payment => (
                                        <div key={payment.razorpay_payment_id} className="result-item" onClick={() => handleResultClick(`/admin/payments`)}>
                                            <div className="result-icon payment">$</div>
                                            <div className="result-info">
                                                <span className="result-title">{payment.razorpay_payment_id}</span>
                                                <span className="result-subtitle">₹{payment.totalPrice} • {payment.paymentStatus}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
