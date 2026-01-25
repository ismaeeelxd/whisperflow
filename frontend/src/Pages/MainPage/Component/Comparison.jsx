import React from 'react';
import './Comparison.css';

const Comparison = () => {
  return (
    <section className="comparison">
      <div className="container">
        <div className="comparison-header">
          <h2 className="comparison-title">Before vs. After</h2>
          {/* <p className="comparison-subtitle">See the difference clear structure makes for your grades.</p> */}
        </div>

        <div className="comparison-grid">
          {/* Before Card */}
          <div className="comp-card before">
            <div className="comp-visual gray-bg">
              <div className="notebook-page">
                <div className="handwriting-lines">
                  <div className="hw-line"></div>
                  <div className="hw-line"></div>
                  <div className="hw-line short"></div>
                  <div className="hw-line"></div>
                  <div className="hw-line"></div>
                  <div className="hw-line short"></div>
                  <div className="hw-line"></div>
                  <div className="hw-line"></div>
                </div>
              </div>
            </div>
            <div className="comp-content">
              <div className="comp-badge bad">
                <span className="icon">✖</span> Messy Notebook
              </div>
              <p className="comp-desc">Disorganized scribbles that are hard to review and lack context.</p>
            </div>
          </div>

          {/* After Card */}
          <div className="comp-card after">
            <div className="comp-visual blue-bg">
              <div className="slide-deck">
                <div className="slide-card top">
                   <div className="slide-header">WhisperFlow</div>
                   <div className="slide-body">
                     <div className="slide-line"></div>
                     <div className="slide-line"></div>
                   </div>
                </div>
                <div className="slide-card bottom"></div>
              </div>
            </div>
            <div className="comp-content">
              <div className="comp-badge good">
                <span className="icon">✓</span> Structured Bilingual Slide
              </div>
              <p className="comp-desc">Clean, bulleted summaries in English and Arabic for effective study.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
