import React, { useState } from 'react';
import axios from 'axios';
import './AddProducts.css';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const navigate = useNavigate();
  const [title, settitle] = useState('');
  const [image, setimage] = useState(null);
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('');
  const [price, setprice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", image); 

    axios.post("https://ecommerce-backend-xdu8.onrender.com/products/add", formData)
      .then((res) => {
        console.log("Product added:", res.data);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error adding product:", err);
      });
  };

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="formGroup">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            name="title"
            id="title"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setimage(e.target.files[0])}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter product description"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            placeholder="Enter product category"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            placeholder="Enter product price"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProducts;