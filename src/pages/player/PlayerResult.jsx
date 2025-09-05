import React from 'react'

const PlayerResult = () => {
  return (
     <div className="min-h-screen bg-custom text-white p-4">
    <div className="max-w-md mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl font-bold">✓</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Correct!</h1>
        <p className="text-teal-300">You answered in 8 seconds</p>
      </div>
      
      <div className="bg-teal-700 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Leaderboard</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>1. You</span>
            <span className="text-yellow-400">850 pts</span>
          </div>
          <div className="flex justify-between items-center">
            <span>2. Ahmad Ali</span>
            <span>720 pts</span>
          </div>
          <div className="flex justify-between items-center">
            <span>3. Fatima Khan</span>
            <span>650 pts</span>
          </div>
        </div>
      </div>
      
      <div className="text-teal-300">
        Waiting for next question...
      </div>
    </div>
  </div>
  )
}

export default PlayerResult