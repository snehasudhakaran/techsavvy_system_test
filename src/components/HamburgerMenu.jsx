import React from 'react';
import logo from '../assets/images/logo.png';
import '../assets/css/HamburgerMenu.css';
import speedometer from '../assets/images/speedometer.png';
import settings from '../assets/images/settings.png';

function HamburgerMenu() {
  return (
    <>
      {/* Main menu container */}
      <div className='menu'>

        {/* Logo container */}
        <div className='logo-container'>
          <img src={logo} width={205} alt="Logo" /> 
        </div>

        {/* Dashboard link */}
        <div className="menu-link">
          <div>
            <img src={speedometer} alt="Speedometer Icon" />
          </div>
          <p>Dashboard</p>
        </div>

        {/* Settings link */}
        <div className="setting">
          <div>
            <img src={settings} alt="Settings Icon" />
          </div>
          <p>Settings</p>
        </div>
        
      </div>
    </>
  )
}

export default HamburgerMenu;
