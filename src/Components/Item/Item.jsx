import React, { useState, useContext } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { showToast } from '../Toast/ToastContainer';
import QuickView from '../QuickView/QuickView';

const Item = (props) => {
  const { addToCart } = useContext(ShopContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate discount percentage
  const discountPercentage = Math.round(((props.old_price - props.new_price) / props.old_price) * 100);
  
  // Randomly determine if item is new (for demo purposes)
  const isNew = props.id % 5 === 0;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(props.id);
    
    showToast(`${props.name.substring(0, 20)}... added to cart!`, 'success', 3000);
    
    const target = e.currentTarget;
    target.classList.add('added-to-cart');
    setTimeout(() => {
      target.classList.remove('added-to-cart');
    }, 500);
  };
  
  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    if (!isWishlisted) {
      showToast(`${props.name.substring(0, 20)}... added to wishlist!`, 'info', 3000);
    } else {
      showToast(`${props.name.substring(0, 20)}... removed from wishlist!`, 'info', 3000);
    }
  };
  
  const openQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };
  
  return (
    <>
      <div 
        className={`item ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/product/${props.id}`}>
          <div className="item-image">
            <img src={props.image} alt={props.name} className="item-main-image" />
            
            {isNew && <div className="item-tag">New</div>}
            {discountPercentage > 0 && <div className="discount-label">-{discountPercentage}%</div>}
            
            <div className="item-actions">
              <button 
                className={`action-btn ${isWishlisted ? 'wishlist-active' : ''}`} 
                onClick={toggleWishlist}
                aria-label="Add to wishlist"
                title="Add to wishlist"
              >
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 18L8.55 16.7C3.4 12.05 0 8.95 0 5.3C0 2.35 2.35 0 5.3 0C6.95 0 8.55 0.75 9.6 1.95C10.45 0.75 12.05 0 13.7 0C16.65 0 19 2.35 19 5.3C19 8.95 15.6 12.05 10.45 16.7L10 18Z" fill="currentColor"/>
                </svg>
              </button>
              <button 
                className="action-btn" 
                onClick={handleAddToCart}
                aria-label="Add to cart"
                title="Add to cart"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 16C4.9 16 4.01 16.9 4.01 18C4.01 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16ZM0 0V2H2L5.6 9.59L4.2 12.04C4.08 12.32 4 12.65 4 13C4 14.1 4.9 15 6 15H18V13H6.42C6.28 13 6.17 12.89 6.17 12.75L6.2 12.63L7.1 11H14.55C15.3 11 15.96 10.59 16.3 9.97L19.88 3.5C19.96 3.34 20 3.17 20 3C20 2.45 19.55 2 19 2H4.21L3.27 0H0ZM16 16C14.9 16 14.01 16.9 14.01 18C14.01 19.1 14.9 20 16 20C17.1 20 18 19.1 18 18C18 16.9 17.1 16 16 16Z" fill="currentColor"/>
                </svg>
              </button>
              <button 
                className="action-btn" 
                onClick={openQuickView}
                aria-label="Quick view"
                title="Quick view"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4C3.3 4 0 10 0 10C0 10 3.3 16 10 16C16.7 16 20 10 20 10C20 10 16.7 4 10 4ZM10 14C6.7 14 4.3 11.5 3.3 10C4.3 8.5 6.7 6 10 6C13.3 6 15.7 8.5 16.7 10C15.7 11.5 13.3 14 10 14Z" fill="currentColor"/>
                  <path d="M10 7C8.3 7 7 8.3 7 10C7 11.7 8.3 13 10 13C11.7 13 13 11.7 13 10C13 8.3 11.7 7 10 7ZM10 11.5C9.2 11.5 8.5 10.8 8.5 10C8.5 9.2 9.2 8.5 10 8.5C10.8 8.5 11.5 9.2 11.5 10C11.5 10.8 10.8 11.5 10 11.5Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="item-info">
            <div className="item-category">
              {props.id <= 12 ? 'Women' : props.id <= 24 ? 'Men' : 'Kids'}
            </div>
            <h3 className="item-name">{props.name}</h3>
            
            <div className="item-rating">
              <div className="stars">★★★★☆</div>
              <span className="rating-count">(4.2)</span>
            </div>
            
            <div className="item-prices">
              <div className="item-price-new">${props.new_price}</div>
              {props.old_price > props.new_price && (
                <div className="item-price-old">${props.old_price}</div>
              )}
            </div>
          </div>
        </Link>
      </div>
      
      {showQuickView && (
        <QuickView
          product={{
            id: props.id,
            name: props.name,
            image: props.image,
            new_price: props.new_price,
            old_price: props.old_price,
            category: props.id <= 12 ? 'women' : props.id <= 24 ? 'men' : 'kid'
          }}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
};

export default Item;