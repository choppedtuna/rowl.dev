"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback } from "react";
import { FiDownload } from "react-icons/fi";

export default function Hero() {
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
    <section className="relative pt-28 md:pt-40 pb-20 md:pb-32 overflow-hidden bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-2 px-4 rounded-full bg-zinc-800/80 border border-zinc-700/50 inline-block mb-8"
          >
            <span className="text-sm text-zinc-300">Open to new projects</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 font-nanami"
          >
            Creating Engaging &<br />
            Functional Experiences
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto"
          >
            Hey, I'm Ben, a ROBLOX Game Developer and Software Engineer who is passionate
			about creating fun and engaging experiences for players and brands.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a 
              href="#contact" 
              onClick={handleAnchorClick}
              className="rounded-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 px-6 py-3 text-base font-medium text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              👋 Get in Touch!
            </a>
            <a 
              href="/resume.pdf" 
              className="rounded-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 px-6 py-3 text-base font-medium text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center gap-2"
              download="benjamin-rowlands-cv.pdf"
            >
              Resume <FiDownload className="inline-block ml-1" />
            </a>
          </motion.div>
          
          {/* Gradient backdrop below buttons */}
          <div className="relative mt-16 h-64 w-full overflow-hidden rounded-3xl [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#7e4f1a,transparent_80%)] before:opacity-60" style={{opacity: 1}}>
            <div className="absolute animate-gradient top-1/2 -left-1/2 z-20 w-[200%] rounded-full border-t-4 border-t-[#ffeed0] bg-[#a855f7] shadow-[inset_0_2px_20px_#ffeed0,0_-10px_50px_1px_#ffeed0]" style={{opacity: 1, transform: "none"}}></div>
            
            {/* Roblox icon centered on the gradient line */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 animate-float">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-orange-400 to-yellow-300 animate-gradient-slow Shift opacity-80"></div>
                  <div className="absolute inset-0.5 rounded-full bg-black flex items-center justify-center">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden">
                      <Image
                        src="/images/icons/roblox-icon.png"
                        alt="Roblox"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 