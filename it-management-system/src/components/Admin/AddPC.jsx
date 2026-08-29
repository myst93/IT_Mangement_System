// src/components/Admin/AddPC.jsx
import React, { useState } from 'react';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const emptyForm = {
  pc_id: '',
  registerDate: '',
  networkType: 'DRONA',
  deptName: '',
  username: '',
  deviceName: '',
  macAddress: '',
  ipAddress: '',
  osVersion: '',
  cpuSerialNo: '',
  pcModel: '',
  pcSerialNo: '',
  antivirusStatus: 'Yes',
  firewallEnabled: true,
  wsusImplemented: true,
  ntpStatus: true,
};

const AddPC = () => {
  const [pc, setPC]         = useState(emptyForm);
  const [error, setError]   = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPC({ ...pc, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const payload = {
        ...pc,
        pc_id: Number(pc.pc_id),
        registerDate: new Date(pc.registerDate),
      };
      await api.post('/pcs', payload);
      setSuccess('PC registered successfully!');
      setPC(emptyForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Toggle = ({ name, label, icon }) => (
    <div style={styles.toggleRow}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <i className={`bi ${icon}`} style={{ color: '#718096', fontSize: '0.9rem' }} />
        <span style={styles.toggleLabel}>{label}</span>
      </div>
      <div className="form-check form-switch mb-0">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id={`switch-${name}`}
          name={name}
          checked={pc[name]}
          onChange={handleChange}
          style={{ width: '2.5em', height: '1.3em', cursor: 'pointer' }}
        />
      </div>
    </div>
  );

  return (
    <div style={styles.card}>
      {/* Card Header */}
      <div style={styles.cardHeader}>
        <div style={styles.headerIcon}>
          <i className="bi bi-plus-circle-fill" style={{ color: '#f59e0b', fontSize: '1.1rem' }} />
        </div>
        <div>
          <h3 style={styles.cardTitle}>Register New PC</h3>
          <p style={styles.cardSubtitle}>Fill in all details to add a PC to the inventory</p>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div style={styles.errorAlert} role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2" />
          {error}
        </div>
      )}
      {success && (
        <div style={styles.successAlert} role="alert">
          <i className="bi bi-check-circle-fill me-2" />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* ── Section: Identification ── */}
        <FormSection title="Identification" icon="bi-fingerprint" color="#1e90ff">
          <div className="row g-3">
            <div className="col-md-6">
              <FormField label="PC ID" icon="bi-hash" required>
                <input
                  type="number"
                  name="pc_id"
                  value={pc.pc_id}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. 1001"
                  required
                />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="Register Date" icon="bi-calendar3" required>
                <input
                  type="date"
                  name="registerDate"
                  value={pc.registerDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="Device Name" icon="bi-laptop" required>
                <input
                  type="text"
                  name="deviceName"
                  value={pc.deviceName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. DRDO-WS-001"
                  required
                />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="Assigned Username" icon="bi-person" required>
                <input
                  type="text"
                  name="username"
                  value={pc.username}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. john.doe"
                  required
                />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="Department" icon="bi-building" required>
                <input
                  type="text"
                  name="deptName"
                  value={pc.deptName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Aeronautics Division"
                  required
                />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="Network Type" icon="bi-diagram-3" required>
                <select
                  name="networkType"
                  value={pc.networkType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="DRONA">DRONA</option>
                  <option value="CIAG">CIAG</option>
                  <option value="STANDALONE">STANDALONE</option>
                  <option value="NKN">NKN</option>
                </select>
              </FormField>
            </div>
          </div>
        </FormSection>

        {/* ── Section: Hardware ── */}
        <FormSection title="Hardware Details" icon="bi-cpu" color="#8b5cf6">
          <div className="row g-3">
            <div className="col-md-6">
              <FormField label="PC Model" icon="bi-pc-display" required>
                <input
                  type="text"
                  name="pcModel"
                  value={pc.pcModel}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Dell OptiPlex 7090"
                  required
                />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="PC Serial No" icon="bi-upc-scan" required>
                <input
                  type="text"
                  name="pcSerialNo"
                  value={pc.pcSerialNo}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. SRV-2024-0042"
                  required
                />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="CPU Serial No" icon="bi-cpu-fill" required>
                <input
                  type="text"
                  name="cpuSerialNo"
                  value={pc.cpuSerialNo}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. CPU-XYZ-123"
                  required
                />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="OS Version" icon="bi-windows" required>
                <input
                  type="text"
                  name="osVersion"
                  value={pc.osVersion}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Windows 11 Pro 22H2"
                  required
                />
              </FormField>
            </div>
          </div>
        </FormSection>

        {/* ── Section: Network ── */}
        <FormSection title="Network Configuration" icon="bi-hdd-network" color="#10b981">
          <div className="row g-3">
            <div className="col-md-6">
              <FormField label="IP Address" icon="bi-router" required>
                <input
                  type="text"
                  name="ipAddress"
                  value={pc.ipAddress}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. 192.168.1.100"
                  required
                />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="MAC Address" icon="bi-ethernet" required>
                <input
                  type="text"
                  name="macAddress"
                  value={pc.macAddress}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. AA:BB:CC:DD:EE:FF"
                  required
                />
              </FormField>
            </div>
          </div>
        </FormSection>

        {/* ── Section: Security ── */}
        <FormSection title="Security Status" icon="bi-shield-check" color="#ef4444">
          <div className="row g-3">
            <div className="col-md-6">
              <FormField label="Antivirus Status" icon="bi-bug-fill" required>
                <select
                  name="antivirusStatus"
                  value={pc.antivirusStatus}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Yes">Installed ✓</option>
                  <option value="No">Not Installed</option>
                </select>
              </FormField>
            </div>
            <div className="col-md-6 d-flex flex-column gap-2">
              <Toggle name="firewallEnabled"  label="Firewall Enabled"  icon="bi-shield-fill-check" />
              <Toggle name="wsusImplemented"  label="WSUS Implemented"  icon="bi-cloud-download-fill" />
              <Toggle name="ntpStatus"        label="NTP Synchronized"  icon="bi-clock-fill" />
            </div>
          </div>
        </FormSection>

        {/* Submit */}
        <div className="text-end mt-4">
          <button
            type="button"
            className="btn btn-sm me-2"
            style={styles.resetBtn}
            onClick={() => { setPC(emptyForm); setError(''); setSuccess(''); }}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn"
            style={styles.submitBtn}
            disabled={loading}
            id="add-pc-submit"
          >
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Registering…</>
              : <><i className="bi bi-plus-circle me-2" />Register PC</>
            }
          </button>
        </div>
      </form>
    </div>
  );
};

/* ── Shared Sub-Components ── */
const FormSection = ({ title, icon, color, children }) => (
  <div style={sectionStyles.wrap}>
    <div style={sectionStyles.header}>
      <span style={{ ...sectionStyles.icon, background: `${color}18` }}>
        <i className={`bi ${icon}`} style={{ color, fontSize: '0.9rem' }} />
      </span>
      <span style={sectionStyles.title}>{title}</span>
    </div>
    {children}
  </div>
);

const FormField = ({ label, icon, required, children }) => (
  <div>
    <label className="form-label">
      <i className={`bi ${icon} me-1`} style={{ color: '#a0aec0', fontSize: '0.8rem' }} />
      {label}
      {required && <span style={{ color: '#ef4444', marginLeft: '0.2rem' }}>*</span>}
    </label>
    {children}
  </div>
);

const styles = {
  card: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 16,
    padding: '2rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    marginBottom: '1.5rem',
    paddingBottom: '1.25rem',
    borderBottom: '1px solid #f1f5f9',
  },
  headerIcon: {
    width: 46,
    height: 46,
    background: 'rgba(245,158,11,0.1)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: '#0d1b2a',
    marginBottom: '0.15rem',
  },
  cardSubtitle: {
    fontSize: '0.8rem',
    color: '#718096',
    marginBottom: 0,
  },
  errorAlert: {
    background: '#fff5f5',
    border: '1px solid #fed7d7',
    color: '#c53030',
    borderRadius: 10,
    padding: '0.8rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '1.25rem',
    display: 'flex',
    alignItems: 'center',
  },
  successAlert: {
    background: '#f0fff4',
    border: '1px solid #c6f6d5',
    color: '#276749',
    borderRadius: 10,
    padding: '0.8rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '1.25rem',
    display: 'flex',
    alignItems: 'center',
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: 10,
    padding: '0.65rem 0.9rem',
  },
  toggleLabel: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#4a5568',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #1e90ff, #0070e0)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.9rem',
    padding: '0.6rem 1.75rem',
    borderRadius: 10,
    border: 'none',
    boxShadow: '0 4px 14px rgba(30,144,255,0.3)',
  },
  resetBtn: {
    background: '#f1f5f9',
    color: '#718096',
    border: 'none',
    fontWeight: 600,
    fontSize: '0.85rem',
    padding: '0.55rem 1.25rem',
    borderRadius: 10,
  },
};

const sectionStyles = {
  wrap: {
    marginBottom: '1.75rem',
    padding: '1.25rem',
    background: '#fafbfc',
    border: '1px solid #f1f5f9',
    borderRadius: 14,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginBottom: '1.1rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #e2e8f0',
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  title: {
    fontSize: '0.875rem',
    fontWeight: 700,
    color: '#374151',
    letterSpacing: '0.02em',
  },
};

export default AddPC;