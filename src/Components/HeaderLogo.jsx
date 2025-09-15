import React from 'react';
import SplashLogo from '../assests/splashLogo.svg';

const HeaderLogo = ({ className = "" }) => {
  return (
    <div class="flex w-[402px] px-[16px] pt-[21px] pb-[19px] justify-center items-center gap-[154px]">
      <div className="w-[80px] h-[32px] text-center mx-auto rounded flex items-center justify-center">
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
