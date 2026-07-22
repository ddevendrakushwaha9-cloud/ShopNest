import React from "react";
import {Link} from 'react-router-dom';
import '../styles/product.css';

const ProductCard = ({ product }) =>{
    return(
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image"></img>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">
                {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                }).format(product.price)}
                </p>
                <Link to={`/products/${product._id}`} className="product-details-button ">View Details</Link>
            </div>
        </div>
    );
};

export default ProductCard;