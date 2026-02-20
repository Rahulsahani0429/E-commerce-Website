import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config";
import { connectSocket } from "../utils/socket.js";
import "./AdminLayout.css";
import { useState } from "react";
import { useEffect } from "react";

const AdminLayout = ({
  children,
  pageTitle = "Orders",
  pageSubtitle = "Admin Overview",
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    } else {
      // Fetch initial unread count
      const fetchUnread = async () => {
        try {
          const { data } = await axios.get(
            `${API_BASE_URL}/api/notifications/admin`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
              params: { status: "unread", limit: 1 },
            },
          );
          setUnreadCount(data.unreadCount);
        } catch (err) {
          console.error("Error fetching unread count:", err);
        }
      };

      fetchUnread();

      // Listen for socket events
      const socket = connectSocket(user.token);
      socket.on("notification:new", () => {
        setUnreadCount((prev) => prev + 1);
      });
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className={`sidebar-link ${isActive(to) ? "active" : ""}`}
      onClick={() => setSidebarOpen(false)}
    >
      <span className="sidebar-icon">{icon}</span>
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="admin-layout">
      {/* Mobile Toggle Button */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="admin-logo-box">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 17V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="12 7 12 17"></polyline>
              <polyline points="8 12 16 12"></polyline>
            </svg>
          </div>
          <span className="admin-brand-name">ProfitPulse</span>
        </div>

        <nav className="sidebar-menu">
          <NavLink to="/admin/dashboard" icon="🏠" label="Dashboard" />
          <NavLink to="/admin/orders" icon="🔳" label="Orders" />
          <NavLink to="/admin/payments" icon="💳" label="Payments" />
          <NavLink to="/admin/customers" icon="👥" label="Customers" />
          <NavLink to="/admin/reports" icon="📄" label="Reports" />
          <NavLink to="/admin/stats" icon="📊" label="Statistic" />
          <NavLink to="/admin/notifications" icon="🔔" label="Notifications" />

          <div className="sidebar-section-separator"></div>

          <NavLink to="/admin/help" icon="❕" label="Help" />
          <NavLink to="/admin/settings" icon="⚙️" label="Settings" />
        </nav>

        <div className="sidebar-footer">
          <button onClick={logout} className="logout-btn">
            <span className="logout-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </span>
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <main className="admin-content">
        {/* Top Header */}
        <header className="admin-top-header">
          <div className="admin-header-left">
            <h1 className="admin-header-title">{pageTitle}</h1>
            {pageSubtitle && (
              <p className="admin-header-subtitle">{pageSubtitle}</p>
            )}
          </div>

          <div className="top-header-actions">
            <div className="header-search-box">
              <button className="square-icon-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>

            <Link
              to="/admin/notifications"
              className="square-icon-btn"
              title="Notifications"
            >
              {unreadCount > 0 && (
                <div
                  className="notification-badge-dot"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    color: "#fff",
                  }}
                >
                  {unreadCount}
                </div>
              )}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </Link>

            <div className="user-profile-header">
              <img
                src={user.avatar || "https://i.pravatar.cc/150?u=admin"}
                alt="Profile"
                className="user-avatar-rect"
              />
              <div className="user-meta-info">
                <span className="user-header-name">{user.name}</span>
                <span className="user-header-email">{user.email}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Main Content */}
        <section className="admin-page-main">{children}</section>
      </main>
    </div>
  );
};

export default AdminLayout;
