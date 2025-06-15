import React, { useState, useContext, useEffect } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Close mobile menu when a link is clicked
  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false);
  };
  
  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
            <img src={logo} alt="Logo" />
            <p>CLOTHARIA</p>
        </div>
        
        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li onClick={() => handleMenuClick("shop")}>
            <Link to="/">Shop</Link> 
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <li onClick={() => handleMenuClick("mens")}>
            <Link to="/mens">Men</Link>
            {menu === "mens" ? <hr /> : <></>}
          </li>
          <li onClick={() => handleMenuClick("womens")}>
            <Link to="/womens">Women</Link>
            {menu === "womens" ? <hr /> : <></>}
          </li>
          <li onClick={() => handleMenuClick("kids")}>
            <Link to="/kids">Kids</Link>
            {menu === "kids" ? <hr /> : <></>}
          </li>
        </ul>
        
        <div className="nav-login-cart">
          <Link to="/login"><button>Login</button></Link>
          <Link to="/cart" className="cart-icon">
            <img src={cart_icon} alt="cart_icon" />
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </Link>
          
          <div className="hamburger-menu" onClick={toggleMobileMenu}>
            <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
          </div>
        </div>
    </div>
  )
}

export default Navbar