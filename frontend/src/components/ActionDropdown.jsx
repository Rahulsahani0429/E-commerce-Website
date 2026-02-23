import { useState, useRef, useEffect } from 'react';
import './ActionDropdown.css';

const ActionDropdown = ({ onAction, order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const actions = [
    { id: 'view', label: 'View Details', icon: '↗️' },
    { id: 'edit', label: 'Edit Order', icon: '👤' },
    { id: 'invoice', label: 'Download Invoice', icon: '☑️' },
    { id: 'reminder', label: 'Send Reminder', icon: '🔔', disabled: order.isPaid || order.paymentStatus === 'PAID' },
    { id: 'delete', label: 'Delete Order', icon: '🗑️', color: '#ff4d4f' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (actionId) => {
    onAction(actionId, order);
    setIsOpen(false);
  };

  return (
    <div className="action-dropdown-container" ref={dropdownRef}>
      <button className="dot-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        •••
      </button>
      {isOpen && (
        <div className="dropdown-menu-list">
          {actions.map((action) => (
            <button
              key={action.id}
              className={`dropdown-item ${action.disabled ? 'disabled' : ''}`}
              style={{ color: action.color }}
              onClick={() => !action.disabled && handleAction(action.id)}
            >
              <span className="dropdown-icon">{action.icon}</span>
              <span className="dropdown-label">{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
