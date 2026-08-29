// src/components/User/ViewPcDetails.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ViewPcDetails() {
  const [pcs,     setPcs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPcs = async () => {
      try {
        const res = await api.get('/pcs');
        setPcs(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch PCs.');
      } finally {
        setLoading(false);
      }
    };
    fetchPcs();
  }, []);

  const statusBadge = (status) => {
    const map = {
      Approved: { bg: '#d1fae5', color: '#065f46', icon: 'bi-check-circle-fill' },
      Pending:  { bg: '#fef3c7', color: '#d97706', icon: 'bi-clock-fill' },
      Rejected: { bg: '#fee2e2', color: '#991b1b', icon: 'bi-x-circle-fill' },
    };
    const s = map[status] || { bg: '#f1f5f9', color: '#64748b', icon: 'bi-circle' };
    return (
      <span style={{ background: s.bg, color: s.color, borderRadius: 6, padding: '0.3em 0.7em', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
        <i className={`bi ${s.icon}`} style={{ fontSize: '0.7rem' }} />{status}
      </span>
    );
  };

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border" style={{ color: '#1e90ff', width: '2.5rem', height: '2.5rem' }} role="status" />
      <div style={{ color: '#718096', marginTop: '0.75rem' }}>Loading your PCs…</div>
    </div>
  );

  if (error) return (
    <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', color: '#c53030', borderRadius: 10, padding: '1rem 1.2rem', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <i className="bi bi-exclamation-triangle-fill" />{error}
    </div>
  );

  if (pcs.length === 0) return (
    <div className="text-center py-4">
      <div style={{ width: 64, height: 64, background: 'rgba(30,144,255,0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
        <i className="bi bi-laptop" style={{ fontSize: '1.8rem', color: '#1e90ff' }} />
      </div>
      <h5 style={{ color: '#374151', fontWeight: 700 }}>No PCs Assigned</h5>
      <p style={{ color: '#718096', fontSize: '0.875rem' }}>You have no PCs registered to your account yet.</p>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#718096', fontWeight: 500 }}>
          <i className="bi bi-laptop me-1" />{pcs.length} PC{pcs.length !== 1 ? 's' : ''} found
        </span>
      </div>

      <div className="row g-3">
        {pcs.map((pc) => (
          <div className="col-12 col-md-6" key={pc._id}>
            <div style={styles.card}>
              {/* Card Header */}
              <div style={styles.cardHead}>
                <div style={styles.cardIcon}>
                  <i className="bi bi-laptop-fill" style={{ color: '#1e90ff', fontSize: '1.1rem' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={styles.deviceName}>{pc.deviceName}</div>
                  <div style={styles.pcIdText}>PC ID: {pc.pc_id}</div>
                </div>
                {statusBadge(pc.actionStatus)}
              </div>

              {/* Card Body */}
              <div style={styles.cardBody}>
                <div className="row g-2">
                  <Detail icon="bi-person"       label="Username"   value={pc.username} />
                  <Detail icon="bi-router"       label="IP Address" value={pc.ipAddress} />
                  <Detail icon="bi-diagram-3"    label="Network"    value={pc.networkType} />
                  <Detail icon="bi-building"     label="Department" value={pc.deptName} />
                  <Detail icon="bi-windows"      label="OS"         value={pc.osVersion} />
                  <Detail icon="bi-bug"          label="Antivirus"  value={pc.antivirusStatus} />
                </div>

                {/* Security Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.8rem' }}>
                  <SecurityChip label="Firewall" active={pc.firewallEnabled} />
                  <SecurityChip label="WSUS"     active={pc.wsusImplemented} />
                  <SecurityChip label="NTP"      active={pc.ntpStatus} />
                </div>
              </div>

              {/* Card Footer */}
              <div style={styles.cardFoot}>
                <button
                  style={styles.detailBtn}
                  onClick={() => navigate(`/pc/${pc.pc_id}`)}
                >
                  <i className="bi bi-eye me-1" />View Full Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Detail = ({ icon, label, value }) => (
  <div className="col-6">
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
      <i className={`bi ${icon}`} style={{ color: '#a0aec0', fontSize: '0.78rem', marginTop: '0.18rem', flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: '0.82rem', color: '#1a202c', fontWeight: 600, wordBreak: 'break-all' }}>{value || '—'}</div>
      </div>
    </div>
  </div>
);

const SecurityChip = ({ label, active }) => (
  <span style={{
    background: active ? '#d1fae5' : '#fee2e2',
    color: active ? '#065f46' : '#991b1b',
    border: `1px solid ${active ? '#a7f3d0' : '#fecaca'}`,
    borderRadius: 6,
    padding: '0.2em 0.6em',
    fontSize: '0.72rem',
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
  }}>
    <i className={`bi ${active ? 'bi-check-lg' : 'bi-x-lg'}`} style={{ fontSize: '0.65rem' }} />
    {label}
  </span>
);

const styles = {
  card: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    transition: 'all 0.25s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHead: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.1rem',
    borderBottom: '1px solid #f1f5f9',
    background: '#fafbfc',
  },
  cardIcon: {
    width: 40,
    height: 40,
    background: 'rgba(30,144,255,0.1)',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  deviceName: {
    fontSize: '0.925rem',
    fontWeight: 700,
    color: '#0d1b2a',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  pcIdText: { fontSize: '0.75rem', color: '#718096' },
  cardBody: {
    padding: '1rem 1.1rem',
    flex: 1,
  },
  cardFoot: {
    padding: '0.75rem 1.1rem',
    borderTop: '1px solid #f1f5f9',
    background: '#fafbfc',
  },
  detailBtn: {
    width: '100%',
    background: 'rgba(30,144,255,0.08)',
    color: '#1e90ff',
    border: '1px solid rgba(30,144,255,0.2)',
    borderRadius: 9,
    padding: '0.45rem 1rem',
    fontWeight: 700,
    fontSize: '0.82rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    transition: 'all 0.2s ease',
  },
};

export default ViewPcDetails;