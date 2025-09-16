import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { UI_TEXT } from '../../utills/constants'
import apiService from '../../services/apiService'
import HeaderLogo from '../../Components/HeaderLogo'
import User from '../../assests/multiuser.png'
import FooterLogoComponent from '../../Components/FooterLogo'
import GreenButton from '../../Components/GreenButton'

const HostGameControl = ({ data }) => {
  const navigate = useNavigate()
  const game_id = localStorage.getItem('game_id')
  const currentQuestion = data?.game?.current_question_index + 1 || 1
  const totalQuestions = data?.game?.total_questions || 10
  const questionData = data?.current_question || null
  const playerData = data?.players || 0
  const totalPlayers = data?.players?.length || 0
  const playerAnswered = useMemo(() => {
    if (playerData?.length > 0) {
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
    <div className="flex flex-col overflow-y-auto">
      <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
        <div className="text-right" dir="rtl">
          <h2 className="text-lg font-bold mr-3">السؤال {currentQuestion}/{totalQuestions}</h2>
        </div>
        <div className="bg-custom rounded-full p-4" dir="rtl">
          <p className="text-white text-right leading-10 tracking-wide mb-4 font-saudi text-[32px]">
            {question}
          </p>
          <div className="space-y-3">
            {options?.map((option, idx) => (
              <div
                key={idx}
                className={`
                      w-full py-2 px-4 rounded-full border-2 flex items-center font-saudi text-[24px] justify-space-around
                      ${option.letter === correctAnswer
                    ? "border-borderGreen text-white"
                    : "text-white"
                  }
                      `}
                dir="rtl"
              >
                <span className="flex-1 text-center">{option.text}</span>
                {option.letter === correctAnswer && (
                  <div className="w-6 h-6 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className="w-6 h-6">
                      <path d="M11 0C3.29 0 0 3.29 0 11C0 18.71 3.29 22 11 22C18.71 22 22 18.71 22 11C22 3.29 18.71 0 11 0ZM16.305 8.539C14.993 10.592 13.125 13.165 10.304 14.858C9.98 15.053 9.573 15.048 9.254 14.845C7.734 13.882 6.593 12.85 5.66 11.597C5.33 11.154 5.422 10.528 5.865 10.198C6.307 9.868 6.934 9.961 7.263 10.403C7.937 11.308 8.751 12.082 9.799 12.808C11.959 11.348 13.443 9.301 14.618 7.462C14.917 6.996 15.535 6.86 15.999 7.158C16.465 7.456 16.602 8.074 16.305 8.539Z" fill="#008A4A" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-transparent text-right" dir="rtl">
          <div className="flex items-center gap-2 mb-2">
            <img src={User} alt="Logo" className="w-5 h-5" />
            <span className="text-white font-saudi text-[15px]">تم الرد</span>
            <div className="flex gap-1 text-white text-[15px] font-saudi">
              <div>{playerAnswered}/{totalPlayers}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-center">
        <div className="space-y-3">
          <GreenButton text="التالي" handleClick={handleNextQuestion} />
        </div>
      </div>
    </div>
  )
}

export default HostGameControl
