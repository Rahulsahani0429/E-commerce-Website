import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?keyword=${searchTerm}`);
      setSearchTerm("");
      closeMenu();
    }
  };

  return (
    <header className="main-header">
      <div className="container header-container">
        <div className="header-top">
          <button
            className={`mobile-toggle ${mobileMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <Link to="/" className="flipkart-logo" onClick={closeMenu}>
            <span className="logo-main">Flipkart</span>
            <span className="logo-sub">
              Explore <span className="plus">Plus</span>
            </span>
          </Link>

          <div className="header-actions-mobile">
            <Link to="/cart" className="cart-mobile" onClick={closeMenu}>
              🛒 {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
          </div>

          <form className="search-bar desktop-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>

          <div className="desktop-actions">
            <ul className="nav-items-list">
              {user ? (
                <li className="dropdown">
                  <span className="user-label">
                    {(user?.name || "User").split(" ")[0]} ▾
                  </span>
                  <div className="dropdown-content">
                    <Link to="/profile">My Profile</Link>
                    {user.isAdmin && <Link to="/admin">Admin Dashboard</Link>}
                    <button onClick={logout}>Logout</button>
                  </div>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="login-btn">
                    Login
                  </Link>
                </li>
              )}
              <li>
                <Link to="/cart" className="cart-nav">
                  🛒 Cart{" "}
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </Link>
              </li>
              <li>
                <button className="theme-toggle" onClick={toggleTheme}>
                  {isDarkMode ? "☀️" : "🌙"}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <form className="search-bar mobile-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <div className="user-info">
            {user ? `Hi, ${user.name}` : "Welcome User"}
          </div>
          <button className="close-drawer" onClick={closeMenu}>
            ✕
          </button>
        </div>
        <ul className="drawer-links">
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={closeMenu}>
              All Products
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profile" onClick={closeMenu}>
                  My Profile
                </Link>
              </li>
              {user.isAdmin && (
                <li>
                  <Link to="/admin" onClick={closeMenu}>
                    Admin Panel
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={closeMenu}>
                Login / Signup
              </Link>
            </li>
          )}
          <li>
            <button
              onClick={() => {
                toggleTheme();
                closeMenu();
              }}
            >
              {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </li>
        </ul>
      </div>
      <div
        className={`drawer-overlay ${mobileMenuOpen ? "show" : ""}`}
        onClick={closeMenu}
      ></div>

      <style>{`
        .main-header { position: sticky; top: 0; z-index: 1000; background: var(--primary); padding: 0.5rem 0; color: white; }
        .header-top { display: flex; align-items: center; gap: 1.5rem; justify-content: space-between; height: 40px; }
        
        .flipkart-logo { display: flex; flex-direction: column; color: white; font-style: italic; text-decoration: none; }
        .logo-main { font-size: 1.2rem; font-weight: 800; line-height: 1; }
        .logo-sub { font-size: 0.65rem; font-weight: 600; color: #ffe500; }
        
        .search-bar { background: white; border-radius: 2px; display: flex; align-items: center; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .search-bar input { border: none; outline: none; padding: 0.5rem 0.8rem; flex: 1; font-size: 0.9rem; }
        .desktop-search { flex: 1; max-width: 500px; }
        .mobile-search { display: none; margin-top: 0.5rem; width: 100%; }

        .nav-items-list { display: flex; align-items: center; gap: 1.5rem; list-style: none; font-weight: 600; }
        .login-btn { background: white; color: var(--primary); padding: 0.3rem 2rem; border-radius: 2px; font-size: 0.9rem; }
        .cart-nav { display: flex; align-items: center; gap: 0.4rem; font-size: 0.95rem; }
        .cart-badge { background: #ff6161; padding: 1px 5px; border-radius: 10px; font-size: 0.7rem; }
        .theme-toggle { background: rgba(255,255,255,0.1); border-radius: 50%; width: 30px; height: 30px; color: white; display: flex; align-items: center; justify-content: center; }

        .mobile-toggle { display: none; background: none; flex-direction: column; gap: 4px; padding: 5px; }
        .mobile-toggle .bar { width: 20px; height: 2px; background: white; transition: 0.3s; }
        .mobile-toggle.active .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .mobile-toggle.active .bar:nth-child(2) { opacity: 0; }
        .mobile-toggle.active .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
        .header-actions-mobile { display: none; }

        /* Dropdown */
        .dropdown { position: relative; }
        .dropdown-content { display: none; position: absolute; top: 100%; left: 0; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 4px; min-width: 150px; z-index: 1001; }
        .dropdown:hover .dropdown-content { display: block; }
        .dropdown-content a, .dropdown-content button { display: block; padding: 0.6rem 1rem; color: #212121; text-align: left; width: 100%; border: none; background: none; }
        .dropdown-content a:hover, .dropdown-content button:hover { background: #f0f2f5; }

        /* Mobile Drawer */
        .mobile-drawer { position: fixed; top: 0; left: -280px; width: 280px; height: 100%; background: white; z-index: 2000; transition: 0.3s; box-shadow: 2px 0 10px rgba(0,0,0,0.1); }
        .mobile-drawer.open { left: 0; }
        .drawer-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); opacity: 0; pointer-events: none; transition: 0.3s; z-index: 1999; }
        .drawer-overlay.show { opacity: 1; pointer-events: auto; }
        .drawer-header { background: var(--primary); color: white; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; }
        .drawer-links { list-style: none; padding: 1rem 0; }
        .drawer-links a, .drawer-links button { display: block; width: 100%; padding: 1rem 1.5rem; border: none; background: none; text-align: left; color: #212121; font-weight: 500; font-size: 1rem; border-bottom: 1px solid #f0f0f0; }

        @media (max-width: 768px) {
          .desktop-search, .desktop-actions { display: none; }
          .mobile-toggle, .mobile-search, .header-actions-mobile { display: flex; }
          .header-top { gap: 1rem; }
          .cart-mobile { font-size: 1.2rem; position: relative; }
          .cart-mobile .badge { position: absolute; top: -5px; right: -8px; background: #ff6161; font-size: 0.65rem; padding: 1px 4px; border-radius: 8px; }
        }
      `}</style>
    </header>
  );
};

export default Header;
