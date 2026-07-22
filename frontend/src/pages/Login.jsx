import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import '../styles/auth.css';
import { toast } from "react-toastify";

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
    e.preventDefault();
        try{
            const res = await fetch('/api/auth/login', {
                method: 'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const data = await res.json();
            if (!res.ok && data.message === "Please verify your email first") {
            navigate("/emailverify");
            return;
            }
            if(res.ok){
                login(data);
                toast.success("Welcome back!");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }else{
                toast.warning(data.message);
            }
        } catch(error){
            console.log(error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn">
                    Login
                </button>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;