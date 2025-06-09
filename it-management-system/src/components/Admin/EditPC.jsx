// src/components/Admin/EditPc.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function EditPc() {
  const { pc_id } = useParams();
  const navigate = useNavigate();
  const [pc, setPc] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch the PC details by pc_id
    api.get(`/pcs/by-pcid/${pc_id}`)
      .then(res => setPc(res.data))
      .catch(() => setError('Failed to load PC details'));
  }, [pc_id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPc({
      ...pc,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/pcs/${pc._id}`, pc);
      alert('PC updated successfully');
      navigate(-1); // Go back after saving
    } catch (error) {
      setError(error.response?.data?.message || 'Server error');
    }
    setSaving(false);
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!pc) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit PC</h2>
      <div>
        <label>PC ID:</label>
        <input
          type="number"
          name="pc_id"
          value={pc.pc_id}
          onChange={handleChange}
          required
          disabled // PC ID should not be changed
        />
      </div>
      <div>
        <label>Register Date:</label>
        <input
          type="date"
          name="registerDate"
          value={pc.registerDate ? pc.registerDate.substring(0, 10) : ''}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Network Type:</label>
        <select name="networkType" value={pc.networkType} onChange={handleChange}>
          <option value="DRONA">DRONA</option>
          <option value="CIAG">CIAG</option>
          <option value="STANDALONE">STANDALONE</option>
          <option value="NKN">NKN</option>
        </select>
      </div>
      <div>
        <label>Department Name:</label>
        <input
          type="text"
          name="deptName"
          value={pc.deptName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={pc.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Device Name:</label>
        <input
          type="text"
          name="deviceName"
          value={pc.deviceName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>MAC Address:</label>
        <input
          type="text"
          name="macAddress"
          value={pc.macAddress}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>IP Address:</label>
        <input
          type="text"
          name="ipAddress"
          value={pc.ipAddress}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>OS Version:</label>
        <input
          type="text"
          name="osVersion"
          value={pc.osVersion}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>CPU Serial No:</label>
        <input
          type="text"
          name="cpuSerialNo"
          value={pc.cpuSerialNo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>PC Model:</label>
        <input
          type="text"
          name="pcModel"
          value={pc.pcModel}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>PC Serial No:</label>
        <input
          type="text"
          name="pcSerialNo"
          value={pc.pcSerialNo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Antivirus Status:</label>
        <select name="antivirusStatus" value={pc.antivirusStatus} onChange={handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label>Firewall Enabled:</label>
        <input
          type="checkbox"
          name="firewallEnabled"
          checked={pc.firewallEnabled}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>WSUS Implemented:</label>
        <input
          type="checkbox"
          name="wsusImplemented"
          checked={pc.wsusImplemented}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>NTP Status:</label>
        <input
          type="checkbox"
          name="ntpStatus"
          checked={pc.ntpStatus}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
      <button type="button" onClick={() => navigate(-1)} className="ms-2">Cancel</button>
    </form>
  );
}

export default EditPc;