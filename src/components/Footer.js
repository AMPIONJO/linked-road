import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-socials">
        <a href="https://www.facebook.com">
          <FaFacebook className="social-icon" />
        </a>
        <a href="https://www.twitter.com">
          <FaTwitter className="social-icon" />
        </a>
        <a href="https://www.instagram.com">
          <FaInstagram className="social-icon" />
        </a>
        <a href="https://www.linkedin.com">
          <FaLinkedin className="social-icon" />
        </a>
      </div>
      <div className="footer-contact">
        <div className="footer-contact-item">
          <h3>Address:</h3>
          <p>123 Street Name</p>
          <p>City, State ZIP</p>
        </div>
        <div className="footer-contact-item">
          <h3>Phone:</h3>
          <p>(123) 456-7890</p>
        </div>
        <div className="footer-contact-item">
          <h3>Email:</h3>
          <p>example@email.com</p>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2023 LinkedRoad. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;




