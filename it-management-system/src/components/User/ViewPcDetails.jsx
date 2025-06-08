// src/components/User/ViewPcDetails.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function ViewPcDetails() {
  const [pcs, setPcs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPcs = async () => {
      try {
        const response = await api.get('/pcs');
        setPcs(response.data);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch PCs");
      }
    };
    fetchPcs();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-4 text-primary">PC Details</h2>
      <div className="row g-3">
        {pcs.map((pc) => (
          <div className="col-md-6 col-lg-4" key={pc.pc_id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{pc.deviceName}</h5>
                <p className="card-text mb-1"><strong>PC ID:</strong> {pc.pc_id}</p>
                <p className="card-text mb-1"><strong>Username:</strong> {pc.username}</p>
                <p className="card-text mb-2"><strong>IP Address:</strong> {pc.ipAddress}</p>
                {/* Add more summary fields if needed */}
                <button
                  className="btn btn-outline-primary btn-sm mt-2"
                  onClick={() => navigate(`/pc/${pc.pc_id || pc._id}`)}
                >
                  See Detail
                </button>
              </div>
            </div>
          </div>
        ))}
        {pcs.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info text-center">No PCs found.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewPcDetails;