// src/components/Shared/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 p-4 text-center mt-8">
      <p>&copy; {currentYear} IT Management System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;