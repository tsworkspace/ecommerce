import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProducts.css';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`https://ecommerce-back-ii19.onrender.com/products/${productId}`)
      .then((res) => {
        const { title, description, price, category } = res.data.product;
        setProduct({ title, description, price, category });
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in product) {
      formData.append(key, product[key]);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post(`https://ecommerce-back-ii19.onrender.com/products/update/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Product updated successfully");
      navigate("/admin");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;