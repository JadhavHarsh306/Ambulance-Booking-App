import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Guest.css';

const OtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const generateOtp = () => {
    if (phoneNumber.length === 10) {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(otp);
      alert(`Your OTP is: ${otp}`);
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  const verifyOtp = () => {
    if (enteredOtp === generatedOtp) {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2 className="otp-title">Guest Login</h2>

        {!isLoggedIn ? (
          <>
            <input
              type="text"
              placeholder="Enter 10-digit phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="otp-input"
            />

            <button
              onClick={generateOtp}
              className="otp-button generate-btn"
            >
              Generate OTP
            </button>

            {generatedOtp && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  className="otp-input"
                />
                <button
                  onClick={verifyOtp}
                  className="otp-button verify-btn"
                >
                  Verify OTP
                </button>
              </>
            )}
          </>
        ) : (
          navigate("/ride")
        )}
      </div>
    </div>
  );
};

export default OtpLogin;
