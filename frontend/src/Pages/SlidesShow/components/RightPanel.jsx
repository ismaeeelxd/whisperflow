import React from 'react';
import './RightPanel.css';

// Static random heights for waveform
const WAVE_HEIGHTS = [40, 60, 80, 100, 70, 50, 30, 50, 40, 30, 20, 40, 20, 30, 20];

import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const RightPanel = ({ language, setLanguage }) => {
  return (
    <aside className="right-sidebar custom-scrollbar">
      <div className="sidebar-content">
        
        {/* Section: View Options */}
        <div className="control-section">
          <label className="section-label">Slide Language</label>
          <div className="lang-selector">
            {['english', 'split', 'arabic'].map((lang) => (
                <label 
                    key={lang}
                    className={`lang-option ${language === lang ? 'active' : ''}`}
                    onClick={() => setLanguage(lang)}
                >
                    <span style={{ textTransform: 'capitalize', position: 'relative', zIndex: 10 }}>{lang}</span>
                    <input 
                        type="radio" 
                        name="lang" 
                        value={lang} 
                        checked={language === lang} 
                        onChange={() => setLanguage(lang)}
                        className="hidden-radio" 
                    />
                </label>
            ))}
          </div>
        </div>

        {/* Section: Audio Player */}
        <div className="audio-player-card">
          <div className="player-header">
            <div className="player-title">
              <RecordVoiceOverIcon className="text-primary" />
              <span>Voice-over</span>
            </div>
            <select className="speed-select">
              <option>1.0x Speed</option>
              <option>1.25x Speed</option>
              <option>1.5x Speed</option>
            </select>
          </div>

          {/* Fake Waveform */}
          <div className="waveform-viz">
             {WAVE_HEIGHTS.map((h, i) => {
                 let fillClass = 'fill-gray';
                 if (i < 4) fillClass = 'fill-light';
                 else if (i < 6) fillClass = 'fill-mid';
                 else if (i < 8) fillClass = 'fill-primary';
                 
                 return (
                     <div 
                        key={i} 
                        className={`wave-line ${fillClass}`}
                        style={{ height: `${h}%` }}
                     ></div>
                 );
             })}
          </div>

          <div className="time-row">
            <span className="time-text">02:14</span>
            <input className="flex-1" type="range" defaultValue="45"/>
            <span className="time-text text-right">05:00</span>
          </div>

          <div className="controls-row">
            <button className="ctrl-btn-small">
              <SkipPreviousIcon sx={{ fontSize: 28 }} />
            </button>
            <button className="play-btn-large">
              <PlayArrowIcon sx={{ fontSize: 32 }} className="fill-current" />
            </button>
            <button className="ctrl-btn-small">
              <SkipNextIcon sx={{ fontSize: 28 }} />
            </button>
          </div>
        </div>

        <hr className="divider"/>

        {/* Section: Tags & Metadata */}
        <div className="control-section">
            <label className="section-label">Context & Tags</label>
            <div className="flex flex-col gap-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="context-box">
                    <div className="folder-icon-box">
                        <FolderOpenIcon />
                    </div>
                    <div>
                        <p className="context-title">Computer Science</p>
                        <p className="context-subtitle">Department</p>
                    </div>
                </div>
                <div className="tags-list">
                    <span className="tag-pill tag-purple">
                        Artificial Intelligence
                    </span>
                    <span className="tag-pill tag-indigo">
                        Week 3
                    </span>
                    <span className="tag-pill tag-add">
                        + Add Tag
                    </span>
                </div>
            </div>
        </div>

        {/* Notes Section */}
        <div className="control-section">
            <div className="notes-header">
                <label className="section-label">Quick Notes</label>
                <button className="btn-clear">Clear</button>
            </div>
            <textarea className="notes-input custom-scrollbar" placeholder="Add a note for this slide..."></textarea>
        </div>

      </div>
    </aside>
  );
};

export default RightPanel;
