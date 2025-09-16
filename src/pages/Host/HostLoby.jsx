import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupLogo from "../../assests/groupLogo.svg";
import GroupLogo1 from "../../assests/groupLogo1.svg";
import GroupLogo2 from "../../assests/groupLogo2.svg";
import GroupLogo3 from "../../assests/groupLogo3.svg";
import GroupLogo4 from "../../assests/groupLogo4.svg";
import GroupLogo5 from "../../assests/groupLogo5.svg";
import GreenButton from "../../Components/GreenButton";

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
    <div className="flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-6 leading-relaxed font-saudi text-[32px]" dir="rtl">
            مرحباً بكم في بهجة
          </h1>
          <p
            className="text-base leading-relaxed px-4 text-center font-saudi text-[17px]"
            dir="rtl"
          >أهلاً بكم في بهجة! هل أنتم مستعدون للانضمام   <br />
            إلى المغامرة أو بدء لعبة جديدة؟
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <div className="flex justify-center">
            <GreenButton text="إبدأ لعبة جديدة" handleClick={handleStart} />
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
            <GreenButton text="انضم إلى اللعبة" handleClick={handleStratPlayerGame} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostLoby;
