// src/components/User/PcDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function PcDetails() {
  const params   = useParams();
  const navigate = useNavigate();
  const [pc, setPc]     = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPc = async () => {
      try {
        let response;
        if (params.pc_id) {
          response = await api.get(`/pcs/by-pcid/${params.pc_id}`);
        } else if (params.id) {
          response = await api.get(`/pcs/${params.id}`);
        } else {
          setError('No PC identifier provided');
          return;
        }
        setPc(response.data);
      } catch (err) {
        setError('Failed to fetch PC details');
      }
    };
    fetchPc();
  }, [params.pc_id, params.id]);

  const statusConfig = {
    Approved: { bg: '#d1fae5', color: '#065f46', icon: 'bi-check-circle-fill', label: 'Approved' },
    Pending:  { bg: '#fef3c7', color: '#d97706', icon: 'bi-clock-fill',        label: 'Pending' },
    Rejected: { bg: '#fee2e2', color: '#991b1b', icon: 'bi-x-circle-fill',     label: 'Rejected' },
  };

  if (error) return (
    <div style={styles.page}>
      <div className="container py-5" style={{ maxWidth: 600 }}>
        <div style={styles.errorCard}>
          <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '2.5rem', color: '#ef4444' }} />
          <h5 style={{ fontWeight: 700, color: '#374151', marginTop: '0.75rem' }}>Error</h5>
          <p style={{ color: '#718096', marginBottom: '1.5rem' }}>{error}</p>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-2" />Go Back
          </button>
        </div>
      </div>
    </div>
  );

  if (!pc) return (
    <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="text-center">
        <div className="spinner-border" style={{ color: '#1e90ff', width: '3rem', height: '3rem' }} role="status" />
        <div style={{ color: '#718096', marginTop: '1rem', fontWeight: 500 }}>Loading PC details…</div>
      </div>
    </div>
  );

  const st = statusConfig[pc.actionStatus] || { bg: '#f1f5f9', color: '#64748b', icon: 'bi-circle', label: pc.actionStatus };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center gap-3 py-4">
            <button style={styles.backHeaderBtn} onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left" />
            </button>
            <div style={{ flex: 1 }}>
              <div style={styles.headerEye}>PC Record</div>
              <h1 style={styles.headerTitle}>{pc.deviceName}</h1>
            </div>
            <span style={{ background: st.bg, color: st.color, borderRadius: 8, padding: '0.45em 1em', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
              <i className={`bi ${st.icon}`} />{st.label}
            </span>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4 py-4" style={{ maxWidth: 900 }}>
        <div className="row g-4">

          {/* ── Left Column ── */}
          <div className="col-lg-7">
            {/* Identification */}
            <DetailCard title="Identification" icon="bi-fingerprint" color="#1e90ff">
              <div className="row g-3">
                <DetailItem label="PC ID"         value={pc.pc_id}          icon="bi-hash" />
                <DetailItem label="Device Name"    value={pc.deviceName}     icon="bi-laptop-fill" />
                <DetailItem label="Username"       value={pc.username}       icon="bi-person-fill" />
                <DetailItem label="Department"     value={pc.deptName}       icon="bi-building" />
                <DetailItem label="Network Type"   value={pc.networkType}    icon="bi-diagram-3" />
                <DetailItem label="Register Date"
                  value={pc.registerDate ? new Date(pc.registerDate).toLocaleDateString('en-IN') : '—'}
                  icon="bi-calendar3"
                />
              </div>
            </DetailCard>

            {/* Hardware */}
            <DetailCard title="Hardware" icon="bi-cpu" color="#8b5cf6">
              <div className="row g-3">
                <DetailItem label="PC Model"    value={pc.pcModel}    icon="bi-pc-display" />
                <DetailItem label="PC Serial"   value={pc.pcSerialNo} icon="bi-upc-scan" />
                <DetailItem label="CPU Serial"  value={pc.cpuSerialNo} icon="bi-cpu-fill" />
                <DetailItem label="OS Version"  value={pc.osVersion}  icon="bi-windows" />
              </div>
            </DetailCard>
          </div>

          {/* ── Right Column ── */}
          <div className="col-lg-5">
            {/* Network */}
            <DetailCard title="Network" icon="bi-hdd-network" color="#10b981">
              <div className="row g-3">
                <DetailItem label="IP Address"  value={pc.ipAddress}   icon="bi-router" />
                <DetailItem label="MAC Address" value={pc.macAddress}  icon="bi-ethernet" />
              </div>
            </DetailCard>

            {/* Security */}
            <DetailCard title="Security Status" icon="bi-shield-check" color="#ef4444">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <SecurityRow label="Antivirus"  icon="bi-bug-fill"            active={pc.antivirusStatus === 'Yes'} />
                <SecurityRow label="Firewall"   icon="bi-shield-fill-check"   active={pc.firewallEnabled} />
                <SecurityRow label="WSUS"       icon="bi-cloud-download-fill" active={pc.wsusImplemented} />
                <SecurityRow label="NTP Sync"   icon="bi-clock-fill"          active={pc.ntpStatus} />
              </div>
            </DetailCard>

            {/* Request Status */}
            <DetailCard title="Request Info" icon="bi-info-circle" color="#f59e0b">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Action Status</span>
                  <span style={{ background: st.bg, color: st.color, borderRadius: 6, padding: '0.2em 0.65em', fontSize: '0.78rem', fontWeight: 700 }}>{st.label}</span>
                </div>
                {pc.requestedBy && (
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Requested By</span>
                    <span style={styles.infoValue}>{pc.requestedBy?.fullName || pc.requestedBy?.username || '—'}</span>
                  </div>
                )}
                {pc.approvedBy && (
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Approved By</span>
                    <span style={styles.infoValue}>{pc.approvedBy?.fullName || pc.approvedBy?.username || '—'}</span>
                  </div>
                )}
              </div>
            </DetailCard>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-Components ── */
const DetailCard = ({ title, icon, color, children }) => (
  <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', marginBottom: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.9rem 1.1rem', background: '#fafbfc', borderBottom: '1px solid #f1f5f9' }}>
      <span style={{ width: 30, height: 30, background: `${color}18`, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <i className={`bi ${icon}`} style={{ color, fontSize: '0.875rem' }} />
      </span>
      <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>{title}</span>
    </div>
    <div style={{ padding: '1rem 1.1rem' }}>{children}</div>
  </div>
);

const DetailItem = ({ label, value, icon }) => (
  <div className="col-6">
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
      <i className={`bi ${icon}`} style={{ color: '#a0aec0', fontSize: '0.78rem', marginTop: '0.15rem', flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.3 }}>{label}</div>
        <div style={{ fontSize: '0.875rem', color: '#1a202c', fontWeight: 600, wordBreak: 'break-all' }}>{value || '—'}</div>
      </div>
    </div>
  </div>
);

const SecurityRow = ({ label, icon, active }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0.75rem', background: '#fafbfc', borderRadius: 9, border: '1px solid #f1f5f9' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <i className={`bi ${icon}`} style={{ color: active ? '#10b981' : '#ef4444', fontSize: '0.875rem' }} />
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>{label}</span>
    </div>
    <span style={{ background: active ? '#d1fae5' : '#fee2e2', color: active ? '#065f46' : '#991b1b', borderRadius: 6, padding: '0.2em 0.6em', fontSize: '0.75rem', fontWeight: 700 }}>
      {active ? 'Enabled' : 'Disabled'}
    </span>
  </div>
);

const styles = {
  page: { background: '#f0f4f8', minHeight: '100vh' },
  header: {
    background: 'linear-gradient(135deg, #0a1628 0%, #112240 100%)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  headerEye: { color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' },
  headerTitle: { color: '#fff', fontSize: '1.5rem', fontWeight: 800, marginBottom: 0 },
  backHeaderBtn: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: '0.5rem 0.85rem',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  errorCard: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '3rem', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  backBtn: {
    background: '#f1f5f9', color: '#374151', border: 'none',
    fontWeight: 600, fontSize: '0.875rem', padding: '0.6rem 1.25rem',
    borderRadius: 10, cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
    margin: 0,
  },
  infoRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' },
  infoLabel: { fontSize: '0.8rem', color: '#718096', fontWeight: 600 },
  infoValue: { fontSize: '0.82rem', color: '#1a202c', fontWeight: 600 },
};

export default PcDetails;