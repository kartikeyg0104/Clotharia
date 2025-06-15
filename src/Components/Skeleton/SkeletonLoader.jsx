import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type, count = 1, className = '' }) => {
  // Generate a single skeleton element based on type
  const renderSkeleton = (type, index) => {
    switch (type) {
      case 'text':
        return <div key={index} className="skeleton-text"></div>;
      
      case 'title':
        return <div key={index} className="skeleton-title"></div>;
      
      case 'avatar':
        return <div key={index} className="skeleton-avatar"></div>;
      
      case 'thumbnail':
        return <div key={index} className="skeleton-thumbnail"></div>;
        
      case 'button':
        return <div key={index} className="skeleton-button"></div>;
      
      case 'product':
        return (
          <div key={index} className="skeleton-product">
            <div className="skeleton-product-image"></div>
            <div className="skeleton-product-details">
              <div className="skeleton-text"></div>
              <div className="skeleton-text skeleton-text-short"></div>
              <div className="skeleton-text skeleton-text-short"></div>
            </div>
          </div>
        );
      
      case 'card':
        return (
          <div key={index} className="skeleton-card">
            <div className="skeleton-card-image"></div>
            <div className="skeleton-card-body">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text skeleton-text-short"></div>
            </div>
          </div>
        );
      
      default:
        return <div key={index} className="skeleton-box"></div>;
    }
  };

  // Render multiple skeletons based on count
  const renderSkeletons = () => {
    return Array(count)
      .fill(null)
      .map((_, index) => renderSkeleton(type, index));
  };

  return (
    <div className={`skeleton-wrapper ${className}`}>
      {renderSkeletons()}
    </div>
  );
};

export default SkeletonLoader;
