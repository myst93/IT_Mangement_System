// src/components/User/RequestEdit.jsx
import React, { useState } from 'react';
import api from '../../services/api';

const RequestEdit = () => {
  const [form, setForm] = useState({
    pc_id: '',
    networkType: 'DRONA',
    deptName: '',
    username: '',
    deviceName: '',
    macAddress: '',
    ipAddress: '',
    osVersion: '',
    cpuSerialNo: '',
    pcModel: '',
    pcSerialNo: '',
    antivirusStatus: 'Yes',
    firewallEnabled: true,
    wsusImplemented: true,
    ntpStatus: true,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/pcs/request-edit', form);
      setMessage('Edit request submitted!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Request Edit</h2>
      <div>
        <label>PC ID:</label>
        <input type="number" name="pc_id" value={form.pc_id} onChange={handleChange} required />
      </div>
      <div>
        <label>Network Type:</label>
        <select name="networkType" value={form.networkType} onChange={handleChange}>
          <option value="DRONA">DRONA</option>
          <option value="CIAG">CIAG</option>
          <option value="STANDALONE">STANDALONE</option>
          <option value="NKN">NKN</option>
        </select>
      </div>
      <div>
        <label>Department Name:</label>
        <input type="text" name="deptName" value={form.deptName} onChange={handleChange} />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} />
      </div>
      <div>
        <label>Device Name:</label>
        <input type="text" name="deviceName" value={form.deviceName} onChange={handleChange} />
      </div>
      <div>
        <label>MAC Address:</label>
        <input type="text" name="macAddress" value={form.macAddress} onChange={handleChange} />
      </div>
      <div>
        <label>IP Address:</label>
        <input type="text" name="ipAddress" value={form.ipAddress} onChange={handleChange} />
      </div>
      <div>
        <label>OS Version:</label>
        <input type="text" name="osVersion" value={form.osVersion} onChange={handleChange} />
      </div>
      <div>
        <label>CPU Serial No:</label>
        <input type="text" name="cpuSerialNo" value={form.cpuSerialNo} onChange={handleChange} />
      </div>
      <div>
        <label>PC Model:</label>
        <input type="text" name="pcModel" value={form.pcModel} onChange={handleChange} />
      </div>
      <div>
        <label>PC Serial No:</label>
        <input type="text" name="pcSerialNo" value={form.pcSerialNo} onChange={handleChange} />
      </div>
      <div>
        <label>Antivirus Status:</label>
        <select name="antivirusStatus" value={form.antivirusStatus} onChange={handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label>Firewall Enabled:</label>
        <input type="checkbox" name="firewallEnabled" checked={form.firewallEnabled} onChange={handleChange} />
      </div>
      <div>
        <label>WSUS Implemented:</label>
        <input type="checkbox" name="wsusImplemented" checked={form.wsusImplemented} onChange={handleChange} />
      </div>
      <div>
        <label>NTP Status:</label>
        <input type="checkbox" name="ntpStatus" checked={form.ntpStatus} onChange={handleChange} />
      </div>
      <button type="submit">Request Edit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RequestEdit;