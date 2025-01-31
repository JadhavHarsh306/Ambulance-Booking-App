import React, { useState } from 'react';
import '../style/Login.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            console.log("Sending data:", { email, password });

            const response=await axios.post("http://localhost:8080/userAuth",{email,password});

            console.log("Backend Response:", response.data);
            if(response.data==="Sucess"){
                navigate("/ride");
            }else{
                alert("Invalid Credentials");
            }
        }catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please try again.");
          }
    }
    return (
        <div className="lg-container">
            <div className="login-container">
                <div className="left">
                    <img 
                        alt="Ambulance" 
                        height="400" 
                        src="https://storage.googleapis.com/a1aa/image/SEWBfs9xPF1DfEwin1P2h0YDRAz37wbaOgD4kE8cA4xkEvIUA.jpg" 
                        width="400" 
                    />
                </div>
                <div className="right">
                    <h2>LOGIN</h2>
                    <form onSubmit={handleLogin}>
                        <input placeholder="Email" type="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                        <input placeholder="Password" type="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                        <div className="forgot-password">
                            <a href="#">Forgot password?</a>
                        </div>
                        <button type="submit">Log In</button>
                    </form>
                    <div className="signup">
                        Don't have an account? <Link to="/register"> <a>Signup</a> </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;