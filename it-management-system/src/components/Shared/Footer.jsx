// src/components/Shared/Footer.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // Don't show footer on login page
  if (location.pathname === '/' || location.pathname === '/login') return null;

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div className="row align-items-center g-3">
          <div className="col-md-6 text-center text-md-start">
            <div style={styles.brand}>
              <i className="bi bi-shield-fill me-2" style={{ color: '#1e90ff' }} />
              <span style={styles.brandText}>DRDO IT Management System</span>
            </div>
            <div style={styles.copyright}>
              © {currentYear} Defence Research &amp; Development Organisation · IT Cell
            </div>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div style={styles.links}>
              <span style={styles.linkItem}>
                <i className="bi bi-lock-fill me-1" />
                Secure System
              </span>
              <span style={styles.divider}>·</span>
              <span style={styles.linkItem}>
                <i className="bi bi-building me-1" />
                Internal Use Only
              </span>
              <span style={styles.divider}>·</span>
              <span style={styles.linkItem}>
                <i className="bi bi-patch-check-fill me-1" />
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'linear-gradient(90deg, #0a1628 0%, #0d1b2a 100%)',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '1.25rem 0',
    marginTop: 'auto',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'inherit',
    marginBottom: '0.2rem',
  },
  brandText: {
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '0.875rem',
  },
  copyright: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '0.75rem',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  linkItem: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: '0.75rem',
  },
};

export default Footer;