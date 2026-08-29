// src/components/Shared/Navbar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import drdoLogo from '../../assets/DRDO8.jpg';

const Navbar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const role      = localStorage.getItem('role');
  const fullName  = localStorage.getItem('fullName');
  const username  = localStorage.getItem('username');
  const isLoggedIn = !!localStorage.getItem('token');

  // Don't show navbar on the login/home page
  if (location.pathname === '/' || location.pathname === '/login') return null;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div className="container-fluid px-4" style={styles.inner}>

        {/* ── Brand ── */}
        <Link to={role === 'IT_Admin' ? '/admin' : '/user'} style={styles.brand}>
          <img src={drdoLogo} alt="DRDO" style={styles.brandLogo} />
          <div>
            <div style={styles.brandSub}>DRDO</div>
            <div style={styles.brandName}>AMC Portal</div>
          </div>
        </Link>

        {/* ── Nav Links ── */}
        <div style={styles.navLinks}>
          {role === 'IT_Admin' && (
            <Link
              to="/admin"
              style={{
                ...styles.navLink,
                ...(location.pathname === '/admin' ? styles.navLinkActive : {}),
              }}
            >
              <i className="bi bi-speedometer2 me-1" />
              Admin Dashboard
            </Link>
          )}
          {role === 'IT_Personnel' && (
            <Link
              to="/user"
              style={{
                ...styles.navLink,
                ...(location.pathname === '/user' ? styles.navLinkActive : {}),
              }}
            >
              <i className="bi bi-person-badge me-1" />
              My Dashboard
            </Link>
          )}
        </div>

        {/* ── User Info + Logout ── */}
        <div style={styles.rightSection}>
          {isLoggedIn && (
            <div style={styles.userBadge}>
              <div style={styles.userAvatar}>
                <i className="bi bi-person-fill" style={{ fontSize: '0.9rem', color: '#1e90ff' }} />
              </div>
              <div style={styles.userInfo}>
                <div style={styles.userName}>{fullName || username || 'User'}</div>
                <div style={styles.userRole}>
                  {role === 'IT_Admin' ? 'IT Administrator' : 'IT Personnel'}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            style={styles.logoutBtn}
            id="logout-btn"
            aria-label="Logout"
          >
            <i className="bi bi-box-arrow-right me-1" />
            <span className="d-none d-sm-inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(90deg, #0a1628 0%, #0d1b2a 100%)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    gap: '1rem',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    flexShrink: 0,
  },
  brandLogo: {
    width: 38,
    height: 38,
    borderRadius: 9,
    objectFit: 'cover',
    border: '1.5px solid rgba(255,255,255,0.2)',
  },
  brandSub: {
    fontSize: '0.58rem',
    letterSpacing: '0.12em',
    color: 'rgba(255,255,255,0.45)',
    textTransform: 'uppercase',
    lineHeight: 1,
    fontWeight: 600,
  },
  brandName: {
    fontSize: '0.95rem',
    fontWeight: 800,
    color: '#ffffff',
    letterSpacing: '-0.01em',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    flex: 1,
    paddingLeft: '1rem',
  },
  navLink: {
    color: 'rgba(255,255,255,0.65)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    padding: '0.45rem 0.85rem',
    borderRadius: 8,
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid transparent',
  },
  navLinkActive: {
    color: '#1e90ff',
    background: 'rgba(30,144,255,0.1)',
    borderColor: 'rgba(30,144,255,0.2)',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flexShrink: 0,
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '0.35rem 0.75rem 0.35rem 0.5rem',
  },
  userAvatar: {
    width: 30,
    height: 30,
    background: 'rgba(30,144,255,0.15)',
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#ffffff',
    lineHeight: 1.2,
  },
  userRole: {
    fontSize: '0.65rem',
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 1.2,
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#fc8181',
    borderRadius: 8,
    padding: '0.4rem 0.85rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    margin: 0,
  },
};

export default Navbar;
