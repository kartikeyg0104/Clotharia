import React, { useState, useRef, useEffect } from 'react';
import './ImageZoom.css';

const ImageZoom = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setPosition({ x, y });
  };
  
  const handleMouseEnter = () => {
    setIsZoomed(true);
  };
  
  const handleMouseLeave = () => {
    setIsZoomed(false);
  };
  
  useEffect(() => {
    // Handle touch events for mobile
    const handleTouchStart = () => {
      setIsZoomed(true);
    };
    
    const handleTouchMove = (e) => {
      if (!imageRef.current) return;
      
      const touch = e.touches[0];
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = (touch.clientX - left) / width;
      const y = (touch.clientY - top) / height;
      
      setPosition({ x, y });
    };
    
    const handleTouchEnd = () => {
      setIsZoomed(false);
    };
    
    const image = imageRef.current;
    if (image) {
      image.addEventListener('touchstart', handleTouchStart);
      image.addEventListener('touchmove', handleTouchMove);
      image.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      if (image) {
        image.removeEventListener('touchstart', handleTouchStart);
        image.removeEventListener('touchmove', handleTouchMove);
        image.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);
  
  return (
    <div 
      className="image-zoom-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={imageRef}
    >
      <img 
        src={src} 
        alt={alt} 
        className="image-zoom-img"
      />
      
      {isZoomed && (
        <div 
          className="image-zoom-lens"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x * 100}% ${position.y * 100}%`
          }}
        />
      )}
      
      <div className="image-zoom-hint">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default ImageZoom;
