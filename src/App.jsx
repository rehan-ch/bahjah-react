import React, { useEffect, useState } from 'react';
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
import AppLayout from './Components/AppLayout';


const App = () => {
  const accessCode = localStorage.getItem('access_code')
  const userId = localStorage.getItem('user_id')
  const [data, setData] = useState(null)
  const [isStarted, setIsStarted] = useState(false)
  const [gameInProgress, setGameInProgress] = useState(false);

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
      unsubscribeFromGameEvent('game_state', () => { });
    };
  }, [accessCode, userId, isStarted]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout spreadItems={true} gameInProgress={gameInProgress} />}>
          <Route path="/" element={<HostLoby />} />
          <Route path="/player-join/:code" element={<PlayerJoinPage setIsStarted={setIsStarted} />} />
          <Route path="/host-questions" element={<HostGameControl data={data} />} />
          <Route path="/question-result" element={<QuestionsResult data={data} />} />
          <Route path="/final-result" element={<FinalResult data={data} />} />
          <Route path="/player-questions" element={<PlayerQuestions data={data} />} />
        </Route>

        <Route element={<AppLayout spreadItems={false} gameInProgress={gameInProgress} />}>
          <Route path="/host-waiting/:id" element={<HostWaitingpage setGameInProgress={setGameInProgress} leaderboard={data?.leaderboard} />} />
          <Route path="/player-waiting" element={<PlayerWaiting setGameInProgress={setGameInProgress} leaderboard={data?.leaderboard} status={data?.game?.status} />} />
          <Route path="/create-quiz" element={<HostCreateQuiz setIsStarted={setIsStarted} />} />
          <Route path="/player-result" element={<PlayerResult data={data} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
