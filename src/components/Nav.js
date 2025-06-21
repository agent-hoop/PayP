import React, { useState, useRef, useEffect } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
// import { useWallet } from '../context/WalletContext';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef(null);
  const [profilePic, setProfilePic] = useState("https://tessutiitaliano.com/wp-content/uploads/2020/09/What-is-Arabic-Head-Scarf-and-How-to-Wear-an-Arab-Head-Scarf-Male--1200x900.jpg"); // Default profile pic

  // const profilePic = useState("https://tessutiitaliano.com/wp-content/uploads/2020/09/What-is-Arabic-Head-Scarf-and-How-to-Wear-an-Arab-Head-Scarf-Male--1200x900.jpg"); // Default profile pic

  const closeMenu = () => setIsOpen(false);

  // Close the dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);
 

  return (
    <nav>
      <div className="nav-container">
        {/* Hamburger menu icon (mobile only) */}
        <div className="mobile-menu-icon" onClick={() => setIsOpen(true)}>
          ☰
        </div>

        {/* Left: Logo + Nav Items */}
        <div className="left">
          {/* Desktop logo */}
          <div className="paypal_logo desktop-only">
            <img
              src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg"
              alt="PayPal logo"
            />
          </div>

          {/* Nav Items - desktop visible, mobile drawer */}
          <ul className={`nav_links ${isOpen ? 'open' : ''}`}>
            {/* Close button (only on mobile) */} 


            <li onClick={closeMenu}><Link to="/">Home</Link></li>
            <li onClick={closeMenu}><Link to="/send">Send</Link></li>
            <li onClick={closeMenu}><Link to="/activity">Activity</Link></li>
            <li onClick={closeMenu}><Link to="/help">Help</Link></li>
          </ul>
        </div>

        {/* Centered logo on mobile only */}
        <div className="mobile-center-logo mobile-only">
          <Link to="/" className="img_logo"><img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg"
            alt="PayPal icon"
          /></Link>

        </div>

        {/* Right side */}
        <div className="right">
          <div className="profile" ref={profileRef}>
            <img 
              src={profilePic} 
              className="profile_pic" 
              alt="Profile" 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            />
            {showProfileDropdown && (
              <ProfileDropdown 
                profilePic={profilePic}
                onClose={() => setShowProfileDropdown(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isOpen && <div className="backdrop" onClick={closeMenu} />}
    </nav>
  );
}