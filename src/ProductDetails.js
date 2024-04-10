import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/product/${productId}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);


  return (
    <div className="container">
      <div className="product-details">
        <h1>{productDetails.title}</h1>
        <p>{productDetails.description}</p>
        <p>Brand: {productDetails.brand}</p>
        <p>Price: {productDetails.price}</p>
      </div>
      <Link to="/">Back</Link>
    </div>
  );
};

export default ProductDetails;
