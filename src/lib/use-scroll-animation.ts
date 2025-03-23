import { useEffect, useRef, useState } from 'react';

// Options for configuring the scroll animation
interface ScrollAnimationOptions {
  threshold?: number; // How much of the element needs to be visible to trigger (0-1)
  rootMargin?: string; // Margin around the root
  scale?: {
    start: number; // Starting scale
    end: number; // Ending scale (usually 1)
  };
  opacity?: {
    start: number; // Starting opacity
    end: number; // Ending opacity (usually 1)
  };
  translateY?: {
    start: number; // Starting Y translation in px
    end: number; // Ending Y translation (usually 0)
  };
  delay?: number; // Delay in ms before animation starts
  duration?: number; // Duration of the animation in ms
}

// Default options
const defaultOptions: ScrollAnimationOptions = {
  threshold: 0.1,
  rootMargin: '0px',
  scale: { start: 0.95, end: 1 },
  opacity: { start: 0, end: 1 },
  translateY: { start: 20, end: 0 },
  delay: 0,
  duration: 800,
};

/**
 * Custom hook for creating scroll-triggered animations
 * @param options Configuration options for the animation
 * @returns Object with ref to attach to the element and animation state
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const mergedOptions = { ...defaultOptions, ...options };
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Create observer to detect when element enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: mergedOptions.threshold,
        rootMargin: mergedOptions.rootMargin,
      }
    );
    
    // Create scroll handler to track scroll progress
    const handleScroll = () => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is through the viewport
      // 0 = just entered, 1 = center of viewport, 2 = just exited
      const progress = 1 - (rect.top / windowHeight);
      
      // Clamp progress between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, progress));
      setScrollProgress(clampedProgress);
    };
    
    observer.observe(element);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mergedOptions.threshold, mergedOptions.rootMargin]);
  
  // Calculate styles based on visibility and scroll progress
  const animationStyles = {
    transform: `scale(${
      isVisible 
        ? mergedOptions.scale!.start + (scrollProgress * (mergedOptions.scale!.end - mergedOptions.scale!.start))
        : mergedOptions.scale!.start
    }) translateY(${
      isVisible
        ? mergedOptions.translateY!.start + (scrollProgress * (mergedOptions.translateY!.end - mergedOptions.translateY!.start))
        : mergedOptions.translateY!.start
    }px)`,
    opacity: isVisible 
      ? mergedOptions.opacity!.start + (scrollProgress * (mergedOptions.opacity!.end - mergedOptions.opacity!.start))
      : mergedOptions.opacity!.start,
    transition: `transform ${mergedOptions.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${mergedOptions.delay}ms, 
                 opacity ${mergedOptions.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${mergedOptions.delay}ms`,
  };
  
  return { ref: elementRef, isVisible, scrollProgress, styles: animationStyles };
} 