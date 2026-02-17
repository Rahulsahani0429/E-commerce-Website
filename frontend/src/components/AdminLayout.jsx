import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationIcon from './NotificationIcon';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon, label }) => (
    <Link to={to} className={`sidebar-link ${isActive(to) ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
      <span className="sidebar-icon">{icon}</span>
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="admin-layout">
      {/* Mobile Toggle Button */}
      <button className="mobile-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="admin-logo-box">📈</div>
          <span className="admin-brand-name">ProfitPulse</span>
        </div>

        <nav className="sidebar-menu">
          <div className="sidebar-section-title">General</div>
          <NavLink to="/admin/dashboard" icon="📊" label="Dashboard" />
          <NavLink to="/admin/orders" icon="📋" label="Orders" />
          <NavLink to="/admin/products" icon="📦" label="Products" />
          <NavLink to="/admin/users" icon="👥" label="Customers" />
          <NavLink to="/admin/reports" icon="📝" label="Reports" />
          <NavLink to="/admin/stats" icon="📉" label="Statistic" />

          <div className="sidebar-section-title">Support</div>
          <NavLink to="/admin/notifications" icon="🔔" label="Notification" />
          <NavLink to="/admin/help" icon="❓" label="Help" />
          <NavLink to="/admin/settings" icon="⚙️" label="Settings" />
        </nav>

        <div className="sidebar-footer">
          <div className="logout-container">
            <button onClick={logout} className="sidebar-link" style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}>
              <span className="sidebar-icon">🚪</span>
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content Area */}
      <main className="admin-content">
        {/* Top Header */}
        <header className="admin-top-header">
          <div className="header-search-box">
            <span>🔍</span>
            <input type="text" placeholder="Search for anything..." />
          </div>

          <div className="top-header-actions">
            <NotificationIcon isAdmin={true} />
            <button className="icon-action-btn">✉️</button>
            
            <div className="user-profile-header">
              <img 
                src={user.avatar || "https://i.pravatar.cc/150?u=admin"} 
                alt="Profile" 
                className="user-avatar-circle"
              />
              <div className="user-meta-info">
                <span className="user-header-name">{user.name}</span>
                <span className="user-header-email">{user.role || "Sales Manager"}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Main Content */}
        <section className="admin-page-main">
          {children}
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
