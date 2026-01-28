import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar'; // <--- Imported Standalone Sidebar
import LectureCard from './LectureCard';

// Icons for Topbar
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

  // will be added later
  const filters = ['All'];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard-container">
      
      {/* --- STANDALONE SIDEBAR --- */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        user={{ name: "User Name", plan: "Basic Plan" }} // Pass generic or real user data here
      />

      {/* --- MAIN CONTENT --- */}
      <div className="main-content">
        
        {/* Top Bar */}
        <div className="top-bar">
           <div className="toggle-btn" onClick={toggleSidebar}>
              {isSidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
           </div>
           
           <div className="search-bar">
              <SearchIcon />
              <input type="text" placeholder="Search for lectures..." className="search-input" />
           </div>

           <div className="top-actions">
              <NotificationsNoneIcon sx={{ color: 'var(--light-text)', cursor: 'pointer' }} />
              <button className="btn-new-lecture" onClick={() => console.log('Upload clicked')}>
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
                    <div 
                      key={filter}
                      className={`chip ${activeFilter === filter ? 'active' : ''}`}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </div>
                 ))}
              </div>
           </div>

           {/* Grid - Now Clean */}
           <div className="lectures-grid">
              {/* Always show the Upload Placeholder */}
              <LectureCard isPlaceholder onUpload={() => console.log('Upload clicked')} />

              {/* If no lectures, we could show an empty state message here, 
                  but for now it just shows the placeholder card. */}
              {lectures.length > 0 && lectures.map(lecture => (
                 <LectureCard key={lecture.id} data={lecture} />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
