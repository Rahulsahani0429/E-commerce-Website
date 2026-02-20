import React from 'react';
import './OrderTracker.css';

const OrderTracker = ({ status, isCancelled }) => {
    const steps = [
        { label: 'Order Confirmed', icon: '📦', status: ['Order Placed', 'Confirmed'] },
        { label: 'Processing', icon: '⚙️', status: ['Processing'] },
        { label: 'Shipped', icon: '🚚', status: ['Shipped'] },
        { label: 'Out for Delivery', icon: '🛵', status: ['Out for Delivery'] },
        { label: 'Delivered', icon: '🏠', status: ['Delivered'] }
    ];

    const getActiveStep = () => {
        if (isCancelled) return -1;

        // Find highest index that matches status
        let activeIndex = 0;
        for (let i = 0; i < steps.length; i++) {
            if (steps[i].status.includes(status)) {
                activeIndex = i;
                break;
            }
        }

        // Special handling for legacy/missing statuses to ensure flow
        if (status === 'Delivered') return 4;
        if (status === 'Out for Delivery') return 3;
        if (status === 'Shipped') return 2;
        if (status === 'Processing') return 1;

        return activeIndex;
    };

    const currentStep = getActiveStep();

    return (
        <div className="order-tracker-container">
            <div className="tracker-steps-line">
                {/* Connection Line Background */}
                <div className="line-bg"></div>
                {/* Progressive Active Line */}
                <div
                    className="line-progress"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep;
                    const isFuture = index > currentStep;

                    return (
                        <div
                            key={index}
                            className={`tracker-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isFuture ? 'future' : ''} ${isCancelled ? 'cancelled' : ''}`}
                        >
                            <div className="step-point">
                                <div className="step-icon-inner">
                                    {isCompleted ? '✓' : step.icon}
                                </div>
                                {isActive && <div className="active-glow"></div>}
                            </div>
                            <div className="step-label-container">
                                <span className="step-label">{step.label}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderTracker;
