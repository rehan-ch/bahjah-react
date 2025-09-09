

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../services/apiService";
import { ERROR_MESSAGES, UI_TEXT } from "../../utills/constants";
import { connectToGameChannel, subscribeToGameEvent, unsubscribeFromGameEvent, disconnectFromGameChannel } from "../../utills/helperFunctions";

const HostWaitingpage = ({setIsStarted}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const storedId = typeof window !== "undefined" ? localStorage.getItem("game_id") : null;
  const gameId = id || storedId;

  // State management for real-time data
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const quizCode = data?.access_code;
  const totalQuestions = data?.total_questions ?? 10;
  const currentQuestionIndex = data?.current_question_index ?? 0;
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

  const joinUrl = `https://bahjah.com/${quizCode}`;
  const previewUrl = `https://bahjah.com/${quizCode}/live`;

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
  }, [gameId]);

  useEffect(() => {
    if (!quizCode) return;

    // Connect to Action Cable
    connectToGameChannel(quizCode);

    // Subscribe to game events
    const handleGameUpdate = (eventData) => {
      setData(prevData => ({
        ...prevData,
        leaderboard: eventData?.leaderboard
      }));
    };


    subscribeToGameEvent('leaderboard_updated', handleGameUpdate);

    return () => {
      unsubscribeFromGameEvent('leaderboard_updated', handleGameUpdate);
      // disconnectFromGameChannel();
    };
  }, [quizCode]);

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
        setIsStarted(true);
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
    <div className="flex justify-center items-center min-h-screen bg-custom">
      <div className="w-[420px] h-[880px] overflow-hidden">
        <div className="min-h-full bg-custom text-white flex flex-col">
          <div className="flex justify-between items-center px-4 py-3 text-sm">
            <button onClick={() => navigate(-1)} className="text-green-400 font-medium" dir="rtl">
              {UI_TEXT.BACK_BUTTON}
            </button>
            <span className="font-bold">{UI_TEXT.APP_NAME}</span>
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
              <div className="bg-red-600 text-white p-4 rounded-lg text-center" dir="rtl">
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
                  <div className="bg-transparent border-2 border-green-400 text-white py-3 px-4 rounded-lg text-center font-mono text-lg">
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
                  <div className="bg-transparent border-2 border-green-400 text-white py-3 px-4 rounded-lg text-center text-sm break-all">
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
                  <div className="bg-transparent border-2 border-green-400 text-white py-3 px-4 rounded-lg text-center text-sm break-all">
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
            <div className="p-6">
              <button
                onClick={handleStartQuiz}
                disabled={participants < 1}
                className={"w-full py-4 px-6 rounded-full text-lg font-bold transition-colors bg-green-500 hover:bg-green-600 text-white"}
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
        </div>
      </div>
    </div>
  );
};

export default HostWaitingpage;
