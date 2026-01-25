import React from 'react';
import Navbar from './Component/Navbar';
import Hero from './Component/Hero';
// import SocialProof from './Component/SocialProof';
import Features from './Component/Features';
import HowItWorks from './Component/HowItWorks';
import Comparison from './Component/Comparison';
import CTA from './Component/CTA';
import Footer from './Component/Footer';

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
