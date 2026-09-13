import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';
import { toast } from "react-toastify";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch('/api/auth/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email, password})
            });
            const data = await res.json();
            if(res.ok){
                toast.success('Registration successful. Please login to verify your email.');
                navigate('/login', { state: { email } });
            } else{
                toast.warning(data.message);
            }
        } catch(error){
            console.log(error);
            toast.error("Something went wrong.");
        }
    };

    return(
        <div className='auth-container'>
            <form onSubmit = {handleSubmit} className = 'auth-form'>
                <h2>Register</h2>
                <input type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <button type = 'submit' className = 'btn'>Register</button>
                <p>Already have an account? <Link to = '/login'>Login</Link></p>
            </form>
        </div>
    );

};

export default Register;    