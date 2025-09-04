
import React, { useState } from 'react';
import { ChevronLeft, Users, Play, Tv, Settings, Home } from 'lucide-react';

const HostQuestions = () => {
  return (
    <div className="bg-teal-800 min-h-screen text-white p-4">
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ChevronLeft className="w-6 h-6 mr-3" />
          <h1 className="text-lg font-semibold">Add Questions</h1>
        </div>
        <span className="text-sm text-teal-300">1/10</span>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Question</label>
          <textarea 
            className="w-full p-3 rounded bg-teal-700 text-white placeholder-teal-300 h-20"
            placeholder="Write your question here"
          />
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm">Answers</label>
          {['A', 'B', 'C', 'D'].map((option, idx) => (
            <div key={option} className="flex items-center space-x-3">
              <input 
                type="radio" 
                name="correct" 
                className="w-4 h-4"
              />
              <input 
                type="text" 
                className="flex-1 p-2 rounded bg-teal-700 text-white placeholder-teal-300"
                placeholder={`Answer ${option}`}
              />
            </div>
          ))}
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button className="flex-1 bg-teal-700 text-white p-3 rounded">
            Save
          </button>
          <button className="flex-1 bg-green-500 text-white p-3 rounded">
            Next Question
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HostQuestions