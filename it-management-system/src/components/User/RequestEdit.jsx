// src/components/User/RequestEdit.jsx
import React, { useState } from 'react';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const emptyForm = {
  pc_id:          '',
  networkType:    'DRONA',
  deptName:       '',
  username:       '',
  deviceName:     '',
  macAddress:     '',
  ipAddress:      '',
  osVersion:      '',
  cpuSerialNo:    '',
  pcModel:        '',
  pcSerialNo:     '',
  antivirusStatus: 'Yes',
  firewallEnabled: true,
  wsusImplemented: true,
  ntpStatus:       true,
};

const RequestEdit = () => {
  const [form, setForm]       = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState(''); // 'success' | 'error'
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.pc_id) {
      setMsgType('error');
      setMessage('PC ID is required to submit an edit request.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await api.post('/pcs/request-edit', form);
      setMsgType('success');
      setMessage('Edit request submitted successfully! Awaiting admin approval.');
      setForm(emptyForm);
    } catch (err) {
      setMsgType('error');
      setMessage(err.response?.data?.message || 'Failed to submit request. Please try again.');
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
          checked={form[name]}
          onChange={handleChange}
          style={{ width: '2.5em', height: '1.3em', cursor: 'pointer' }}
        />
      </div>
    </div>
  );

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.cardHeader}>
        <div style={styles.headerIcon}>
          <i className="bi bi-pencil-square" style={{ color: '#8b5cf6', fontSize: '1.1rem' }} />
        </div>
        <div>
          <h3 style={styles.cardTitle}>Request PC Edit</h3>
          <p style={styles.cardSubtitle}>
            Submit a change request — an admin will review and approve it
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div style={styles.infoBanner}>
        <i className="bi bi-info-circle-fill me-2" style={{ color: '#1e90ff', fontSize: '1rem' }} />
        <span>
          Enter the <strong>PC ID</strong> and only fill in the fields you want to change.
          Leave others blank if they remain the same.
        </span>
      </div>

      {/* Message */}
      {message && (
        <div style={msgType === 'success' ? styles.successAlert : styles.errorAlert}>
          <i className={`bi ${msgType === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`} />
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* ── PC Identification ── */}
        <FormSection title="PC Identification" icon="bi-fingerprint" color="#ef4444">
          <div className="row g-3">
            <div className="col-md-6">
              <FormField label="PC ID" icon="bi-hash" required>
                <input
                  type="number"
                  name="pc_id"
                  value={form.pc_id}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter the PC ID to edit"
                  required
                />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="Network Type" icon="bi-diagram-3">
                <select name="networkType" value={form.networkType} onChange={handleChange} className="form-select">
                  <option value="DRONA">DRONA</option>
                  <option value="CIAG">CIAG</option>
                  <option value="STANDALONE">STANDALONE</option>
                  <option value="NKN">NKN</option>
                </select>
              </FormField>
            </div>
          </div>
        </FormSection>

        {/* ── PC Info ── */}
        <FormSection title="PC Information (Optional Fields)" icon="bi-laptop" color="#1e90ff">
          <div className="row g-3">
            <div className="col-md-6">
              <FormField label="Device Name" icon="bi-laptop">
                <input type="text" name="deviceName" value={form.deviceName} onChange={handleChange} className="form-control" placeholder="Leave blank to keep current" />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="Assigned Username" icon="bi-person">
                <input type="text" name="username" value={form.username} onChange={handleChange} className="form-control" placeholder="Leave blank to keep current" />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="Department" icon="bi-building">
                <input type="text" name="deptName" value={form.deptName} onChange={handleChange} className="form-control" placeholder="Leave blank to keep current" />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="PC Model" icon="bi-pc-display">
                <input type="text" name="pcModel" value={form.pcModel} onChange={handleChange} className="form-control" placeholder="Leave blank to keep current" />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="PC Serial No" icon="bi-upc-scan">
                <input type="text" name="pcSerialNo" value={form.pcSerialNo} onChange={handleChange} className="form-control" placeholder="Leave blank to keep current" />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="CPU Serial No" icon="bi-cpu-fill">
                <input type="text" name="cpuSerialNo" value={form.cpuSerialNo} onChange={handleChange} className="form-control" placeholder="Leave blank to keep current" />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="OS Version" icon="bi-windows">
                <input type="text" name="osVersion" value={form.osVersion} onChange={handleChange} className="form-control" placeholder="Leave blank to keep current" />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="IP Address" icon="bi-router">
                <input type="text" name="ipAddress" value={form.ipAddress} onChange={handleChange} className="form-control" placeholder="Leave blank to keep current" />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="MAC Address" icon="bi-ethernet">
                <input type="text" name="macAddress" value={form.macAddress} onChange={handleChange} className="form-control" placeholder="Leave blank to keep current" />
              </FormField>
            </div>
          </div>
        </FormSection>

        {/* ── Security ── */}
        <FormSection title="Security Status" icon="bi-shield-check" color="#10b981">
          <div className="row g-3">
            <div className="col-md-6">
              <FormField label="Antivirus Status" icon="bi-bug-fill">
                <select name="antivirusStatus" value={form.antivirusStatus} onChange={handleChange} className="form-select">
                  <option value="Yes">Installed ✓</option>
                  <option value="No">Not Installed</option>
                </select>
              </FormField>
            </div>
            <div className="col-md-6 d-flex flex-column gap-2 justify-content-end">
              <Toggle name="firewallEnabled"  label="Firewall Enabled"  icon="bi-shield-fill-check" />
              <Toggle name="wsusImplemented"  label="WSUS Implemented"  icon="bi-cloud-download-fill" />
              <Toggle name="ntpStatus"        label="NTP Synchronized"  icon="bi-clock-fill" />
            </div>
          </div>
        </FormSection>

        {/* Actions */}
        <div className="d-flex justify-content-end gap-2 mt-2">
          <button
            type="button"
            className="btn"
            style={styles.resetBtn}
            onClick={() => { setForm(emptyForm); setMessage(''); }}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn"
            style={styles.submitBtn}
            disabled={loading}
            id="request-edit-submit"
          >
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Submitting…</>
              : <><i className="bi bi-send-fill me-2" />Submit Request</>
            }
          </button>
        </div>
      </form>
    </div>
  );
};

