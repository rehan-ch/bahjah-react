import React from 'react'
import SplashLogo from '../../assests/splashLogo.svg'
import FooterLogo from '../../assests/footerLogo.png'

const TVQuestions = () => {
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
        <h1 className="text-2xl font-bold">Quiz Game</h1>
        <div className="flex items-center space-x-4">
          <span className="text-teal-300">Question 1/10</span>
          <div className="bg-red-500 px-4 py-2 rounded-full text-xl font-mono">
            00:15
          </div>
        </div>
      </div>
      
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-8">
          What is the capital of Pakistan?
        </h2>
        
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { id: 'A', text: 'Karachi', color: 'bg-red-500' },
            { id: 'B', text: 'Islamabad', color: 'bg-blue-500' },
            { id: 'C', text: 'Lahore', color: 'bg-yellow-500' },
            { id: 'D', text: 'Faisalabad', color: 'bg-green-500' }
          ].map((option) => (
            <div 
              key={option.id}
              className={`${option.color} p-6 rounded-full text-2xl font-semibold`}
            >
              {option.id}. {option.text}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center text-teal-300 mb-8">
        Players are answering...
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
    </div>
  </div>
  )
}

export default TVQuestions