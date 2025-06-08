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

  // Fetch all PCs for the "All PCs" and "status" tabs
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

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: 1100 }}>
          <div className="card-body p-4">
            <h1 className="display-5 fw-bold text-center text-primary mb-4">Admin Dashboard</h1>
            {/* Tab Buttons */}
            <div className="mb-4 d-flex justify-content-center gap-3 flex-wrap">
              <button
                className={`btn ${activeTab === 'pcs' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('pcs')}
              >
                All PCs
              </button>
              <button
                className={`btn ${activeTab === 'status' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('status')}
              >
                PC Status
              </button>
              <button
                className={`btn ${activeTab === 'addUser' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('addUser')}
              >
                Add New User
              </button>
              <button
                className={`btn ${activeTab === 'addPC' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('addPC')}
              >
                Add New PC
              </button>
              <button
                className={`btn ${activeTab === 'requests' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('requests')}
              >
                Pending Requests
              </button>
            </div>

            {/* Tab Content */}
            <div>
              {/* All PCs - Detailed Cards */}
              {activeTab === 'pcs' && (
                <div>
                  <h2 className="h4 mb-3 text-primary">All PCs (Detailed View)</h2>
                  {loading ? (
                    <div className="text-center">Loading PCs...</div>
                  ) : pcs.length === 0 ? (
                    <div className="alert alert-info text-center">No PCs found.</div>
                  ) : (
                    <div className="row g-4">
                      {pcs.map(pc => (
                        <div className="col-md-6" key={pc._id}>
                          <div className="card h-100 shadow-sm">
                            <div className="card-body">
                              <h5 className="card-title text-primary">PC ID: {pc.pc_id}</h5>
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Device Name:</strong> {pc.deviceName}</li>
                                <li className="list-group-item"><strong>Username:</strong> {pc.username}</li>
                                <li className="list-group-item"><strong>IP Address:</strong> {pc.ipAddress}</li>
                                <li className="list-group-item"><strong>MAC Address:</strong> {pc.macAddress || '-'}</li>
                                <li className="list-group-item"><strong>Location:</strong> {pc.location || '-'}</li>
                                <li className="list-group-item"><strong>Status:</strong> {pc.status || '-'}</li>
                                <li className="list-group-item"><strong>Department:</strong> {pc.deptName || '-'}</li>
                                <li className="list-group-item"><strong>Network Type:</strong> {pc.networkType || '-'}</li>
                                <li className="list-group-item"><strong>OS Version:</strong> {pc.osVersion || '-'}</li>
                                <li className="list-group-item"><strong>CPU Serial No:</strong> {pc.cpuSerialNo || '-'}</li>
                                <li className="list-group-item"><strong>PC Model:</strong> {pc.pcModel || '-'}</li>
                                <li className="list-group-item"><strong>PC Serial No:</strong> {pc.pcSerialNo || '-'}</li>
                                <li className="list-group-item"><strong>Antivirus Status:</strong> {pc.antivirusStatus || '-'}</li>
                                <li className="list-group-item"><strong>Firewall Enabled:</strong> {pc.firewallEnabled ? 'Yes' : 'No'}</li>
                                <li className="list-group-item"><strong>WSUS Implemented:</strong> {pc.wsusImplemented ? 'Yes' : 'No'}</li>
                                <li className="list-group-item"><strong>NTP Status:</strong> {pc.ntpStatus ? 'Yes' : 'No'}</li>
                                <li className="list-group-item"><strong>Action Status:</strong> 
                                  <span className={
                                    pc.actionStatus === 'Pending'
                                      ? 'badge bg-warning text-dark ms-2'
                                      : pc.actionStatus === 'Approved'
                                      ? 'badge bg-success ms-2'
                                      : 'badge bg-danger ms-2'
                                  }>
                                    {pc.actionStatus}
                                  </span>
                                </li>
                              </ul>
                              <div className="mt-3 d-flex gap-2">
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
                </div>
              )}

              {/* PC Status Table */}
              {activeTab === 'status' && (
                <div>
                  <h2 className="h4 mb-3 text-primary">PC Status</h2>
                  {loading ? (
                    <div className="text-center">Loading PCs...</div>
                  ) : pcs.length === 0 ? (
                    <div className="alert alert-info text-center">No PCs found.</div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover align-middle">
                        <thead className="table-light">
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
                            <tr key={pc._id}>
                              <td>{pc.pc_id}</td>
                              <td>{pc.deviceName}</td>
                              <td>{pc.username}</td>
                              <td>{pc.status || '-'}</td>
                              <td>
                                <span className={
                                  pc.actionStatus === 'Pending'
                                    ? 'badge bg-warning text-dark'
                                    : pc.actionStatus === 'Approved'
                                    ? 'badge bg-success'
                                    : 'badge bg-danger'
                                }>
                                  {pc.actionStatus}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addUser' && (
                <div>
                  <AddUser />
                </div>
              )}

              {activeTab === 'addPC' && (
                <div>
                  <AddPC />
                </div>
              )}

              {activeTab === 'requests' && (
                <div>
                  <ViewRequests />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;