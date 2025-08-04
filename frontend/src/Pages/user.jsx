// src/Pages/user.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import "./Home.css";

const UserHome = ({ searchTerm }) => {
  const [productData, setProductData] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-xdu8.onrender.com/products")
      .then((res) => setProductData(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  const filteredData = productData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {filteredData.length > 0 ? (
        filteredData.map((product) => (
          <div className="card" key={product._id}>
            <div className="top">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="bottom">
              <Link to={`/products/detail/${product._id}`}>{product.title}</Link>
              <p>{product.description}</p>
              <h3>₹ {product.price}</h3>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-result">No products found.</p>
      )}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="admin-login-btn" onClick={() => navigate("/login")}>
          Admin Login
        </button>
      </div>
    </div>
  );
};

export default UserHome;