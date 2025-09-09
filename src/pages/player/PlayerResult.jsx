import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UI_TEXT } from '../../utills/constants';

const PlayerResult = ({data}) => {
  const navigate = useNavigate();
  const [previousQuestionIndex, setPreviousQuestionIndex] = useState(null);
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
  useEffect(() => {
    const currentQuestionIndex = game?.current_question_index + 1;
    if (previousQuestionIndex === null) {
      setPreviousQuestionIndex(currentQuestionIndex);
      return;
    }

    if (currentQuestionIndex !== previousQuestionIndex) {

      if (currentQuestionIndex >= totalQuestions) {
    
        navigate('/final-result');
      } else {
        navigate('/player-questions');
      }
      
      // Update previous question index
      setPreviousQuestionIndex(currentQuestionIndex);
    }
  }, [game?.current_question_index, totalQuestions, navigate, previousQuestionIndex]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom">
      <div className="w-[420px] h-[880px] overflow-hidden">
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
            
            {/* Question Progress */}
            <div className="text-center" dir="rtl">
              <h2 className="text-lg font-bold mb-2">السؤال {currentQuestion}/{totalQuestions}</h2>
            </div>

            {/* Question */}
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
        </div>
      </div>
    </div>
  )
}

export default PlayerResult