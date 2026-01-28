import React from 'react';
import './Dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';

// Icons
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Sidebar = ({ isOpen, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to check active state
  // We explicitly check if path is "/" OR "/dashboard" so it's always highlighted
  const isDashboardActive = location.pathname === '/' || location.pathname === '/dashboard';
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      
      {/* Logo Area */}
      <div className="sidebar-header">
         <GraphicEqIcon className="logo-icon" sx={{ fontSize: 32 }} />
         {isOpen && <span>WhisperFlow</span>}
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
         <div 
           className={`nav-item ${isDashboardActive ? 'active' : ''}`} 
           onClick={() => navigate('/dashboard')}
         >
           <DashboardIcon /> {isOpen && "Dashboard"}
         </div>
         
         <div 
           className={`nav-item ${isActive('/library') ? 'active' : ''}`}
           onClick={() => navigate('/library')}
         >
           <VideoLibraryIcon /> {isOpen && "My Library"}
         </div>
         
         <div 
           className={`nav-item ${isActive('/archives') ? 'active' : ''}`}
           onClick={() => navigate('/archives')}
         >
           <InventoryIcon /> {isOpen && "Archives"}
         </div>
         
         <div 
           className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
           onClick={() => navigate('/settings')}
         >
           <SettingsIcon /> {isOpen && "Settings"}
         </div>
      </nav>

      {/* User Profile Area */}
      <div className="user-profile">
          <div className="nav-item" style={{ marginBottom: '16px' }}>
              <HelpOutlineIcon /> {isOpen && "Help & Support"}
          </div>
          
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