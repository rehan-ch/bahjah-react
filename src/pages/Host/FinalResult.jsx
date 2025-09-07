
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FinalResult = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom">
      <div className="w-[420px] h-[880px] overflow-hidden">
        <div className="min-h-full bg-custom text-white flex flex-col">
          
          <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
            <div className="text-center" dir="rtl">
            </div>

            <div dir="rtl">
              <h3 className="text-lg font-bold mb-4 text-center">نتائج</h3>
              
              <div className="space-y-3">
                {/* Player 1 */}
                <div className="flex justify-between items-center py-3 border-b border-green-400">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                    <span className="text-white">زينب</span>
                  </div>
                  <span className="text-white font-bold">8 PT</span>
                </div>

                {/* Player 2 */}
                <div className="flex justify-between items-center py-3 border-b border-green-400">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                    <span className="text-white">عمر</span>
                  </div>
                  <span className="text-white font-bold">7 PT</span>
                </div>

                {/* Player 3 */}
                <div className="flex justify-between items-center py-3 border-b border-green-400">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                    <span className="text-white">احمد</span>
                  </div>
                  <span className="text-white font-bold">2 PT</span>
                </div>

                {/* Player 4 */}
                <div className="flex justify-between items-center py-3 border-b border-green-400">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                    <span className="text-white">ليلى</span>
                  </div>
                  <span className="text-white font-bold">1 PT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6">
            <button 
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full text-lg transition-colors"
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