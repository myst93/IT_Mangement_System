import React, { useState } from 'react';
import api from '../../services/api';

const AddPC = () => {
  const [pc, setPC] = useState({
    pc_id: '',
    registerDate: '',
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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPC({ ...pc, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Validate required fields
    for (const key of [
      'pc_id', 'registerDate', 'networkType', 'deptName', 'username', 'deviceName',
      'macAddress', 'ipAddress', 'osVersion', 'cpuSerialNo', 'pcModel', 'pcSerialNo',
      'antivirusStatus', 'firewallEnabled', 'wsusImplemented', 'ntpStatus'
    ]) {
      if (pc[key] === '' || pc[key] === null || pc[key] === undefined) {
        setError('Please fill in all required fields.');
        return;
      }
    }
    try {
      const payload = {
        ...pc,
        pc_id: Number(pc.pc_id),
        registerDate: new Date(pc.registerDate),
      };
      await api.post('/pcs', payload);
      setSuccess('PC added successfully!');
      setPC({
        pc_id: '',
        registerDate: '',
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
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New PC</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">PC ID:</label>
          <input type="number" name="pc_id" value={pc.pc_id} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Register Date:</label>
          <input type="date" name="registerDate" value={pc.registerDate} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Network Type:</label>
          <select name="networkType" value={pc.networkType} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded">
            <option value="DRONA">DRONA</option>
            <option value="CIAG">CIAG</option>
            <option value="STANDALONE">STANDALONE</option>
            <option value="NKN">NKN</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Department Name:</label>
          <input type="text" name="deptName" value={pc.deptName} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input type="text" name="username" value={pc.username} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Device Name:</label>
          <input type="text" name="deviceName" value={pc.deviceName} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">MAC Address:</label>
          <input type="text" name="macAddress" value={pc.macAddress} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">IP Address:</label>
          <input type="text" name="ipAddress" value={pc.ipAddress} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">OS Version:</label>
          <input type="text" name="osVersion" value={pc.osVersion} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CPU Serial No:</label>
          <input type="text" name="cpuSerialNo" value={pc.cpuSerialNo} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">PC Model:</label>
          <input type="text" name="pcModel" value={pc.pcModel} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">PC Serial No:</label>
          <input type="text" name="pcSerialNo" value={pc.pcSerialNo} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Antivirus Status:</label>
          <select name="antivirusStatus" value={pc.antivirusStatus} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Firewall Enabled:</label>
          <input type="checkbox" name="firewallEnabled" checked={pc.firewallEnabled} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">WSUS Implemented:</label>
          <input type="checkbox" name="wsusImplemented" checked={pc.wsusImplemented} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">NTP Status:</label>
          <input type="checkbox" name="ntpStatus" checked={pc.ntpStatus} onChange={handleChange} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add PC
        </button>
      </form>
    </div>
  );
};

export default AddPC;