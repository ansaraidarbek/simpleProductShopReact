import React from 'react';
import { useProductContext } from './home';
import { Link } from 'react-router-dom';
import './styles.css';

const ProductCard = ({ product }) => {
  const { textStyle, textColor } = useProductContext();
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h2 style={{ fontStyle: textStyle, color: textColor }}>{product.title}</h2>
      <p style={{ fontStyle: textStyle, color: textColor }}>{product.brand}</p>
      <p style={{ fontStyle: textStyle, color: textColor }}>Price: {product.price}</p>
      <Link to={`/products/${product.id}`} className="details-btn">Details</Link>
    </div>
  );
};

export default ProductCard;
