import React from 'react';
import { useNavigate } from "react-router-dom";
import '../style/AmbulanceDriver.css'

const AmbulanceDriver = () => {
  const navigate = useNavigate();
  return (
    <div className="business-section">
      <div className="business-content">
        <h2>Looking to become an ambulance driver?</h2>
        <p>Join our team and help save lives. Get information about how you can connect with our ambulance service:</p>
        <a href="/driverinfo">Driver requirements</a>
        <a href="/driverinfo">Benefits and compensation</a>
        <a href="/driverinfo">Application process</a>
        <button onClick={() => navigate("/driverregister")}>Get started</button>
        <button onClick={() => navigate("/driverinfo")}>Learn more</button>
      </div>
      <div className="business-image">
        <img
          alt="Ambulance Driver"
          height="200"
          src="./images/Driver.jpeg"
          width="300"
        />
      </div>
    </div>
  );
};

export default AmbulanceDriver;
