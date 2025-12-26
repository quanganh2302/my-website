import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import StartBackground from "@/components/StartBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutMe from "@/components/AboutMe";
import SkillsSection from "@/components/SkillsSection";
import ProjectSection from "@/components/ProjectSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ThanksSection from "@/components/ThanksSection";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* <ThemeToggle /> */}

      <StartBackground />

      <Navbar />

      <main>
        <HeroSection />
        <AboutMe />
        <ProjectSection />
        <SkillsSection />
        <ContactSection />
        <ThanksSection />
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
