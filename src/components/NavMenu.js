import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/TransLogo.png";
import "../components/NavMenu.css";

function NavMenu() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <div className="navbar-logo">
      <Link to="/">
          <img src={logo} alt="LinkRoad Logo" />
      </Link>
      </div>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            HOME
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">
            ABOUT
          </Link>
        </li>
        <li className="navbar-item">
          <a href="#services" className="navbar-link">
            SERVICES
          </a>
        </li>
        <li className="navbar-item">
          <a href="#contact" className="navbar-link">
            CONTACT
          </a>
        </li>
        <li className="navbar-item">
          <a href="#register" className="navbar-link">
            REGISTER
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;

