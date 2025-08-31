"use client";
import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import About from './About';
import FunFact from './FunFact';
import Team from './Team';
import FAQ from './FAQ';
import CTA from './CTA';
import Contact from './Contact';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import Lines from './Lines';

export default function LandingPage(){
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Lines />
      
      <Header />
      
      <main className="relative">
        <section id="hero" className="relative">
          <Hero />
        </section>
        
        <section id="features" className="relative">
          <Features />
        </section>
        
        <section id="about" className="relative">
          <About />
        </section>
        
        <section id="stats" className="relative">
          <FunFact />
        </section>
        
        <section id="team" className="relative">
          <Team />
        </section>
        
        <section id="faq" className="relative">
          <FAQ />
        </section>
        
        <section id="cta" className="relative">
          <CTA />
        </section>
        
        {/* Contact Section - Contact form and information */}
        <section id="contact" className="relative">
          <Contact />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};
  