import React, {useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {

    const {user, logout} = useContext(AuthContext);
    const cartItems = useSelector((state)=>state.cart.cartItems);

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        navigate('/login');
    };


    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/?search=${search}`);
        } else {
            navigate("/");
        }
    };


    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                <Link to='/' className='navbar-brand-link'>
                    <img src='/ShopNestLogo.png' alt='ShopNest' style={{height: '36px', width: '36px'}} className='navbar-logo' />
                    <span>ShopNest</span>
                </Link>
            </div>

            <div className="search-box">
                <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                />

              <button onClick={handleSearch}>
                Search
              </button>
            </div>

            <ul className='navbar-links'>
                <li><Link to='/'>Shop</Link></li>
                <li><Link to='/cart'>Cart ({cartItems.length})</Link></li>
                {user ?(
                    <>
                    <li><Link to='/profile'>Hi, {user.name}</Link></li>
                    {user.role === 'admin' && <li><Link to='/admin'>Admin</Link></li>}
                    <li><button onClick={handleLogOut} className='btn-logout'>Logout</button></li>
                    </>
                ):(
                    <li><Link to = '/login'>Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;