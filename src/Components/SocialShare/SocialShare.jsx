import React from 'react';
import './SocialShare.css';

// Export the component as both a named export AND a default export
// This provides maximum flexibility
export const SocialShare = ({ productName, productUrl }) => {
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnTwitter = () => {
    const text = `Check out this ${productName} at Clotharia!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(productUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnPinterest = () => {
    const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(productUrl)}&description=${encodeURIComponent(`Clotharia - ${productName}`)}`;
    window.open(url, '_blank');
  };

  const shareOnWhatsApp = () => {
    const text = `Check out this ${productName} at Clotharia: ${productUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="social-share">
      <button 
        className="social-icon facebook" 
        onClick={shareOnFacebook} 
        aria-label="Share on Facebook"
      >
        <img src="/facebook.png" alt="Facebook" />
      </button>
      <button 
        className="social-icon twitter" 
        onClick={shareOnTwitter} 
        aria-label="Share on Twitter"
      >
        <img src="/twitter.png" alt="Twitter" />
      </button>
      <button 
        className="social-icon pinterest" 
        onClick={shareOnPinterest} 
        aria-label="Share on Pinterest"
      >
        <img src="/pinterest.png" alt="Pinterest" />
      </button>
      <button 
        className="social-icon whatsapp" 
        onClick={shareOnWhatsApp} 
        aria-label="Share on WhatsApp"
      >
        <img src="/whatsapp.png" alt="WhatsApp" />
      </button>
    </div>
  );
};

// Also add a default export
export default SocialShare;
