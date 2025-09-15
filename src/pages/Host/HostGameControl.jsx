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
                      w-full py-2 px-4 rounded-full border-2 flex items-center justify-between
                      ${option.letter === correctAnswer
                        ? "border-borderGreen text-white"
                        : "text-white"
                      }
                    `}
                    dir="rtl"
                  >
                    <span className="font-medium">{option.text}</span>
                    {option.letter === correctAnswer && (
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className="w-6 h-6">
                          <path d="M11 0C3.29 0 0 3.29 0 11C0 18.71 3.29 22 11 22C18.71 22 22 18.71 22 11C22 3.29 18.71 0 11 0ZM16.305 8.539C14.993 10.592 13.125 13.165 10.304 14.858C9.98 15.053 9.573 15.048 9.254 14.845C7.734 13.882 6.593 12.85 5.66 11.597C5.33 11.154 5.422 10.528 5.865 10.198C6.307 9.868 6.934 9.961 7.263 10.403C7.937 11.308 8.751 12.082 9.799 12.808C11.959 11.348 13.443 9.301 14.618 7.462C14.917 6.996 15.535 6.86 15.999 7.158C16.465 7.456 16.602 8.074 16.305 8.539Z" fill="#008A4A"/>
                        </svg>
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
