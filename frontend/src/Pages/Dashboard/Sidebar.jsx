import React from 'react';
import './Dashboard.css';
import { NavLink } from 'react-router-dom';

// Icons
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Sidebar = ({ isOpen, user }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      
      {/* Logo Area */}
      <div className="sidebar-header">
         <GraphicEqIcon className="logo-icon" sx={{ fontSize: 32 }} />
         {isOpen && <span>WhisperFlow</span>}
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
         {/* NavLink automatically adds the 'active' class when the URL matches */}
         <NavLink to="/dashboard" className="nav-item">
           <DashboardIcon /> {isOpen && "Dashboard"}
         </NavLink>
         
         <NavLink to="/library" className="nav-item">
           <VideoLibraryIcon /> {isOpen && "My Library"}
         </NavLink>
         
         <NavLink to="/archives" className="nav-item">
           <InventoryIcon /> {isOpen && "Archives"}
         </NavLink>
         
         <NavLink to="/settings" className="nav-item">
           <SettingsIcon /> {isOpen && "Settings"}
         </NavLink>
      </nav>

      {/* User Profile Area */}
      <div className="user-profile">
          <button 
            type="button" 
            className="nav-item btn-reset" 
            style={{ marginBottom: '16px', width: '100%', justifyContent: 'flex-start' }}
          >
              <HelpOutlineIcon /> {isOpen && "Help & Support"}
          </button>
          
          <div className="user-info-card">
             <img 
               src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
               alt="User" 
               className="user-avatar" 
             />
             
             {isOpen && (
               <div className="user-details">
                  <div className="user-name">{user?.name || "Guest User"}</div>
                  <div className="user-plan">{user?.plan || "Free Plan"}</div>
                  <div className="storage-track">
                     <div className="storage-bar" style={{ width: '0%' }}></div>
                  </div>
                  <div style={{fontSize: '0.7rem', color: 'var(--light-text)', marginTop: '4px'}}>
                    0 / 10 GB
                  </div>
               </div>
             )}
          </div>
      </div>
    </div>
  );
};

export default Sidebar;