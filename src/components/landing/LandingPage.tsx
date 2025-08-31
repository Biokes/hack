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

/**
 * Complete Landing Page Component
 * 
 * This component structures all the landing page sections in a cohesive layout.
 * It includes:
 * - Header with navigation
 * - Hero section with main CTA
 * - Features showcase
 * - About section
 * - Fun facts/statistics
 * - Team section
 * - FAQ section
 * - Call-to-action section
 * - Contact form
 * - Footer
 * - Additional UI components (ScrollToTop, Lines)
 */
export default function LandingPage(){
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Lines />
      
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section - Primary landing area */}
        <section id="hero" className="relative">
          <Hero />
        </section>
        
        {/* Features Section - Product capabilities */}
        <section id="features" className="relative">
          <Features />
        </section>
        
        {/* About Section - Company information */}
        <section id="about" className="relative">
          <About />
        </section>
        
        {/* Fun Facts Section - Statistics and achievements */}
        <section id="stats" className="relative">
          <FunFact />
        </section>
        
        {/* Team Section - Meet the team */}
        <section id="team" className="relative">
          <Team />
        </section>
        
        {/* FAQ Section - Common questions */}
        <section id="faq" className="relative">
          <FAQ />
        </section>
        
        {/* Call to Action Section - Secondary conversion point */}
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
  