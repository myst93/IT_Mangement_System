// src/pages/UserDashboard.jsx
import React, { useState } from 'react';
import ViewPcDetails from '../components/User/ViewPcDetails';
import RequestEdit from '../components/User/RequestEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import backgroundImage from '../assets/ff.jpg'; // ✅ Use imported image

function UserDashboard() {
  const [activeTab, setActiveTab] = useState('view');

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // ✅ Use the import directly
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container px-3">
        <div
          className="card shadow-lg border-0 rounded-4 mx-auto"
          style={{
            maxWidth: '800px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // semi-transparent white
          }}
        >
          <div className="card-body p-5">
            <h1 className="display-5 fw-bold text-center text-primary mb-5">
              <i className="bi bi-person-circle me-2"></i>
              User Dashboard
            </h1>

            {/* Tab Buttons */}
            <div className="mb-4 d-flex justify-content-center gap-4 flex-wrap">
              <button
                className={`btn d-flex align-items-center gap-2 px-4 py-2 rounded-pill shadow-sm ${
                  activeTab === 'view' ? 'btn-primary' : 'btn-outline-primary'
                }`}
                onClick={() => setActiveTab('view')}
              >
                <i className="bi bi-display"></i>
                My PC Details
              </button>
              <button
                className={`btn d-flex align-items-center gap-2 px-4 py-2 rounded-pill shadow-sm ${
                  activeTab === 'request' ? 'btn-primary' : 'btn-outline-primary'
                }`}
                onClick={() => setActiveTab('request')}
              >
                <i className="bi bi-pencil-square"></i>
                Request Edit
              </button>
            </div>

            <hr className="mb-4" style={{ borderTop: '2px dashed #ccc' }} />

            {/* Tab Content */}
            <div className="animate__animated animate__fadeIn">
              {activeTab === 'view' && <ViewPcDetails />}
              {activeTab === 'request' && <RequestEdit />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
