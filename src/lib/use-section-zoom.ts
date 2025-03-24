'use client';

import { useState, useEffect, RefObject } from 'react';

interface SectionZoomOptions {
  threshold?: number;
  zoomFactor?: number;
  smoothness?: number;
}

/**
 * A hook that applies a zoom effect to sections when they come into view during scrolling
 * @param options Configuration options for the zoom animation
 * @returns Object with ref to attach to the section and zoom state
 */
export function useSectionZoom(options: SectionZoomOptions = {}) {
  const {
    threshold = 0.15,
    zoomFactor = 0.08,
    smoothness = 0.92, // Higher = smoother but slower transitions
  } = options;
  
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [targetZoom, setTargetZoom] = useState(0);
  
  // Set up intersection observer to detect when the section enters the viewport
  useEffect(() => {
    if (!ref) return;
    
    let animationFrameId: number;
    let currentZoom = 0;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsInView(isVisible);
        
        // Set target zoom level based on visibility
        setTargetZoom(isVisible ? 1 : 0);
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );
    
    // Handle smooth animation for zoom effect
    const animate = () => {
      if (Math.abs(targetZoom - currentZoom) > 0.001) {
        // Smooth interpolation towards target zoom
        currentZoom = currentZoom * smoothness + targetZoom * (1 - smoothness);
        setZoomProgress(currentZoom);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Snap to exact value when we're very close
        setZoomProgress(targetZoom);
      }
    };
    
    observer.observe(ref);
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [ref, threshold, smoothness, targetZoom]);
  
  // Get the calculated zoom style for the section
  const zoomStyle = {
    transform: `scale(${1 + (zoomProgress * zoomFactor)})`,
    transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    transformOrigin: 'center center',
  };
  
  return { 
    setRef, 
    isInView, 
    zoomProgress, 
    zoomStyle 
  };
} 