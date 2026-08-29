// src/components/Admin/EditPC.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function EditPC() {
  const { pc_id } = useParams();
  const navigate  = useNavigate();
  const [pc, setPc]       = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  useEffect(() => {
    api.get(`/pcs/by-pcid/${pc_id}`)
      .then(res => setPc(res.data))
      .catch(() => setError('Failed to load PC details. Please go back and try again.'));
  }, [pc_id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPc({ ...pc, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      await api.put(`/pcs/${pc._id}`, pc);
      setSaved(true);
      setTimeout(() => navigate(-1), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  if (error && !pc) return (
    <div style={styles.page}>
      <div className="container" style={{ maxWidth: 600, paddingTop: '3rem' }}>
        <div style={styles.errorCard}>
          <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '2rem', color: '#ef4444', marginBottom: '0.75rem' }} />
          <h5 style={{ fontWeight: 700, color: '#374151' }}>Error Loading PC</h5>
          <p style={{ color: '#718096', marginBottom: '1.25rem' }}>{error}</p>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-2" />Back
          </button>
        </div>
      </div>
    </div>
  );

  if (!pc) return (
    <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center">
        <div className="spinner-border" style={{ color: '#1e90ff', width: '3rem', height: '3rem' }} role="status" />
        <div style={{ color: '#718096', marginTop: '1rem' }}>Loading PC details…</div>
      </div>
    </div>
  );

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
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center gap-3 py-4">
            <button style={styles.backBtn} onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left" />
            </button>
            <div>
              <div style={styles.headerEye}>Editing PC Record</div>
              <h1 style={styles.headerTitle}>PC – {pc.pc_id} &nbsp;<span style={styles.deviceName}>{pc.deviceName}</span></h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4 py-4" style={{ maxWidth: 900 }}>

        {error && (
          <div style={styles.errorAlert}><i className="bi bi-exclamation-triangle-fill me-2" />{error}</div>
        )}
        {saved && (
          <div style={styles.successAlert}><i className="bi bi-check-circle-fill me-2" />Changes saved! Redirecting…</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ── Identification ── */}
          <FormSection title="Identification" icon="bi-fingerprint" color="#1e90ff">
            <div className="row g-3">
              <div className="col-md-4">
                <FormField label="PC ID" icon="bi-hash">
                  <input type="number" name="pc_id" value={pc.pc_id} className="form-control" disabled
                    style={{ background: '#f1f5f9', color: '#718096', cursor: 'not-allowed' }} />
                  <small style={{ color: '#a0aec0', fontSize: '0.73rem' }}>PC ID cannot be changed</small>
                </FormField>
              </div>
              <div className="col-md-4">
                <FormField label="Register Date" icon="bi-calendar3" required>
                  <input type="date" name="registerDate"
                    value={pc.registerDate ? pc.registerDate.substring(0, 10) : ''}
                    onChange={handleChange} className="form-control" required />
                </FormField>
              </div>
              <div className="col-md-4">
                <FormField label="Network Type" icon="bi-diagram-3" required>
                  <select name="networkType" value={pc.networkType} onChange={handleChange} className="form-select">
                    <option value="DRONA">DRONA</option>
                    <option value="CIAG">CIAG</option>
                    <option value="STANDALONE">STANDALONE</option>
                    <option value="NKN">NKN</option>
                  </select>
                </FormField>
              </div>
              <div className="col-md-6">
                <FormField label="Device Name" icon="bi-laptop" required>
                  <input type="text" name="deviceName" value={pc.deviceName} onChange={handleChange} className="form-control" required />
                </FormField>
              </div>
              <div className="col-md-6">
                <FormField label="Assigned Username" icon="bi-person" required>
                  <input type="text" name="username" value={pc.username} onChange={handleChange} className="form-control" required />
                </FormField>
              </div>
              <div className="col-md-6">
                <FormField label="Department" icon="bi-building" required>
                  <input type="text" name="deptName" value={pc.deptName} onChange={handleChange} className="form-control" required />
                </FormField>
              </div>
            </div>
          </FormSection>

          {/* ── Hardware ── */}
          <FormSection title="Hardware Details" icon="bi-cpu" color="#8b5cf6">
            <div className="row g-3">
              <div className="col-md-6">
                <FormField label="PC Model" icon="bi-pc-display" required>
                  <input type="text" name="pcModel" value={pc.pcModel} onChange={handleChange} className="form-control" required />
                </FormField>
              </div>
              <div className="col-md-6">
                <FormField label="PC Serial No" icon="bi-upc-scan" required>
                  <input type="text" name="pcSerialNo" value={pc.pcSerialNo} onChange={handleChange} className="form-control" required />
                </FormField>
              </div>
              <div className="col-md-6">
                <FormField label="CPU Serial No" icon="bi-cpu-fill" required>
                  <input type="text" name="cpuSerialNo" value={pc.cpuSerialNo} onChange={handleChange} className="form-control" required />
                </FormField>
              </div>
              <div className="col-md-6">
                <FormField label="OS Version" icon="bi-windows" required>
                  <input type="text" name="osVersion" value={pc.osVersion} onChange={handleChange} className="form-control" required />
                </FormField>
              </div>
            </div>
          </FormSection>

          {/* ── Network ── */}
          <FormSection title="Network Configuration" icon="bi-hdd-network" color="#10b981">
            <div className="row g-3">
              <div className="col-md-6">
                <FormField label="IP Address" icon="bi-router" required>
                  <input type="text" name="ipAddress" value={pc.ipAddress} onChange={handleChange} className="form-control" required />
                </FormField>
              </div>
              <div className="col-md-6">
                <FormField label="MAC Address" icon="bi-ethernet" required>
                  <input type="text" name="macAddress" value={pc.macAddress} onChange={handleChange} className="form-control" required />
                </FormField>
              </div>
            </div>
          </FormSection>

          {/* ── Security ── */}
          <FormSection title="Security Status" icon="bi-shield-check" color="#ef4444">
            <div className="row g-3">
              <div className="col-md-6">
                <FormField label="Antivirus Status" icon="bi-bug-fill" required>
                  <select name="antivirusStatus" value={pc.antivirusStatus} onChange={handleChange} className="form-select">
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
          <div className="d-flex justify-content-between align-items-center mt-2">
            <button type="button" style={styles.cancelBtn} onClick={() => navigate(-1)}>
              <i className="bi bi-x-lg me-1" />Cancel
            </button>
            <button type="submit" style={styles.saveBtn} disabled={saving} id="edit-pc-save">
              {saving
                ? <><span className="spinner-border spinner-border-sm me-2" />Saving…</>
                : <><i className="bi bi-floppy me-2" />Save Changes</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
  page: { background: '#f0f4f8', minHeight: '100vh' },
  header: {
    background: 'linear-gradient(135deg, #0a1628 0%, #112240 100%)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  headerEye: { color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' },
  headerTitle: { color: '#fff', fontSize: '1.5rem', fontWeight: 800, marginBottom: 0 },
  deviceName: { color: 'rgba(255,255,255,0.55)', fontWeight: 400, fontSize: '1.1rem' },
  backBtn: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: '0.5rem 0.85rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    margin: 0,
    flexShrink: 0,
  },
  errorCard: {
    background: '#fff',
    border: '1px solid #fed7d7',
    borderRadius: 16,
    padding: '2.5rem',
    textAlign: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  errorAlert: {
    background: '#fff5f5', border: '1px solid #fed7d7', color: '#c53030',
    borderRadius: 10, padding: '0.8rem 1rem', fontSize: '0.875rem', fontWeight: 500,
    marginBottom: '1.25rem', display: 'flex', alignItems: 'center',
  },
  successAlert: {
    background: '#f0fff4', border: '1px solid #c6f6d5', color: '#276749',
    borderRadius: 10, padding: '0.8rem 1rem', fontSize: '0.875rem', fontWeight: 500,
    marginBottom: '1.25rem', display: 'flex', alignItems: 'center',
  },
  toggleRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: '#f8fafc', border: '1.5px solid #e2e8f0',
    borderRadius: 10, padding: '0.65rem 0.9rem',
  },
  toggleLabel: { fontSize: '0.875rem', fontWeight: 600, color: '#4a5568' },
  saveBtn: {
    background: 'linear-gradient(135deg, #1e90ff, #0070e0)',
    color: '#fff', fontWeight: 700, fontSize: '0.9rem',
    padding: '0.65rem 1.75rem', borderRadius: 10, border: 'none',
    boxShadow: '0 4px 14px rgba(30,144,255,0.3)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', margin: 0, transition: 'all 0.2s ease',
  },
  cancelBtn: {
    background: '#f1f5f9', color: '#718096', border: 'none',
    fontWeight: 600, fontSize: '0.875rem', padding: '0.6rem 1.25rem',
    borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center',
    margin: 0, transition: 'all 0.2s ease',
  },
};

export default EditPC;