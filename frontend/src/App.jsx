import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import AdminNavbar from './components/AdminNavbar';
import UserNavbar from './components/UserNavbar';
import Footer from './components/footer';

import 'remixicon/fonts/remixicon.css';
import './App.css';

import AddProducts from "./Pages/AddProducts";
import EditProduct from './Pages/Editproduct';
import Cart from './Pages/cart';
import Login from './Pages/login';
import Welcome from './Pages/welcome';
import ProductList from './Pages/Productlist';
import UserHome from './Pages/user';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const path = location.pathname;

  const showAdminNavbar = path.startsWith("/admin");
  const showUserNavbar = path.startsWith("/user") || path.startsWith("/cart");
  const showLogout = path.startsWith("/admin");

  const showFooter = path === "/" || path === "/login" || path.startsWith("/user") || path === "/cart";

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/user");
  };

  return (
    <>
      {showAdminNavbar && <AdminNavbar />}
      {showUserNavbar && <UserNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/user" element={<UserHome searchTerm={searchTerm} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<ProductList />} />
        <Route path="/admin/products/add" element={<AddProducts />} />
        <Route path="/admin/products/edit/:productId" element={<EditProduct />} />
      </Routes>

      {showLogout && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}

      {showFooter && <Footer />}
    </>
  );
};

export default App;