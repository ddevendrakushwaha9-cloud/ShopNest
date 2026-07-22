import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import { toast } from "react-toastify";
import '../styles/checkout.css';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);


  const handlePayment = async () => {
    try {

      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {

        const fallback = window.confirm(
          "Razorpay keys unconfigured. Use Student Bypass Mode to place test order?"
        );

        if (fallback) {
          return bypassPayment();
        } 
        else {
          return toast.error("Payment failed to initialize");
        }

      }
      console.log(process.env.REACT_APP_RAZORPAY_KEY);
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: orderData.id,

        handler: async function (response) {

          const saveOrderRes = await fetch('/api/orders', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`
            },

            body: JSON.stringify({

              items: cartItems.map(item => ({
                productId: item._id,
                qty: item.qty,
                price: item.price
              })),

              totalAmount: totalPrice,
              address,
              paymentId: response.razorpay_payment_id

            })
          });

          if (saveOrderRes.ok) {

            dispatch(clearCart());
            navigate('/ordersuccess');

          } 
          else {

            toast.error('Order saving failed');

          }

        },

        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999'
        },


        theme: {
          color: '#f97316'
        }

      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {

      console.error(error);

    }
  };

  const bypassPayment = async () => {

    const saveOrderRes = await fetch('/api/orders', {

      method: 'POST',

      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },

      body: JSON.stringify({

        items: cartItems.map(item => ({

          productId: item._id,
          qty: item.qty,
          price: item.price

        })),

        totalAmount: totalPrice,

        address,

        paymentId: 'bypass_txn_' + Date.now()

      })

    });

   if (saveOrderRes.ok) {
      console.log(saveOrderRes.status);
      console.log(saveOrderRes.ok);

      dispatch(clearCart());

      navigate('/ordersuccess');

    }

    else {

      const error = await saveOrderRes.json();
      console.log(error);

    }
   };

  const handleSubmit = (e) => {

    e.preventDefault();


    if (!user) {

      toast.warning("Please login first");
      navigate('/login');
      return;

    }

    handlePayment();
  };

  return (

    <div className="checkout-container">

      <h2>Checkout</h2>


      <div className="checkout-content">


        <form onSubmit={handleSubmit} className="shipping-form">


          <h3>Shipping Address</h3>


          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            value={address.fullName} 
            onChange={(e) => setAddress({...address, fullName: e.target.value})} 
          />


          <input 
            type="text" 
            placeholder="Street" 
            required 
            value={address.street} 
            onChange={(e) => setAddress({...address, street: e.target.value})} 
          />


          <input 
            type="text" 
            placeholder="City" 
            required 
            value={address.city} 
            onChange={(e) => setAddress({...address, city: e.target.value})} 
          />


          <input 
            type="text" 
            placeholder="Postal Code" 
            required 
            value={address.postalCode} 
            onChange={(e) => setAddress({...address, postalCode: e.target.value})} 
          />


          <input 
            type="text" 
            placeholder="Country" 
            required 
            value={address.country} 
            onChange={(e) => setAddress({...address, country: e.target.value})} 
          />



          <div className="checkout-summary">


            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>


            <button type="submit" className="btn">
              Pay Now
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};
    
export default Checkout;