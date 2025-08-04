import React from 'react';
import { Link } from 'react-router-dom';
import './UserNavbar.css';

const UserNavbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="user-navbar">
      <div className="nav-left">
        <Link to="/user" className="logo">Orainge</Link>
      </div>

      <div className="nav-center">
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="nav-right">
        <Link to="/cart" className="cart-link">
          <i className="ri-shopping-cart-line"></i> Cart
        </Link>
      </div>
    </nav>
  );
};

export default UserNavbar;