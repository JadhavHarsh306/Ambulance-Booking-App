import React from 'react';
import '../style/Footer.css';
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Ambulance Cab Service</h3>
                    <p><a href="#">Visit Help Center</a></p>
                </div>
                <div className="footer-section">
                    <h3>Company</h3>
                    <p><a href="#">About us</a></p>
                    <p><a href="#">Our offerings</a></p>
                    <p><a href="#">Newsroom</a></p>
                    <p><a href="#">Investors</a></p>
                    <p><a href="#">Blog</a></p>
                    <p><a href="#">Careers</a></p>
                </div>
                <div className="footer-section">
                    <h3>Services</h3>
                    <p><a href="#">Emergency Rides</a></p>
                    <p><a href="#">Non-Emergency Rides</a></p>
                    <p><a href="#">Medical Transport</a></p>
                    <p><a href="#">Patient Transfer</a></p>
                </div>
                <div className="footer-section">
                    <h3>Global citizenship</h3>
                    <p><a href="#">Safety</a></p>
                    <p><a href="#">Diversity and Inclusion</a></p>
                    <p><a href="#">Sustainability</a></p>
                </div>
                <div className="footer-section">
                    <h3>Travel</h3>
                    <p><a href="#">Reserve</a></p>
                    <p><a href="#">Cities</a></p>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="social-icons">
                    <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                    <a href="https://www.linkedin.com/in/harsh-dilip-jadhav-208a96251/"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                </div>
                <div className="language-location">
                    <i className="fas fa-globe"></i> <span>English</span>
                    <i className="fas fa-map-marker-alt"></i> <span>Pune</span>
                </div>
            </div>
            <div className="copyright">
                &copy; 2025 Ambulance Cab Service. All rights reserved.
            </div>
        </div>
    );
};

export default Footer;

