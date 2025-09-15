import React from 'react';
import SplashLogo from '../assests/splashLogo.svg';

const HeaderLogo = ({ className = "" }) => {
  return (
    <div className={`mb-12 text-center ${className}`}>
      <div className="w-36 h-24 text-center mx-auto rounded flex items-center justify-center">
        <img 
          src={SplashLogo} 
          alt="Saudi National Day 95" 
          className="w-full h-full object-contain" 
        />
      </div>
    </div>
  );
};

export default HeaderLogo;
