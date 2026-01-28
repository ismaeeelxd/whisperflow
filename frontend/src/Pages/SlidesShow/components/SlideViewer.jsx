import React from 'react';
import './SlideViewer.css';

import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';

const SlideViewer = ({ slide, language }) => {
  if (!slide) return <div className="main-viewer flex items-center justify-center">Select a slide</div>;

  const renderContent = () => {
    switch (language) {
      case 'arabic':
        return (
            <div className="content-block" dir="rtl">
                <div className="point-item">
                    <span className="point-dot"></span>
                    <h2 className="point-text text-xl font-bold mb-2">{slide.content.ar.title}</h2>
                </div>
                {slide.content.ar.points.map((point, i) => (
                    <div key={i} className="point-item">
                        <span className="point-dot light"></span>
                        <p className="point-text">{point}</p>
                    </div>
                ))}
            </div>
        );
      case 'english':
        return (
            <div className="content-block">
                <div className="point-item">
                    <span className="point-dot"></span>
                    <h2 className="point-text text-xl font-bold mb-2">{slide.content.en.title}</h2>
                </div>
                {slide.content.en.points.map((point, i) => (
                    <div key={i} className="point-item">
                        <span className="point-dot light"></span>
                        <p className="point-text">{point}</p>
                    </div>
                ))}
            </div>
        );
      case 'split':
      default:
        return (
          <>
            {/* English Content */}
            <div className="content-block">
                <div className="point-item">
                    <span className="point-dot"></span>
                    <h2 className="point-text text-xl font-bold mb-2">{slide.content.en.title}</h2>
                </div>
                {slide.content.en.points.map((point, i) => (
                    <div key={i} className="point-item">
                        <span className="point-dot light"></span>
                        <p className="point-text">{point}</p>
                    </div>
                ))}
            </div>
            {/* Arabic Content */}
            <div className="content-block" dir="rtl">
                <div className="point-item">
                    <span className="point-dot"></span>
                    <h2 className="point-text text-xl font-bold mb-2">{slide.content.ar.title}</h2>
                </div>
                {slide.content.ar.points.map((point, i) => (
                    <div key={i} className="point-item">
                        <span className="point-dot light"></span>
                        <p className="point-text">{point}</p>
                    </div>
                ))}
            </div>
          </>
        );
    }
  };

  return (
    <main className="main-viewer custom-scrollbar">
        {/* Context Header */}
        <div className="context-header">
            <div>
                <span className="edit-label">Currently Editing</span>
                <h1 className="view-title">Lecture: Introduction to Neural Networks</h1>
            </div>
            <div className="action-group">
                <button className="icon-btn-box">
                    <UndoIcon />
                </button>
                <button className="icon-btn-box">
                    <RedoIcon />
                </button>
            </div>
        </div>

        {/* Canvas Area */}
        <div className="canvas-area">
            {/* Slide Card */}
            <div className="slide-card group">
                {/* Decorative Element */}
                <div className="deco-element"></div>
                
                {/* Slide Header */}
                <div className="card-header">
                    <div className="title-row">
                        {/* Title logic from design: Hardcoded check + dynamic support capability */}
                        <h2 className="slide-main-title">Understanding Perceptrons</h2>
                        <button className="edit-trigger">
                            <EditIcon sx={{ fontSize: 20 }} />
                        </button>
                    </div>
                    <h3 className="slide-sub-title" dir="rtl">فهم المدركات</h3>
                </div>

                {/* Slide Content: Bilingual Columns */}
                <div className={`content-grid custom-scrollbar ${language === 'split' ? 'split-mode' : ''}`}>
                   {renderContent()}
                </div>

                {/* Slide Footer */}
                <div className="card-footer">
                    <span className="slide-number">Slide {slide.id}</span>
                    <div className="footer-info">
                        <SchoolIcon sx={{ fontSize: 16 }} />
                        <span>CS 101: Introduction to AI</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
};

export default SlideViewer;
