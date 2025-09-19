import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PlayerResult = ({ data }) => {
  const navigate = useNavigate();
  const [previousQuestionIndex, setPreviousQuestionIndex] = useState(null);
  const game = data?.game || {};
  const currentQuestionData = data?.current_question || {};
  const leaderboard = data?.leaderboard || [];
  const access_code = localStorage.getItem("access_code");

  const currentQuestion = game?.current_question_index + 1 || 1;
  const totalQuestions = game?.total_questions || 10;
  const question =
    currentQuestionData?.question ||
    "المملكة العربية السعودية هي الدولة العربية الوحيدة ضمن أي مؤسسة عالمية؟";
  const correctAnswer = currentQuestionData?.correct || "a";
  const options = currentQuestionData?.options || {
    a: "مجموعة العشرين - G20",
    b: "الأمم المتحدة",
    c: "منظمة الصحة العالمية",
    d: "رابطة العالم الإسلامي",
  };

  // Get the correct answer text
  const correctAnswerText = options[correctAnswer] || "مجموعة العشرين - G20";

  useEffect(() => {
    const currentQuestionIndex = game?.current_question_index + 1;
    if (game?.finished_at) {
      navigate("/final-result");
      return;
    }
    if (previousQuestionIndex === null) {
      setPreviousQuestionIndex(currentQuestionIndex);
      return;
    }
    if (currentQuestionIndex !== previousQuestionIndex) {
      navigate("/player-questions");
    }
  }, [game, previousQuestionIndex, navigate]);

  return (
    <div className="flex flex-col overflow-y-auto">
      {/* Content */}
      <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
        {/* Question Progress */}
        <div className="w-full flex justify-between">
          <span>{access_code}: رمز اللعبة</span>
          <h2 className="text-center mr-3">
            السؤال {currentQuestion}/{totalQuestions}
          </h2>
        </div>

        {/* Question */}
        <h1 className="text-heading leading-relaxed">{question}</h1>

        {/* Correct Answer */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm border-borderGreen border-2 rounded-full p-4 flex items-center justify-between">
            <div className="w-6 h-6 flex items-left justify-center justify-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                className="w-6 h-6"
              >
                <title>Correct answer icon</title>
                <path
                  d="M11 0C3.29 0 0 3.29 0 11C0 18.71 3.29 22 11 22C18.71 22 22 18.71 22 11C22 3.29 18.71 0 11 0ZM16.305 8.539C14.993 10.592 13.125 13.165 10.304 14.858C9.98 15.053 9.573 15.048 9.254 14.845C7.734 13.882 6.593 12.85 5.66 11.597C5.33 11.154 5.422 10.528 5.865 10.198C6.307 9.868 6.934 9.961 7.263 10.403C7.937 11.308 8.751 12.082 9.799 12.808C11.959 11.348 13.443 9.301 14.618 7.462C14.917 6.996 15.535 6.86 15.999 7.158C16.465 7.456 16.602 8.074 16.305 8.539Z"
                  fill="#008A4A"
                />
              </svg>
            </div>
            <span className="text-white font-bold text-lg">
              {correctAnswerText}
            </span>
          </div>
        </div>

        {/* Results Section */}
        <div dir="rtl">
          <h2 className="text-heading">نتائج</h2>

          <div className="space-y-3">
            {leaderboard.map((player, index) => (
              <div
                key={player.player_id}
                className="flex justify-between items-center py-3 border-b border-green-400"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center ml-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      className="text-leafGreen"
                    >
                      <title>Icon of a player</title>
                      <g clipPath="url(#clip0_44_7539)">
                        <path
                          d="M4.57143 5.42836C4.57143 4.97812 4.66011 4.53228 4.83241 4.1163C5.00472 3.70033 5.25726 3.32237 5.57563 3.004C5.89401 2.68562 6.27197 2.43308 6.68794 2.26078C7.10392 2.08847 7.54975 1.99979 8 1.99979C8.45025 1.99979 8.89608 2.08847 9.31206 2.26078C9.72803 2.43308 10.106 2.68562 10.4244 3.004C10.7427 3.32237 10.9953 3.70033 11.1676 4.1163C11.3399 4.53228 11.4286 4.97812 11.4286 5.42836C11.4286 5.87861 11.3399 6.32445 11.1676 6.74042C10.9953 7.15639 10.7427 7.53436 10.4244 7.85273C10.106 8.1711 9.72803 8.42365 9.31206 8.59595C8.89608 8.76825 8.45025 8.85693 8 8.85693C7.54975 8.85693 7.10392 8.76825 6.68794 8.59595C6.27197 8.42365 5.89401 8.1711 5.57563 7.85273C5.25726 7.53436 5.00472 7.15639 4.83241 6.74042C4.66011 6.32445 4.57143 5.87861 4.57143 5.42836ZM12.5714 5.42836C12.5714 4.21594 12.0898 3.05318 11.2325 2.19587C10.3752 1.33856 9.21242 0.856934 8 0.856934C6.78758 0.856934 5.62482 1.33856 4.76751 2.19587C3.9102 3.05318 3.42857 4.21594 3.42857 5.42836C3.42857 6.64078 3.9102 7.80354 4.76751 8.66085C5.62482 9.51816 6.78758 9.99979 8 9.99979C9.21242 9.99979 10.3752 9.51816 11.2325 8.66085C12.0898 7.80354 12.5714 6.64078 12.5714 5.42836ZM1.14286 17.9998C1.14286 15.1605 3.44643 12.8569 6.28571 12.8569H9.71429C12.5536 12.8569 14.8571 15.1605 14.8571 17.9998V18.5712C14.8571 18.8855 15.1143 19.1426 15.4286 19.1426C15.7429 19.1426 16 18.8855 16 18.5712V17.9998C16 14.5284 13.1857 11.7141 9.71429 11.7141H6.28571C2.81429 11.7141 0 14.5284 0 17.9998V18.5712C0 18.8855 0.257143 19.1426 0.571429 19.1426C0.885714 19.1426 1.14286 18.8855 1.14286 18.5712V17.9998Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        {/** biome-ignore lint/correctness/useUniqueElementIds: eh... */}
                        <clipPath id="clip0_44_7539">
                          <rect
                            width="16"
                            height="18.2857"
                            fill="white"
                            transform="translate(0 0.856934)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-white font-saudi text-[24px]">
                    {player.name}
                  </span>
                </div>
                <span className="text-white font-saudi text-[24px]" dir="ltr">
                  {player.score} PT{" "}
                </span>
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
  );
};

export default PlayerResult;
