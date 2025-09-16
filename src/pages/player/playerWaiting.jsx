import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePolling } from '../../hooks/usePolling';
import { ERROR_MESSAGES, UI_TEXT } from '../../utills/constants';
import HeaderLogo from '../../Components/HeaderLogo';
import FooterLogoComponent from '../../Components/FooterLogo';

const PlayerWaiting = ({ leaderboard, status }) => {
  const navigate = useNavigate();

  const gameId = localStorage.getItem('game_id');
  const playerId = localStorage.getItem('player_id');
  const [playerData, setPlayerData] = useState(leaderboard || []);

  const { data, isLoading, error, apiOk } = usePolling(gameId);

  useEffect(() => {
    if (leaderboard && leaderboard?.length > 0) {
      setPlayerData(leaderboard);
    }
    if (status === "active") {
      navigate('/player-questions')
    }
  }, [leaderboard, status])
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
      <div className="min-h-full bg-custom text-white flex flex-col items-center justify-center">
        <div className="text-center" dir="rtl">
          <h2 className="text-lg font-bold mb-4">خطأ</h2>
          <p className="text-red-400 mb-4">لم يتم العثور على معرف اللعبة</p>
          <div className="flex justify-center">
            <button
              className="bg-button text-white font-bold py-2 px-4 rounded-[25px] min-w-[120px]"
            >
              العودة لصفحة الانضمام
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-custom text-white flex flex-col overflow-y-auto">
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
              <h2 className="font-bold font-saudi text-white text-right text-[32px]">{UI_TEXT.GAME_TITLE}</h2>
            </div>

            <div dir="rtl">
              <h3 className="mb-4 font-bold font-saudi text-[17px]">مشاركون</h3>
              <div className="space-y-3">
                {participants.map((participant, index) => (
                  <div key={participant.id} className="flex items-center justify-between py-2 border-b border-green-700">
                    <div className="flex items-center space-x-3" dir="rtl">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center ml-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none" className="text-leafGreen">
                          <g clipPath="url(#clip0_44_7539)">
                            <path d="M4.57143 5.42836C4.57143 4.97812 4.66011 4.53228 4.83241 4.1163C5.00472 3.70033 5.25726 3.32237 5.57563 3.004C5.89401 2.68562 6.27197 2.43308 6.68794 2.26078C7.10392 2.08847 7.54975 1.99979 8 1.99979C8.45025 1.99979 8.89608 2.08847 9.31206 2.26078C9.72803 2.43308 10.106 2.68562 10.4244 3.004C10.7427 3.32237 10.9953 3.70033 11.1676 4.1163C11.3399 4.53228 11.4286 4.97812 11.4286 5.42836C11.4286 5.87861 11.3399 6.32445 11.1676 6.74042C10.9953 7.15639 10.7427 7.53436 10.4244 7.85273C10.106 8.1711 9.72803 8.42365 9.31206 8.59595C8.89608 8.76825 8.45025 8.85693 8 8.85693C7.54975 8.85693 7.10392 8.76825 6.68794 8.59595C6.27197 8.42365 5.89401 8.1711 5.57563 7.85273C5.25726 7.53436 5.00472 7.15639 4.83241 6.74042C4.66011 6.32445 4.57143 5.87861 4.57143 5.42836ZM12.5714 5.42836C12.5714 4.21594 12.0898 3.05318 11.2325 2.19587C10.3752 1.33856 9.21242 0.856934 8 0.856934C6.78758 0.856934 5.62482 1.33856 4.76751 2.19587C3.9102 3.05318 3.42857 4.21594 3.42857 5.42836C3.42857 6.64078 3.9102 7.80354 4.76751 8.66085C5.62482 9.51816 6.78758 9.99979 8 9.99979C9.21242 9.99979 10.3752 9.51816 11.2325 8.66085C12.0898 7.80354 12.5714 6.64078 12.5714 5.42836ZM1.14286 17.9998C1.14286 15.1605 3.44643 12.8569 6.28571 12.8569H9.71429C12.5536 12.8569 14.8571 15.1605 14.8571 17.9998V18.5712C14.8571 18.8855 15.1143 19.1426 15.4286 19.1426C15.7429 19.1426 16 18.8855 16 18.5712V17.9998C16 14.5284 13.1857 11.7141 9.71429 11.7141H6.28571C2.81429 11.7141 0 14.5284 0 17.9998V18.5712C0 18.8855 0.257143 19.1426 0.571429 19.1426C0.885714 19.1426 1.14286 18.8855 1.14286 18.5712V17.9998Z" fill="currentColor" />
                          </g>
                          <defs>
                            <clipPath id="clip0_44_7539">
                              <rect width="16" height="18.2857" fill="white" transform="translate(0 0.856934)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <span className="text-white font-saudi text-[24px]">{participant.name}</span>
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
                <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse ml-1" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse ml-1" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse ml-1" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerWaiting;