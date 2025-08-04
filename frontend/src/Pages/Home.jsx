import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = ({ searchTerm }) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://ecommerce-back-ii19.onrender.com/products");
      setProductData(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredData = productData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-wrapper">
      <div className="container">
        {filteredData.length > 0 ? (
          filteredData.map((elem, index) => (
            <div className="card" key={index}>
              <div className="top">
                <img src={elem.image} alt={elem.title} />
              </div>
              <div className="bottom">
                <Link to={`/admin/products/detail/${elem._id}`} className="title-link">
                  {elem.title}
                </Link>
                <p className="description">{elem.description}</p>
                <h2 className="price">Price: ₹{elem.price}</h2>
              </div>
            </div>
          ))
        ) : (
          <p className="no-result">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;