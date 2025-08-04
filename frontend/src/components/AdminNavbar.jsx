import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="nav-left">
        <Link to="/admin" className="brand">Orainge</Link>
      </div>

      <div className="nav-center">
        <span className="panel-title">Admin Panel</span>
      </div>

      <div className="nav-right">
        <Link to="/admin/products/add" className="add-link">Add Product</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;