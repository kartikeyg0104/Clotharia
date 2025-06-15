import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium', color = 'primary', fullPage = false }) => {
  const sizeClass = `loader-${size}`;
  const colorClass = `loader-${color}`;
  
  if (fullPage) {
    return (
      <div className="loader-fullpage">
        <div className={`loader ${sizeClass} ${colorClass}`}>
          <div className="loader-spinner"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`loader ${sizeClass} ${colorClass}`}>
      <div className="loader-spinner"></div>
    </div>
  );
};

export default Loader;
