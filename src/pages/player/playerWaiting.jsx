import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePolling } from '../../hooks/usePolling';
import SplashLogo from '../../assests/splashLogo.svg';
import FooterLogo from '../../assests/footerLogo.png';
import { ERROR_MESSAGES, UI_TEXT } from '../../utills/constants';

const PlayerWaiting = ({leaderboard,status}) => {
  const navigate = useNavigate();
  
  const gameId = localStorage.getItem('game_id');
  const playerId = localStorage.getItem('player_id');
  const [playerData, setPlayerData] = useState(leaderboard || []);
  
  const { data, isLoading, error, apiOk } = usePolling(gameId);
  
  useEffect(() => {
    if(leaderboard && leaderboard?.length > 0){
    setPlayerData(leaderboard);
  }
    if(status === "active") {
      navigate('/player-questions')
      }
  }, [leaderboard,status])
  useEffect(() => {
    setPlayerData(data?.leaderboard);
  }, [data])

  const participants =
    Array.isArray(playerData) && playerData?.length > 0
      ? playerData?.map((p) => ({
          id: p.player_id,
          name: p.name,
        }))
      : [];

  if (!gameId) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-custom">
        <div className="w-[420px] h-[880px] overflow-hidden">
          <div className="min-h-full bg-custom text-white flex flex-col items-center justify-center">
            <div className="text-center" dir="rtl">
              <h2 className="text-lg font-bold mb-4">خطأ</h2>
              <p className="text-red-400 mb-4">لم يتم العثور على معرف اللعبة</p>
              <div className="flex justify-center">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full min-w-[120px]"
                >
                  العودة لصفحة الانضمام
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom">
      <div className="w-[420px] h-[880px] overflow-hidden">
        <div className="min-h-full bg-custom text-white flex flex-col">
        <div className="mb-12 text-center">
              <div className="w-72 h-24 mx-auto rounded flex items-center justify-center">
                <img
                  src={SplashLogo}
                  alt="Saudi National Day 95"
                  className="w-[150px] h-full object-contain"
                />
              </div>
            </div>
          <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
            {isLoading && (
              <div className="text-center py-8" dir="rtl">
                <div className="text-white text-lg mb-2">{ERROR_MESSAGES.LOADING_GAME_DATA}</div>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-600 text-white p-4 rounded-full text-center" dir="rtl">
                {error}
              </div>
            )}

            {!isLoading && !error && data && (
              <>
                <div className="text-center space-y-2" dir="rtl">
                  <h2 className="text-lg font-bold">{UI_TEXT.GAME_TITLE}</h2>
                </div>

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
                          {participant.id === playerId ? "أنت" : UI_TEXT.PARTICIPANT}
                        </div>
                      </div>
                    ))}
                  </div>

                  {participants.length === 0 && (
                    <div className="text-center py-4 text-green-300 text-sm">{ERROR_MESSAGES.WAITING_FOR_PLAYERS}</div>
                  )}
                </div>

                <div className="text-center py-8" dir="rtl">
                  <div className="text-white text-lg mb-2">
                    اللعبة سوف تبدأ قريبا
                  </div>
                  <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  <div className="text-sm text-teal-300 mt-2" dir="rtl">
                    في انتظار المضيف لبدء اللعبة...
                  </div>
                </div>
              </>
            )}
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
        </div>
      </div>
    </div>
  );
};

export default PlayerWaiting;