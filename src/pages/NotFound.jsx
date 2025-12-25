import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import StartBackground from "@/components/StartBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <ThemeToggle />

      <StartBackground />

      <Navbar />

      <section className="container flex flex-col items-center justify-cente py-20">
        {/* Planets decoration */}
        <div className="absolute top-32 left-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-linear-to-br from-blue-400/20 to-blue-600/20 blur-xl animate-float" />
        <div className="absolute bottom-40 right-20 w-32 h-32 md:w-48 md:h-48 rounded-full bg-linear-to-br from-purple-400/20 to-pink-600/20 blur-xl animate-float-slow" />

        {/* 404 Number with gradient */}
        <div
          className="text-[120px] md:text-[200px] lg:text-[250px] font-bold text-transparent bg-clip-text leading-none mb-8 animate-pulse-slow"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(213, 164, 139), rgb(48, 48, 48))",
          }}
        >
          404
        </div>

        {/* Text Content */}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(213, 164, 139), rgb(48, 48, 48))",
          }}
        >
          Oops! You’ve drifted into the 404 universe.
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-10 text-center max-w-md px-4">
          The page you’re looking for doesn’t exist or has been pulled into a
          black hole.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => (window.location.href = "/portfolio")}
            className="cosmic-button flex items-center justify-center gap-2 cursor-pointer"
          >
            ComeBack Home
          </button>
        </div>
      </section>

      <div className="absolute w-full bottom-0">
        <Footer />
      </div>

    </div>
  );
};

export default NotFound;
