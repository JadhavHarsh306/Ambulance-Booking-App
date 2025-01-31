import React from "react";
import "../style/AboutUs.css"; // Import CSS file
import { motion } from "framer-motion";  // ✅ Correct way


const AboutUs = () => {
  return (
    <div className="about-container">
      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="about-title">About Us</h1>
        <p className="about-text">
          We are dedicated to providing **quick and reliable ambulance services** to ensure that help reaches you when you need it most.
          Our mission is to bridge the gap between emergencies and medical attention with **efficiency, safety, and care**.
        </p>

        {/* Contact Details */}
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p><strong>📞 Phone:</strong> +91 9167782260</p>
          <p><strong>📧 Email:</strong>jadhavharsh@gmail.com</p>
        </div>
      </motion.div>

      <motion.div
        className="about-image"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <img src="./images/Ambulance1.jpeg" alt="Ambulance Service" />
      </motion.div>
    </div>
  );
};

export default AboutUs;
