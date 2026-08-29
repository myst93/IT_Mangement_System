// src/components/Admin/AddUser.jsx
import React, { useState } from 'react';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const emptyForm = {
  username:    '',
  password:    '',
  role:        'IT_Personnel',
  fullName:    '',
  designation: '',
};

const AddUser = () => {
  const [user, setUser]       = useState(emptyForm);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!user.username || !user.password || !user.fullName || !user.designation) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/users', user);
      setSuccess(res.data.message || 'User created successfully!');
      setUser(emptyForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'IT_Personnel', label: 'IT Personnel', icon: 'bi-person-badge',       color: '#1e90ff', desc: 'Can view PCs and submit edit requests' },
    { value: 'IT_Admin',     label: 'IT Administrator', icon: 'bi-shield-fill-check', color: '#8b5cf6', desc: 'Full access — manage users, PCs and approvals' },
  ];

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.cardHeader}>
        <div style={styles.headerIcon}>
          <i className="bi bi-person-plus-fill" style={{ color: '#8b5cf6', fontSize: '1.1rem' }} />
        </div>
        <div>
          <h3 style={styles.cardTitle}>Create New User</h3>
          <p style={styles.cardSubtitle}>Add an IT Personnel or Administrator account</p>
        </div>
      </div>

      {error   && <Alert type="error"   msg={error} />}
      {success && <Alert type="success" msg={success} />}

      <form onSubmit={handleSubmit} noValidate>
        {/* ── Role Selection ── */}
        <div style={styles.section} className="mb-4">
          <SectionLabel title="Role" icon="bi-shield-lock" color="#8b5cf6" />
          <div className="row g-3">
            {roleOptions.map(opt => (
              <div className="col-md-6" key={opt.value}>
                <label
                  htmlFor={`role-${opt.value}`}
                  style={{
                    ...styles.roleCard,
                    ...(user.role === opt.value ? { ...styles.roleCardActive, borderColor: opt.color } : {}),
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    id={`role-${opt.value}`}
                    name="role"
                    value={opt.value}
                    checked={user.role === opt.value}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                    <i className={`bi ${opt.icon}`} style={{ color: opt.color, fontSize: '1.1rem' }} />
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0d1b2a' }}>{opt.label}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#718096', marginBottom: 0 }}>{opt.desc}</p>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* ── Personal Info ── */}
        <div style={styles.section} className="mb-4">
          <SectionLabel title="Personal Information" icon="bi-person-vcard" color="#1e90ff" />
          <div className="row g-3">
            <div className="col-md-6">
              <FormField label="Full Name" icon="bi-person-fill" required>
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Dr. Ramesh Kumar"
                  required
                />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="Designation" icon="bi-briefcase-fill" required>
                <input
                  type="text"
                  name="designation"
                  value={user.designation}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Senior Scientist"
                  required
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* ── Credentials ── */}
        <div style={styles.section} className="mb-4">
          <SectionLabel title="Login Credentials" icon="bi-key-fill" color="#f59e0b" />
          <div className="row g-3">
            <div className="col-md-6">
              <FormField label="Username" icon="bi-at" required>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. r.kumar"
                  required
                  autoComplete="new-username"
                />
              </FormField>
            </div>
            <div className="col-md-6">
              <FormField label="Password" icon="bi-lock-fill" required>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Min. 8 characters"
                    required
                    autoComplete="new-password"
                    style={{ paddingRight: '2.6rem' }}
                  />
                  <button
                    type="button"
                    style={styles.eyeBtn}
                    onClick={() => setShowPass(!showPass)}
                    tabIndex={-1}
                  >
                    <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`} />
                  </button>
                </div>
              </FormField>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex justify-content-end gap-2 mt-2">
          <button
            type="button"
            className="btn"
            style={styles.resetBtn}
            onClick={() => { setUser(emptyForm); setError(''); setSuccess(''); }}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn"
            style={styles.submitBtn}
            disabled={loading}
            id="add-user-submit"
          >
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Creating…</>
              : <><i className="bi bi-person-check-fill me-2" />Create User</>
            }
          </button>
        </div>
      </form>
    </div>
  );
};

/* ── Shared ── */
const Alert = ({ type, msg }) => {
  const s = type === 'error'
    ? { bg: '#fff5f5', border: '#fed7d7', color: '#c53030', icon: 'bi-exclamation-triangle-fill' }
    : { bg: '#f0fff4', border: '#c6f6d5', color: '#276749', icon: 'bi-check-circle-fill' };
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, borderRadius: 10, padding: '0.8rem 1rem', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1.25rem', display: 'flex', alignItems: 'center' }}>
      <i className={`bi ${s.icon} me-2`} />{msg}
    </div>
  );
};

const SectionLabel = ({ title, icon, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem', paddingBottom: '0.6rem', borderBottom: '1px solid #e2e8f0' }}>
    <span style={{ width: 26, height: 26, background: `${color}18`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <i className={`bi ${icon}`} style={{ color, fontSize: '0.8rem' }} />
    </span>
    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', letterSpacing: '0.03em', textTransform: 'uppercase' }}>{title}</span>
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
    maxWidth: 860,
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
    background: 'rgba(139,92,246,0.1)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTitle: { fontSize: '1.15rem', fontWeight: 800, color: '#0d1b2a', marginBottom: '0.15rem' },
  cardSubtitle: { fontSize: '0.8rem', color: '#718096', marginBottom: 0 },
  section: {
    background: '#fafbfc',
    border: '1px solid #f1f5f9',
    borderRadius: 14,
    padding: '1.25rem',
  },
  roleCard: {
    display: 'block',
    background: '#fff',
    border: '2px solid #e2e8f0',
    borderRadius: 12,
    padding: '0.9rem 1rem',
    transition: 'all 0.2s ease',
    height: '100%',
  },
  roleCardActive: {
    background: '#faf5ff',
    borderColor: '#8b5cf6',
    boxShadow: '0 0 0 3px rgba(139,92,246,0.1)',
  },
  eyeBtn: {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#a0aec0',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    zIndex: 2,
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.9rem',
    padding: '0.6rem 1.75rem',
    borderRadius: 10,
    border: 'none',
    boxShadow: '0 4px 14px rgba(139,92,246,0.3)',
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

export default AddUser;