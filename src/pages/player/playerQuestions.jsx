import React from 'react'

const playerQuestions = () => {
  return (
    <div className="min-h-screen bg-custom text-white p-4">
    <div className="max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-teal-300">Question 1/10</span>
        <div className="bg-red-500 px-3 py-1 rounded">00:15</div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6 text-center">
          What is the capital of Pakistan?
        </h2>
        
        <div className="space-y-3">
          {[
            { id: 'A', text: 'Karachi', color: 'bg-red-500' },
            { id: 'B', text: 'Islamabad', color: 'bg-blue-500' },
            { id: 'C', text: 'Lahore', color: 'bg-yellow-500' },
            { id: 'D', text: 'Faisalabad', color: 'bg-green-500' }
          ].map((option) => (
            <button 
              key={option.id}
              className={`w-full p-4 rounded ${option.color} text-white font-semibold text-lg hover:opacity-80 transition-opacity`}
            >
              {option.id}. {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}

export default playerQuestions