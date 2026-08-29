// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import AddUser from '../components/Admin/AddUser';
import AddPC from '../components/Admin/AddPC';
import ViewRequests from '../components/Admin/ViewRequests';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

const tabConfig = [
  { key: 'pcs',      label: 'All PCs',          icon: 'bi-laptop-fill',    color: '#1e90ff' },
  { key: 'status',   label: 'PC Status',         icon: 'bi-bar-chart-fill', color: '#10b981' },
  { key: 'addUser',  label: 'Add User',           icon: 'bi-person-plus-fill', color: '#8b5cf6' },
  { key: 'addPC',    label: 'Add PC',             icon: 'bi-plus-circle-fill', color: '#f59e0b' },
  { key: 'requests', label: 'Requests',           icon: 'bi-inbox-fill',     color: '#ef4444' },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('pcs');
  const [pcs, setPcs] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPcs = () => {
    setLoading(true);
    api.get('/pcs')
      .then(res => {
        setPcs(res.data);
        setPendingCount(res.data.filter(p => p.actionStatus === 'Pending').length);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (activeTab === 'pcs' || activeTab === 'status') fetchPcs();
  }, [activeTab]);

  useEffect(() => {
    // Fetch pending count for badge always
    api.get('/pcs').then(res => {
      setPendingCount(res.data.filter(p => p.actionStatus === 'Pending').length);
    }).catch(() => {});
  }, []);

  /* ── Stats ── */
  const totalPcs    = pcs.length;
  const approvedPcs = pcs.filter(p => p.actionStatus === 'Approved').length;
  const rejectedPcs = pcs.filter(p => p.actionStatus === 'Rejected').length;

  const stats = [
    { label: 'Total PCs',       value: totalPcs,    icon: 'bi-laptop',          color: '#1e90ff', bg: 'rgba(30,144,255,0.12)' },
    { label: 'Approved',        value: approvedPcs, icon: 'bi-check-circle',    color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
    { label: 'Pending Approval',value: pendingCount,icon: 'bi-clock-history',   color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    { label: 'Rejected',        value: rejectedPcs, icon: 'bi-x-circle',        color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  ];

  const actionStatusBadge = (status) => {
    const map = {
      Pending:  { bg: '#fef3c7', color: '#d97706', label: 'Pending' },
      Approved: { bg: '#d1fae5', color: '#065f46', label: 'Approved' },
      Rejected: { bg: '#fee2e2', color: '#991b1b', label: 'Rejected' },
    };
    const s = map[status] || { bg: '#f1f5f9', color: '#64748b', label: status };
    return (
      <span style={{ ...styles.badge, background: s.bg, color: s.color }}>
        {s.label}
      </span>
    );
  };

  return (
    <div style={styles.page}>
      {/* ── Page Header ── */}
      <div style={styles.header}>
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 py-4">
            <div>
              <div style={styles.headerEyebrow}>
                <i className="bi bi-shield-fill-check me-2" style={{ color: '#1e90ff' }} />
                Administration Panel
              </div>
              <h1 style={styles.headerTitle}>Admin Dashboard</h1>
              <p style={styles.headerDesc}>Manage PC inventory, users and approval requests</p>
            </div>
            <div style={styles.headerActions}>
              <button
                className="btn btn-sm"
                style={styles.refreshBtn}
                onClick={fetchPcs}
                title="Refresh data"
              >
                <i className="bi bi-arrow-clockwise me-1" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4 py-4">

        {/* ── Stats Cards ── */}
        <div className="row g-3 mb-4">
          {stats.map((s, i) => (
            <div className="col-6 col-lg-3" key={i}>
              <div style={{ ...styles.statCard, animationDelay: `${i * 0.08}s` }} className="fade-in-up">
                <div style={{ ...styles.statIcon, background: s.bg }}>
                  <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: '1.25rem' }} />
                </div>
                <div style={styles.statValue}>{s.value}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tab Navigation ── */}
        <div style={styles.tabBar} className="mb-4">
          {tabConfig.map(({ key, label, icon, color }) => (
            <button
              key={key}
              style={{
                ...styles.tabBtn,
                ...(activeTab === key ? { ...styles.tabBtnActive, borderBottomColor: color, color: color } : {}),
              }}
              onClick={() => setActiveTab(key)}
              id={`tab-${key}`}
            >
              <i className={`bi ${icon} me-2`} style={{ color: activeTab === key ? color : undefined }} />
              {label}
              {key === 'requests' && pendingCount > 0 && (
                <span style={styles.tabBadge}>{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* ══ TAB CONTENT ══ */}

        {/* All PCs */}
        {activeTab === 'pcs' && (
          <div className="fade-in-up">
            <SectionHeader icon="bi-laptop-fill" title="All PCs" color="#1e90ff">
              <span style={styles.sectionMeta}>{totalPcs} records</span>
            </SectionHeader>
            {loading ? <LoadingSpinner /> : pcs.length === 0
              ? <EmptyState msg="No PCs found. Add your first PC." />
              : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                  {pcs.map(pc => (
                    <div className="col" key={pc._id}>
                      <div style={styles.pcCard} className="h-100">
                        <div style={styles.pcCardHeader}>
                          <div style={styles.pcCardIcon}>
                            <i className="bi bi-laptop-fill" style={{ color: '#1e90ff', fontSize: '1.1rem' }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={styles.pcCardTitle}>PC – {pc.pc_id}</div>
                            <div style={styles.pcCardSub}>{pc.deviceName}</div>
                          </div>
                          {actionStatusBadge(pc.actionStatus)}
                        </div>
                        <div style={styles.pcCardBody}>
                          <InfoRow icon="bi-person" label="User" value={pc.username} />
                          <InfoRow icon="bi-hdd-network" label="Network" value={pc.networkType} />
                          <InfoRow icon="bi-diagram-3" label="IP Address" value={pc.ipAddress} />
                          <InfoRow icon="bi-building" label="Department" value={pc.deptName} />
                        </div>
                        <div style={styles.pcCardFooter}>
                          <button
                            className="btn btn-sm"
                            style={styles.btnDetails}
                            onClick={() => navigate(`/pc/${pc.pc_id}`)}
                          >
                            <i className="bi bi-eye me-1" />
                            View Details
                          </button>
                          <button
                            className="btn btn-sm"
                            style={styles.btnEdit}
                            onClick={() => navigate(`/edit-pc/${pc.pc_id}`)}
                          >
                            <i className="bi bi-pencil me-1" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        )}

        {/* PC Status Table */}
        {activeTab === 'status' && (
          <div className="fade-in-up">
            <SectionHeader icon="bi-bar-chart-fill" title="PC Status Overview" color="#10b981">
              <span style={styles.sectionMeta}>{totalPcs} records</span>
            </SectionHeader>
            {loading ? <LoadingSpinner /> : pcs.length === 0
              ? <EmptyState msg="No PCs found." />
              : (
                <div style={styles.tableWrap}>
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>PC ID</th>
                        <th>Device Name</th>
                        <th>Username</th>
                        <th>Department</th>
                        <th>Network</th>
                        <th>OS Version</th>
                        <th>Action Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pcs.map(pc => (
                        <tr key={pc._id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/pc/${pc.pc_id}`)}>
                          <td><span style={styles.pcIdBadge}>{pc.pc_id}</span></td>
                          <td style={{ fontWeight: 600 }}>{pc.deviceName}</td>
                          <td>{pc.username}</td>
                          <td>{pc.deptName || '—'}</td>
                          <td><span style={styles.networkBadge}>{pc.networkType}</span></td>
                          <td style={{ color: '#4a5568', fontSize: '0.85rem' }}>{pc.osVersion || '—'}</td>
                          <td>{actionStatusBadge(pc.actionStatus)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            }
          </div>
        )}

        {/* Add User */}
        {activeTab === 'addUser' && (
          <div className="fade-in-up">
            <SectionHeader icon="bi-person-plus-fill" title="Create New User" color="#8b5cf6" />
            <AddUser />
          </div>
        )}

        {/* Add PC */}
        {activeTab === 'addPC' && (
          <div className="fade-in-up">
            <SectionHeader icon="bi-plus-circle-fill" title="Register New PC" color="#f59e0b" />
            <AddPC />
          </div>
        )}

        {/* Pending Requests */}
        {activeTab === 'requests' && (
          <div className="fade-in-up">
            <SectionHeader icon="bi-inbox-fill" title="Pending Requests" color="#ef4444">
              {pendingCount > 0 && (
                <span style={{ ...styles.badge, background: '#fee2e2', color: '#991b1b' }}>
                  {pendingCount} pending
                </span>
              )}
            </SectionHeader>
            <ViewRequests onUpdate={() => {
              api.get('/pcs').then(res => setPendingCount(res.data.filter(p => p.actionStatus === 'Pending').length)).catch(() => {});
            }} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Helper Sub-Components ── */
const SectionHeader = ({ icon, title, color, children }) => (
  <div style={headerStyles.wrap} className="mb-4">
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <span style={{ ...headerStyles.icon, background: `${color}18` }}>
        <i className={`bi ${icon}`} style={{ color, fontSize: '1rem' }} />
      </span>
      <h2 style={headerStyles.title}>{title}</h2>
    </div>
    {children}
  </div>
);

const LoadingSpinner = () => (
  <div className="text-center py-5">
    <div className="spinner-border" style={{ color: '#1e90ff', width: '2.5rem', height: '2.5rem' }} role="status" />
    <div style={{ color: '#718096', marginTop: '0.75rem', fontSize: '0.9rem' }}>Loading data…</div>
  </div>
);

const EmptyState = ({ msg }) => (
  <div className="text-center py-5">
    <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#cbd5e0' }} />
    <div style={{ color: '#718096', marginTop: '0.75rem', fontSize: '0.95rem' }}>{msg}</div>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
    <i className={`bi ${icon}`} style={{ color: '#718096', width: 16, fontSize: '0.8rem' }} />
    <span style={{ color: '#718096', fontSize: '0.78rem', minWidth: 70 }}>{label}</span>
    <span style={{ color: '#1a202c', fontSize: '0.82rem', fontWeight: 500, flex: 1 }}>{value || '—'}</span>
  </div>
);

/* ── Styles ── */
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
  headerEyebrow: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '0.4rem',
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
  headerActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  refreshBtn: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.8)',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '0.8rem',
    padding: '0.4rem 0.9rem',
  },
  statCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 14,
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    transition: 'all 0.25s ease',
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#0d1b2a',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '0.78rem',
    color: '#718096',
    fontWeight: 500,
    letterSpacing: '0.02em',
  },
  tabBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    borderBottom: '2px solid #e2e8f0',
    overflowX: 'auto',
    paddingBottom: '0',
  },
  tabBtn: {
    display: 'flex',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: '#718096',
    fontWeight: 600,
    fontSize: '0.85rem',
    padding: '0.75rem 1.1rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    marginBottom: '-2px',
    transition: 'all 0.2s ease',
    borderRadius: '8px 8px 0 0',
    position: 'relative',
  },
  tabBtnActive: {
    background: 'rgba(30,144,255,0.05)',
    color: '#1e90ff',
    borderBottom: '2px solid #1e90ff',
  },
  tabBadge: {
    background: '#ef4444',
    color: '#fff',
    borderRadius: 10,
    fontSize: '0.65rem',
    fontWeight: 700,
    padding: '0.15em 0.5em',
    marginLeft: '0.4rem',
    lineHeight: 1.4,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 6,
    padding: '0.25em 0.65em',
    fontSize: '0.75rem',
    fontWeight: 700,
  },
  sectionMeta: {
    background: '#f1f5f9',
    color: '#718096',
    borderRadius: 6,
    padding: '0.2em 0.65em',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  pcCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 14,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'all 0.25s ease',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  pcCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.1rem',
    borderBottom: '1px solid #f1f5f9',
    background: '#fafbfc',
  },
  pcCardIcon: {
    width: 40,
    height: 40,
    background: 'rgba(30,144,255,0.1)',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  pcCardTitle: {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: '#0d1b2a',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  pcCardSub: {
    fontSize: '0.75rem',
    color: '#718096',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  pcCardBody: {
    padding: '0.9rem 1.1rem',
    flex: 1,
  },
  pcCardFooter: {
    display: 'flex',
    gap: '0.5rem',
    padding: '0.75rem 1.1rem',
    borderTop: '1px solid #f1f5f9',
    background: '#fafbfc',
  },
  btnDetails: {
    flex: 1,
    background: 'rgba(30,144,255,0.08)',
    color: '#1e90ff',
    border: '1px solid rgba(30,144,255,0.2)',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: '0.8rem',
    padding: '0.4rem 0.6rem',
  },
  btnEdit: {
    flex: 1,
    background: 'rgba(245,158,11,0.08)',
    color: '#d97706',
    border: '1px solid rgba(245,158,11,0.2)',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: '0.8rem',
    padding: '0.4rem 0.6rem',
  },
  tableWrap: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  pcIdBadge: {
    background: 'rgba(30,144,255,0.1)',
    color: '#1e90ff',
    borderRadius: 6,
    padding: '0.2em 0.6em',
    fontSize: '0.8rem',
    fontWeight: 700,
  },
  networkBadge: {
    background: '#f0fdf4',
    color: '#065f46',
    borderRadius: 6,
    padding: '0.2em 0.6em',
    fontSize: '0.75rem',
    fontWeight: 700,
    border: '1px solid #d1fae5',
  },
};

const headerStyles = {
  wrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 800,
    color: '#0d1b2a',
    marginBottom: 0,
  },
};

export default AdminDashboard;
