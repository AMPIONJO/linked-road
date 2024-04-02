import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-socials">
        <a >
        {/* href="https://www.facebook.com" */}
          <FaFacebook className="social-icon" />
        </a>
        <a>
          <FaTwitter className="social-icon" />
        </a>
        <a>
          <FaInstagram className="social-icon" />
        </a>
        <a>
          <FaLinkedin className="social-icon" />
        </a>
      </div>
      <div className="footer-contact">
        <div className="footer-contact-item">
          <h3>Address:</h3>
          <p>Link Road Residents Association</p>
          <p>C/o Levilla Gardens  Office, Link  Road</p>
          <p>Kikuyu, Kenya</p>
        </div>
        <div className="footer-contact-item">
          <h3>Phone:</h3>
          <p>+254716680088</p>
        </div>
        <div className="footer-contact-item">
          <h3>Email:</h3>
          <p>linkroadassociation@yahoo.com</p>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2024 Link Road. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;




