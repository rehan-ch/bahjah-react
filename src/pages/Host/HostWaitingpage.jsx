import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utills/varriables";

const HostWaitingpage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const game_Id = localStorage.getItem('game_id');
  const gameId = id || game_Id;
  
  // State for game data
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Fetch game data from API
  useEffect(() => {
    const fetchGameData = async () => {
      if (!id) {
        setError("Game ID not found");
        setIsLoading(false);
        return;
      }
      try {
        setError("");
        
        const response = await fetch(`${BASE_URL}/api/v1/games/${id}/leaderboard`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Game Data API Response:', result);
        
        if (result.success && result.data) {
          setData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch game data');
        }
        
      } catch (error) {
        console.error('Error fetching game data:', error);
        setError("حدث خطأ في تحميل بيانات اللعبة");
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchGameData();

    // Set up interval to fetch every 3 seconds
    const interval = setInterval(fetchGameData, 3000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [id]);

  // Extract data from API response
  const quizCode = data?.access_code || "0000";
  const totalQuestions = data?.total_questions || 10;
  const currentQuestionIndex = data?.current_question_index || 0;
  const isFinished = data?.is_finished || false;
  const players = data?.players || [];
  const totalPlayers = data?.total_players || 0;
  const gameStatus = data?.status || "draft";
  
  const joinUrl = `https://Bahjah.com/${quizCode}`;
  const previewUrl = `https://Bahjah.com/${quizCode}/Live`;

  // Use actual players data from API or fallback to mock data
  const participants = players.length > 0 ? players : [
    { id: 1, name: "زينب" },
    { id: 2, name: "عمر" },
    { id: 3, name: "احمد" },
    { id: 4, name: "ليلى" }
  ];

  // Simulate new participants joining
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (participants.length < 8) { // Limit to 8 participants
//         const newParticipant = {
//           id: participants.length + 1,
//           name: `مشارك ${participants.length + 1}`
//         };
//         setParticipants(prev => [...prev, newParticipant]);
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [participants.length]);

  const handleStartQuiz = () => {
    if (data) {
      navigate("/host-questions", { 
        state: { 
          gameData: data,
          gameId: gameId,
          quizCode: quizCode,
          participants: participants,
          totalQuestions: totalQuestions,
          currentQuestionIndex: currentQuestionIndex
        } 
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

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
            
            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-8" dir="rtl">
                <div className="text-white text-lg mb-2">جاري تحميل بيانات اللعبة...</div>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-600 text-white p-4 rounded-lg text-center" dir="rtl">
                {error}
              </div>
            )}

            {/* Main Content - Only show when data is loaded */}
            {!isLoading && !error && data && (
              <>
                {/* Title */}
                <div className="text-center space-y-2" dir="rtl">
                  <h2 className="text-lg font-bold">مسابقة اليوم الوطني</h2>
                  <p className="text-sm text-green-400">حالة اللعبة: {gameStatus}</p>
                </div>

            {/* Quiz Code */}
            <div dir="rtl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">شفرة</span>
                <button
                  onClick={() => copyToClipboard(quizCode)}
                  className="text-green-400 text-xs hover:text-green-300"
                >
                  نسخ
                </button>
              </div>
              <div className="bg-transparent border-2 border-green-400 text-white py-3 px-4 rounded-lg text-center font-mono text-lg">
                {quizCode}
              </div>
            </div>

            {/* Join URL */}
            <div dir="rtl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">الانضمام إلى URL</span>
                <button
                  onClick={() => copyToClipboard(joinUrl)}
                  className="text-green-400 text-xs hover:text-green-300"
                >
                  نسخ
                </button>
              </div>
              <div className="bg-transparent border-2 border-green-400 text-white py-3 px-4 rounded-lg text-center text-sm break-all">
                {joinUrl}
              </div>
            </div>

            {/* Preview Link */}
            <div dir="rtl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">رابط المعاينة - نموذج التلفزيون</span>
                <button
                  onClick={() => copyToClipboard(previewUrl)}
                  className="text-green-400 text-xs hover:text-green-300"
                >
                  نسخ
                </button>
              </div>
              <div className="bg-transparent border-2 border-green-400 text-white py-3 px-4 rounded-lg text-center text-sm break-all">
                {previewUrl}
              </div>
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
                      {index === 0 ? "المضيف" : "مشارك"}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Waiting for more participants */}
              {participants.length < 4 && (
                <div className="text-center py-4 text-green-300 text-sm">
                  في انتظار المزيد من المشاركين...
                </div>
              )}
            </div>

            {/* Quiz Info */}
            <div className="bg-teal-700 rounded-lg p-4" dir="rtl">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>معرف اللعبة:</span>
                  <span className="text-green-400 text-xs">{gameId}</span>
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
                  <span className="text-green-400">✓ متصل</span>
                </div>
              </div>
            </div>
              </>
            )}
          </div>

          {/* Start Button - Only show when data is loaded */}
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
                {isFinished ? "اللعبة منتهية" : "يبدأ"}
              </button>
              {totalPlayers < 1 && !isFinished && (
                <p className="text-center text-green-300 text-sm mt-2" dir="rtl">
                  في انتظار انضمام المشاركين...
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
