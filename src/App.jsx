import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home, About, Contact, Project } from "./pages/index.js";
import Navbar from "@/components/Navbar.jsx";
import Portfolio from "@/pages/Portfolio.jsx";
import NotFound from "@/pages/NotFound.jsx";
import { Toaster } from "@/components/ui/toaster.jsx";

const App = () => {
  return (
    <main>
      <Toaster />
      <BrowserRouter>
        <React.Fragment>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/pallettown" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project" element={<Project />} />
          </Routes>
        </React.Fragment>
      </BrowserRouter>
    </main>
  );
};

export default App;
