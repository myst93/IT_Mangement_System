// src/components/Admin/ViewRequests.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewRequests = ({ onUpdate }) => {
  const [requests, setRequests] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');
  const [actioning, setActioning] = useState(''); // id being acted on

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get('/pcs?actionStatus=Pending');
      setRequests(res.data);
    } catch (err) {
      setError('Failed to fetch pending requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleAction = async (id, action) => {
    setActioning(id + action);
    try {
      await api.patch(`/pcs/${id}/${action}`);
      await fetchRequests();
      if (onUpdate) onUpdate();
    } catch (err) {
      setError(`Failed to ${action} request.`);
    } finally {
      setActioning('');
    }
  };

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border" style={{ color: '#ef4444', width: '2.5rem', height: '2.5rem' }} role="status" />
      <div style={{ color: '#718096', marginTop: '0.75rem', fontSize: '0.9rem' }}>Loading requests…</div>
    </div>
  );

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.headerIcon}>
          <i className="bi bi-inbox-fill" style={{ color: '#ef4444', fontSize: '1.1rem' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={styles.cardTitle}>Pending Requests</h3>
          <p style={styles.cardSubtitle}>Review and approve or reject IT Personnel change requests</p>
        </div>
        <button
          className="btn btn-sm"
          style={styles.refreshBtn}
          onClick={fetchRequests}
          title="Refresh"
        >
          <i className="bi bi-arrow-clockwise" />
        </button>
      </div>

      {error && (
        <div style={styles.errorAlert}>
          <i className="bi bi-exclamation-triangle-fill me-2" />{error}
        </div>
      )}

      {requests.length === 0 ? (
        <div className="text-center py-5">
          <div style={styles.emptyIcon}>
            <i className="bi bi-inbox" style={{ fontSize: '2rem', color: '#10b981' }} />
          </div>
          <h5 style={{ color: '#374151', fontWeight: 700, marginTop: '0.75rem' }}>All Clear!</h5>
          <p style={{ color: '#718096', fontSize: '0.875rem' }}>No pending requests at this time.</p>
        </div>
      ) : (
        <div style={styles.tableWrap}>
          <table className="table table-hover mb-0" style={{ fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th>PC ID</th>
                <th>Requested By</th>
                <th>Request Type</th>
                <th>Pending Changes</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>
                    <span style={styles.pcIdBadge}>{req.pc_id}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0d1b2a', fontSize: '0.85rem' }}>
                      {req.requestedBy?.fullName || req.requestedBy?.username || 'N/A'}
                    </div>
                    {req.requestedBy?.username && req.requestedBy?.fullName && (
                      <div style={{ fontSize: '0.75rem', color: '#718096' }}>@{req.requestedBy.username}</div>
                    )}
                  </td>
                  <td>
                    <span style={req.isDeleteRequest ? styles.deleteBadge : styles.editBadge}>
                      <i className={`bi ${req.isDeleteRequest ? 'bi-trash-fill' : 'bi-pencil-fill'} me-1`} />
                      {req.isDeleteRequest ? 'Delete Request' : 'Edit Request'}
                    </span>
                  </td>
                  <td>
                    {req.pendingEdit && Object.keys(req.pendingEdit).length > 0 ? (
                      <div style={{ maxWidth: 200 }}>
                        {Object.entries(req.pendingEdit).slice(0, 3).map(([k, v]) => (
                          <div key={k} style={{ fontSize: '0.75rem', color: '#718096' }}>
                            <span style={{ fontWeight: 600, color: '#374151' }}>{k}:</span> {String(v)}
                          </div>
                        ))}
                        {Object.keys(req.pendingEdit).length > 3 && (
                          <div style={{ fontSize: '0.72rem', color: '#a0aec0' }}>
                            +{Object.keys(req.pendingEdit).length - 3} more fields
                          </div>
                        )}
                      </div>
                    ) : (
                      <span style={{ color: '#a0aec0', fontSize: '0.8rem' }}>—</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button
                        style={styles.approveBtn}
                        onClick={() => handleAction(req._id, 'approve')}
                        disabled={actioning === req._id + 'approve'}
                        title="Approve"
                      >
                        {actioning === req._id + 'approve'
                          ? <span className="spinner-border spinner-border-sm" />
                          : <><i className="bi bi-check-lg me-1" />Approve</>
                        }
                      </button>
                      <button
                        style={styles.rejectBtn}
                        onClick={() => handleAction(req._id, 'reject')}
                        disabled={actioning === req._id + 'reject'}
                        title="Reject"
                      >
                        {actioning === req._id + 'reject'
                          ? <span className="spinner-border spinner-border-sm" />
                          : <><i className="bi bi-x-lg me-1" />Reject</>
                        }
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    padding: '1.4rem 1.6rem',
    borderBottom: '1px solid #f1f5f9',
    background: '#fafbfc',
  },
  headerIcon: {
    width: 46,
    height: 46,
    background: 'rgba(239,68,68,0.1)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#0d1b2a', marginBottom: '0.15rem' },
  cardSubtitle: { fontSize: '0.8rem', color: '#718096', marginBottom: 0 },
  refreshBtn: {
    background: '#f1f5f9',
    border: 'none',
    color: '#718096',
    borderRadius: 8,
    padding: '0.45rem 0.7rem',
    fontWeight: 600,
  },
  errorAlert: {
    background: '#fff5f5',
    border: '1px solid #fed7d7',
    color: '#c53030',
    borderRadius: 10,
    padding: '0.8rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    margin: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  emptyIcon: {
    width: 64,
    height: 64,
    background: '#f0fff4',
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  pcIdBadge: {
    background: 'rgba(30,144,255,0.1)',
    color: '#1e90ff',
    borderRadius: 6,
    padding: '0.25em 0.6em',
    fontSize: '0.8rem',
    fontWeight: 700,
  },
  editBadge: {
    background: 'rgba(245,158,11,0.1)',
    color: '#d97706',
    border: '1px solid rgba(245,158,11,0.25)',
    borderRadius: 6,
    padding: '0.25em 0.65em',
    fontSize: '0.75rem',
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
  },
  deleteBadge: {
    background: 'rgba(239,68,68,0.1)',
    color: '#dc2626',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: 6,
    padding: '0.25em 0.65em',
    fontSize: '0.75rem',
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
  },
  approveBtn: {
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.25)',
    color: '#065f46',
    borderRadius: 8,
    padding: '0.35rem 0.75rem',
    fontSize: '0.8rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.15s ease',
    margin: 0,
  },
  rejectBtn: {
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.25)',
    color: '#dc2626',
    borderRadius: 8,
    padding: '0.35rem 0.75rem',
    fontSize: '0.8rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.15s ease',
    margin: 0,
  },
};

export default ViewRequests;