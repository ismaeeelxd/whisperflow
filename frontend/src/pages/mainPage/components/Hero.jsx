import React from 'react';
import './Hero.css';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            New: Arabic & English Support
          </div>
          <h1 className="hero-title">
            Turn lecture audio into <span className="highlight">summarized slides</span>
          </h1>
          <p className="hero-description">
            Stop transcribing, start understanding. WhisperFlow uses AI to convert your professor's voice into clear, bilingual study decks in seconds.
          </p>
          <div className="hero-actions">
            <button className="btn-upload">
              <UploadFileIcon sx={{ fontSize: 35 ,}} /> Upload Audio
            </button>
          </div>
          <p className="hero-note">◎ No credit card required for trial</p>
        </div>

        <div className="hero-visual">
          <div className="card-mockup">
            <div className="card-header">
              <div className="dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
            </div>
            <div className="card-body">
              <div className="audio-wave">
                <GraphicEqIcon sx={{ color: '#2546F5', fontSize: 35 ,}} />
              </div>
              <div className="content-lines">
                <div className="line title"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line short"></div>
              </div>
            </div>
            <div className="processing-badge">
              <span className="spinner">⚡</span> Processing
            </div>
            <div className="success-notification">
               <CheckCircleOutlineIcon sx={{ color: '#009238ff', fontSize: 25 ,}} />
               <div>
                 <div className="notif-title">Summary Ready</div>
                 <div className="notif-sub">24 slides generated</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
