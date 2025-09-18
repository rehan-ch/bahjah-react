import React from 'react'

const GreenButton = ({ text, handleClick, disabled = false, type = "button" }) => {
  return (
    <button
      type={type}
      className={`inline-flex h-[56px] px-[48px] py-[18px] justify-center items-center text-white text-primary-button rounded-full transition-colors 
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-button hover:bg-green-700"}`}
      dir="rtl"
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default GreenButton