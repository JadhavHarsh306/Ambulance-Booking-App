import React, { useState } from 'react';
import '../style/Login.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Sending data:", { email, password });
    
        try {
            // Attempt User Login
            const userResponse = await axios.post("http://localhost:8080/userAuth", { email, password });
            if (userResponse.status === 200 && userResponse.data.name) {
                console.log("Logged in as User");
                localStorage.setItem('userName', userResponse.data.name);  // Store user name
                localStorage.setItem("userId",userResponse.data.id);
                console.log("user id:",userResponse.data.id);
                navigate("/ride");
                return;
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("User login failed, trying Admin...");
            } else {
                console.error("Unexpected error during User login:", error);
                alert("Unexpected error. Please try again.");
                return;
            }
        }
    
        try {
            // Attempt Admin Login
            const adminResponse = await axios.post("http://localhost:8080/adminAuth", { email, password });
            if (adminResponse.status === 200 && adminResponse.data.name) {
                console.log("Logged in as Admin");
                localStorage.setItem('userName', adminResponse.data.name);  // Store admin name
                navigate("/admin");
                return;
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Admin login failed, trying Driver...");
            } else {
                console.error("Unexpected error during Admin login:", error);
                alert("Unexpected error. Please try again.");
                return;
            }
        }
    
        try {
            // Attempt Driver Login
            const driverResponse = await axios.post("http://localhost:8080/driverAuth", { email, password });
            if (driverResponse.status === 200 && driverResponse.data.name) {
                console.log("Logged in as Driver");
                localStorage.setItem('userName', driverResponse.data.name);  // Store driver name
                navigate("/driver");
                return;
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Driver login failed.");
                alert("Invalid Credentials");
            } else {
                console.error("Unexpected error during Driver login:", error);
                alert("Unexpected error. Please try again.");
            }
        }
    };
    
    
    
    
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