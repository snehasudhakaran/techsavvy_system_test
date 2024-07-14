import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/home.css';
import { useNavigate } from 'react-router-dom';
import square from '../assets/images/square.png';
import person from '../assets/images/person.png';
import darklight from '../assets/images/dark_and_light.png';
import dropdown from '../assets/images/dropdown-symbol.png';
import calendar from '../assets/images/calendar.png';
import avatar from '../assets/images/Avatar.png';
import logoutimg from '../assets/images/logout.png';

function Topbar() {
  const navigate = useNavigate(); // Hook for navigation
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef(null); // Reference to the dropdown element

  // Function to handle logout
  const logout = () => {
    // Clear user session data
    localStorage.removeItem('token');
    navigate('/');
  };

  // Function to toggle dropdown visibility
  const handlePersonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener to detect clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="top-bar">
      {/* Dashboard title */}
      <div className="dashboard-text">Dashboard</div>

      <div className="sec">
        {/* Date range display */}
        <div className="date">
          <div>
            <img src={calendar} alt="Calendar" />
          </div>
          <div>
            <div><span style={{ fontWeight: "600", color: "rgba(51, 56, 67, 1)" }}>Last 7 Days:</span> Jan 14- Jan 20, 2024</div>
            <div style={{ fontWeight: "400", color: "rgba(124, 126, 129, 1)" }}>Compared: Jan 07 - Jan 13, 2024</div>
          </div>
          <div>
            <img src={dropdown} alt="Dropdown" />
          </div>
        </div>

        {/* Icon section */}
        <div className="icons">
          <div>
            <img src={square} alt="Square" />
          </div>
          <div>
            <img src={darklight} alt="Dark Light" />
          </div>

          {/* Person icon with dropdown */}
          <div className="person-icon" onClick={handlePersonClick}>
            <img src={person} alt="Person" />
            {isDropdownOpen && (
              <div className="dropdown" ref={dropdownRef}>
                {/* User information */}
                <div className="dropdown-item">
                  <div className="image-con">
                    <img src={avatar} alt="Avatar" />
                  </div>
                  <div>
                    <div className='dropdown-heading' style={{ fontWeight: "500" }}>Naveen</div>
                    <div style={{ fontSize: "10px" }}>Online</div>
                  </div>
                </div>

                {/* Logout option */}
                <div className="dropdown-item" onClick={logout}>
                  <div className="image-con">
                    <img src={logoutimg} alt="Logout" />
                  </div>
                  <div>
                    <div className='dropdown-heading' style={{ color: "rgba(62, 77, 102, 1)" }}>Logout</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;

// This component represents the top bar of the application, which includes the dashboard title, date range display, 
// icon section, and a person icon that opens a dropdown menu with user information and a logout option.
