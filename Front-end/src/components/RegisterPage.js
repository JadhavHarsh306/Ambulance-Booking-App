import React, { useState } from 'react';
import '../style/RegisterPage.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { address } from 'framer-motion/client';

const RegisterPage = () => {
    const [name, setname]=useState("");
    const [phone, setphone]=useState("");
    const [address, setAddress]=useState("");
    const [email, setemail]=useState("");
    const[password, setpassword]=useState("");
    const[confirmpassword, setconfirmpassword]=useState("");

    const navigate=useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
    
        if (password !== confirmpassword) {
            alert("Passwords do not match!");
            return;
        }
    
        const userData = {
            name, phone,address, email, password
        };
    
        try {
            const response = await axios.post("http://localhost:8080/userRegister", userData, {
                headers: { "Content-Type": "application/json" }
            });
    
            if (response.status === 200) { 
                alert("Registration successful!");
                navigate("/login"); 
            } else {
                alert("Registration failed! Try again.");
            }
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
            alert("Registration failed. Please try again.");
        }
    };
    
    return (
        <div className="rg-container">
            <div className="register-container">
                <div className="left">
                    <img 
                        alt="Ambulance" 
                        height="400" 
                        src="./images/Ambulance1.jpeg" 
                        width="400" 
                    />
                </div>
                <div className="right">
                    <h2>REGISTER</h2>
                    <form onSubmit={handleRegister}>
                        <input placeholder="Name" type="text" required value={name} onChange={(e)=>setname(e.target.value)}/>
                        <input placeholder="Phone" type="text" required value={phone} onChange={(e)=>setphone(e.target.value)}/>
                        <input placeholder="Address" type="text" required value={address} onChange={(e)=>setAddress(e.target.value)}/>
                        <input placeholder="Email ID" type="text" required value={email} onChange={(e)=>setemail(e.target.value)}/>
                        <input placeholder="Password" type="password" required value={password} onChange={(e)=>setpassword(e.target.value)}/>
                        <input placeholder="Confirm Password" type="password" required value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)}/>
                        <button type="submit">Sign Up</button>
                    </form>
                    <div className="login">
                        Already have an account? <Link to="/login"> Login </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
