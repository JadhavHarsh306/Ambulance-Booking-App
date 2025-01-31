import React, { useState } from "react";
import "../style/DriverRegister.css"; // Ensure the CSS file is linked

const DriverRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    license: "",
    experience: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError(""); // Clear errors if valid
    alert("Driver registered successfully!");
    console.log(formData); // You can replace this with an API call
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
          <h2>Driver Registration</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
            <input type="text" name="license" placeholder="License Number" required onChange={handleChange} />
            <input type="number" name="experience" placeholder="Years of Experience" required onChange={handleChange} />
            <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Register</button>
          </form>
          <div className="login">
            Already have an account? <a href="/login">Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverRegister;
