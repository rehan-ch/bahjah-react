import React from 'react'

const HostGameControl = () => {
  return (
  <div className="bg-teal-800 min-h-screen text-white p-4">
    <div className="max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">Game Control</h1>
        <span className="text-sm text-teal-300">Question 1/10</span>
      </div>
      
      <div className="bg-teal-700 rounded-lg p-4 mb-6">
        <h2 className="font-semibold mb-2">Current Question</h2>
        <p className="text-sm text-teal-300">What is the capital of Pakistan?</p>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Player Responses</h3>
        <div className="space-y-2">
          <div className="flex justify-between bg-teal-700 p-2 rounded">
            <span>Ahmad Ali</span>
            <span className="text-green-400">B</span>
          </div>
          <div className="flex justify-between bg-teal-700 p-2 rounded">
            <span>Fatima Khan</span>
            <span className="text-red-400">A</span>
          </div>
          <div className="flex justify-between bg-teal-700 p-2 rounded">
            <span>Hassan Ahmed</span>
            <span className="text-yellow-400">Waiting...</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <button className="w-full bg-green-500 text-white p-3 rounded font-semibold">
          Show Results
        </button>
        <button className="w-full bg-blue-500 text-white p-3 rounded">
          Next Question
        </button>
      </div>
    </div>
  </div>
  )
}

export default HostGameControl