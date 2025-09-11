import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UI_TEXT, ERROR_MESSAGES } from '../../utills/constants'
import apiService from '../../services/apiService'

const PlayerQuestions = ({data}) => {
  const navigate = useNavigate()
  const player_id = localStorage.getItem('player_id')
  const game_id = localStorage.getItem('game_id')
  const [selectedOption, setSelectedOption] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  
  const currentQuestion = data?.game?.current_question_index + 1 || 1
  const totalQuestions = data?.game?.total_questions || 10
  const questionData = data?.current_question || null
  const isHostSubmitted = data?.game?.is_result
  // Extract question and options from the data
  const question = questionData?.question || "ما معنى كلمة \"خرمس\" باللهجة القصيمية؟"
  const options = questionData?.options ? [
    questionData.options.a,
    questionData.options.b,
    questionData.options.c,
    questionData.options.d
  ] : ["الظلام", "النور", "الإزعاج", "الهدوء"]

  // Function to get option letter (a, b, c, d) from option text
  const getOptionLetter = (optionText) => {
    const optionIndex = options.findIndex(opt => opt === optionText);
    return ['a', 'b', 'c', 'd'][optionIndex];
  };

  // Function to submit answer
  const handleSubmitAnswer = async () => {
    if (!game_id || !player_id || !selectedOption) {
      setError("Missing required data for submission");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const questionIndex = data?.game?.current_question_index || 0;
      const selectedOptionLetter = getOptionLetter(selectedOption);
       await apiService.submitPlayerAnswer(
        game_id, 
        player_id, 
        questionIndex, 
        selectedOptionLetter
      );
    } catch (error) {
      setError(ERROR_MESSAGES.ANSWER_SUBMIT_ERROR || "Failed to submit answer");
    } 
  };
  useEffect(() => {

    if(isHostSubmitted){
      navigate('/player-result')
    }
  }, [isHostSubmitted])



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
            
            {/* Error Display */}
            {error && (
              <div className="bg-red-600 text-white p-3 rounded-lg text-center" dir="rtl">
                {error}
              </div>
            )}

            {/* Question Progress */}
            <div className="text-center" dir="rtl">
              <h2 className="text-lg font-bold mb-2">السؤال {currentQuestion}/{totalQuestions}</h2>
            </div>

            {/* Current Question with Options */}
            <div className="bg-custom rounded-lg p-4" dir="rtl">
              <h3 className="font-semibold mb-3 text-center">السؤال الحالي</h3>
              <p className="text-sm text-center leading-relaxed mb-4">
                {question}
              </p>

              {/* Question Options */}
              <div className="space-y-3">
                {options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(option)}
                    className={`
                      w-full py-3 px-4 rounded-lg border-2 text-center font-medium transition-colors flex items-center justify-between
                      ${selectedOption === option
                        ? "bg-green-600 border-green-700 text-white"
                        : "bg-teal-700 border-teal-500 text-white hover:bg-teal-600"
                      }
                    `}
                    dir="rtl"
                  >
                    <span>{option}</span>
                    {selectedOption === option && (
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            

            {/* Response Summary */}
            <div className="bg-custom rounded-lg p-4 text-center" dir="rtl">
              <div className="flex justify-center items-center gap-2 mb-2">
                {/* <span className="text-white text-sm">تم الرد 3/5</span> */}
                <div className="flex gap-1">
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6">
            <div className="space-y-3">
              <button 
                onClick={handleSubmitAnswer}
                disabled={!selectedOption || isSubmitting}
                className={`w-full font-bold py-4 px-6 rounded-full text-lg transition-colors ${
                  selectedOption && !isSubmitting
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
                dir="rtl"
              >
                {isSubmitting ? "جاري الإرسال..." : "التالي"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerQuestions
