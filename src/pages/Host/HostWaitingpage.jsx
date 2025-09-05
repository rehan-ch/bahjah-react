

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePolling } from "../../hooks/usePolling";
import { ERROR_MESSAGES, UI_TEXT } from "../../utills/constants";

const HostWaitingpage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const storedId = typeof window !== "undefined" ? localStorage.getItem("game_id") : null;
  const gameId = id || storedId;

  const { data, isLoading, error, apiOk } = usePolling(gameId);

  const quizCode = data?.access_code || "0000";
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
      : [
          { id: 1, name: "زينب" },
          { id: 2, name: "عمر" },
          { id: 3, name: "احمد" },
          { id: 4, name: "ليلى" },
        ];

  const joinUrl = `https://bahjah.com/${quizCode}`;
  const previewUrl = `https://bahjah.com/${quizCode}/live`;

  const handleStartQuiz = () => {
    if (data) {
      navigate("/host-questions", {
        state: {
          gameData: data,
          gameId,
          quizCode,
          participants,
          totalQuestions,
          currentQuestionIndex,
        },
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-[420px] h-[880px] border-2 border-black rounded-2xl overflow-hidden shadow-lg">
        <div className="min-h-full bg-gradient-to-b from-teal-900 to-teal-800 text-white flex flex-col">
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
                        <div className="text-green-400 text-sm">{index === 0 ? UI_TEXT.HOST : UI_TEXT.PARTICIPANT}</div>
                      </div>
                    ))}
                  </div>

                  {participants.length < 4 && (
                    <div className="text-center py-4 text-green-300 text-sm">{ERROR_MESSAGES.WAITING_FOR_PLAYERS}</div>
                  )}
                </div>

                <div className="bg-teal-700 rounded-lg p-4" dir="rtl">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>معرف اللعبة:</span>
                      <span className="text-green-400 text-xs break-all">{gameId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>عدد الأسئلة:</span>
                      <span className="text-green-400">{totalQuestions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المشاركون:</span>
                      <span className="text-green-400">{totalPlayers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>السؤال الحالي:</span>
                      <span className="text-green-400">{currentQuestionIndex + 1} / {totalQuestions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>حالة اللعبة:</span>
                      <span className="text-green-400">{isFinished ? "منتهية" : "جارية"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>حالة API:</span>
                      <span className={apiOk ? "text-green-400" : "text-red-300"}>
                        {apiOk ? "✓ متصل" : "✗ غير متصل"}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {!isLoading && !error && data && (
            <div className="p-6">
              <button
                onClick={handleStartQuiz}
                disabled={totalPlayers < 1 || isFinished}
                className={`w-full py-4 px-6 rounded-full text-lg font-bold transition-colors ${
                  totalPlayers >= 1 && !isFinished
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
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
