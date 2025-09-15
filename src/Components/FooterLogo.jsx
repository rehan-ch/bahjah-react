import React from 'react';
import FooterLogo from '../assests/footerLogo.png';
import { UI_TEXT } from '../utills/constants';

const FooterLogoComponent = ({ className = "" }) => {
  return (
    <div className="relative">
      <div className="h-20 relative flex justify-center items-center">
        <div className="flex">
          <img 
            src={FooterLogo} 
            alt="Decorative Pattern" 
            className="w-[210px] h-[60px] object-contain" 
          />
        </div>
      </div>
    </div>
  );
};

export default FooterLogoComponent;
