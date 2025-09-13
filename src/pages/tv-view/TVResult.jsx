import React from 'react'
import SplashLogo from '../../assests/splashLogo.svg'
import FooterLogo from '../../assests/footerLogo.png'

const TVResult = () => {
  return (
    <div className="bg-teal-900 min-h-screen text-white p-8">
    <div className="max-w-4xl mx-auto">
      {/* Header with Logo */}
      <div className="flex justify-between items-center mb-8">
        <div className="w-20 h-10 flex items-center justify-center">
          <img
            src={SplashLogo}
            alt="Saudi National Day 95"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold">Question Results</h1>
        <div className="w-20 h-10"></div>
      </div>
      
      <div className="text-center mb-8">
        <p className="text-xl text-teal-300">The correct answer was: B. Islamabad</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-teal-800 p-6 rounded-full">
          <h3 className="text-xl font-semibold mb-4">Fastest Answers</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>🥇 Ahmad Ali</span>
              <span>3.2s</span>
            </div>
            <div className="flex justify-between">
              <span>🥈 Fatima Khan</span>
              <span>4.1s</span>
            </div>
            <div className="flex justify-between">
              <span>🥉 Hassan Ahmed</span>
              <span>5.8s</span>
            </div>
          </div>
        </div>
        
        <div className="bg-teal-800 p-6 rounded-full">
          <h3 className="text-xl font-semibold mb-4">Current Leaderboard</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>1. Ahmad Ali</span>
              <span className="text-yellow-400">1250 pts</span>
            </div>
            <div className="flex justify-between">
              <span>2. Fatima Khan</span>
              <span>980 pts</span>
            </div>
            <div className="flex justify-between">
              <span>3. Hassan Ahmed</span>
              <span>850 pts</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with Logo */}
      <div className="text-center mb-8">
        <div className="w-72 h-24 mx-auto rounded flex items-center justify-center">
          <img
            src={FooterLogo}
            alt="Saudi National Day 95"
            className="w-[150px] h-full object-contain"
          />
        </div>
      </div>
      
      <div className="text-center">
        <button className="bg-green-500 px-8 py-3 rounded-full text-xl font-semibold">
          Next Question
        </button>
      </div>
    </div>
  </div>
  )
}

export default TVResult