"use client";

import Link from "next/link";
import { Home, User, Contact, Code, Linkedin, Github } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Handle smooth scrolling with offset for anchor links
  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = 100; // Match this with the scroll-margin-top in CSS
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  }, []);

  return (
    <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "top-2.5" : "top-6"
    }`}>
      <div className="max-w-fit mx-auto">
        <div className={`flex items-center backdrop-blur-lg border border-zinc-700/50 rounded-full py-3 px-5 transition-all duration-300 ${
          scrolled ? "bg-zinc-900/80 shadow-lg" : "bg-zinc-800/40"
        }`}>
          <nav className="flex space-x-4 items-center">
            <div className="flex flex-col items-center">
              <Link 
                href="/" 
                className="p-2 text-zinc-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300"
                onMouseEnter={() => setActiveButton("home")}
                onMouseLeave={() => setActiveButton(null)}
              >
                <Home size={20} />
              </Link>
              {activeButton === "home" && (
                <div className="absolute mt-14 bg-white rounded-md px-4 py-1 text-zinc-800 font-semibold text-sm transition-all duration-200">
                  Home
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center">
              <Link 
                href="#about" 
                onClick={handleAnchorClick}
                className="p-2 text-zinc-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300"
                onMouseEnter={() => setActiveButton("about")}
                onMouseLeave={() => setActiveButton(null)}
              >
                <User size={20} />
              </Link>
              {activeButton === "about" && (
                <div className="absolute mt-14 bg-white rounded-md px-4 py-1 text-zinc-800 font-semibold text-sm transition-all duration-200">
                  About
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center">
              <Link 
                href="#projects" 
                onClick={handleAnchorClick}
                className="p-2 text-zinc-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300"
                onMouseEnter={() => setActiveButton("projects")}
                onMouseLeave={() => setActiveButton(null)}
              >
                <Code size={20} />
              </Link>
              {activeButton === "projects" && (
                <div className="absolute mt-14 bg-white rounded-md px-4 py-1 text-zinc-800 font-semibold text-sm transition-all duration-200">
                  Projects
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center">
              <Link 
                href="#contact" 
                onClick={handleAnchorClick}
                className="p-2 text-zinc-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300"
                onMouseEnter={() => setActiveButton("contact")}
                onMouseLeave={() => setActiveButton(null)}
              >
                <Contact size={20} />
              </Link>
              {activeButton === "contact" && (
                <div className="absolute mt-14 bg-white rounded-md px-4 py-1 text-zinc-800 font-semibold text-sm transition-all duration-200">
                  Contact
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center">
              <Link 
                href="https://www.linkedin.com/in/benjamin-rowlands/" 
                target="_blank" 
                className="p-2 text-zinc-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300"
                onMouseEnter={() => setActiveButton("linkedin")}
                onMouseLeave={() => setActiveButton(null)}
              >
                <Linkedin size={20} />
              </Link>
              {activeButton === "linkedin" && (
                <div className="absolute mt-14 bg-white rounded-md px-4 py-1 text-zinc-800 font-semibold text-sm transition-all duration-200">
                  LinkedIn
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center">
              <Link 
                href="https://github.com/choppedtuna" 
                target="_blank" 
                className="p-2 text-zinc-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300"
                onMouseEnter={() => setActiveButton("github")}
                onMouseLeave={() => setActiveButton(null)}
              >
                <Github size={20} />
              </Link>
              {activeButton === "github" && (
                <div className="absolute mt-14 bg-white rounded-md px-4 py-1 text-zinc-800 font-semibold text-sm transition-all duration-200">
                  GitHub
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
} 