import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/cartSlice";
import "../styles/cart.css";


const Cart = () => {

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };


    const handleUpdateQty = (item, qty) => {

        if(qty > 0){

            dispatch(addToCart({
                ...item,
                qty: qty
            }));

        }

    };


    const totalPrice = cartItems.reduce(
        (acc, item) =>
            acc + Number(item.price) * Number(item.qty || 1),
        0
    );


    return (

        <div className="cart-container">

            <h2>Shopping Cart</h2>


            {
                cartItems.length === 0 ? (

                    <p style={{
                        color: "#a1a1aa",
                        fontSize: "18px",
                        textAlign: "center",
                        marginTop: "30px"
                        }}>
                        <h3>Your cart is empty.</h3>

                        <Link 
                            to="/" 
                            className="btn btn-go-shopping"
                            style={{
                                display: "inline-block",
                                marginLeft: "12px",
                                padding: "10px 22px",
                                background: "#f97316",
                                color: "#fff",
                                borderRadius: "6px",
                                textDecoration: "none",
                                fontWeight: "600",
                                transition: "0.3s"
                            }}
                            >
                            Go Shopping
                        </Link>
                    </p>

                ) : (


                <div className="cart-layout">


                    <div className="cart-items">


                        {
                            cartItems.map((item)=>(


                                <div 
                                key={item._id}
                                className="cart-item"
                                >


                                    <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="cart-item-image"
                                    />


                                    <div className="cart-item-details">


                                        <h4>
                                            {item.name}
                                        </h4>


                                        <p>
                                            ₹{item.price}
                                        </p>



                                        <div className="qty-controls">


                                            <button
                                            onClick={() =>
                                                handleUpdateQty(
                                                    item,
                                                    item.qty - 1
                                                )
                                            }
                                            >
                                                -
                                            </button>


                                            <span>
                                                {item.qty}
                                            </span>


                                            <button
                                            onClick={() =>
                                                handleUpdateQty(
                                                    item,
                                                    item.qty + 1
                                                )
                                            }
                                            >
                                                +
                                            </button>


                                        </div>



                                        <button
                                        onClick={() =>
                                            handleRemove(item._id)
                                        }
                                        className="btn-remove"
                                        >
                                            Remove
                                        </button>


                                    </div>


                                </div>


                            ))
                        }


                    </div>



                    <div className="cart-summary">


                        <h3>
                            Total: ₹{totalPrice.toFixed(2)}
                        </h3>


                        <button
                        onClick={() => navigate("/checkout")}
                        className="btn btn-checkout"
                        >
                            Proceed to Checkout
                        </button>
                        <p>Demo: This project uses Razorpay Test Mode. Please use Razorpay test payment methods. No real money will be charged.</p>

                    </div>


                </div>

                )
            }


        </div>

    );
};


export default Cart;