import React from 'react';
import '../style/AmbulanceService.css';

const AmbulanceService = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>Use the Ambulance Service app to help you in emergencies</h1>
      </div>
      <div className="card-container">
        <div className="card">
          <img
            alt="Ambulance on the road"
            height="200"
            src=".\images\Ambulance1.jpeg"
            width="300"
          />
          <div className="card-content">
            <h3>Emergency Response</h3>
            <p>Get immediate assistance with our emergency response service, available 24/7.</p>
           <a href='#req'> <button> Request emergency response</button></a>
          </div>
        </div>
        <div className="card">
          <img
            alt="Ambulance at a hospital"
            height="200"
            src=".\images\Ambulance2.jpeg"
            width="300"
          />
          <div className="card-content">
            <h3>Hospital Transfers</h3>
            <p>Schedule a transfer to and from hospitals with our reliable ambulance service.</p>
            <button onClick={() => alert("This is a future scope functionality")}>Schedule hospital transfer</button>
          </div>
        </div>
        <div className="card">
          <img
            alt="Ambulance in a city"
            height="200"
            src=".\images\Ambulance3.jpeg"
            width="300"
          />
          <div className="card-content">
            <h3>City Coverage</h3>
            <p>Our service is available in multiple cities, ensuring you get help wherever you are.</p>
            <button onClick={() => alert("Currently available in Pune region")}>Check city coverage</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceService;
