import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePolling } from '../../hooks/usePolling';
import { ERROR_MESSAGES, UI_TEXT } from '../../utills/constants';

const PlayerWaiting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const gameId = localStorage.getItem('game_id');
  const playerId = localStorage.getItem('player_id');
  
  const { data, isLoading, error, apiOk } = usePolling(gameId);

  const participants =
    Array.isArray(data?.leaderboard) && data.leaderboard.length > 0
      ? data.leaderboard.map((p) => ({
          id: p.player_id,
          name: p.name,
        }))
      : [];

  if (!gameId) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-teal-800">
        <div className="w-[420px] h-[880px] rounded-2xl overflow-hidden shadow-lg">
          <div className="min-h-full bg-custom text-white flex flex-col items-center justify-center">
            <div className="text-center" dir="rtl">
              <h2 className="text-lg font-bold mb-4">خطأ</h2>
              <p className="text-red-400 mb-4">لم يتم العثور على معرف اللعبة</p>
              <button
                onClick={() => navigate('/player-join')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                العودة لصفحة الانضمام
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-teal-800">
      <div className="w-[420px] h-[880px] rounded-2xl overflow-hidden shadow-lg">
        
        <div className="min-h-full bg-custom text-white flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 text-sm">
            <button
              onClick={() => navigate(-1)}
              className="text-green-400 font-medium"
              dir="rtl"
            >
              {UI_TEXT.BACK_BUTTON}
            </button>
            <span className="font-bold">{UI_TEXT.APP_NAME}</span>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
            
            {/* Title */}
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
              <div className="bg-red-600 text-white p-4 rounded-lg text-center" dir="rtl">
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

          {/* Footer */}
          <div className="p-6 text-center">
            <div className="text-green-400 text-sm" dir="rtl">
              استعد للمسابقة!
            </div>
            {!isLoading && !error && data && (
              <div className="text-xs text-teal-300 mt-2" dir="rtl">
                API: {apiOk ? "✓ متصل" : "✗ غير متصل"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerWaiting;