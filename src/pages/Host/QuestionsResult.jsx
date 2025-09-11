
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UI_TEXT, ERROR_MESSAGES } from '../../utills/constants';
import apiService from '../../services/apiService';

const QuestionsResult = ({data}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const game_id = localStorage.getItem('game_id');
  
  // Extract data from the provided structure
  const game = data?.game || {}
  const currentQuestionData = data?.current_question || {}
  const leaderboard = data?.leaderboard || []
  
  const currentQuestion = game?.current_question_index + 1 || 1
  const totalQuestions = game?.total_questions || 10
  const question = currentQuestionData?.question || "المملكة العربية السعودية هي الدولة العربية الوحيدة ضمن أي مؤسسة عالمية؟"
  const correctAnswer = currentQuestionData?.correct || "a"
  const options = currentQuestionData?.options || {
    "a": "مجموعة العشرين - G20",
    "b": "الأمم المتحدة", 
    "c": "منظمة الصحة العالمية",
    "d": "رابطة العالم الإسلامي"
  }
  
  // Get the correct answer text
  const correctAnswerText = options[correctAnswer] || "مجموعة العشرين - G20"

  const handleNextQuestion = async () => {
    if (!game_id) {
      setError("Game ID not found");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      if(currentQuestion === totalQuestions){
        await apiService.finishGame(game_id);
        navigate('/final-result');
        return;
      }
      const result = await apiService.nextQuestion(game_id);
      if(result){
        navigate('/host-questions');
      }
      
    } catch (error) {
      console.error('Error loading next question:', error);
      setError(ERROR_MESSAGES.NEXT_QUESTION_ERROR || "Failed to load next question");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom">
      <div className="w-[420px] h-[880px] overflow-hidden">
        <div className="min-h-full bg-custom text-white flex flex-col">
          <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
            
            {/* Error Display */}
            {error && (
              <div className="bg-red-600 text-white p-3 rounded-lg text-center" dir="rtl">
                {error}
              </div>
            )}

            <div className="text-center" dir="rtl">
              <h2 className="text-lg font-bold mb-2">السؤال {currentQuestion}/{totalQuestions}</h2>
            </div>
            <div className="text-center" dir="rtl">
              <p className="text-lg font-bold leading-relaxed">
                {question}
              </p>
            </div>

            {/* Correct Answer */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm bg-green-600 border-2 border-green-700 rounded-lg p-4 flex items-center justify-between">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="text-white font-bold text-lg">{correctAnswerText}</span>
              </div>
            </div>

            {/* Results Section */}
            <div dir="rtl">
              <h3 className="text-lg font-bold mb-4 text-center">نتائج</h3>
              
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

          {/* Footer */}
          <div className="p-6">
            <button 
              onClick={handleNextQuestion}
              disabled={isLoading}
              className={`w-full font-bold py-4 px-6 rounded-full text-lg transition-colors ${
                isLoading
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
              dir="rtl"
            >
              {isLoading ? "جاري التحميل..." : "التالي"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionsResult