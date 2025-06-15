import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  // Social media click handlers
  const openSocialMedia = (platform) => {
    let url;
    switch(platform) {
      case 'instagram':
        url = 'https://www.instagram.com/';
        break;
      case 'pinterest':
        url = 'https://www.pinterest.com/';
        break;
      case 'whatsapp':
        url = 'https://web.whatsapp.com/';
        break;
      default:
        url = 'https://www.clotharia.com/';
    }
    window.open(url, '_blank');
  };

  return (
    <footer className='footer'>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={footer_logo} alt="Clotharia" />
            <p>CLOTHARIA</p>
          </div>
          <p className="footer-tagline">Fashion that speaks to your style, crafted with quality and care.</p>
          <div className="footer-social">
            <button 
              className="footer-icons-container instagram"
              onClick={() => openSocialMedia('instagram')}
              aria-label="Follow us on Instagram"
            >
              <img src={instagram_icon} alt="Instagram" />
            </button>
            <button 
              className="footer-icons-container pinterest"
              onClick={() => openSocialMedia('pinterest')}
              aria-label="Follow us on Pinterest"
            >
              <img src={pinterest_icon} alt="Pinterest" />
            </button>
            <button 
              className="footer-icons-container whatsapp"
              onClick={() => openSocialMedia('whatsapp')}
              aria-label="Contact us on WhatsApp"
            >
              <img src={whatsapp_icon} alt="WhatsApp" />
            </button>
          </div>
        </div>

        <div className="footer-links-container">
          <div className="footer-links-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/stores">Store Locator</Link></li>
              <li><Link to="/sustainability">Sustainability</Link></li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/mens">Men's Collection</Link></li>
              <li><Link to="/womens">Women's Collection</Link></li>
              <li><Link to="/kids">Kids Collection</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h4>Support</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for exclusive offers and updates</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your Email Address" />
              <button type="submit" className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Clotharia. All Rights Reserved.</p>
        </div>
        <div className="footer-legal-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/cookies">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer