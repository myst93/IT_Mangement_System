// src/pages/AdminDashboard.jsx
import React from 'react';
import AddUser from '../components/Admin/AddUser';
import AddPC from '../components/Admin/AddPC';
import EditPc from '../components/Admin/EditPc';
import ViewRequests from '../components/Admin/ViewRequests';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Admin Dashboard</h1>
        <div className="mb-8">
          <AddUser />
        </div>
        <div className="mb-8">
          <AddPC />
        </div>
        {/* <EditPc /> */}
        <div>
          <ViewRequests />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;