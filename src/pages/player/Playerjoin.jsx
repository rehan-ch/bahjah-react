import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import SplashLogo from "../../assests/splashLogo.png";
import FooterLogo from "../../assests/splashFooterLogo.png";
import FooterLogo2 from "../../assests/splashLogo2.png";
import { BASE_URL } from "../../utills/varriables";

const PlayerJoinPage = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Set game code from URL parameter
  useEffect(() => {
    if (code) {
      setGameCode(code);
    }
  }, [code]);

  // const handleStart = () => {
  //   navigate("/player-waiting");
  // };

  const handleJoinGame = async () => {
    // Validate required fields
    if (!name || !email || !gameCode) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Prepare payload for API
      const payload = {
        access_code: gameCode,
        name: name,
        email: email
      };

      console.log('Joining game with payload:', payload);

      // Send API request to join game
      const response = await fetch(`${BASE_URL}/api/v1/games/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Join Game API Response:', result);

      if (result.success) {
        // Navigate to player waiting page with player data and API response
        const playerData = {
          name,
          email,
          gameCode,
          apiResponse: result
        };
        navigate("/player-waiting", { state: playerData });
      } else {
        throw new Error(result.message || 'Failed to join game');
      }

    } catch (error) {
      console.error('Error joining game:', error);
      setError("حدث خطأ في الانضمام إلى اللعبة. يرجى التحقق من الرمز والمحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-[420px] h-[880px] border-2 border-black rounded-2xl overflow-hidden shadow-lg">
        <div className="min-h-full bg-gradient-to-b from-teal-900 to-teal-800 text-white flex flex-col">
          <div className="flex justify-between items-center px-6 py-2 text-white text-sm font-medium">
            <div className="flex items-center space-x-1" />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
            <div className="mb-12 text-center">
              <div className="w-72 h-24 mx-auto rounded flex items-center justify-center">
                <img
                  src={SplashLogo}
                  alt="Saudi National Day 95"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-6 leading-relaxed" dir="rtl">
                مرحباً بكم في بهجة
              </h1>
              <p
                className="text-base leading-relaxed px-4 text-center"
                dir="rtl"
              >
                أهلاً بكم في بهجة! هل أنتم مستعدون للانضمام
                <br />
                إلى المغامرة أم بدء لعبة جديدة؟
              </p>
            </div>

            <div className="w-full max-w-sm space-y-4">
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full text-lg transition-colors"
                dir="rtl"
                // onClick={handleStart}
              >
                إبدأ لعبة جديدة
              </button>

              <div className="flex items-center justify-center gap-2 py-2">
                <img src={FooterLogo2} alt="decor" className="w-90 h-5" />
                <span className="text-lg">أو</span>
                <img src={FooterLogo2} alt="decor" className="w-90 h-5" />
              </div>
              <div dir="rtl">
                <label className="block mb-2 text-sm">اسمك</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="اسمك"
                  className="w-full bg-transparent border-2 border-teal-400 text-white placeholder-teal-300 py-3 px-4 rounded-lg text-right focus:outline-none focus:border-green-400"
                />
              </div>

              {/* Email */}
              <div dir="rtl">
                <label className="block mb-2 text-sm">
                  البريد الإلكتروني الخاص بك
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="البريد الإلكتروني الخاص بك"
                  className="w-full bg-transparent border-2 border-teal-400 text-white placeholder-teal-300 py-3 px-4 rounded-lg text-right focus:outline-none focus:border-green-400"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-600 text-white p-3 rounded-lg text-center" dir="rtl">
                  {error}
                </div>
              )}

              <button
                onClick={handleJoinGame}
                disabled={isLoading}
                className={`w-full font-bold py-4 px-6 rounded-full text-lg transition-colors ${
                  isLoading
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                dir="rtl"
              >
                {isLoading ? "جاري الانضمام..." : "انضم إلى اللعبة"}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="h-20 relative flex justify-center items-center">
              <div className="flex">
                <img
                  src={FooterLogo}
                  alt="Decorative Pattern"
                  className="w-[210px] h-[60px] object-contain"
                />
                <img
                  src={FooterLogo}
                  alt="Decorative Pattern"
                  className="w-[210px] h-[60px] object-contain"
                />
                <img
                  src={FooterLogo}
                  alt="Decorative Pattern"
                  className="w-[210px] h-[60px] object-contain"
                />
                <img
                  src={FooterLogo}
                  alt="Decorative Pattern"
                  className="w-[210px] h-[60px] object-contain"
                />
                <img
                  src={FooterLogo}
                  alt="Decorative Pattern"
                  className="w-[210px] h-[60px] object-contain"
                />
                <img
                  src={FooterLogo}
                  alt="Decorative Pattern"
                  className="w-[210px] h-[60px] object-contain"
                />
                <img
                  src={FooterLogo}
                  alt="Decorative Pattern"
                  className="w-[210px] h-[60px] object-contain"
                />
                <img
                  src={FooterLogo}
                  alt="Decorative Pattern"
                  className="w-[210px] h-[60px] object-contain"
                />
              </div>
            </div>

            <div className="bg-teal-900 text-center py-3">
              <p className="text-xs text-teal-300" dir="rtl">
                جميع الحقوق محفوظة © 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerJoinPage;
