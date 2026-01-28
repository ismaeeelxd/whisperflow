import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import LectureCard from './LectureCard';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

 // will be added later
  const lectures = []; 
  const filters = ['All'];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard-container">
      
      {/* --- SIDEBAR --- */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        user={{ name: "User Name", plan: "Basic Plan" }} 
      />

      {/* --- MAIN CONTENT --- */}
      <div className="main-content">
        
        {/* Top Bar */}
        <div className="top-bar">
           <button 
             type="button" 
             className="toggle-btn btn-reset" 
             onClick={toggleSidebar} 
             aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
           >
              {isSidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
           </button>
           
           <div className="search-bar">
              <SearchIcon />
              <input type="text" placeholder="Search for lectures..." className="search-input" />
           </div>

           <div className="top-actions">
              {/* Notification icon as a button for keyboard access */}
              <button type="button" className="btn-reset" aria-label="Notifications">
                <NotificationsNoneIcon sx={{ color: 'var(--light-text)' }} />
              </button>

              <button type="button" className="btn-new-lecture" onClick={() => console.log('Upload clicked')}>
                 <CloudUploadIcon /> Upload New Lecture
              </button>
           </div>
        </div>

        {/* Scrollable Area */}
        <div className="content-scroll">
           <h1 className="dashboard-title">My Lectures</h1>
           <p className="dashboard-subtitle">Manage and view your converted lecture slides and summaries.</p>

           {/* Filters */}
           <div className="filter-row">
              <div className="filter-chips">
                 {filters.map(filter => (
                    <button 
                      key={filter}
                      type="button"
                      className={`chip ${activeFilter === filter ? 'active' : ''}`}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                 ))}
              </div>
           </div>

           {/* Grid */}
           <div className="lectures-grid">
              <LectureCard isPlaceholder onUpload={() => console.log('Upload clicked')} />

              {lectures.map(lecture => (
                 <LectureCard key={lecture.id} data={lecture} />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
