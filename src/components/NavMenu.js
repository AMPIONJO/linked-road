import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../images/TransLogo.png";
import "../components/NavMenu.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function NavMenu() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = React.useState(false);
  const menuIconRef = useRef();
  const menuRef = useRef();
  const menuItemRef = useRef();

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };
  
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };
  

useEffect(() => {
  const handleMenuItemClick = (event) => {
    if (menuItemRef.current && menuItemRef.current.contains(event.target) && menuItemRef.current.classList.contains("show")) {
      toggleMenu();
    }
  };

  const handleOutsideClick = (event) => {
    if (showMenu && !menuRef.current.contains(event.target) && !menuIconRef.current.contains(event.target)) {
      toggleMenu();
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      menuRef.current.classList.add("sticky");
    } else {
      menuRef.current.classList.remove("sticky");
    }
  };

  document.addEventListener("click", handleMenuItemClick);
  window.addEventListener("scroll", handleScroll);
  document.addEventListener("click", handleOutsideClick);

  return () => {
    document.removeEventListener("click", handleMenuItemClick);
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("click", handleOutsideClick);
  };
}, []);

  

  const handleLogout = () => {
    auth.signOut().then(() => {
      toast.success("Logout successful", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      navigate("/");
    });

  };

  return (
      <nav className="navbar" ref={menuRef}>
    <div className="navbar-logo">
      <Link to="/">
        <img src={logo} alt="LinkRoad Logo" />
      </Link>
    </div>
    <div className="menu-icon" ref={menuIconRef} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    <ToastContainer />
    <ul className={`navbar-menu${showMenu ? " show" : ""}`} ref={menuItemRef}>
        <li className="navbar-item" onClick={handleLinkClick}>
          <Link to="/" className="navbar-link">
            HOME
          </Link>
        </li>
        <li className="navbar-item" onClick={handleLinkClick}>
          <Link to="/about" className="navbar-link">
            ABOUT
          </Link>
        </li>
        <li className="navbar-item" onClick={handleLinkClick}>
        <Link to="/services" className="navbar-link">
            SERVICES
        </Link>
        </li>
        <li className="navbar-item" onClick={handleLinkClick}>
        <Link to="/area-of-operation" className="navbar-link">
            AREA OF OPERATION
        </Link>
        </li>

        <li className="navbar-item" onClick={handleLinkClick}>
          <a href="#contact" className="navbar-link">
            CONTACT
          </a>
        </li>
        {user ? (
          <>
            <li className="navbar-item" onClick={handleLinkClick}>
              <Link to="/profile" className="navbar-link">
                PROFILE
              </Link>
            </li>
            <li className="navbar-item" onClick={handleLinkClick}>
              <a href="#logout" className="navbar-link" onClick={handleLogout}>
                LOGOUT
              </a>
            </li>
          </>
        ) : (
          <li className="navbar-item" onClick={handleLinkClick}>
            <Link to="/registers" className="navbar-link">
              REGISTER
              </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavMenu;


