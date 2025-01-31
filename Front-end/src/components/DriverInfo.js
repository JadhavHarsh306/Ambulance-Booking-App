import React from 'react';
import '../style/DriverInfo.css'; 

const DriverInfo = () => {
  return (
    <div className="driver-info-container">
      <div className="info-section">
        <h2>Driver Requirements</h2>
        <ul>
          <li>Valid driver's license for at least 2 years</li>
          <li>Minimum of 1 year of driving experience</li>
          <li>Good knowledge of city routes and navigation</li>
          <li>Excellent customer service skills</li>
          <li>Ability to work flexible hours, including nights and weekends</li>
          <li>Clear background check</li>
          <li>Access to a reliable vehicle (if using your own)</li>
        </ul>
      </div>
      
      <div className="info-section">
        <h2>Benefits and Compensation</h2>
        <ul>
          <li>Competitive pay with performance-based bonuses</li>
          <li>Flexible working hours to suit your schedule</li>
          <li>Health insurance and other benefits for full-time drivers</li>
          <li>Fuel allowance for drivers using their own vehicle</li>
          <li>Paid time off and holidays</li>
          <li>Opportunity for career growth and advancement</li>
        </ul>
      </div>
      
    </div>
  );
};

export default DriverInfo;
