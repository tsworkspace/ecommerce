import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Productlist.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://ecommerce-backend-xdu8.onrender.com/products')
      .then(res => {
        const data = res.data.products || res.data;
        setProducts(data);
      })
      .catch(err => {
        console.error('Failed to load products', err);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.get(`https://ecommerce-backend-xdu8.onrender.com/products/delete/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  return (
    <div className="product-list">
      <h2>All Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.image} alt={product.title} />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(product._id)}>Edit</button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;