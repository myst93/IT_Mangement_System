// src/pages/UserDashboard.jsx
import React, { useState } from 'react';
import ViewPcDetails from '../components/User/ViewPcDetails';
import RequestEdit from '../components/User/RequestEdit';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserDashboard() {
  const [activeTab, setActiveTab] = useState('view');

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: 800 }}>
          <div className="card-body p-5">
            <h1 className="display-5 fw-bold text-center text-primary mb-5">User Dashboard</h1>
            {/* Tab Buttons */}
            <div className="mb-4 d-flex justify-content-center gap-3">
              <button
                className={`btn ${activeTab === 'view' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('view')}
              >
                My PC Details
              </button>
              <button
                className={`btn ${activeTab === 'request' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('request')}
              >
                Request Edit
              </button>
            </div>
            {/* Tab Content */}
            <div>
              {activeTab === 'view' && (
                <div>
                  <ViewPcDetails />
                </div>
              )}
              {activeTab === 'request' && (
                <div>
                  <RequestEdit />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;