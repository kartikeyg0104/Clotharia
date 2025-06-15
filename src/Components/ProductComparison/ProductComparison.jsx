import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductComparison.css';
import { ShopContext } from '../../Context/ShopContext';

const ProductComparison = ({ products, onClose }) => {
  const { addToCart } = useContext(ShopContext);
  const [isVisible, setIsVisible] = useState(false);
  const [features, setFeatures] = useState([]);
  
  // Animation effect on mount
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  // Generate features for comparison
  useEffect(() => {
    // This is just a demo - in a real app these would be actual product features
    const dummyFeatures = [
      'Material',
      'Fit',
      'Style',
      'Sleeve Length',
      'Washing Instructions',
      'Country of Origin'
    ];
    
    // Generate random values for features
    const generateFeaturesData = () => {
      const materials = ['Cotton', 'Polyester', 'Linen', 'Silk', 'Wool', 'Blend'];
      const fits = ['Regular', 'Slim', 'Relaxed', 'Tailored', 'Oversized'];
      const styles = ['Casual', 'Formal', 'Semi-formal', 'Athletic', 'Vintage'];
      const sleeves = ['Long', 'Short', 'Three-quarter', 'Sleeveless', 'Roll-up'];
      const washing = ['Machine wash cold', 'Hand wash only', 'Dry clean', 'Machine wash warm'];
      const origins = ['India', 'China', 'Bangladesh', 'Vietnam', 'Turkey', 'Italy'];
      
      return [
        materials[Math.floor(Math.random() * materials.length)],
        fits[Math.floor(Math.random() * fits.length)],
        styles[Math.floor(Math.random() * styles.length)],
        sleeves[Math.floor(Math.random() * sleeves.length)],
        washing[Math.floor(Math.random() * washing.length)],
        origins[Math.floor(Math.random() * origins.length)]
      ];
    };
    
    // Create feature objects for each product
    const featuresData = products.map(product => {
      const values = generateFeaturesData();
      return dummyFeatures.reduce((acc, feature, index) => {
        acc[feature] = values[index];
        return acc;
      }, {});
    });
    
    // Combine all features into a single array
    const combinedFeatures = dummyFeatures.map(feature => {
      return {
        name: feature,
        values: products.map((product, index) => featuresData[index][feature])
      };
    });
    
    setFeatures(combinedFeatures);
  }, [products]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  
  return (
    <div 
      className={`product-comparison-backdrop ${isVisible ? 'visible' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="product-comparison-modal">
        <button className="comparison-close-btn" onClick={handleClose}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 1L1 17M1 1L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <h2 className="comparison-title">Product Comparison</h2>
        
        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th></th>
                {products.map(product => (
                  <th key={product.id} className="product-column">
                    <div className="comparison-product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <h3>{product.name}</h3>
                    <div className="comparison-product-price">
                      <span className="price-new">${product.new_price}</span>
                      {product.old_price > product.new_price && (
                        <span className="price-old">${product.old_price}</span>
                      )}
                    </div>
                    <div className="comparison-actions">
                      <button 
                        className="add-to-cart-btn" 
                        onClick={() => addToCart(product.id)}
                      >
                        Add to Cart
                      </button>
                      <Link 
                        to={`/product/${product.id}`} 
                        className="view-details-btn"
                        onClick={handleClose}
                      >
                        View Details
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="comparison-section-header">
                <td colSpan={products.length + 1}>Product Details</td>
              </tr>
              <tr>
                <td>Category</td>
                {products.map(product => (
                  <td key={product.id}>
                    {product.category === 'men' ? 'Men' : 
                     product.category === 'women' ? 'Women' : 'Kids'}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Rating</td>
                {products.map(product => (
                  <td key={product.id}>
                    <div className="comparison-rating">
                      <span className="stars">★★★★☆</span>
                      <span className="rating-count">(4.2)</span>
                    </div>
                  </td>
                ))}
              </tr>
              
              <tr className="comparison-section-header">
                <td colSpan={products.length + 1}>Features</td>
              </tr>
              {features.map(feature => (
                <tr key={feature.name}>
                  <td>{feature.name}</td>
                  {feature.values.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
