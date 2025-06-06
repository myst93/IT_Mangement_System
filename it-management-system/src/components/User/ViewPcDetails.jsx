// src/components/User/ViewPcDetails.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function ViewPcDetails() {
  const [pcs, setPcs] = useState([]);

  useEffect(() => {
    const fetchPcs = async () => {
      try {
        const response = await api.get('/pcs');
        setPcs(response.data);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchPcs();
  }, []);

  return (
    <div>
      <h2>PC Details</h2>
      <table>
        <thead>
          <tr>
            <th>PC ID</th>
            <th>Device Name</th>
            <th>Username</th>
            <th>IP Address</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {pcs.map((pc) => (
            <tr key={pc.pc_id}>
              <td>{pc.pc_id}</td>
              <td>{pc.deviceName}</td>
              <td>{pc.username}</td>
              <td>{pc.ipAddress}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewPcDetails;