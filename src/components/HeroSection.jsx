import { ArrowDown } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6 ">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in">Hi. I'm </span>
            {/* <span className="text-primary opacity-0 animate-fade-in-delay-1">
              Lucas
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              Doan
            </span> */}
            <span
              className="text-gradient ml-2 opacity-0 animate-fade-in-delay-1 capitalize bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(213, 164, 139), rgb(48, 48, 48))",
              }}
            >
              Lucas Doan
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-2">
            First of all, it's wonderful to be here. WELCOME! My name is Doan
            Quang Anh, I am Vietnamese, currently living and working in Ha Noi.
            <br />
            For every challenge or
            problem, I focus on understanding the core requirements and then
            choosing the most suitable technologies and techniques to deliver an
            effective solution.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
        <ArrowDown className="text-primary h-5 w-5" />
      </div>
    </section>
  );
};

export default HeroSection;
