"use client";
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Features from "./Features";
import FunFact from "./FunFact";
import Team from "./Team";
import FAQ from "./FAQ";
import CTA from "./CTA";
import Contact from "./Contact";
import Footer from "./Footer";
import Lines from "./Lines";
import ScrollToTop from "./ScrollToTop";

const Landing = () => {
  return (
    <div style={{ paddingTop: 96 }}>
      <Header />
      <Hero />
      <About />
      <Features />
      <FunFact />
      <Team />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
      <Lines />
      <ScrollToTop />
    </div>
  );
};

export default Landing;
