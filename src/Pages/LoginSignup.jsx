import React, { useState, useEffect, useRef } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [agree, setAgree] = useState(false);
  
  // Add floating particles as a dynamic background element
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 3,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 10 + 10}s`,
    animationDelay: `${Math.random() * 5}s`
  }));
  
  // Add form status state for animations
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle form submission with animation states
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      // Add success animation
      setFormStatus('success');
      console.log(formData);
      
      // Reset after delay
      setTimeout(() => {
        setFormStatus('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <div className='loginsignup'>
      {/* Add animated background shapes */}
      <div className="bg-shape bg-shape-1"></div>
      <div className="bg-shape bg-shape-2"></div>
      <div className="bg-shape bg-shape-3"></div>
      
      {/* Add floating particles */}
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            animationDuration: particle.animationDuration,
            animationDelay: particle.animationDelay
          }}
        ></div>
      ))}
      
      <div className={`loginsignup-container ${formStatus === 'success' ? 'success-animation' : ''}`}>
        <div className="mode-toggle">
          <button 
            className={isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={!isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        
        <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="loginsignup-subtitle">
          {isLogin 
            ? 'Sign in to access your account and continue shopping' 
            : 'Join us for personalized recommendations and exclusive offers'}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            {!isLogin && (
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder='Your Name' 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="input-group">
              <input 
                type="email" 
                placeholder='Email Address' 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="input-group">
              <input 
                type="password" 
                placeholder='Password' 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          {isLogin ? (
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
          ) : (
            <div className="loginsignup-agree">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  required
                />
                <span className="checkmark"></span>
                <p>By continuing, I agree to the terms of use and privacy policy.</p>
              </label>
            </div>
          )}
          
          <button 
            type="submit" 
            className={formStatus === 'submitting' ? 'loading' : ''}
            disabled={formStatus === 'submitting'}
          >
            <span className="loading-spinner"></span>
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <div className="social-login">
          <button className="google-btn">
            {/* Replace the img tag with inline SVG */}
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Continue with Google
          </button>
          <button className="facebook-btn">
            {/* Replace the img tag with inline SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
          
          {/* Add Apple login option for completeness */}
          <button className="apple-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M16.498 0c.363 0 .732.086 1.107.258.816.374 1.395 1.098 1.748 1.972.476 1.165.45 2.276.193 3.426 1.87.708 2.948 2.355 2.954 4.25.006 1.979-1.263 3.537-2.895 4.253-.065 1.076-.146 2.472-.31 3.345-.065.344-.152.685-.29.98-.185.398-.42.777-.766 1.035-.448.334-1.036.45-1.6.324-.57-.129-.984-.489-1.36-.83-.355-.323-.674-.683-1.016-.99-.195-.175-.42-.336-.648-.482-.097-.06-.205-.098-.31-.136-.105-.04-.22-.062-.32-.102-.396-.158-.802-.195-1.21-.194-.446 0-.872.046-1.286.228-.116.05-.206.082-.32.127-.107.044-.215.094-.315.148-.27.146-.496.316-.723.49-.324.305-.642.67-.996.992-.376.34-.79.704-1.364.833-.564.128-1.15.01-1.598-.323-.347-.258-.58-.637-.765-1.035-.137-.295-.225-.636-.29-.98-.164-.873-.245-2.27-.31-3.347C.828 13.43.028 11.428.028 9.352c0-1.89 1.118-3.58 3.005-4.27-.246-1.166-.18-2.247.328-3.407.344-.768.89-1.463 1.63-1.835C5.367.075 5.735 0 6.09 0c1.324 0 2.222.924 3.053 1.813.472.504.86 1.055 1.368 1.496.3.268.644.455 1.007.525.37.07.762.043 1.127-.063.35-.105.656-.273.95-.46.54-.346.992-.803 1.437-1.236.476-.466.956-.962 1.466-1.326C17.007.435 17.743.007 18.64.007c.36 0 .724.076 1.09.24.773.348 1.324 1.04 1.664 1.807.508 1.16.57 2.242.327 3.407 1.884.692 2.917 2.35 2.917 4.24 0 2.058-.818 4.053-2.806 5.143-.07 1.077-.145 2.47-.31 3.343-.065.344-.152.685-.29.98-.184.398-.42.777-.765 1.035-.448.334-1.037.45-1.6.324-.57-.129-.984-.489-1.36-.83-.356-.323-.675-.683-1.017-.99-.194-.175-.42-.336-.648-.482-.097-.06-.205-.098-.31-.136-.105-.04-.22-.062-.32-.102-.396-.158-.802-.195-1.21-.194-.446 0-.872.046-1.286.228-.116.05-.206.082-.32.127-.107.044-.215.094-.316.148-.27.146-.496.316-.723.49-.324.305-.642.67-.996.992-.376.34-.79.704-1.364.833-.564.128-1.15.01-1.598-.323-.347-.258-.58-.637-.765-1.035-.137-.295-.225-.636-.29-.98-.164-.873-.245-2.27-.31-3.347-1.954-1.1-2.778-3.073-2.778-5.12 0-1.89 1.077-3.562 2.946-4.253-.257-1.15-.284-2.26.192-3.426.353-.874.932-1.598 1.75-1.972.37-.173.74-.258 1.106-.258.753 0 1.415.278 1.997.684.582.407 1.082.903 1.58 1.376.498.475.964.927 1.466 1.237.268.167.553.3.856.374.12.03.244.046.37.07.125.02.25.04.376.036.13-.005.257-.034.383-.077.125-.043.247-.1.366-.168.34-.192.652-.444.95-.715.6-.545 1.08-1.198 1.64-1.723.557-.527 1.144-.957 1.86-1.17.35-.103.71-.14 1.067-.142z" fill="#000"/>
            </svg>
            Continue with Apple
          </button>
        </div>
        
        <p className="loginsignup-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Login'} here
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginSignup