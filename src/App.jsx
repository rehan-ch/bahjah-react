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
import { connectToGameChannel, subscribeToGameEvent, unsubscribeFromGameEvent, getConnectionInfo, testWebSocketConnection } from './utills/helperFunctions';


const App = () => {

  const accessCode = localStorage.getItem('access_code')
  const userId = localStorage.getItem('user_id')
  const [data, setData] = useState(null)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    if (!accessCode || !userId) return;

    const initializeWebSocket = async () => {
      const handleGameUpdate = (eventData) => {
        setData(eventData);
      };

      try {
        await testWebSocketConnection();
        connectToGameChannel(accessCode, userId);

        subscribeToGameEvent('game_state', handleGameUpdate);

        setTimeout(() => {
          const connectionInfo = getConnectionInfo();
          if (connectionInfo.status !== 'connected') {
            connectToGameChannel(accessCode, null);
          }
        }, 2000);

      } catch (error) {
        connectToGameChannel(accessCode, null);
        subscribeToGameEvent('game_state', handleGameUpdate);
      }
    };

    initializeWebSocket();

    return () => {
      unsubscribeFromGameEvent('game_state', () => {});
    };
  }, [accessCode, userId,isStarted]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-custom text-white">
        <main>
          <Routes>
            <Route path="/" element={<HostLoby />} />
            <Route path="/create-quiz" element={<HostCreateQuiz setIsStarted={setIsStarted}/>} />
            <Route path="/host-waiting/:id" element={<HostWaitingpage leaderboard={data?.leaderboard}/>} />
            <Route path="/host-questions" element={<HostGameControl data={data}/>} />
            <Route path="/question-result" element={<QuestionsResult data={data}/>} />
            <Route path="/player-join/:code" element={<PlayerJoinPage setIsStarted={setIsStarted}/>} />
            <Route path="/player-waiting" element={<PlayerWaiting leaderboard={data?.leaderboard} status={data?.game?.status} />} />
            <Route path="/player-questions" element={<PlayerQuestions data={data}/>} />
            <Route path="/player-result" element={<PlayerResult data={data} />} />
            <Route path="/final-result" element={<FinalResult data={data}/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
