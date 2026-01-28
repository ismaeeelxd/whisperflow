import React from 'react';
import './HowItWorks.css';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const HowItWorks = () => {
  const steps = [
    {
      num: 1,
      icon: <UploadFileIcon sx={{ color: '#0f0092ff',fontSize: 35 ,}} />,
      title: 'Upload Audio',
      desc: 'Upload your lecture recording in MP3 or WAV format directly.'
    },
    {
      num: 2,
      icon: <PsychologyOutlinedIcon sx={{ color: '#6f0279ff',fontSize: 35 ,}} />,
      title: 'AI Processing',
      desc: 'Our model transcribes, translates, and summarizes the content.'
    },
    {
      num: 3,
      icon: <SaveAltIcon sx={{ color: '#009238ff',fontSize: 35 ,}} />,
      title: 'Download Slides',
      desc: 'Receive your structured bilingual slides in PDF or PPT format.'
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How it works</h2>
          <p className="section-subtitle">From audio to ace in three simple steps.</p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
               <div className="step-icon-wrapper">
                 <div className="step-icon">{step.icon}</div>
               </div>
               <h3 className="step-title">{step.num}. {step.title}</h3>
               <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
