import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/homepage.css";

const URL =
  "https://64b1f3c9062767bc4826b53c.mockapi.io/api/v1/StaffManagement";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [detailPopup, setDetailPopup] = useState(null);

  const getListProducts = async () => {
    const res = await axios.get(`${URL}`);
    if (res.status === 200) {
      setProducts(res.data);
    }
  };

  useEffect(() => {
    getListProducts();
  }, []);

  // Filter bestseller products
  const bestsellerProducts = products.filter((product) => product.bestseller);

  // Popup
  const handleViewPopup = (product) => {
    setDetailPopup(product);
  };

  const handleClosePopup = () => {
    setDetailPopup(null);
  };

  return (
    <div className="container">
      {bestsellerProducts.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt={product.id} />
          <h3>{product.name}</h3>
          <button onClick={() => handleViewPopup(product)}>View Details</button>
        </div>
      ))}

      {detailPopup && (
        <div className="popup">
          <div className="popup-content">
            <div>
              <span className="close" onClick={handleClosePopup}>
                &times;
              </span>
              <img src={detailPopup.image} alt={detailPopup.id} />
              <h2>ID: {detailPopup.id}</h2>
              <p>Name: {detailPopup.name}</p>
              <p>Price: {detailPopup.price}</p>
              <p>Rating: {detailPopup.rating}</p>
              <p>Category: {detailPopup.category}</p>
              <p>Description: {detailPopup.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
