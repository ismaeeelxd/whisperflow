import React, { useRef, useEffect } from 'react';
import './SlideList.css';

import GridViewIcon from '@mui/icons-material/GridView';
import CheckIcon from '@mui/icons-material/Check';

const SlideList = ({ slides, selectedId, onSelect }) => {
  const selectedRef = useRef(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedId]);

  return (
    <aside className="sidebar-list">
      <div className="sidebar-header">
        <span className="header-label">Slides ({slides.length})</span>
        <button className="icon-btn-minimal">
          <GridViewIcon sx={{ fontSize: 20 }} />
        </button>
      </div>
      <div className="list-container custom-scrollbar">
        {slides.map((slide, index) => {
          const isActive = slide.id === selectedId;
          return (
            <div 
              key={slide.id}
              ref={isActive ? selectedRef : null}
              className="slide-item-wrapper"
              onClick={() => onSelect(slide.id)}
            >
              <div className={`slide-thumbnail ${isActive ? 'active' : ''}`}>
                {/* Default gradient if no image */}
                <div 
                  className={`thumbnail-bg ${!isActive ? 'dimmed' : ''}`} 
                  style={{ 
                    backgroundImage: slide.image 
                      ? `url("${slide.image}")` 
                      : 'linear-gradient(135deg, #e0f2fe 0%, #0ea5e9 100%)' 
                  }}
                ></div>
                
                {/* Duration Badge (only if not active checkmark) */}
                {!isActive && (
                  <div className="duration-badge">
                    {slide.duration}
                  </div>
                )}

                {/* Active Checkmark */}
                {isActive && (
                  <div className="check-badge">
                    <CheckIcon sx={{ fontSize: 14 }} className="block" />
                  </div>
                )}
              </div>
              <p className={`slide-label ${isActive ? 'active' : ''}`}>
                {index + 1}. {slide.title}
              </p>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default SlideList;
