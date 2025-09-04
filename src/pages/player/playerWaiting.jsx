import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PlayerWaiting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get player data from previous page
  const playerData = location.state || {
    name: "المشارك",
    email: "player@example.com"
  };

  // Mock participants data (including the current player)
  const [participants, setParticipants] = useState([
    { id: 1, name: "زينب" },
    { id: 2, name: "عمر" },
    { id: 3, name: "احمد" },
    { id: 4, name: playerData.name || "أنت" }
  ]);

  // Loading dots animation
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-[420px] h-[880px] border-2 border-black rounded-2xl overflow-hidden shadow-lg">
        
        <div className="min-h-full bg-gradient-to-b from-teal-900 to-teal-800 text-white flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 text-sm">
            <button
              onClick={() => navigate(-1)}
              className="text-green-400 font-medium"
              dir="rtl"
            >
              خلف
            </button>
            <span className="font-bold">بهجة</span>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
            
            {/* Title */}
            <div className="text-center space-y-2" dir="rtl">
              <h2 className="text-lg font-bold">مسابقة اليوم الوطني</h2>
            </div>

            {/* Participants Section */}
            <div dir="rtl">
              <h3 className="text-lg font-bold mb-4">مشاركون</h3>
              <div className="space-y-3">
                {participants.map((participant, index) => (
                  <div key={participant.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3" dir="rtl">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">👤</span>
                      </div>
                      <span className="text-white">{participant.name}</span>
                    </div>
                    <div className="text-green-400 text-sm">
                      {participant.name === (playerData.name || "أنت") ? "أنت" : "مشارك"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Waiting Message */}
            <div className="text-center py-8" dir="rtl">
              <div className="text-white text-lg mb-2">
                اللعبة سوف تبدأ قريبا
              </div>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>

            {/* Status Message */}
          </div>

          {/* Footer */}
          <div className="p-6 text-center">
            <div className="text-green-400 text-sm" dir="rtl">
              استعد للمسابقة!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerWaiting;