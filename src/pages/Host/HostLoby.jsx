import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SplashLogo from "../../assests/splashLogo.svg";
import FooterLogo from "../../assests/footerLogo.png";
import GroupLogo from "../../assests/groupLogo.svg";
import GroupLogo1 from "../../assests/groupLogo1.svg";
import GroupLogo2 from "../../assests/groupLogo2.svg";
import GroupLogo3 from "../../assests/groupLogo3.svg";
import GroupLogo4 from "../../assests/groupLogo4.svg";
import GroupLogo5 from "../../assests/groupLogo5.svg";

const HostLoby = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const handleStart = () => {
    navigate("/create-quiz");
    localStorage.setItem("hasReloaded", "available");
  };
  const handleStratPlayerGame = () => {
    if (code.trim()) {
      navigate(`/player-join/${code}`);
    localStorage.setItem("hasReloaded", "available");
    }
  };

useEffect(() => {
  const hasReloaded = localStorage.getItem("hasReloaded");
  if (hasReloaded === "available") {
    localStorage.clear();
    localStorage.setItem("hasReloaded", "done");
    window.location.reload();
  }
}, []);


  return (
    <div className="flex justify-center items-center min-h-screen bg-custom">
      <div className="w-full overflow-x-hidden h-dvh overflow-y-scroll">
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
                  className="w-[150px] h-full object-contain"
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
              >أهلاً بكم في بهجة! هل أنتم مستعدون للانضمام   <br />
               إلى المغامرة أو بدء لعبة جديدة؟ 
              </p>
            </div>

            <div className="w-full max-w-sm space-y-4">
              <div className="flex justify-center">
                <button
                  className="bg-button text-white py-2 px-7 rounded-[25px] text-lg transition-colors min-w-[120px]"
                  dir="rtl"
                  onClick={handleStart}
                >
                  إبدأ لعبة جديدة
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 py-2">
                <img src={GroupLogo} alt="decor" className="w-40 h-10" />
                <img src={GroupLogo1} alt="decor" className="w-40 h-10" />
                <img src={GroupLogo2} alt="decor" className="w-40 h-10" />
                <span className="text-lg">أو</span>
                <img src={GroupLogo3} alt="decor" className="w-40 h-10" />
                <img src={GroupLogo4} alt="decor" className="w-40 h-10" />
                <img src={GroupLogo5} alt="decor" className="w-40 h-10" />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  onChange={e => setCode(e.target.value)}
                  placeholder="أدخل الرمز"
                  className="w-full bg-transparent border-[2px] border-green-700 text-white placeholder-white py-2 px-4 rounded-full text-right text-lg focus:outline-none"
                  dir="rtl"
                />
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-button text-white py-2 px-6 rounded-[25px] text-lg transition-colors min-w-[120px]"
                  dir="rtl"
                  onClick={handleStratPlayerGame}
                >
                  انضم إلى اللعبة
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
  );
};

export default HostLoby;
