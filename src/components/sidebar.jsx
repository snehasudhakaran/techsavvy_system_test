import React from 'react';
import logo from '../assets/images/main-logo.png';
import menu from '../assets/images/top-menu.png';
import HamburgerMenu from './HamburgerMenu';

function Sidebar() {
  return (
    <div className="sidebar-wrapper">
        {/* Logo section */}
        <div className="logo-image">
          <img src={logo} alt="Logo" />
        </div>
        
        {/* Divider line */}
        <div style={{ height: "1px", width: "100%", backgroundColor: "rgba(217, 217, 217, 1)" }} />
        
        {/* Menu button section */}
        <div className="menu-button">
          <img src={menu} alt="Menu" />
        </div>
        
        {/* Hamburger menu component */}
        <HamburgerMenu/>
    </div>
  );
}

export default Sidebar;

// This component is responsible for rendering the sidebar, which includes the logo, 
// a divider line, a menu button, and the HamburgerMenu component.
