import React, { useState, useEffect } from 'react';
import Toast from './Toast';
import './Toast.css';

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  
  // Global event listener for toast events
  useEffect(() => {
    const handleToastEvent = (event) => {
      if (event.detail && event.detail.message) {
        addToast(event.detail.message, event.detail.type, event.detail.duration);
      }
    };
    
    window.addEventListener('toast', handleToastEvent);
    
    return () => {
      window.removeEventListener('toast', handleToastEvent);
    };
  }, []);
  
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message, type, duration }]);
  };
  
  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };
  
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Helper function to show toast from anywhere in the app
export const showToast = (message, type, duration) => {
  window.dispatchEvent(
    new CustomEvent('toast', { 
      detail: { message, type, duration } 
    })
  );
};

export default ToastContainer;
