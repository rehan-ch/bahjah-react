import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GroupLogo from "../../assests/groupLogo.svg";
import GroupLogo1 from "../../assests/groupLogo1.svg";
import GroupLogo2 from "../../assests/groupLogo2.svg";
import GroupLogo3 from "../../assests/groupLogo3.svg";
import GroupLogo4 from "../../assests/groupLogo4.svg";
import GroupLogo5 from "../../assests/groupLogo5.svg";
import apiService from "../../services/apiService";
import { ERROR_MESSAGES, UI_TEXT } from "../../utills/constants";

const PlayerJoinPage = ({ setIsStarted }) => {
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
    <div className="flex flex-col items-center justify-center px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-6 font-saudi text-[32px]" dir="rtl">مسابقة اليوم الوطني</h1>
      </div>

      <form className="w-full max-w-sm space-y-4" onSubmit={handleJoinGame}>
        <div className="flex items-center justify-center gap-0.5 py-2">
          <img src={GroupLogo} alt="decor" className="w-40 h-10" />
          <img src={GroupLogo1} alt="decor" className="w-40 h-10" />
          <img src={GroupLogo2} alt="decor" className="w-40 h-10" />
          <span className="text-lg mx-2 whitespace-nowrap font-saudi text-[19px]">انضم إلى اللعبة</span>
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
            className="w-full bg-transparent font-saudi text-[15px] border-2 border-teal-400 text-white placeholder-white py-2 px-4 rounded-full text-right focus:outline-none focus:border-green-400"
          />
        </div>

        <div dir="rtl">
          {/* <label className="block mb-2 text-sm">اسمك</label> */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسمك"
            className="w-full bg-transparent border-[3px] font-saudi text-[15px] border-borderGreen text-white placeholder-white py-2 px-4 rounded-full text-right focus:outline-none focus:border-[3px]"
          />
        </div>

        <div dir="rtl">
          {/* <label className="block mb-2 text-sm">البريد الإلكتروني الخاص بك</label> */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني الخاص بك"
            className="w-full bg-transparent border-[3px] border-borderGreen text-white placeholder-white py-2 px-4 rounded-full text-right focus:outline-none focus:border-[3px]"
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
            className={`inline-flex h-[56px] px-[48px] py-[18px] justify-center items-center text-white rounded-[24px] font-saudi text-[24px] transition-colors 
                    ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-button hover:bg-green-700"}`}
            dir="rtl"
          >
            {isLoading ? UI_TEXT.JOINING : UI_TEXT.START_GAME}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayerJoinPage;
