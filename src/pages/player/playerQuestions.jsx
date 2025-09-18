import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ERROR_MESSAGES } from '../../utills/constants'
import apiService from '../../services/apiService'
import GreenButton from '../../Components/GreenButton'

const PlayerQuestions = ({ data }) => {
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

    if (isHostSubmitted) {
      navigate('/player-result')
    }
  }, [isHostSubmitted])



  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-full text-center" dir="rtl">
            {error}
          </div>
        )}
        <div className="text-right" dir="rtl">
          <h2 className="text-lg font-bold mr-3">السؤال {currentQuestion}/{totalQuestions}</h2>
        </div>

        <div className="bg-custom rounded-full p-4" dir="rtl">
          <h2 className="text-white text-heading leading-10 tracking-wide mb-4">
            {question}
          </h2>
          <div className="space-y-3">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(option)}
                className={`
                      w-full py-2 px-4 rounded-full border-2 flex items-center justify-between
                      text-primary-button
                      ${selectedOption === option
                    ? "border-borderGreen text-white"
                    : "text-white hover:border-borderGreen"
                  }
                    `}
                dir="rtl"
              >
                <span className="flex-1">{option}</span>
                {selectedOption === option && (
                  <div className="w-6 h-6 flex-none flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className="w-6 h-6">
                      <path d="M11 0C3.29 0 0 3.29 0 11C0 18.71 3.29 22 11 22C18.71 22 22 18.71 22 11C22 3.29 18.71 0 11 0ZM16.305 8.539C14.993 10.592 13.125 13.165 10.304 14.858C9.98 15.053 9.573 15.048 9.254 14.845C7.734 13.882 6.593 12.85 5.66 11.597C5.33 11.154 5.422 10.528 5.865 10.198C6.307 9.868 6.934 9.961 7.263 10.403C7.937 11.308 8.751 12.082 9.799 12.808C11.959 11.348 13.443 9.301 14.618 7.462C14.917 6.996 15.535 6.86 15.999 7.158C16.465 7.456 16.602 8.074 16.305 8.539Z" fill="#008A4A" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-center">
        <GreenButton
          text={isSubmitting ? "جاري الإرسال..." : "يُقدِّم"}
          handleClick={handleSubmitAnswer}
          disabled={!selectedOption || isSubmitting}
        />
      </div>
    </div>
  )
}

export default PlayerQuestions
