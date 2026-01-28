import React from 'react';
import './SocialProof.css';

const SocialProof = () => {
  const unis = ['Stanford', 'MIT', 'Cambridge', 'ETH Zürich', 'KAUST'];
  
  return (
    <div className="social-proof">
      <div className="container">
        <p className="social-label">Trusted by students at:</p>
        <div className="uni-list">
          {unis.map((uni, index) => (
            <span key={index} className="uni-name">{uni}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
