// Utility function for smooth scrolling to anchor links with offset
export const smoothScrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>): void => {
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
}; 