/* ── Helpers ── */
const FormSection = ({ title, icon, color, children }) => (
  <div style={{ marginBottom: '1.5rem', background: '#fafbfc', border: '1px solid #f1f5f9', borderRadius: 14, padding: '1.25rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
      <span style={{ width: 30, height: 30, background: `${color}18`, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <i className={`bi ${icon}`} style={{ color, fontSize: '0.9rem' }} />
      </span>
      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#374151', letterSpacing: '0.02em' }}>{title}</span>
    </div>
    {children}
  </div>
);

const FormField = ({ label, icon, required, children }) => (
  <div>
    <label className="form-label">
      <i className={`bi ${icon} me-1`} style={{ color: '#a0aec0', fontSize: '0.8rem' }} />
      {label}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
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
    marginBottom: '1.25rem',
    paddingBottom: '1.25rem',
    borderBottom: '1px solid #f1f5f9',
  },
  headerIcon: {
    width: 46,
    height: 46,
    background: 'rgba(139,92,246,0.1)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#0d1b2a', marginBottom: '0.15rem' },
  cardSubtitle: { fontSize: '0.8rem', color: '#718096', marginBottom: 0 },
  infoBanner: {
    background: 'rgba(30,144,255,0.06)',
    border: '1px solid rgba(30,144,255,0.2)',
    borderRadius: 10,
    padding: '0.8rem 1rem',
    fontSize: '0.84rem',
    color: '#2d4a7a',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.25rem',
  },
  successAlert: {
    background: '#f0fff4', border: '1px solid #c6f6d5', color: '#276749',
    borderRadius: 10, padding: '0.8rem 1rem', fontSize: '0.875rem', fontWeight: 500,
    marginBottom: '1.25rem', display: 'flex', alignItems: 'center',
  },
  errorAlert: {
    background: '#fff5f5', border: '1px solid #fed7d7', color: '#c53030',
    borderRadius: 10, padding: '0.8rem 1rem', fontSize: '0.875rem', fontWeight: 500,
    marginBottom: '1.25rem', display: 'flex', alignItems: 'center',
  },
  toggleRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: '#f8fafc', border: '1.5px solid #e2e8f0',
    borderRadius: 10, padding: '0.65rem 0.9rem',
  },
  toggleLabel: { fontSize: '0.875rem', fontWeight: 600, color: '#4a5568' },
  submitBtn: {
    background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    color: '#fff', fontWeight: 700, fontSize: '0.9rem',
    padding: '0.6rem 1.75rem', borderRadius: 10, border: 'none',
    boxShadow: '0 4px 14px rgba(139,92,246,0.3)', cursor: 'pointer',
    display: 'flex', alignItems: 'center',
  },
  resetBtn: {
    background: '#f1f5f9', color: '#718096', border: 'none',
    fontWeight: 600, fontSize: '0.85rem', padding: '0.55rem 1.25rem', borderRadius: 10,
  },
};

export default RequestEdit;