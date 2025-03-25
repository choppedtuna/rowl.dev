"use client";

import { useEffect, useState, useRef } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({ title, subtitle, centered = true }: SectionTitleProps) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set isInView to true when element enters viewport
          if (entry.isIntersecting) {
            setIsInView(true);
            hasAnimated.current = true;
          } else if (hasAnimated.current) {
            // Only reset if it has previously animated
            setIsInView(false);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px" // Trigger slightly before fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`} ref={sectionRef}>
      <h2 
        className={`
          text-5xl
          sm:text-5xl
          md:text-6xl
          font-bold
          tracking-tight
          mb-6 font-nanami
          text-transparent bg-clip-text
          animate-gradient-continuous
          transform transition-all duration-700 ease-out
          ${isInView ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}
        `}
        style={{
          backgroundImage: 'linear-gradient(90deg, #a855f7,rgb(234, 102, 241), #fb923c,rgb(255, 90, 35), #a855f7)',
          transitionDelay: '100ms'
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p 
          className={`
            mt-4 text-zinc-600 dark:text-zinc-400 font-light
            transform transition-all duration-700 ease-out
            ${isInView ? 'translate-x-0 opacity-100' : 'translate-x-[50px] opacity-0'}
          `}
          style={{ transitionDelay: '300ms' }}
        >
          {subtitle.toUpperCase()}
        </p>
      )}
    </div>
  );
} 