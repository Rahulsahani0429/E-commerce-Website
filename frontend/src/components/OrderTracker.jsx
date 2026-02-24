import React from 'react';
import './OrderTracker.css';

const OrderTracker = ({ order, status, isCancelled }) => {
    const steps = [
        { label: 'Order Confirmed', status: ['ORDER_CONFIRMED', 'Order Placed', 'Confirmed'], time: order?.createdAt },
        { label: 'Processing', status: ['PROCESSING'], time: order?.processingAt },
        { label: 'Shipped', status: ['SHIPPED'], time: order?.shippedAt },
        { label: 'Out for Delivery', status: ['OUT_FOR_DELIVERY'], time: order?.outForDeliveryAt },
        { label: 'Delivered', status: ['DELIVERED'], time: order?.deliveredAt }
    ];

    const getActiveStepForVisuals = () => {
        if (status === 'DELIVERED') return 4;
        if (status === 'OUT_FOR_DELIVERY') return 3;
        if (status === 'SHIPPED') return 2;
        if (status === 'PROCESSING') return 1;
        if (status === 'ORDER_CONFIRMED' || status === 'Order Placed' || status === 'Confirmed') return 0;
        return 0;
    };

    const currentStep = getActiveStepForVisuals();

    return (
        <div className={`order-tracker-new ${isCancelled ? 'is-cancelled' : ''}`}>
            <div className="tracker-line-container">
                <div className="tracker-line-bg"></div>
                {!isCancelled && (
                    <div
                        className="tracker-line-progress"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    ></div>
                )}
                
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep && !isCancelled;
                    const isActive = index === currentStep && !isCancelled;
                    const isFuture = index > currentStep && !isCancelled;
                    const isDeliveredStep = index === 4;

                    return (
                        <div key={index} className={`tracker-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isFuture ? 'future' : ''}`}>
                            <div className="node-circle">
                                {isCompleted ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                ) : isDeliveredStep ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                ) : isActive ? (
                                    <div className="active-pulse"></div>
                                ) : null}
                            </div>
                            <div className="node-info">
                                <span className="node-label">{step.label}</span>
                                {step.time && (
                                    <span className="node-time">
                                        {new Date(step.time).toLocaleDateString([], { day: '2-digit', month: 'short' })}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderTracker;
