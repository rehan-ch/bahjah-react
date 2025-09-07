import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import SplashLogo from "../../assests/splashLogo.png";
import FooterLogo from "../../assests/splashFooterLogo.png";
import FooterLogo2 from "../../assests/splashLogo2.png";


const HostLoby = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const handleStart = () => {
    navigate("/create-quiz");
  };
  const handleStratPlayerGame = () => {
    if (code.trim()) {
      navigate(`/player-join/${code}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom">
      <div className="w-[420px] h-[880px] overflow-hidden">
        <div className="min-h-full bg-custom text-white flex flex-col">
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
                onClick={handleStart}
              >
                إبدأ لعبة جديدة
              </button>

              <div className="flex items-center justify-center gap-2 py-2">
                <img src={FooterLogo2} alt="decor" className="w-90 h-5" />
                <span className="text-lg">أو</span>
                <img src={FooterLogo2} alt="decor" className="w-90 h-5" />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="أدخل الرمز"
                  className="w-full bg-transparent border-2 border-teal-400 text-white placeholder-teal-300 py-3 px-4 rounded-lg text-center text-lg focus:outline-none focus:border-green-400"
                  dir="rtl"
                />
              </div>

              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full text-lg transition-colors"
                dir="rtl" onClick={handleStratPlayerGame}
              >
                انضم إلى اللعبة
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

export default HostLoby;
