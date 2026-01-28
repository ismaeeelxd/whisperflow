import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import SocialProof from './Component/SocialProof';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Comparison from './components/Comparison';
import CTA from './components/CTA';
import Footer from './components/Footer';

const MainPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <SocialProof /> */}
      <Features />
      <HowItWorks />
      <Comparison />
      <CTA />
      <Footer />
    </>
  );
};

export default MainPage;
