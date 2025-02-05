import React, { useState, useEffect } from 'react';
import '../style/AmbulanceNavbar.css';
import { FaAmbulance, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AmbulanceNavbar({ onLogout }) {
    const [userName, setUserName] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        // Get the user's name from localStorage when the component mounts
        const storedName = localStorage.getItem('userName');
        setUserName(storedName);  // Set the name in the state
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleLogout = () => {
        // Clear the user's name from localStorage when logging out
        localStorage.removeItem('userName');
       
    };

    return (
        <div className="loc-header">
            <div className="logo">
                <FaAmbulance />&nbsp;&nbsp;&nbsp;&nbsp; Ambulance Cab Service
            </div>
            <div className="user-section" onClick={toggleDropdown}>
                {userName ? (
                    <>
                        <span className="username">Hello, {userName}</span>
                        <FaUser className="user-icon" />
                    </>
                ) : (
                    <span className="username">Hello, Guest</span>
                )}
                {isDropdownVisible && (
                    <div className="dropdown">
                        <Link to={'/login'}> 
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AmbulanceNavbar;
