import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../style/DriverRegister.css";

const DriverRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",      
    license: "",   // Changed from LicenseNo to license
    experience: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    try {
      const response = await axios.post("http://localhost:8080/driverRegister", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        license: formData.license,   // Ensure this matches the backend field
        experience: formData.experience,
        address: formData.address,
        password: formData.password,
      });

      if (response.status === 200) {
        alert("Driver registered successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="rg-container">
      <div className="register-container">
        <div className="left">
          <img
            alt="Ambulance"
            height="400"
            src="./images/Ambulance1.jpeg"
            width="400"
          />
        </div>
        <div className="right">
          <h2>Driver Registration</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input type="text" name="license" placeholder="License Number" required onChange={handleChange} /> {/* Updated name */}
            <input type="number" name="experience" placeholder="Years of Experience" required onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" required onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Register</button>
          </form>
          <div className="login">
            Already have an account? <Link to={"/login"}>Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverRegister;
