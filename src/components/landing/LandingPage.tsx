"use client";
import React, { useState } from 'react';
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

export default function LandingPage() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Lines />
      <Header />
      <main className="relative">
        <Hero showCreateModal={isModalOpen} setShowCreateModal={setModalOpen} />
        <Features />
        <About />
        <FunFact />
        <Team />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};
// {/* </section> */}
// {/* <section className="relative"> */}
// {/* </section> */}
// {/* <section id="features" className="relative"> */}
// {/* <section id="about" className="relative"> */}
// {/* </section> */}
// {/* <section id="stats" className="relative"> */}
// {/* </section> */}
// {/* <section id="team" className="relative"> */}
// {/* </section> */}
// {/* <section id="faq" className="relative"> */}
// {/* </section> */}
// {/* <section id="cta" className="relative"> */}
// {/* </section> */}
// {/* Contact Section - Contact form and information */}
// {/* <section id="contact" className="relative"> */}
// {/* </section> */}
// {/* Footer */}
// {/* Scroll to Top Button */}