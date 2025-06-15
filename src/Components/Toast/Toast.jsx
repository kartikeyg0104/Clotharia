import React, { useState, useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); // Allow exit animation to complete
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  const icons = {
    success: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM14.2 8.3L9.4 13.1C9 13.5 8.4 13.5 8 13.1L5.8 10.9C5.4 10.5 5.4 9.9 5.8 9.5C6.2 9.1 6.8 9.1 7.2 9.5L8.7 11L12.8 6.9C13.2 6.5 13.8 6.5 14.2 6.9C14.6 7.3 14.6 7.9 14.2 8.3Z" fill="#4CAF50"/>
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM14.7 13.3C15.1 13.7 15.1 14.3 14.7 14.7C14.5 14.9 14.3 15 14 15C13.7 15 13.5 14.9 13.3 14.7L10 11.4L6.7 14.7C6.5 14.9 6.3 15 6 15C5.7 15 5.5 14.9 5.3 14.7C4.9 14.3 4.9 13.7 5.3 13.3L8.6 10L5.3 6.7C4.9 6.3 4.9 5.7 5.3 5.3C5.7 4.9 6.3 4.9 6.7 5.3L10 8.6L13.3 5.3C13.7 4.9 14.3 4.9 14.7 5.3C15.1 5.7 15.1 6.3 14.7 6.7L11.4 10L14.7 13.3Z" fill="#F44336"/>
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 15C9.4 15 9 14.6 9 14C9 13.4 9.4 13 10 13C10.6 13 11 13.4 11 14C11 14.6 10.6 15 10 15ZM11 11H9V5H11V11Z" fill="#FF9800"/>
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 15C9.4 15 9 14.6 9 14V10C9 9.4 9.4 9 10 9C10.6 9 11 9.4 11 10V14C11 14.6 10.6 15 10 15ZM11 7H9V5H11V7Z" fill="#2196F3"/>
      </svg>
    )
  };
  
  return (
    <div className={`toast toast-${type} ${isVisible ? 'toast-enter' : 'toast-exit'}`}>
      <div className="toast-icon">
        {icons[type]}
      </div>
      <div className="toast-content">
        <div className="toast-title">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
        <div className="toast-message">{message}</div>
      </div>
      <div className="toast-close" onClick={() => setIsVisible(false)}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

export default Toast;
