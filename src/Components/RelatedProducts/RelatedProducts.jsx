import React, { useContext, useState, useEffect } from 'react'
import './RelatedProducts.css'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'

const RelatedProducts = (props) => {
  const { all_product } = useContext(ShopContext);
  const { product } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  
  // Filter products by the same category, but exclude the current product
  const filteredProducts = all_product.filter(item => 
    item.category === product.category && item.id !== product.id
  );
  
  // Set visible items based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setItemsToShow(1);
      } else if (window.innerWidth < 992) {
        setItemsToShow(2);
      } else if (window.innerWidth < 1200) {
        setItemsToShow(3);
      } else {
        setItemsToShow(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Navigation functions
  const nextSlide = () => {
    if (currentIndex + itemsToShow < filteredProducts.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, filteredProducts.length - itemsToShow));
    }
  };
  
  // Visible products based on current index
  const visibleProducts = filteredProducts.slice(
    currentIndex,
    currentIndex + itemsToShow
  );
  
  return (
    <div className='relatedproducts'>
      <div className="relatedproducts-container">
        <div className="relatedproducts-header">
          <h1>Related Products</h1>
          <hr />
        </div>
        
        <div className="relatedproducts-item">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((item, index) => (
              <div key={item.id} className="related-item-animation" style={{animationDelay: `${0.1 + (index * 0.1)}s`}}>
                <Item 
                  id={item.id} 
                  name={item.name} 
                  image={item.image} 
                  new_price={item.new_price} 
                  old_price={item.old_price}
                />
              </div>
            ))
          ) : (
            <div className="no-related">
              <h3>No related products found</h3>
            </div>
          )}
        </div>
        
        {filteredProducts.length > itemsToShow && (
          <div className="related-controls">
            <button className="related-control-btn" onClick={prevSlide}>
              &#10094;
            </button>
            <button className="related-control-btn" onClick={nextSlide}>
              &#10095;
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RelatedProducts
