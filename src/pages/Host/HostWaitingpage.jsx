

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../services/apiService";
import SplashLogo from "../../assests/splashLogo.svg";
import FooterLogo from "../../assests/footerLogo.png";
import { ERROR_MESSAGES, UI_TEXT } from "../../utills/constants";

const HostWaitingpage = ({leaderboard}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const baseUrl = window.location.origin;
  const storedId = typeof window !== "undefined" ? localStorage.getItem("game_id") : null;
  const gameId = id || storedId;

  // State management for real-time data
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const quizCode = data?.access_code;
  const isFinished = !!data?.is_finished;
  const totalPlayers = data?.total_players ?? 0;
  const gameStatus = data?.status || "draft";

  const participants =
    Array.isArray(data?.leaderboard) && data.leaderboard.length > 0
      ? data.leaderboard.map((p) => ({
          id: p.player_id,
          name: p.name,
        }))
      : [];

  const joinUrl = `${baseUrl}/player-join/${quizCode}`;

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      leaderboard: leaderboard
    }));
  }, [leaderboard]);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!gameId) {
        setError("Game ID not found");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const gameData = await apiService.getGameLeaderboard(gameId);
        setData(gameData);
      } catch (error) {
        console.error('Error fetching initial game data:', error);
        setError(ERROR_MESSAGES.GAME_DATA_ERROR || "Failed to load game data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);


  const handleStartQuiz = async () => {
    if (!gameId) {
      setError("Game ID not found");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const result = await apiService.startQuiz(gameId);
      if(result){
        navigate("/host-questions");
      }
      
    } catch (error) {
      console.error('Error starting quiz:', error);
      setError("Failed to start quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom overflow-y-auto scrollbar-hide">
        <div className="w-[420px] overflow-hidden">
          <div className="min-h-full bg-custom text-white flex flex-col overflow-y-auto">
          {/* Header with Logo */}
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
                  <p className="text-sm text-green-400">حالة اللعبة: {gameStatus}</p>
                </div>

                <div dir="rtl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">شفرة</span>
                    <button onClick={() => copyToClipboard(quizCode)} className="text-green-400 text-xs hover:text-green-300">
                      {UI_TEXT.COPY}
                    </button>
                  </div>
                  <div className="bg-transparent border-2 border-green-400 text-white py-3 px-4 rounded-full text-center font-mono text-lg">
                    {quizCode}
                  </div>
                </div>

                <div dir="rtl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">الانضمام إلى URL</span>
                    <button onClick={() => copyToClipboard(joinUrl)} className="text-green-400 text-xs hover:text-green-300">
                      {UI_TEXT.COPY}
                    </button>
                  </div>
                  <div className="bg-transparent border-2 border-green-400 text-white py-3 px-4 rounded-full text-center text-sm break-all">
                    {joinUrl}
                  </div>
                </div>
{/* 
                <div dir="rtl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">رابط المعاينة - نموذج التلفزيون</span>
                    <button onClick={() => copyToClipboard(previewUrl)} className="text-green-400 text-xs hover:text-green-300">
                      {UI_TEXT.COPY}
                    </button>
                  </div>
                  <div className="bg-transparent border-2 border-green-400 text-white py-3 px-4 rounded-full text-center text-sm break-all">
                    {previewUrl}
                  </div>
                </div> */}

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
                        <div className="text-green-400 text-sm">{index === 0 ? UI_TEXT.HOST : UI_TEXT.PARTICIPANT}</div>
                      </div>
                    ))}
                  </div>

                  {participants.length < 1 && (
                    <div className="text-center py-4 text-green-300 text-sm">{ERROR_MESSAGES.WAITING_FOR_PLAYERS}</div>
                  )}
                </div>
              </>
            )}
          </div>

          {!isLoading && !error && data && (
            <div className="p-6 flex flex-col items-center">
              <button
                onClick={handleStartQuiz}
                disabled={participants < 1}
                className={"py-4 px-6 rounded-full text-lg font-bold transition-colors bg-green-500 hover:bg-green-600 text-white min-w-[120px]"}
                dir="rtl"
              >
                {isFinished ? UI_TEXT.GAME_FINISHED : UI_TEXT.START_BUTTON}
              </button>
              {totalPlayers < 1 && !isFinished && (
                <p className="text-center text-green-300 text-sm mt-2" dir="rtl">
                  {ERROR_MESSAGES.WAITING_FOR_JOIN}
                </p>
              )}
            </div>
          )}
          
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

export default HostWaitingpage;
