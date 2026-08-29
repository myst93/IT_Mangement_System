// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import ViewPcDetails from '../components/User/ViewPcDetails';
import RequestEdit from '../components/User/RequestEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';

const tabs = [
  { key: 'view',    label: 'My PC Details',  icon: 'bi-display-fill',      color: '#1e90ff' },
  { key: 'request', label: 'Request Edit',    icon: 'bi-pencil-square',     color: '#8b5cf6' },
];

function UserDashboard() {
  const [activeTab, setActiveTab] = useState('view');
  const fullName = localStorage.getItem('fullName');
  const username = localStorage.getItem('username');
  const displayName = fullName || username || 'User';

  return (
    <div style={styles.page}>
      {/* ── Header ── */}
      <div style={styles.header}>
        <div className="container-fluid px-4">
          <div className="py-4">
            <div style={styles.greeting}>
              <i className="bi bi-hand-wave me-2" style={{ color: '#f0a500' }} />
              Welcome back, {displayName}
            </div>
            <h1 style={styles.headerTitle}>User Dashboard</h1>
            <p style={styles.headerDesc}>View your assigned PC and request configuration changes</p>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4 py-4" style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* ── Tab Nav ── */}
        <div style={styles.tabNav} className="mb-4">
          {tabs.map(({ key, label, icon, color }) => (
            <button
              key={key}
              style={{
                ...styles.tabBtn,
                ...(activeTab === key ? { ...styles.tabBtnActive, color, borderColor: color } : {}),
              }}
              onClick={() => setActiveTab(key)}
              id={`user-tab-${key}`}
            >
              <span style={{
                ...styles.tabIcon,
                background: activeTab === key ? `${color}18` : 'transparent',
              }}>
                <i className={`bi ${icon}`} style={{ color: activeTab === key ? color : '#a0aec0' }} />
              </span>
              {label}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div className="animate__animated animate__fadeIn" style={{ animationDuration: '0.3s' }}>
          {activeTab === 'view'    && <ViewPcDetails />}
          {activeTab === 'request' && <RequestEdit />}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: '#f0f4f8',
    minHeight: '100vh',
  },
  header: {
    background: 'linear-gradient(135deg, #0a1628 0%, #112240 100%)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  greeting: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    marginBottom: '0.3rem',
    display: 'flex',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: '1.8rem',
    fontWeight: 800,
    marginBottom: '0.2rem',
    letterSpacing: '-0.02em',
  },
  headerDesc: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.875rem',
    marginBottom: 0,
  },
  tabNav: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  tabBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    background: '#fff',
    border: '2px solid #e2e8f0',
    color: '#718096',
    borderRadius: 12,
    padding: '0.7rem 1.25rem',
    fontWeight: 600,
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  tabBtnActive: {
    background: '#fff',
    color: '#1e90ff',
    borderColor: '#1e90ff',
    boxShadow: '0 4px 12px rgba(30,144,255,0.15)',
  },
  tabIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s ease',
  },
};

export default UserDashboard;
