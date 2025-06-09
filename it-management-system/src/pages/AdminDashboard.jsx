// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import AddUser from '../components/Admin/AddUser';
import AddPC from '../components/Admin/AddPC';
import ViewRequests from '../components/Admin/ViewRequests';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('pcs');
  const [pcs, setPcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'pcs' || activeTab === 'status') {
      setLoading(true);
      api.get('/pcs')
        .then(res => {
          setPcs(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [activeTab]);

  const tabButtons = [
    { key: 'pcs', label: 'All PCs', icon: 'bi-laptop' },
    { key: 'status', label: 'PC Status', icon: 'bi-bar-chart-line' },
    { key: 'addUser', label: 'Add New User', icon: 'bi-person-plus' },
    { key: 'addPC', label: 'Add New PC', icon: 'bi-plus-square' },
    { key: 'requests', label: 'Pending Requests', icon: 'bi-inbox' },
  ];

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container-fluid px-0">
        {/* Hero Section with full width image */}
        <div className="mb-5 text-center position-relative overflow-hidden" style={{ maxHeight: '400px' }}>
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=90"
            alt="Admin Dashboard Hero"
            className="w-100 h-100 object-fit-cover"
            style={{ objectFit: 'cover', height: '400px' }}
          />
          <div
            className="position-absolute top-50 start-50 translate-middle text-white"
            style={{
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              maxWidth: '90%',
            }}
          >
            <h1 className="display-3 fw-bold">Admin Dashboard</h1>
            <p className="lead">Manage your PCs, users, and requests efficiently.</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-4 d-flex justify-content-center flex-wrap gap-3">
          {tabButtons.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`btn btn-${activeTab === key ? 'primary' : 'outline-primary'} d-flex align-items-center gap-2 rounded-pill px-4 py-2 shadow-sm`}
              onClick={() => setActiveTab(key)}
            >
              <i className={`bi ${icon}`} style={{ fontSize: '1.2rem' }}></i>
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {/* All PCs */}
          {activeTab === 'pcs' && (
            <>
              <h2 className="mb-4 border-bottom pb-2 text-primary">All PCs</h2>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status"></div>
                  <div className="mt-2">Loading PCs...</div>
                </div>
              ) : pcs.length === 0 ? (
                <div className="alert alert-info text-center">No PCs available.</div>
              ) : (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                  {pcs.map(pc => (
                    <div className="col" key={pc._id}>
                      <div className="card shadow-sm h-100">
                        <div className="card-body">
                          <h5 className="card-title text-primary">
                            <i className="bi bi-laptop me-2"></i>
                            PC ID: {pc.pc_id}
                          </h5>
                          <ul className="list-group list-group-flush mb-3">
                            <li className="list-group-item d-flex justify-content-between">
                              <strong>Device Name</strong> <span>{pc.deviceName}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <strong>Username</strong> <span>{pc.username}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <strong>Status</strong> <span>{pc.status || '-'}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <strong>Action Status</strong>
                              <span
                                className={`badge rounded-pill ${
                                  pc.actionStatus === 'Pending'
                                    ? 'bg-warning text-dark'
                                    : pc.actionStatus === 'Approved'
                                    ? 'bg-success'
                                    : 'bg-danger'
                                }`}
                              >
                                {pc.actionStatus}
                              </span>
                            </li>
                          </ul>
                          <div className="d-flex justify-content-end gap-2">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => navigate(`/pc/${pc.pc_id}`)}
                            >
                              See More
                            </button>
                            <button
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => navigate(`/edit-pc/${pc.pc_id}`)}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* PC Status */}
          {activeTab === 'status' && (
            <>
              <h2 className="mb-4 border-bottom pb-2 text-primary">PC Status</h2>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status"></div>
                  <div className="mt-2">Loading PCs...</div>
                </div>
              ) : pcs.length === 0 ? (
                <div className="alert alert-info text-center">No PCs available.</div>
              ) : (
                <div className="table-responsive shadow-sm rounded">
                  <table className="table table-hover align-middle table-bordered">
                    <thead className="table-primary text-center">
                      <tr>
                        <th>PC ID</th>
                        <th>Device Name</th>
                        <th>Username</th>
                        <th>Status</th>
                        <th>Action Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pcs.map(pc => (
                        <tr key={pc._id} className="text-center">
                          <td>{pc.pc_id}</td>
                          <td>{pc.deviceName}</td>
                          <td>{pc.username}</td>
                          <td>{pc.status || '-'}</td>
                          <td>
                            <span
                              className={`badge rounded-pill ${
                                pc.actionStatus === 'Pending'
                                  ? 'bg-warning text-dark'
                                  : pc.actionStatus === 'Approved'
                                  ? 'bg-success'
                                  : 'bg-danger'
                              }`}
                            >
                              {pc.actionStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Add User */}
          {activeTab === 'addUser' && (
            <div>
              <h2 className="mb-4 border-bottom pb-2 text-primary">
                <i className="bi bi-person-plus me-2"></i>
                Add New User
              </h2>
              <AddUser />
            </div>
          )}

          {/* Add PC */}
          {activeTab === 'addPC' && (
            <div>
              <h2 className="mb-4 border-bottom pb-2 text-primary">
                <i className="bi bi-plus-square me-2"></i>
                Add New PC
              </h2>
              <AddPC />
            </div>
          )}

          {/* Pending Requests */}
          {activeTab === 'requests' && (
            <div>
              <h2 className="mb-4 border-bottom pb-2 text-primary">
                <i className="bi bi-inbox me-2"></i>
                Pending Requests
              </h2>
              <ViewRequests />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
