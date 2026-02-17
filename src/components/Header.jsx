import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/inventory', label: 'Products' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topBarContent}>
            <a href="tel:+254703501133" className={styles.phoneLink}>
              <span className={styles.icon}>📞</span>
              0703 501133
            </a>
            <div className={styles.topBarInfo}>
              <span>📍 Embulbul Area, Former KMC/Halal Meat, Ngong</span>
              <span>⏰ Mon-Fri: 9AM-6PM | Sat: 9AM-1PM</span>
            </div>
          </div>
        </div>
      </div>

      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg viewBox="0 0 50 50" className={styles.wrenchIcon}>
                  <circle cx="25" cy="25" r="23" fill="none" stroke="#00d4ff" strokeWidth="3"/>
                  <path d="M15 20 L35 20 M15 25 L35 25 M15 30 L35 30 M20 15 L30 15 M20 35 L30 35" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="18" y="18" width="14" height="14" rx="2" fill="none" stroke="#ff6b35" strokeWidth="2"/>
                </svg>
              </div>
              <div className={styles.logoText}>
                <span className={styles.logoName}>Brian & Jones</span>
                <span className={styles.logoTagline}>Autotronics</span>
              </div>
            </Link>

            <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={styles.navLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className={styles.navActions}>
              <div className={styles.aseBadge}>
                <span className={styles.aseIcon}>⭐</span>
                <span>5.0 Rated</span>
              </div>

              {isAuthenticated ? (
                <div className={styles.userMenu}>
                  <Link to="/dashboard" className={styles.dashboardLink}>
                    {user?.firstName}
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className={styles.adminLink}>
                      Admin
                    </Link>
                  )}
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className={styles.loginBtn}>
                  Login
                </Link>
              )}

              <Link to="/booking" className={styles.bookBtn}>
                Get Quote
              </Link>

              <button
                className={styles.hamburger}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
