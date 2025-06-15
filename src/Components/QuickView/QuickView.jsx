import React, { useState, useContext, useEffect } from 'react';
import './QuickView.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const QuickView = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useContext(ShopContext);
  
  useEffect(() => {
    // Animation delay for modal entrance
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    // Prevent scrolling of background
    document.body.style.overflow = 'hidden';
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for the exit animation to finish
  };
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    
    // Show success message
    handleClose();
    // You can use the toast system here
  };
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const discountPercentage = Math.round(
    ((product.old_price - product.new_price) / product.old_price) * 100
  );
  
  return (
    <div className={`quickview-backdrop ${isVisible ? 'visible' : ''}`} onClick={handleBackdropClick}>
      <div className="quickview-modal">
        <button className="quickview-close" onClick={handleClose}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 1L1 17M1 1L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="quickview-content">
          <div className="quickview-image">
            <img src={product.image} alt={product.name} />
            {discountPercentage > 0 && (
              <div className="quickview-badge">-{discountPercentage}%</div>
            )}
          </div>
          
          <div className="quickview-details">
            <h2 className="quickview-title">{product.name}</h2>
            
            <div className="quickview-ratings">
              <div className="stars">★★★★☆</div>
              <span className="rating-count">4.2 (24 reviews)</span>
            </div>
            
            <div className="quickview-prices">
              <span className="quickview-price-new">${product.new_price}</span>
              {product.old_price > product.new_price && (
                <span className="quickview-price-old">${product.old_price}</span>
              )}
            </div>
            
            <div className="quickview-description">
              Premium quality {product.category} wear, perfect for casual and semi-formal occasions. 
              Made with high-quality material for comfort and durability.
            </div>
            
            <div className="quickview-sizes">
              <h3>Select Size</h3>
              <div className="size-options">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="quickview-quantity">
              <h3>Quantity</h3>
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={decrementQuantity}>-</button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                  min="1" 
                />
                <button className="quantity-btn" onClick={incrementQuantity}>+</button>
              </div>
            </div>
            
            <div className="quickview-actions">
              <button className="btn-add-to-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <Link to={`/product/${product.id}`} className="btn-view-details">
                View Full Details
              </Link>
            </div>
            
            <div className="quickview-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Tags:</span>
                <span className="meta-value">Modern, Latest, {product.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
