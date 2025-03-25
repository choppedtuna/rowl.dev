"use client";

import Link from "next/link";
import { Home, Image, FileText, Mail, Linkedin, Github, User, Contact, Code } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  
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
            <Link href="/" className="p-2 text-zinc-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300">
              <Home size={20} />
            </Link>
            <Link 
              href="#about" 
              onClick={handleAnchorClick}
              className="p-2 text-zinc-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300"
            >
              <User size={20} />
            </Link>
            <Link 
              href="#projects" 
              onClick={handleAnchorClick}
              className="p-2 text-zinc-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300"
            >
              <Code size={20} />
            </Link>
            <Link 
              href="#contact" 
              onClick={handleAnchorClick}
              className="p-2 text-zinc-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300"
            >
              <Contact size={20} />
            </Link>
            <Link href="https://www.linkedin.com/in/benjamin-rowlands/" target="_blank" className="p-2 text-zinc-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300">
              <Linkedin size={20} />
            </Link>
            <Link href="https://github.com/choppedtuna" target="_blank" className="p-2 text-zinc-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300">
              <Github size={20} />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 