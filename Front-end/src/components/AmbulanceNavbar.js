import React, { useState } from 'react';
import '../style/AmbulanceNavbar.css';
import { FaAmbulance, FaUserCircle } from 'react-icons/fa';

function AmbulanceNavbar({ user, onLogout }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className="loc-header">
      <div className="logo">
        <FaAmbulance />&nbsp;&nbsp;&nbsp;&nbsp; Ambulance Cab Service
      </div>
      {user || (
        <div 
          className="user-section" 
        //   onMouseEnter={() => setDropdownVisible(true)} 
        //   onMouseLeave={() => setDropdownVisible(false)}
        >
          <FaUserCircle className="user-icon" />
          {isDropdownVisible && (
            <div className="dropdown">
              <div className="username">Hello, {user.name}</div>
              <button onClick={onLogout} className="logout-button">Logout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AmbulanceNavbar;
