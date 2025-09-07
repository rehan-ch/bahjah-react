import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UI_TEXT } from '../../utills/constants'

const PlayerQuestions = () => {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState(null)

  // Example options (you can fetch dynamically later)
  const options = ["24 سبتمبر", "22 سبتمبر", "25 سبتمبر", "23 سبتمبر"]

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

            {/* Current Question with Options */}
            <div className="bg-custom rounded-lg p-4" dir="rtl">
              <h3 className="font-semibold mb-3 text-center">السؤال الحالي</h3>
              <p className="text-sm text-center leading-relaxed mb-4">
                ما هو اليوم الوطني السعودي؟
              </p>

              {/* Question Options */}
              <div className="space-y-3">
                {options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(option)}
                    className={`
                      w-full py-3 rounded-lg border text-center font-medium transition-colors
                      ${selectedOption === option
                        ? "bg-green-600 border-green-400 text-white"
                        : "bg-custom border-teal-600 text-white hover:bg-teal-700"
                      }
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            

            {/* Response Summary */}
            <div className="bg-custom rounded-lg p-4 text-center" dir="rtl">
              <div className="flex justify-center items-center gap-2 mb-2">
                <span className="text-white text-sm">تم الرد 3/5</span>
                <div className="flex gap-1">
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6">
            <div className="space-y-3">
              <button 
                className="w-full border border-green-600 bg-custom hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full text-lg transition-colors"
                dir="rtl"
              >
                 التالي
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerQuestions
