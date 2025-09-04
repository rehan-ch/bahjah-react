import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HostWaitingpage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get quiz data and API response from previous page
  const data = location.state || {
    category: ["علوم"],
    question_count: 10,
    host_name: "المضيف",
    host_email: "host@example.com",
    apiResponse: null,
    id: null,
    access_code: null,
    createdAt: null
  };

  // Use API response data if available, otherwise use fallback
  const quizCode = data?.access_code  || "0000";
  const gameId = data?.id
  const joinUrl = `https://Bahjah.com/${quizCode}`;
  const previewUrl = `https://Bahjah.com/${quizCode}/Live`;

  // Mock participants data
  const [participants, setParticipants] = useState([
    { id: 1, name: "زينب" },
    { id: 2, name: "عمر" },
    { id: 3, name: "احمد" },
    { id: 4, name: "ليلى" }
  ]);

  // Simulate new participants joining
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (participants.length < 8) { // Limit to 8 participants
//         const newParticipant = {
//           id: participants.length + 1,
//           name: `مشارك ${participants.length + 1}`
//         };
//         setParticipants(prev => [...prev, newParticipant]);
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [participants.length]);

  const handleStartQuiz = () => {
    // navigate("/host-questions", { state: { data?, participants, quizCode } });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-[420px] h-[880px] border-2 border-black rounded-2xl overflow-hidden shadow-lg">
        
        <div className="min-h-full bg-gradient-to-b from-teal-900 to-teal-800 text-white flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 text-sm">
            <button
              onClick={() => navigate(-1)}
              className="text-green-400 font-medium"
              dir="rtl"
            >
              خلف
            </button>
            <span className="font-bold">بهجة</span>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
            
            {/* Title */}
            <div className="text-center space-y-2" dir="rtl">
              <h2 className="text-lg font-bold">مسابقة اليوم الوطني</h2>
            </div>

            {/* Quiz Code */}
            <div dir="rtl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">شفرة</span>
                <button
                  onClick={() => copyToClipboard(quizCode)}
                  className="text-green-400 text-xs hover:text-green-300"
                >
                  نسخ
                </button>
              </div>
              <div className="bg-transparent border-2 border-green-400 text-white py-3 px-4 rounded-lg text-center font-mono text-lg">
                {quizCode}
              </div>
            </div>

            {/* Join URL */}
            <div dir="rtl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">الانضمام إلى URL</span>
                <button
                  onClick={() => copyToClipboard(joinUrl)}
                  className="text-green-400 text-xs hover:text-green-300"
                >
                  نسخ
                </button>
              </div>
              <div className="bg-transparent border-2 border-green-400 text-white py-3 px-4 rounded-lg text-center text-sm break-all">
                {joinUrl}
              </div>
            </div>

            {/* Preview Link */}
            <div dir="rtl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">رابط المعاينة - نموذج التلفزيون</span>
                <button
                  onClick={() => copyToClipboard(previewUrl)}
                  className="text-green-400 text-xs hover:text-green-300"
                >
                  نسخ
                </button>
              </div>
              <div className="bg-transparent border-2 border-green-400 text-white py-3 px-4 rounded-lg text-center text-sm break-all">
                {previewUrl}
              </div>
            </div>

            {/* Participants Section */}
            <div dir="rtl">
              <h3 className="text-lg font-bold mb-4">مشاركون</h3>
              <div className="space-y-3">
                {participants.map((participant, index) => (
                  <div key={participant.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3" dir="rtl">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">👤</span>
                      </div>
                      <span className="text-white">{participant.name}</span>
                    </div>
                    <div className="text-green-400 text-sm">
                      {index === 0 ? "المضيف" : "مشارك"}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Waiting for more participants */}
              {participants.length < 4 && (
                <div className="text-center py-4 text-green-300 text-sm">
                  في انتظار المزيد من المشاركين...
                </div>
              )}
            </div>
          </div>

          {/* Start Button */}
          <div className="p-6">
            <button
              onClick={handleStartQuiz}
              disabled={participants.length < 2}
              className={`w-full py-4 px-6 rounded-full text-lg font-bold transition-colors ${
                participants.length >= 2
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              dir="rtl"
            >
              يبدأ
            </button>
            {participants.length < 2 && (
              <p className="text-center text-green-300 text-sm mt-2" dir="rtl">
                تحتاج إلى مشارك واحد على الأقل لبدء المسابقة
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostWaitingpage;
