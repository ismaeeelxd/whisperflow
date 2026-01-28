import React from 'react';
import './Dashboard.css';

// Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const LectureCard = ({ data, isPlaceholder, onUpload }) => {
  if (isPlaceholder) {
    return (
      <button 
        type="button" 
        className="placeholder-card" 
        onClick={onUpload}
        aria-label="Upload new lecture"
      >
        <div className="add-icon-circle">
          <AddIcon sx={{ fontSize: 32 }} />
        </div>
        <div className="placeholder-text">Upload Lecture</div>
        <div className="placeholder-sub">Audio or Video files</div>
      </button>
    );
  }

  const { title, date, duration, slides, status, category, progress, error, img } = data;

  return (
    <div className="lecture-card">
      {/* --- Thumbnail Section --- */ }
      <div className="card-thumbnail">
        <img src={img || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2667&auto=format&fit=crop"} alt="thumbnail" className="card-img" />
        
        {/* Category Tag */}
        <span className="category-tag">{category}</span>

        {/* Status Badge */}
        {status === 'completed' && (
          <div className="card-badge completed">
            <CheckCircleIcon sx={{ fontSize: 14 }} /> Completed
          </div>
        )}
        {status === 'processing' && (
          <>
             <div className="processing-overlay">
                <div className="spinner"></div>
                <span style={{fontSize: '0.9rem', fontWeight: 600}}>Processing Audio...</span>
             </div>
             <div className="card-badge processing">
               <HourglassEmptyIcon sx={{ fontSize: 14 }} /> {progress}%
             </div>
          </>
        )}
        {status === 'failed' && (
          <div className="card-badge failed">
            <ErrorOutlineIcon sx={{ fontSize: 14 }} /> Failed
          </div>
        )}
      </div>

      {/* --- Content Section --- */}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        
        {/* Meta Info */}
        <div className="card-meta">
          <span>{date}</span>
          {duration && <span>• {duration}</span>}
          {slides && <span>• {slides} Slides</span>}
        </div>

        {/* Failed Error Message */}
        {status === 'failed' && (
           <p className="error-text">{error}</p>
        )}

        {/* Actions Footer */}
        <div className="card-actions">
          {status === 'completed' && (
            <>
              <button type="button" className="btn-view">
                <PlayArrowIcon sx={{ fontSize: 18 }} /> View Slides
              </button>
              <button type="button" className="btn-icon-only" aria-label="Share">
                <IosShareIcon sx={{ fontSize: 18 }} />
              </button>
            </>
          )}

          {status === 'processing' && (
            <>
              <button type="button" className="btn-view disabled" disabled>
                <PlayArrowIcon sx={{ fontSize: 18 }} /> View Slides
              </button>
              <button type="button" className="btn-icon-only" style={{ border: 'none' }} aria-label="Cancel processing">
                 <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </>
          )}

          {status === 'failed' && (
            <>
              <button type="button" className="btn-retry">
                <ReplayIcon sx={{ fontSize: 18 }} /> Retry Upload
              </button>
              <button 
                type="button" 
                className="btn-icon-only" 
                style={{ color: '#ef4444', borderColor: '#fecaca', background: '#fef2f2' }}
                aria-label="Delete lecture"
              >
                <DeleteOutlineIcon sx={{ fontSize: 18 }} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LectureCard;