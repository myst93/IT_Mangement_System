// src/pages/UserDashboard.jsx
import React from 'react';
import ViewPcDetails from '../components/User/ViewPcDetails';
import RequestEdit from '../components/User/RequestEdit';

function UserDashboard() {
  return (
    <div>
      <h1>User Dashboard</h1>
      <ViewPcDetails />
      <RequestEdit />
    </div>
  );
}

export default UserDashboard;