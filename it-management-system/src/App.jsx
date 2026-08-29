// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import PcDetails from './components/User/PcDetails';
import EditPC from './components/Admin/EditPC';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/login"      element={<Login />} />
            <Route path="/admin"      element={<AdminDashboard />} />
            <Route path="/user"       element={<UserDashboard />} />
            <Route path="/pc/:pc_id"  element={<PcDetails />} />
            <Route path="/edit-pc/:pc_id" element={<EditPC />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;