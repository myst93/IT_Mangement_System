// src/components/Admin/ViewRequests.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/api/pcs?actionStatus=Pending');
      setRequests(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to fetch requests');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    try {
      await axios.patch(`/api/pcs/${id}/approve`);
      fetchRequests();
    } catch (err) {
      console.error('Error approving request:', err);
      setError('Failed to approve request');
    }
  };

  const rejectRequest = async (id) => {
    try {
      await axios.patch(`/api/pcs/${id}/reject`);
      fetchRequests();
    } catch (err) {
      console.error('Error rejecting request:', err);
      setError('Failed to reject request');
    }
  };

  if (loading) return <p className="text-center">Loading requests...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border py-2">PC ID</th>
              <th className="border py-2">Requested By</th>
              <th className="border py-2">Action</th>
              <th className="border py-2">Approve</th>
              <th className="border py-2">Reject</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td className="border px-2 py-2">{request.pc_id}</td>
                <td className="border px-2 py-2">{request.requestedBy.username}</td>
                <td className="border px-2 py-2">
                  {request.isDeleteRequest ? 'Delete' : 'Edit'}
                </td>
                <td className="border px-2 py-2">
                  <button
                    onClick={() => approveRequest(request._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                </td>
                <td className="border px-2 py-2">
                  <button
                    onClick={() => rejectRequest(request._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewRequests;