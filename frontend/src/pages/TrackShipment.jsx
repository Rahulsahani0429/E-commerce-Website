import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSocket } from '../context/SocketContext';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './TrackShipment.css';

// Fix Leaflet marker icons in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper to update map view when position changes
const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

const TrackShipment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const socket = useSocket();
    
    const [loading, setLoading] = useState(true);
    const [shipment, setShipment] = useState(null);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    const [notShipped, setNotShipped] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
            const token = userInfo?.token;
            
            // 1. Fetch Order Details (Single Source of Truth for Status)
            const { data: orderData } = await axios.get(`/api/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrder(orderData);

            // 2. Fetch Shipment Details
            const { data: shipmentData } = await axios.get(`/api/shipment/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (shipmentData?.notShipped) {
                setNotShipped(true);
            } else {
                setShipment(shipmentData);
                setNotShipped(false);
            }
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load tracking information');
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (!socket) return;

        // Join a specific room for this order tracking
        socket.emit('joinShipmentRoom', id);

        // Listen for order updates
        socket.on('orderUpdated', (updatedOrder) => {
            if (updatedOrder._id === id) {
                setOrder(updatedOrder);
                toast.info(`Order Status Updated: ${updatedOrder.orderStatus.replace(/_/g, ' ')}`);
            }
        });

        socket.on('shipmentUpdated', (updatedShipment) => {
            if (updatedShipment.orderId === id) {
                setShipment(prev => ({ ...prev, ...updatedShipment }));
                setNotShipped(false);
            }
        });

        socket.on('shipmentLocationUpdate', (locationData) => {
            if (locationData.orderId === id) {
                setShipment(prev => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        currentLocation: {
                            lat: locationData.lat,
                            lng: locationData.lng,
                            address: locationData.address
                        }
                    };
                });
            }
        });

        return () => {
            socket.off('shipmentUpdated');
            socket.off('shipmentLocationUpdate');
        };
    }, [socket, id]);

    if (loading) {
        return (
            <div className="track-shipment-wrapper">
                <div className="track-shipment-container" style={{ textAlign: 'center', padding: '100px 0' }}>
                    <div className="loader">Initializing Live Track...</div>
                </div>
            </div>
        );
    }

    if (notShipped) {
        return (
            <div className="track-shipment-wrapper">
                <div className="track-shipment-container">
                    <div className="tracking-empty">
                        <span className="empty-icon">🚚</span>
                        <h2>Preparing for Shipment</h2>
                        <p>Tracking will be available once the order is dispatched and handed over to our courier partner.</p>
                        <button className="go-back-btn" onClick={() => navigate(-1)}>Go Back</button>
                    </div>
                </div>
            </div>
        );
    }

    if (error && !shipment) {
        return (
            <div className="track-shipment-wrapper">
                <div className="track-shipment-container">
                    <div className="tracking-empty">
                        <span className="empty-icon">❌</span>
                        <h2>Tracking Unavailable</h2>
                        <p>{error}</p>
                        <button className="go-back-btn" onClick={() => navigate(-1)}>Go Back</button>
                    </div>
                </div>
            </div>
        );
    }

    const steps = [
        { key: 'ORDER_CONFIRMED', label: 'Order Confirmed' },
        { key: 'PROCESSING', label: 'Processing' },
        { key: 'SHIPPED', label: 'Shipped' },
        { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
        { key: 'DELIVERED', label: 'Delivered' }
    ];

    const getStatusIndex = (status) => steps.findIndex(s => s.key === status);
    const currentIndex = order?.orderStatus ? getStatusIndex(order.orderStatus) : 0;
    const mapPosition = [shipment?.currentLocation?.lat || 28.6139, shipment?.currentLocation?.lng || 77.2090];

    return (
        <div className="track-shipment-wrapper">
            <div className="track-shipment-container">
                <div className="track-header">
                    <div className="order-info">
                        <h2>Order ID: #{id.slice(-8).toUpperCase()}</h2>
                        <p>Courier: <strong>{shipment?.courierName || 'Squid-Game Express'}</strong></p>
                    </div>
                    <div className="delivery-estimate">
                        <span className="est-label">Estimated Delivery</span>
                        <span className="est-date">
                            {shipment?.estimatedDelivery 
                                ? new Date(shipment.estimatedDelivery).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                                : 'Calculating...'}
                        </span>
                    </div>
                </div>

                <div className="map-section">
                    <div className="live-indicator">
                        <div className="live-dot"></div>
                        Live Tracking Active
                    </div>
                    <div className="map-wrapper">
                        <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                            <ChangeView center={mapPosition} />
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={mapPosition}>
                                <Popup>
                                    Delivery Agent is here! <br /> {shipment?.currentLocation?.address}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <div className="current-address-box">
                        <span className="label">Current Location:</span>
                        <div className="address">{shipment?.currentLocation?.address || 'Checking Location...'}</div>
                    </div>
                </div>

                <div className="shipment-card">
                    <h3 className="card-title">Tracking Information</h3>
                    <div className="shipment-grid">
                        <div className="grid-item">
                            <span className="label">Tracking ID</span>
                            <span className="value">{shipment?.trackingNumber || 'N/A'}</span>
                        </div>
                        <div className="grid-item">
                            <span className="label">Current Status</span>
                            <span className="value" style={{ color: order?.orderStatus === 'DELIVERED' ? '#388e3c' : '#2874f0' }}>
                                {order?.orderStatus?.replace(/_/g, ' ') || 'Processing'}
                            </span>
                        </div>
                        {shipment?.deliveryAgent && (
                            <div className="grid-item">
                                <span className="label">Delivery Agent</span>
                                <span className="value">{shipment.deliveryAgent.name}</span>
                            </div>
                        )}
                        {shipment?.deliveryOtp && order?.orderStatus !== 'DELIVERED' && (
                            <div className="grid-item">
                                <span className="label">Delivery OTP</span>
                                <span className="otp-box">{shipment.deliveryOtp}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="timeline-section">
                    <h3 className="card-title">Tracking Progress</h3>
                    <div className="vertical-timeline">
                        <div className="timeline-line"></div>
                        {steps.map((step, idx) => {
                            const historyItem = shipment?.trackingHistory?.find(h => h.status === step.key);
                            const isCompleted = idx <= currentIndex;
                            const isActive = idx === currentIndex && order?.orderStatus !== 'DELIVERED';
                            
                            return (
                                <div key={step.key} className={`timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                                    <div className="step-marker">
                                        {isActive && <div className="step-pulse"></div>}
                                    </div>
                                    <div className="step-content">
                                        <div className="step-info">
                                            <h4>{step.label}</h4>
                                            <p>{historyItem?.description || `Awaiting arrival...`}</p>
                                        </div>
                                        {historyItem && (
                                            <div className="step-meta">
                                                <span className="step-time">
                                                    {new Date(historyItem.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <span className="step-location">{historyItem.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="track-actions" style={{ marginBottom: '2rem' }}>
                    <button className="action-btn" onClick={() => navigate(`/orders/${id}`)}>Order Details</button>
                    <button className="action-btn primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Refresh Map</button>
                </div>
            </div>
        </div>
    );
};

export default TrackShipment;
