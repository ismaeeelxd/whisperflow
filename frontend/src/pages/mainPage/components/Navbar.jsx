import React from "react";
import "./Navbar.css";
import MatrialUi from "./MatrialUi";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          {/* <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="#EBEFFE" />
            <path d="M12 6L16 12L12 18L8 12L12 6Z" fill="#2546F5" />
          </svg> */}
          <GraphicEqIcon sx={{ color: '#2546F5', fontSize: 35 ,}} />
          <span className="logo-text">WhisperFlow</span>
        </div>

        <div className="navbar-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
        </div>

        <div className="navbar-actions">
          <button className="btn-login">Login</button>
          <button className="btn-primary">Get Started</button>
        </div>
        <MatrialUi />
      </div>
    </nav>
  );
};

export default Navbar;
