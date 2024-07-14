import React from 'react';
import '../assets/css/home.css';
import HeatmapComponent from '../components/heatMap';
import PerformanceChart from '../components/performanceChart';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

function Home() {
  return (
    <div className="home-container">
      {/* Sidebar for navigation */}
      <Sidebar/>
      
      {/* Main content area */}
      <div className="main-content">
        {/* Topbar with user options and navigation */}
        <Topbar/>
        
        {/* Performance chart to display metrics */}
        <PerformanceChart/>
        
        {/* Heatmap component for visualizing data */}
        <HeatmapComponent/>
      </div>
    </div>
  );
}

export default Home;

// This component represents the home page of the application, 
// which includes a sidebar for navigation, a top bar for user options and navigation, 
// and main content consisting of a performance chart and a heatmap component.
