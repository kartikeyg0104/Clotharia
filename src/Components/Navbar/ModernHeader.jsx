import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ModernHeader.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import SearchIcon from '../Icons/SearchIcon';

const ModernHeader = () => {
  const [menu, setMenu] = useState("shop");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartPreviewOpen, setCartPreviewOpen] = useState(false);
  const { getTotalCartItems, all_product, cartItems } = useContext(ShopContext);
  const searchRef = useRef(null);
  const cartRef = useRef(null);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Update active menu based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setMenu('shop');
    else if (path.includes('/mens')) setMenu('mens');
    else if (path.includes('/womens')) setMenu('womens');
    else if (path.includes('/kids')) setMenu('kids');
  }, [location]);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartPreviewOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle search functionality
  useEffect(() => {
    if (searchQuery.length > 1 && all_product) {
      const results = all_product.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, all_product]);
  
  // Close mobile menu on navigation
  const handleMenuClick = (menuName) => {
    setMenu(menuName);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setCartPreviewOpen(false);
  };
  
  // Toggle search field
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setCartPreviewOpen(false);
    if (!searchOpen) {
      setTimeout(() => document.querySelector('.search-input')?.focus(), 100);
    }
  };
  
  // Toggle cart preview
  const toggleCartPreview = () => {
    setCartPreviewOpen(!cartPreviewOpen);
    setSearchOpen(false);
  };
  
  // Get cart items for preview
  const getCartProducts = () => {
    if (!all_product) return [];
    
    return Object.keys(cartItems)
      .filter(key => cartItems[key] > 0)
      .map(key => {
        const product = all_product.find(item => item.id === Number(key));
        return {
          ...product,
          quantity: cartItems[key]
        };
      })
      .slice(0, 3); // Show only the first 3 items
  };
  
  const cartProducts = getCartProducts();
  const totalItems = getTotalCartItems();
  
  return (
    <header className={`modern-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="modern-header-container">
        <div className="modern-header-left">
          <div className="modern-header-logo">
            <Link to="/" onClick={() => handleMenuClick('shop')}>
              <img src={logo} alt="Clotharia" />
              <span>CLOTHARIA</span>
            </Link>
          </div>
        </div>

        <nav className="modern-header-center">
          <ul className="modern-nav-menu">
            <li className="nav-item" onClick={() => handleMenuClick("shop")}>
              <Link to="/" className={menu === "shop" ? "active" : ""}>
                Home
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item" onClick={() => handleMenuClick("mens")}>
              <Link to="/mens" className={menu === "mens" ? "active" : ""}>
                Men
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item" onClick={() => handleMenuClick("womens")}>
              <Link to="/womens" className={menu === "womens" ? "active" : ""}>
                Women
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item" onClick={() => handleMenuClick("kids")}>
              <Link to="/kids" className={menu === "kids" ? "active" : ""}>
                Kids
                <span className="nav-indicator"></span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="modern-header-right">
          <div className="header-actions">
            <div className="search-container" ref={searchRef}>
              <button 
                className={`search-toggle ${searchOpen ? 'active' : ''}`} 
                onClick={toggleSearch}
                aria-label="Search"
              >
                <SearchIcon />
              </button>
              
              <div className={`search-dropdown ${searchOpen ? 'open' : ''}`}>
                <input 
                  type="text"
                  className="search-input"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                {searchResults.length > 0 && (
                  <div className="search-results">
                    {searchResults.map(item => (
                      <Link 
                        to={`/product/${item.id}`} 
                        className="search-result-item"
                        key={item.id}
                        onClick={() => setSearchOpen(false)}
                      >
                        <img src={item.image} alt={item.name} />
                        <div className="search-result-details">
                          <span className="result-name">{item.name}</span>
                          <span className="result-price">${item.new_price}</span>
                        </div>
                      </Link>
                    ))}
                    <Link to="/search" className="search-view-all" onClick={() => setSearchOpen(false)}>
                      View all results
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            <Link to="/login" className="modern-login-btn">
              <span>Login</span>
            </Link>
            
            <div className="cart-container" ref={cartRef}>
              <Link to="/cart" className="modern-cart-icon" onClick={() => toggleCartPreview()}>
                <img src={cart_icon} alt="Cart" />
                {totalItems > 0 && (
                  <span className="modern-cart-count">{totalItems}</span>
                )}
              </Link>
              
              {cartPreviewOpen && (
                <div className="cart-preview">
                  <h4>Your Cart ({totalItems})</h4>
                  
                  {cartProducts.length > 0 ? (
                    <>
                      <div className="cart-items">
                        {cartProducts.map(item => (
                          <div className="cart-preview-item" key={item.id}>
                            <img src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                              <p className="cart-item-name">{item.name}</p>
                              <p className="cart-item-price">
                                {item.quantity} × ${item.new_price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {totalItems > 3 && (
                        <p className="cart-more-items">
                          +{totalItems - 3} more items
                        </p>
                      )}
                      
                      <div className="cart-preview-actions">
                        <Link to="/cart" className="btn-view-cart" onClick={() => setCartPreviewOpen(false)}>
                          View Cart
                        </Link>
                        <Link to="/checkout" className="btn-checkout" onClick={() => setCartPreviewOpen(false)}>
                          Checkout
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="empty-cart-message">
                      <p>Your cart is empty</p>
                      <Link to="/shop" className="btn-start-shopping" onClick={() => setCartPreviewOpen(false)}>
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div 
            className={`modern-hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="modern-mobile-menu">
          <div className="mobile-search">
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" aria-label="Search">
              <SearchIcon />
            </button>
          </div>
          
          <div className="mobile-links">
            <Link 
              to="/" 
              className={menu === "shop" ? "active" : ""} 
              onClick={() => handleMenuClick("shop")}
            >
              Home
            </Link>
            
            <div className="mobile-accordion">
              <div className="accordion-header">
                <Link 
                  to="/mens" 
                  className={menu === "mens" ? "active" : ""} 
                  onClick={() => handleMenuClick("mens")}
                >
                  Men
                </Link>
                <span className="accordion-icon">+</span>
              </div>
              <div className="accordion-content">
                <Link to="/mens/shirts" onClick={() => setMobileMenuOpen(false)}>Shirts</Link>
                <Link to="/mens/tshirts" onClick={() => setMobileMenuOpen(false)}>T-Shirts</Link>
                <Link to="/mens/jeans" onClick={() => setMobileMenuOpen(false)}>Jeans</Link>
                <Link to="/mens/accessories" onClick={() => setMobileMenuOpen(false)}>Accessories</Link>
              </div>
            </div>
            
            <div className="mobile-accordion">
              <div className="accordion-header">
                <Link 
                  to="/womens" 
                  className={menu === "womens" ? "active" : ""} 
                  onClick={() => handleMenuClick("womens")}
                >
                  Women
                </Link>
                <span className="accordion-icon">+</span>
              </div>
              <div className="accordion-content">
                <Link to="/womens/dresses" onClick={() => setMobileMenuOpen(false)}>Dresses</Link>
                <Link to="/womens/tops" onClick={() => setMobileMenuOpen(false)}>Tops</Link>
                <Link to="/womens/jeans" onClick={() => setMobileMenuOpen(false)}>Jeans</Link>
                <Link to="/womens/accessories" onClick={() => setMobileMenuOpen(false)}>Accessories</Link>
              </div>
            </div>
            
            <div className="mobile-accordion">
              <div className="accordion-header">
                <Link 
                  to="/kids" 
                  className={menu === "kids" ? "active" : ""} 
                  onClick={() => handleMenuClick("kids")}
                >
                  Kids
                </Link>
                <span className="accordion-icon">+</span>
              </div>
              <div className="accordion-content">
                <Link to="/kids/boys" onClick={() => setMobileMenuOpen(false)}>Boys</Link>
                <Link to="/kids/girls" onClick={() => setMobileMenuOpen(false)}>Girls</Link>
                <Link to="/kids/accessories" onClick={() => setMobileMenuOpen(false)}>Accessories</Link>
              </div>
            </div>
          </div>
          
          <div className="mobile-cta">
            <Link to="/login" className="mobile-login-btn" onClick={() => setMobileMenuOpen(false)}>
              Login / Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default ModernHeader;