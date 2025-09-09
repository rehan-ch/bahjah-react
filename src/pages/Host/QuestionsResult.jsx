
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UI_TEXT, ERROR_MESSAGES } from '../../utills/constants';
import apiService from '../../services/apiService';

const QuestionsResult = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const game_id = localStorage.getItem('game_id');

  const handleNextQuestion = async () => {
    if (!game_id) {
      setError("Game ID not found");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
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
              <h2 className="text-lg font-bold mb-2">السؤال 1/10</h2>
            </div>
            <div className="text-center" dir="rtl">
              <p className="text-lg font-bold leading-relaxed">
                ما هو اليوم الوطني السعودي؟
              </p>
            </div>

            {/* Correct Answer */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm bg-green-600 border-2 border-green-700 rounded-lg p-4 flex items-center justify-between">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="text-white font-bold text-lg">22 سبتمبر</span>
              </div>
            </div>

            {/* Results Section */}
            <div dir="rtl">
              <h3 className="text-lg font-bold mb-4 text-center">نتائج</h3>
              
              <div className="space-y-3">
                {/* Player 1 */}
                <div className="flex justify-between items-center py-3 border-b border-green-400">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                    <span className="text-white">زينب</span>
                  </div>
                  <span className="text-white font-bold">8 PT</span>
                </div>

                {/* Player 2 */}
                <div className="flex justify-between items-center py-3 border-b border-green-400">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                    <span className="text-white">عمر</span>
                  </div>
                  <span className="text-white font-bold">7 PT</span>
                </div>

                {/* Player 3 */}
                <div className="flex justify-between items-center py-3 border-b border-green-400">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                    <span className="text-white">احمد</span>
                  </div>
                  <span className="text-white font-bold">2 PT</span>
                </div>

                {/* Player 4 */}
                <div className="flex justify-between items-center py-3 border-b border-green-400">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                    <span className="text-white">ليلى</span>
                  </div>
                  <span className="text-white font-bold">1 PT</span>
                </div>
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