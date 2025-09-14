
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SplashLogo from '../../assests/splashLogo.svg';
import FooterLogo from '../../assests/footerLogo.png';
import { UI_TEXT } from '../../utills/constants';
import { disconnectFromGameChannel } from '../../utills/helperFunctions';

const FinalResult = ({data}) => {
  const navigate = useNavigate();
  
  // Extract data from the provided structure
  const game = data?.game || {}
  const leaderboard = data?.leaderboard || []
  
  const handleClick = () => {
    localStorage.clear();
    disconnectFromGameChannel()
    navigate('/');
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom overflow-y-auto scrollbar-hide">
      <div className="w-[420px] overflow-hidden">
        <div className="min-h-full bg-custom text-white flex flex-col overflow-y-auto">
          {/* Header with Logo */}
          <div className="flex justify-between items-center px-4 py-3 text-sm">
            <div className="w-16 h-8 flex items-center justify-center">
              <img
                src={SplashLogo}
                alt="Saudi National Day 95"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold">{UI_TEXT.APP_NAME}</span>
            <div className="w-16 h-8"></div>
          </div>
          
          <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
            <div className="text-center" dir="rtl">
            </div>

            <div dir="rtl">
              <h3 className="text-lg font-bold mb-4 text-center">النتائج النهائية</h3>
              
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div key={player.player_id} className="flex justify-between items-center py-3 border-b border-green-400">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">👤</span>
                      </div>
                      <span className="text-white">{player.name}</span>
                    </div>
                    <span className="text-white font-bold">{player.score} PT</span>
                  </div>
                ))}
                
                {leaderboard.length === 0 && (
                  <div className="text-center py-4 text-green-300 text-sm">
                    لا توجد نتائج متاحة
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer with Logo */}
          <div className="mb-12 text-center">
            <div className="w-72 h-24 mx-auto rounded flex items-center justify-center">
              <img
                src={FooterLogo}
                alt="Saudi National Day 95"
                className="w-[150px] h-full object-contain"
              />
            </div>
          </div>
          
          <div className="p-6 flex justify-center">
            <button 
              className="bg-button text-white font-bold py-4 px-6 rounded-[25px] text-lg transition-colors min-w-[120px]"
              dir="rtl" onClick={handleClick}
            >
              ابدأ لعبة جديدة
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalResult