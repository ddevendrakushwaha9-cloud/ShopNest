import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import "../styles/productDetailes.css";


const ProductDetail = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast.success("Product added to cart!");
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!product) {
        return <h2>Product Not Found</h2>;
    }

    return (
        <div className="product-detail">
            <div className="product-detail-image">
                <img src={product.imageUrl} alt={product.name} />
            </div>

            <div className="product-detail-info">
                <h2>{product.name}</h2>

                <p>{product.description}</p>

                <h3>${product.price.toFixed(2)}</h3>

                <p>
                    <strong>Category:</strong> {product.category}
                </p>

                <p>
                    <strong>Stock:</strong> {product.stock}
                </p>

                <p>
                    <strong>Rating:</strong> ⭐ {product.rating}
                </p>

                <button
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                >
                    Add To Cart
                </button>

                <br />
                <br />

                <Link to="/" className="back-to-shop-btn">
                    Back to Shop
                </Link>
            </div>
        </div>
    );
};

export default ProductDetail;