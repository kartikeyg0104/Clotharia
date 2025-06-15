import React, { useState, useEffect } from 'react';
import './BackToTop.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <button 
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM14.7 12.3C14.5 12.5 14.3 12.6 14 12.6C13.7 12.6 13.5 12.5 13.3 12.3L10 9L6.7 12.3C6.3 12.7 5.7 12.7 5.3 12.3C4.9 11.9 4.9 11.3 5.3 10.9L9.3 6.9C9.5 6.7 9.7 6.6 10 6.6C10.3 6.6 10.5 6.7 10.7 6.9L14.7 10.9C15.1 11.3 15.1 11.9 14.7 12.3Z" fill="currentColor"/>
      </svg>
    </button>
  );
};

export default BackToTop;
