// Header.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import '../style/Header.css';

const Header = () => {
    return (
        <header className="header1">
           <Link to="/"> <img
                alt="RED.Health Logo"
                height="50"
                src=".\images\icon.jpeg"
                width="70"
            /></Link>
            <nav className="nav">
                <h2>Ambulance Cab Service</h2>
                <Link to="/aboutus" className="nav-link">ABOUT US</Link>
                <Link to="/login" className="nav-link">LOG IN</Link> 
                <Link to="/register" className="nav-link">SIGN UP</Link> 
                <Link className="cta-button" to="/guestlogin">
                    <i className="fas fa-ambulance"></i>
                    BOOK AN AMBULANCE
                </Link>
            </nav>
        </header>
    );
};

export default Header;