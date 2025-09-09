
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UI_TEXT } from '../../utills/constants';
import { connectToGameChannel, subscribeToGameEvent } from '../../utills/helperFunctions';

const PlayerResult = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null)
  const accessCode = localStorage.getItem('access_code')
  const currentQuestion = data?.current_question_index + 1 || 1
  const totalQuestions = data?.total_questions || 10


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
              <h2 className="text-lg font-bold mb-2">السؤال 1/10</h2>
            </div>

            {/* Question */}
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
        </div>
      </div>
    </div>
  )
}

export default PlayerResult