import React, { useEffect, useState } from 'react';
import ProductCard from '../component/ProductCard';
import { useSearchParams } from "react-router-dom";
import '../styles/home.css';


const Home = () =>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get("search") || "";

    useEffect(() =>{
    const fetchProducts = async () => {
        try {
            console.log("Fetching products...");

            const res = await fetch('/api/products');
            

            const data = await res.json();
            
            setProducts(data);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchProducts();
    }, []);

    const filteredProducts = searchText
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    )
    :products;

    return (
        <div className='home-container'>
            <div className='hero-banner'>
                <h1>Welcome to ShopNest</h1>
                <p>Your one-shop shop for all your needs.</p>
            </div>
            <h2>Featured Products</h2>
            {loading ? (
                <div>Loading...</div>
            ):(
                <div className='product-grid'>
                    {filteredProducts.map((product)=>(
                        <ProductCard key={product._id} product={product}/>
                    ))}
                </div>
                )}
            </div>
    );
};

export default Home;