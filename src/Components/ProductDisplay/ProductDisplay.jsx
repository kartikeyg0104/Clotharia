import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { showToast } from '../Toast/ToastContainer'
import ImageZoom from '../ImageZoom/ImageZoom'
import SocialShare from '../SocialShare/SocialShare'

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isLoading, setIsLoading] = useState(false);
  
  // Create additional images (since we only have one per product in the data)
  const productImages = [
    product.image,
    product.image, // In a real app, these would be different images
    product.image,
    product.image
  ];
  
  const handleAddToCart = () => {
    if (selectedSize) {
      setIsLoading(true);
      
      // Simulate loading state
      setTimeout(() => {
        for (let i = 0; i < quantity; i++) {
          addToCart(product.id);
        }
        
        setIsLoading(false);
        showToast(`${product.name} (Size: ${selectedSize}) added to cart!`, 'success');
      }, 800);
    } else {
      showToast('Please select a size', 'warning');
    }
  }
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {productImages.map((img, index) => (
            <div 
              key={index}
              className={`productdisplay-img-item ${selectedImage === img ? 'active' : ''}`}
              onClick={() => setSelectedImage(img)}
            >
              <img src={img} alt={`${product.name} - view ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="productdisplay-img">
          <ImageZoom src={selectedImage} alt={product.name} />
          
          {/* Product badges */}
          <div className="product-badges">
            {product.id % 5 === 0 && <span className="product-badge new">New</span>}
            {product.old_price > product.new_price && (
              <span className="product-badge sale">
                Sale {Math.round(((product.old_price - product.new_price) / product.old_price) * 100)}%
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122 reviews)</p>
        </div>
        
        <div className="product-availability">
          <span className="in-stock">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM11.4 6.4L7.6 10.2C7.4 10.4 7.2 10.5 7 10.5C6.8 10.5 6.6 10.4 6.4 10.2L4.6 8.4C4.2 8 4.2 7.4 4.6 7C5 6.6 5.6 6.6 6 7L7 8L10 5C10.4 4.6 11 4.6 11.4 5C11.8 5.4 11.8 6 11.4 6.4Z" fill="#4CAF50"/>
            </svg>
            In Stock
          </span>
          <span className="sku">SKU: {product.id.toString().padStart(6, '0')}</span>
        </div>
        
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        
        <div className="productdisplay-right-description">
          Premium quality {product.category} wear, perfect for casual and semi-formal occasions. 
          Made with high-quality material for comfort and durability. This versatile piece can be 
          styled in multiple ways for different looks.
        </div>
        
        <div className="productdisplay-right-size">
          <div className="size-header">
            <h1>Select Size</h1>
            <span className="size-guide">Size Guide</span>
          </div>
          <div className="productdisplay-right-sizes">
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <div 
                key={size}
                className={`size ${selectedSize === size ? 'selected' : ''}`} 
                onClick={() => setSelectedSize(size)}
              >{size}</div>
            ))}
          </div>
        </div>
        
        <div className="productdisplay-quantity">
          <h1>Quantity</h1>
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
        
        <button 
          className={`add-to-cart-btn ${isLoading ? 'loading' : ''}`} 
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            <>
              ADD TO CART
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8H19M19 8L12 1M19 8L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
        
        <div className="productdisplay-right-category">
          <span>Category :</span> {product.category}
        </div>
        <div className="productdisplay-right-category">
          <span>Tags :</span> Modern, Latest
        </div>
        
        <div className="product-share">
          <span className="share-text">Share :</span>
          <SocialShare url={window.location.href} title={`Check out ${product.name} on Clotharia!`} />
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay