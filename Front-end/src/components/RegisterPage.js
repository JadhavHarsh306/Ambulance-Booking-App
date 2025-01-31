import React, { useState } from 'react';
import '../style/RegisterPage.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [firstname, setfirstname]=useState("");
    const [lastname, setlastname]=useState("");
    const [email, setemail]=useState("");
    const [phone, setphone]=useState("");
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
            firstname, lastname, email, phone, password
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
                        src="https://storage.googleapis.com/a1aa/image/SEWBfs9xPF1DfEwin1P2h0YDRAz37wbaOgD4kE8cA4xkEvIUA.jpg" 
                        width="400" 
                    />
                </div>
                <div className="right">
                    <h2>REGISTER</h2>
                    <form onSubmit={handleRegister}>
                        <input placeholder="First Name" type="text" required value={firstname} onChange={(e)=>setfirstname(e.target.value)}/>
                        <input placeholder="Last Name" type="text" required value={lastname} onChange={(e)=>setlastname(e.target.value)}/>
                        <input placeholder="Email" type="email" required value={email} onChange={(e)=>setemail(e.target.value)}/>
                        <input placeholder="Phone Number" type="text" required value={phone} onChange={(e)=>setphone(e.target.value)}/>
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
