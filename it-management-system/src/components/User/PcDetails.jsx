import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function PcDetails() {
  // Accept both pc_id and id as params
  const params = useParams();
  const navigate = useNavigate();
  const [pc, setPc] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPc = async () => {
      try {
        let response;
        // Try to fetch by pc_id if present
        if (params.pc_id) {
          response = await api.get(`/pcs/by-pcid/${params.pc_id}`);
        } else if (params.id) {
          response = await api.get(`/pcs/${params.id}`);
        } else {
          setError('No PC identifier provided');
          return;
        }
        setPc(response.data);
      } catch (err) {
        setError('Failed to fetch PC details');
      }
    };
    fetchPc();
  }, [params.pc_id, params.id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!pc) return <div>Loading...</div>;

  return (
    <div className="container py-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>
      <h2 className="mb-3 text-primary">PC Details</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>PC ID:</strong> {pc.pc_id}</li>
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
        <li className="list-group-item"><strong>Action Status:</strong> {pc.actionStatus || '-'}</li>
      </ul>
    </div>
  );
}

export default PcDetails;