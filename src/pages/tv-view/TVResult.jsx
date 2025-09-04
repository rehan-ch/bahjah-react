import React from 'react'

const TVResult = () => {
  return (
    <div className="bg-teal-900 min-h-screen text-white p-8">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Question Results</h1>
        <p className="text-xl text-teal-300">The correct answer was: B. Islamabad</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-teal-800 p-6 rounded-lg">
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
        
        <div className="bg-teal-800 p-6 rounded-lg">
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
      
      <div className="text-center">
        <button className="bg-green-500 px-8 py-3 rounded-lg text-xl font-semibold">
          Next Question
        </button>
      </div>
    </div>
  </div>
  )
}

export default TVResult