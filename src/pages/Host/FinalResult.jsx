import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import confetti from '../../assests/confetti.json';
import GreenButton from '../../Components/GreenButton';
import { disconnectFromGameChannel } from '../../utills/helperFunctions';

const FinalResult = ({ data }) => {
  const navigate = useNavigate();

  // Extract data from the provided structure
  const game = data?.game || {}
  const leaderboard = data?.leaderboard || []

  const handleClick = () => {
    localStorage.clear();
    disconnectFromGameChannel()
    navigate('/');
  }

  return (
    <>
      <Lottie
        animationData={confetti}
        className={`fixed inset-0 z-50 pointer-events-none`}
      />

      <div className="flex flex-col overflow-y-auto">
        <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
          <div className="text-right" dir="rtl">
            <p className="text-lg mb-2 font-saudi text-[16px]">
              مسابقة اليوم الوطني
            </p>
          </div>

          <div dir="rtl">
            <h2 className="text-right mb-4 font-saudi text-[32px]">نتائج</h2>

            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <div key={player.player_id} className="flex justify-between items-center py-3 border-b border-green-400">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center ml-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none" className="text-leafGreen">
                        <g clipPath="url(#clip0_44_7539)">
                          <path d="M4.57143 5.42836C4.57143 4.97812 4.66011 4.53228 4.83241 4.1163C5.00472 3.70033 5.25726 3.32237 5.57563 3.004C5.89401 2.68562 6.27197 2.43308 6.68794 2.26078C7.10392 2.08847 7.54975 1.99979 8 1.99979C8.45025 1.99979 8.89608 2.08847 9.31206 2.26078C9.72803 2.43308 10.106 2.68562 10.4244 3.004C10.7427 3.32237 10.9953 3.70033 11.1676 4.1163C11.3399 4.53228 11.4286 4.97812 11.4286 5.42836C11.4286 5.87861 11.3399 6.32445 11.1676 6.74042C10.9953 7.15639 10.7427 7.53436 10.4244 7.85273C10.106 8.1711 9.72803 8.42365 9.31206 8.59595C8.89608 8.76825 8.45025 8.85693 8 8.85693C7.54975 8.85693 7.10392 8.76825 6.68794 8.59595C6.27197 8.42365 5.89401 8.1711 5.57563 7.85273C5.25726 7.53436 5.00472 7.15639 4.83241 6.74042C4.66011 6.32445 4.57143 5.87861 4.57143 5.42836ZM12.5714 5.42836C12.5714 4.21594 12.0898 3.05318 11.2325 2.19587C10.3752 1.33856 9.21242 0.856934 8 0.856934C6.78758 0.856934 5.62482 1.33856 4.76751 2.19587C3.9102 3.05318 3.42857 4.21594 3.42857 5.42836C3.42857 6.64078 3.9102 7.80354 4.76751 8.66085C5.62482 9.51816 6.78758 9.99979 8 9.99979C9.21242 9.99979 10.3752 9.51816 11.2325 8.66085C12.0898 7.80354 12.5714 6.64078 12.5714 5.42836ZM1.14286 17.9998C1.14286 15.1605 3.44643 12.8569 6.28571 12.8569H9.71429C12.5536 12.8569 14.8571 15.1605 14.8571 17.9998V18.5712C14.8571 18.8855 15.1143 19.1426 15.4286 19.1426C15.7429 19.1426 16 18.8855 16 18.5712V17.9998C16 14.5284 13.1857 11.7141 9.71429 11.7141H6.28571C2.81429 11.7141 0 14.5284 0 17.9998V18.5712C0 18.8855 0.257143 19.1426 0.571429 19.1426C0.885714 19.1426 1.14286 18.8855 1.14286 18.5712V17.9998Z" fill="currentColor" />
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7539">
                            <rect width="16" height="18.2857" fill="white" transform="translate(0 0.856934)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <span className="text-white font-saudi text-[24px]">{player.name}</span>
                  </div>
                  <span className="text-white font-saudi text-[24px]" dir='ltr'>{player.score} PT </span>
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

        <div className="p-6 flex justify-center">
          <GreenButton text="ابدأ لعبة جديدة" handleClick={handleClick} />
        </div>
      </div>
    </>
  )
}

export default FinalResult