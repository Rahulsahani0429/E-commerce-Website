import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-grid">
        <Link to="/admin/products" className="admin-card">
          <div className="admin-icon">📦</div>
          <h3>Products</h3>
          <p>Manage catalog, update prices, and stock.</p>
        </Link>
        <Link to="/admin/users" className="admin-card">
          <div className="admin-icon">👥</div>
          <h3>Users</h3>
          <p>Manage customers and administrators.</p>
        </Link>
        <Link to="/admin/orders" className="admin-card">
          <div className="admin-icon">🚚</div>
          <h3>Orders</h3>
          <p>Track shipments and delivery status.</p>
        </Link>
      </div>
      <style>{`
                .admin-dashboard { padding: 4rem 2rem; text-align: center; }
                .admin-dashboard h1 { margin-bottom: 3rem; font-size: 2.5rem; }
                .admin-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
                .admin-card {
                    background: var(--bg-card);
                    padding: 2.5rem;
                    border-radius: 1.5rem;
                    text-decoration: none;
                    color: inherit;
                    box-shadow: var(--shadow);
                    transition: var(--transition);
                }
                .admin-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-lg); }
                .admin-icon { font-size: 3rem; margin-bottom: 1.5rem; }
                .admin-card h3 { margin-bottom: 1rem; font-size: 1.5rem; color: var(--primary); }
                .admin-card p { color: var(--text-muted); line-height: 1.6; }

                @media (max-width: 768px) {
                    .admin-dashboard { padding: 3rem 1rem; }
                    .admin-dashboard h1 { font-size: 2rem; margin-bottom: 2rem; }
                    .admin-grid { grid-template-columns: 1fr; gap: 1.5rem; }
                    .admin-card { padding: 2rem; }
                }
            `}</style>
    </div>
  );
};

export default AdminDashboard;
