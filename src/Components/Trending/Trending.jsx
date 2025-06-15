import React, { useEffect, useRef, useState } from 'react';
import './Trending.css';
import { Link } from 'react-router-dom';
import model_image from '../Assets/trend_model.png'; // Make sure this path is correct

const Trending = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Immediately set component as visible for better initial animation
    setTimeout(() => setIsVisible(true), 100);
    
    // Simple intersection observer for animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });
    
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    
    return () => {
      if (leftRef.current) observer.unobserve(leftRef.current);
      if (rightRef.current) observer.unobserve(rightRef.current);
    };
  }, []);
  
  return (
    <section className={`trending ${isVisible ? 'visible' : ''}`} aria-label="New arrivals collection">
      <div className="trending-container">
        <div 
          className="trending-left animate-fade-left"
          ref={leftRef}
        >
          <div className="trending-badge">NEW ARRIVALS ONLY</div>
          <h1 className="trending-title">
            new <span className="waving-hand">👋</span>
            <br />
            collections
            <br />
            for everyone
          </h1>
          <p className="trending-description">
            Discover our latest styles that are taking fashion to the next level
          </p>
          <Link to="/womens" className="trending-button" aria-label="Browse latest collection">
            Latest Collection <span className="arrow">→</span>
          </Link>
          
          <div className="trending-features">
            <div className="trending-feature">
              <span className="feature-icon">✓</span>
              <span>Free Shipping</span>
            </div>
            <div className="trending-feature">
              <span className="feature-icon">✓</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
        
        <div 
          className="trending-right animate-fade-scale"
          ref={rightRef}
        >
          <div className="trending-image-wrapper">
            <div className="trending-blob"></div>
            <img 
              src={model_image} // Use the imported image
              alt="Fashion model in trendy outfit" 
              className="trending-image"
              loading="eager"
            />
            <div className="trending-floating-tag">
              <div className="tag-content">
                <div className="tag-title">Summer</div>
                <div className="tag-subtitle">Collection</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="trending-decor-circle circle-1"></div>
      <div className="trending-decor-circle circle-2"></div>
      <div className="trending-decor-dot dot-1"></div>
      <div className="trending-decor-dot dot-2"></div>
      <div className="trending-decor-dot dot-3"></div>
    </section>
  );
};

export default Trending;
