// src/pages/Home.jsx — Combined Landing + Login Page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import drdoLogo from '../assets/DRDO8.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';

const features = [
  { icon: 'bi-people-fill',       text: 'User Management (Admins & IT Personnel)' },
  { icon: 'bi-laptop-fill',       text: 'PC Inventory Management' },
  { icon: 'bi-shield-lock-fill',  text: 'Role-Based Access Control' },
  { icon: 'bi-arrow-repeat',      text: 'Request / Approval Workflow' },
  { icon: 'bi-key-fill',          text: 'Secure JWT Authentication' },
  { icon: 'bi-bar-chart-fill',    text: 'Detailed PC Analytics & Status' },
];

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role',  response.data.user.role);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('fullName', response.data.user.fullName || '');
      response.data.user.role === 'IT_Admin'
        ? navigate('/admin')
        : navigate('/user');
    } catch (err) {
      const responseMessage = err.response?.data?.message;
      if (responseMessage) {
        setError(responseMessage);
      } else if (err.response) {
        setError(`Login service returned HTTP ${err.response.status}. Please try again later.`);
      } else {
        setError('Cannot reach the login service. Check the API URL and backend deployment, then try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* ── Animated Background Grid ── */}
      <div style={styles.bgGrid} aria-hidden="true" />
      <div style={styles.bgGlow1} aria-hidden="true" />
      <div style={styles.bgGlow2} aria-hidden="true" />

      <div className="container-fluid px-0" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="row g-0 w-100" style={{ minHeight: '100vh' }}>

          {/* ══ LEFT PANEL ══ */}
          <div
            className="col-lg-7 d-none d-lg-flex flex-column justify-content-center px-5"
            style={styles.leftPanel}
          >
            {/* Logo + Title */}
            <div className="animate__animated animate__fadeInLeft mb-5" style={{ animationDelay: '0.1s' }}>
              <div className="d-flex align-items-center gap-3 mb-4">
                <img
                  src={drdoLogo}
                  alt="DRDO Logo"
                  style={styles.logo}
                />
                <div>
                  <div style={styles.logoSubtext}>DEFENCE RESEARCH &amp; DEVELOPMENT ORGANISATION</div>
                  <h1 style={styles.heroTitle}>IT Management<br />System</h1>
                </div>
              </div>
              <p style={styles.heroDesc}>
                Secure, centralized management of PC inventory, user roles,
                and IT workflows across DRDO facilities.
              </p>
            </div>

            {/* Feature List */}
            <ul style={styles.featureList} className="animate__animated animate__fadeInLeft" style2={{ animationDelay: '0.3s' }}>
              {features.map((f, idx) => (
                <li
                  key={idx}
                  className={`animate__animated animate__fadeInLeft`}
                  style={{ ...styles.featureItem, animationDelay: `${0.2 + idx * 0.08}s` }}
                >
                  <span style={styles.featureIcon}>
                    <i className={`bi ${f.icon}`} />
                  </span>
                  <span style={styles.featureText}>{f.text}</span>
                </li>
              ))}
            </ul>

            {/* Footer badge */}
            <div className="mt-5 animate__animated animate__fadeIn" style={{ animationDelay: '0.8s' }}>
              <span style={styles.securityBadge}>
                <i className="bi bi-shield-check me-2" />
                Classified Internal System — Authorised Personnel Only
              </span>
            </div>
          </div>

          {/* ══ RIGHT PANEL — LOGIN ══ */}
          <div
            className="col-lg-5 d-flex align-items-center justify-content-center"
            style={styles.rightPanel}
          >
            <div className="animate__animated animate__fadeInRight w-100" style={{ animationDelay: '0.2s', maxWidth: 440, padding: '2rem' }}>

              {/* Mobile-only logo */}
              <div className="d-flex d-lg-none align-items-center gap-3 mb-4 justify-content-center">
                <img src={drdoLogo} alt="DRDO Logo" style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>DRDO</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>IT Management System</div>
                </div>
              </div>

              {/* Login Card */}
              <div style={styles.loginCard}>
                <div className="text-center mb-4">
                  <div style={styles.loginIcon}>
                    <i className="bi bi-person-lock" style={{ fontSize: '1.6rem', color: '#1e90ff' }} />
                  </div>
                  <h2 style={styles.loginTitle}>Welcome Back</h2>
                  <p style={styles.loginSubtitle}>Sign in to access your dashboard</p>
                </div>

                {error && (
                  <div className="alert animate__animated animate__shakeX" style={styles.errorAlert} role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin} noValidate>
                  <div className="mb-3">
                    <label htmlFor="username" style={styles.inputLabel}>Username</label>
                    <div style={styles.inputWrapper}>
                      <span style={styles.inputIcon}><i className="bi bi-person" /></span>
                      <input
                        id="username"
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                        autoComplete="username"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" style={styles.inputLabel}>Password</label>
                    <div style={styles.inputWrapper}>
                      <span style={styles.inputIcon}><i className="bi bi-lock" /></span>
                      <input
                        id="password"
                        type={showPass ? 'text' : 'password'}
                        className="form-control"
                        placeholder="••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        style={styles.eyeBtn}
                        onClick={() => setShowPass(!showPass)}
                        tabIndex={-1}
                        aria-label="Toggle password visibility"
                      >
                        <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`} />
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100"
                    disabled={loading}
                    style={styles.loginBtn}
                    id="login-submit-btn"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Authenticating…
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2" />
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <small style={{ color: '#a0aec0', fontSize: '0.78rem' }}>
                    © {new Date().getFullYear()} DRDO · IT Cell · All rights reserved
                  </small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Inline Styles ── */
const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a1628 0%, #0d1b2a 40%, #112240 70%, #1a3055 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  bgGrid: {
    position: 'fixed',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
    zIndex: 0,
    pointerEvents: 'none',
  },
  bgGlow1: {
    position: 'fixed',
    top: '-20%',
    right: '-10%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(30,144,255,0.15) 0%, transparent 70%)',
    zIndex: 0,
    pointerEvents: 'none',
  },
  bgGlow2: {
    position: 'fixed',
    bottom: '-20%',
    left: '-10%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(240,165,0,0.10) 0%, transparent 70%)',
    zIndex: 0,
    pointerEvents: 'none',
  },
  leftPanel: {
    position: 'relative',
    zIndex: 1,
    padding: '4rem 3rem 4rem 4rem',
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 16,
    objectFit: 'cover',
    border: '2px solid rgba(255,255,255,0.2)',
    boxShadow: '0 8px 32px rgba(30,144,255,0.3)',
  },
  logoSubtext: {
    fontSize: '0.62rem',
    letterSpacing: '0.12em',
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    marginBottom: '0.25rem',
    fontWeight: 600,
  },
  heroTitle: {
    fontSize: '2.6rem',
    fontWeight: 800,
    color: '#ffffff',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  heroDesc: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.7,
    maxWidth: 480,
    marginBottom: 0,
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    padding: '0.65rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(8px)',
  },
  featureIcon: {
    width: 36,
    height: 36,
    background: 'rgba(30,144,255,0.15)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1e90ff',
    fontSize: '1rem',
    flexShrink: 0,
  },
  featureText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  securityBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'rgba(240,165,0,0.12)',
    border: '1px solid rgba(240,165,0,0.3)',
    color: '#f0a500',
    borderRadius: 8,
    padding: '0.5rem 1rem',
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.03em',
  },
  rightPanel: {
    position: 'relative',
    zIndex: 1,
    background: 'rgba(10,22,40,0.6)',
    backdropFilter: 'blur(20px)',
    borderLeft: '1px solid rgba(255,255,255,0.08)',
  },
  loginCard: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: '2.5rem',
    backdropFilter: 'blur(16px)',
  },
  loginIcon: {
    width: 60,
    height: 60,
    background: 'rgba(30,144,255,0.12)',
    border: '2px solid rgba(30,144,255,0.25)',
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
  },
  loginTitle: {
    fontSize: '1.6rem',
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: '0.25rem',
  },
  loginSubtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.875rem',
    marginBottom: 0,
  },
  errorAlert: {
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#fc8181',
    borderRadius: 10,
    fontSize: '0.875rem',
    padding: '0.75rem 1rem',
  },
  inputLabel: {
    display: 'block',
    fontWeight: 600,
    fontSize: '0.82rem',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '0.4rem',
    letterSpacing: '0.02em',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '0.85rem',
    color: 'rgba(255,255,255,0.4)',
    fontSize: '0.95rem',
    zIndex: 2,
    pointerEvents: 'none',
  },
  input: {
    background: 'rgba(255,255,255,0.07) !important',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#fff',
    paddingLeft: '2.6rem',
    paddingRight: '2.6rem',
    fontSize: '0.925rem',
    height: '48px',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  eyeBtn: {
    position: 'absolute',
    right: '0.85rem',
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.4)',
    cursor: 'pointer',
    padding: '0',
    margin: '0',
    zIndex: 2,
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
  loginBtn: {
    background: 'linear-gradient(135deg, #1e90ff, #0070e0)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1rem',
    height: '50px',
    borderRadius: '12px',
    border: 'none',
    letterSpacing: '0.02em',
    boxShadow: '0 4px 20px rgba(30,144,255,0.35)',
    transition: 'all 0.25s ease',
  },
};

export default Home;
