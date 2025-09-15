import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SplashLogo from "../../assests/splashLogo.svg";
import FooterLogo from "../../assests/footerLogo.png";
import FooterLogo2 from "../../assests/splashLogo2.png";
import GroupLogo from "../../assests/groupLogo.svg";
import GroupLogo1 from "../../assests/groupLogo1.svg";
import GroupLogo2 from "../../assests/groupLogo2.svg";
import GroupLogo3 from "../../assests/groupLogo3.svg";
import GroupLogo4 from "../../assests/groupLogo4.svg";
import GroupLogo5 from "../../assests/groupLogo5.svg";
import apiService from "../../services/apiService";
import { ERROR_MESSAGES, UI_TEXT } from "../../utills/constants";

const PlayerJoinPage = ({setIsStarted}) => {
  const navigate = useNavigate();
  const { code } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (code) setGameCode(String(code).toUpperCase());
  }, [code]);

  const handleJoinGame = async (e) => {
    e?.preventDefault?.();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const codeValue = (gameCode || "").trim().toUpperCase();

    if (!trimmedName || !trimmedEmail || !codeValue) {
      setError(ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError(ERROR_MESSAGES.INVALID_EMAIL);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const joinData = {
        accessCode: codeValue,
        name: trimmedName,
        email: trimmedEmail,
      };

      const result = await apiService.joinGame(joinData);
      
      localStorage.setItem("player_id", result.player_id);
      localStorage.setItem("user_id", result.user_id);
      localStorage.setItem("game_id", result.game_id);
      localStorage.setItem("access_code", codeValue);
      setIsStarted(true);
      navigate("/player-waiting");
    } catch (err) {
      setError(ERROR_MESSAGES.GAME_JOIN_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom overflow-y-auto scrollbar-hide">
        <div className="w-[420px] overflow-hidden">
          <div className="min-h-full bg-custom text-white flex flex-col overflow-y-auto">
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
            <div className="mb-12 text-center">
              <div className="w-50 h-20 mx-auto rounded flex items-center justify-center">
                <img src={SplashLogo} alt="Saudi National Day 95" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-6 leading-relaxed" dir="rtl">مسابقة اليوم الوطني</h1>
            </div>

            <form className="w-full max-w-sm space-y-4" onSubmit={handleJoinGame}>
              {/* <div className="flex justify-center">
                <button type="button" className="bg-button text-white font-bold py-4 px-6 rounded-[25px] text-lg transition-colors min-w-[120px]" dir="rtl" disabled>
                  إبدأ لعبة جديدة
                </button>
              </div> */}

              <div className="flex items-center justify-center gap-2 py-2">
              <img src={GroupLogo} alt="decor" className="w-40 h-10" />
                <img src={GroupLogo1} alt="decor" className="w-40 h-10" />
                <img src={GroupLogo2} alt="decor" className="w-40 h-10" />
                <span className="text-lg mx-2 whitespace-nowrap">انضم إلى اللعبة</span>
                <img src={GroupLogo3} alt="decor" className="w-40 h-10" />
                <img src={GroupLogo4} alt="decor" className="w-40 h-10" />
                <img src={GroupLogo5} alt="decor" className="w-40 h-10" />
              </div>

              <div dir="rtl">
                {/* <label className="block mb-2 text-sm">رمز اللعبة</label> */}
                <input
                  type="text"
                  hidden={true}
                  value={gameCode}
                  onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                  placeholder="أدخل رمز اللعبة"
                  autoComplete="one-time-code"
                  className="w-full bg-transparent border-2 border-teal-400 text-white placeholder-white py-2 px-4 rounded-full text-right focus:outline-none focus:border-green-400"
                />
              </div>

              <div dir="rtl">
                <label className="block mb-2 text-sm">اسمك</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اسمك"
                  className="w-full bg-transparent border-[2px] border-green-400 text-white placeholder-white py-2 px-4 rounded-full text-right focus:outline-none focus:border-green-400"
                />
              </div>

              <div dir="rtl">
                <label className="block mb-2 text-sm">البريد الإلكتروني الخاص بك</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-transparent border-[2px] border-green-400 text-white placeholder-white py-2 px-4 rounded-full text-right focus:outline-none focus:border-green-400"
                />
              </div>

              {error && (
                <div className="bg-red-600 text-white p-3 rounded-full text-center" dir="rtl">
                  {error}
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`font-bold py-4 px-6 rounded-[25px] text-lg transition-colors min-w-[120px] ${
                    isLoading ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-button text-white"
                  }`}
                  dir="rtl"
                >
                  {isLoading ? UI_TEXT.JOINING : UI_TEXT.START_GAME}
                </button>
              </div>
            </form>
          </div>

          <div className="relative">
            <div className="h-20 relative flex justify-center items-center">
              <div className="flex">
                <img src={FooterLogo} alt="Decorative Pattern" className="w-[210px] h-[60px] object-contain" />
              </div>
            </div>

            <div className="bg-teal-900 text-center py-3">
              <p className="text-xs text-teal-300" dir="rtl">{UI_TEXT.COPYRIGHT}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerJoinPage;
