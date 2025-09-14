import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import SplashLogo from '../../assests/splashLogo.svg'
import FooterLogo from '../../assests/footerLogo.png'
import { UI_TEXT } from '../../utills/constants'
import apiService from '../../services/apiService'

const HostGameControl = ({data}) => {
  const navigate = useNavigate()
  const game_id = localStorage.getItem('game_id')
  const currentQuestion = data?.game?.current_question_index + 1 || 1
  const totalQuestions = data?.game?.total_questions || 10
  const questionData = data?.current_question || null
  const playerData = data?.players || 0
  const totalPlayers = data?.players?.length || 0
  const playerAnswered = useMemo(() => {
    if(playerData?.length > 0){
      return playerData?.filter((player) => player?.has_answered)?.length || 0
    }
    return 0
  }, [playerData])
  
  const question = questionData?.question || "كم مرة تأهل المنتخب السعودي لكأس العالم؟"
  const correctAnswer = questionData?.correct || "a"
  const options = questionData?.options ? [
    { letter: 'a', text: questionData.options.a },
    { letter: 'b', text: questionData.options.b },
    { letter: 'c', text: questionData.options.c },
    { letter: 'd', text: questionData.options.d }
  ] : [
    { letter: 'a', text: "6 مرات" },
    { letter: 'b', text: "5 مرات" },
    { letter: 'c', text: "4 مرات" },
    { letter: 'd', text: "7 مرات" }
  ]
const handleNextQuestion = async () => {
  await apiService.getGameLeaderboard(game_id);
  navigate('/question-result');
}
  return (
    <div className="flex justify-center items-center min-h-screen bg-custom overflow-y-auto scrollbar-hide">
      <div className="w-[420px] overflow-hidden">
        <div className="min-h-full bg-custom text-white flex flex-col overflow-y-auto">
         <div className="mb-12 text-center">
              <div className="w-72 h-24 mx-auto rounded flex items-center justify-center">
                <img
                  src={SplashLogo}
                  alt="Saudi National Day 95"
                  className="w-[150px] h-full object-contain"
                />
              </div>
            </div>
          <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
            <div className="text-center" dir="rtl">
              <h2 className="text-lg font-bold mb-2">السؤال {currentQuestion}/{totalQuestions}</h2>
            </div>
            <div className="bg-custom rounded-full p-4" dir="rtl">
              <h3 className="font-semibold mb-3 text-center">السؤال الحالي</h3>
              <p className="text-sm text-center leading-relaxed mb-4">
                {question}
              </p>
              <div className="space-y-3">
                {options?.map((option, idx) => (
                  <div
                    key={idx}
                    className={`
                      w-full py-3 px-4 rounded-full border-2 flex items-center justify-between
                      ${option.letter === correctAnswer
                        ? "bg-green-600 border-green-700 text-white"
                        : "bg-teal-700 border-teal-500 text-white"
                      }
                    `}
                    dir="rtl"
                  >
                    <span className="font-medium">{option.text}</span>
                    {option.letter === correctAnswer && (
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm font-bold">✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-teal-800 rounded-full p-4 text-center" dir="rtl">
              <div className="flex justify-center items-center gap-2 mb-2">
                <span className="text-white text-sm">الإجابة الصحيحة</span>
                <div className="flex gap-1">
                  <div>{playerAnswered}/{totalPlayers}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
          <div className="p-6 flex justify-center">
            <div className="space-y-3">
              <button 
                className="border border-green-600 bg-button text-white font-bold py-4 px-6 rounded-[25px] text-lg transition-colors min-w-[120px]"
                dir="rtl" onClick={handleNextQuestion}
              >
                 التالي
              </button>
            </div>
          </div>
          </div>
          <div className="mb-12 text-center">
            <div className="w-72 h-24 mx-auto rounded flex items-center justify-center">
              <img
                src={FooterLogo}
                alt="Saudi National Day 95"
                className="w-[150px] h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostGameControl
