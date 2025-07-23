import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="border-t border-borderColor bg-light text-gray-500 ">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-medium">
        <Link to="/" className="hover:underline hover:text-gray-600 transition-colors">FoundIt</Link> ©2025. All rights reserved. <p className="mt-1 inline-block">Developed by Syed Musab Bukhari</p>
      </div>
    </div>
  );
};

export default Footer;