import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HostCreateQuiz from './pages/Host/HostCreateQuiz';
import HostLoby from './pages/Host/HostLoby';
import QuestionsResult from './pages/Host/QuestionsResult';
import HostWaitingpage from './pages/Host/HostWaitingpage';
import PlayerJoinPage from './pages/player/Playerjoin';
import PlayerWaiting from './pages/player/playerWaiting';
import HostGameControl from './pages/Host/HostGameControl';
import FinalResult from './pages/Host/FinalResult';
import PlayerQuestions from './pages/player/playerQuestions';
import PlayerResult from './pages/player/PlayerResult';
import { connectToGameChannel, subscribeToGameEvent, unsubscribeFromGameEvent } from './utills/helperFunctions';


const App = () => {

  const accessCode = localStorage.getItem('access_code')
  const [data, setData] = useState(null)
  const [isStarted, setIsStarted] = useState(false)

console.log(accessCode)
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);
  useEffect(() => {
    if (!accessCode && !isStarted) return;

    // Connect to Action Cable
    connectToGameChannel(accessCode);

    // Subscribe to game events
    const handleGameUpdate = (eventData) => {
      console.log(eventData,'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
      setData(eventData);
    };

    subscribeToGameEvent('game_state', handleGameUpdate);

    return () => {
      debugger
      unsubscribeFromGameEvent('game_state', handleGameUpdate);
    };
  }, [accessCode, isStarted]);


  return (
    <BrowserRouter>
      <div className="min-h-screen bg-custom text-white">
        <main>
          <Routes>
            <Route path="/" element={<HostLoby />} />
            <Route path="/create-quiz" element={<HostCreateQuiz />} />
            <Route path="/host-waiting/:id" element={<HostWaitingpage setIsStarted={setIsStarted}/>} />
            <Route path="/host-questions" element={<HostGameControl data={data}/>} />
            <Route path="/question-result" element={<QuestionsResult data={data}/>} />
            <Route path="/player-join/:code" element={<PlayerJoinPage />} />
            <Route path="/player-join" element={<PlayerJoinPage />} />
            <Route path="/player-waiting" element={<PlayerWaiting setIsStarted={setIsStarted}/>} />
            <Route path="/player-questions" element={<PlayerQuestions data={data}/>} />
            <Route path="/player-result" element={<PlayerResult data={data}/>} />
            <Route path="/final-result" element={<FinalResult />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
