import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./Components/AppLayout";
import FinalResult from "./pages/Host/FinalResult";
import HostCreateQuiz from "./pages/Host/HostCreateQuiz";
import HostGameControl from "./pages/Host/HostGameControl";
import HostLoby from "./pages/Host/HostLoby";
import HostWaitingpage from "./pages/Host/HostWaitingpage";
import QuestionsResult from "./pages/Host/QuestionsResult";
import PlayerJoinPage from "./pages/player/Playerjoin";
import PlayerResult from "./pages/player/PlayerResult";
import PlayerQuestions from "./pages/player/playerQuestions";
import PlayerWaiting from "./pages/player/playerWaiting";
import {
  connectToGameChannel,
  getConnectionInfo,
  subscribeToGameEvent,
  testWebSocketConnection,
  unsubscribeFromGameEvent,
} from "./utills/helperFunctions";

const App = () => {
  const accessCode = localStorage.getItem("access_code");
  const userId = localStorage.getItem("user_id");
  const [data, setData] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!accessCode || !userId || !isStarted) return;

    const initializeWebSocket = async () => {
      const handleGameUpdate = (eventData) => {
        setData(eventData);
      };

      try {
        await testWebSocketConnection();
        connectToGameChannel(accessCode, userId);

        subscribeToGameEvent("game_state", handleGameUpdate);

        setTimeout(() => {
          const connectionInfo = getConnectionInfo();
          if (connectionInfo.status !== "connected") {
            connectToGameChannel(accessCode, null);
          }
        }, 2000);
      } catch {
        connectToGameChannel(accessCode, null);
        subscribeToGameEvent("game_state", handleGameUpdate);
      }
    };

    initializeWebSocket();

    return () => {
      unsubscribeFromGameEvent("game_state", () => { });
    };
  }, [accessCode, userId, isStarted]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AppLayout spreadItems={true} />
          }
        >
          <Route path="/" element={<HostLoby />} />
          <Route
            path="/player-join/:code"
            element={<PlayerJoinPage setIsStarted={setIsStarted} />}
          />
          <Route
            path="/host-questions"
            element={<HostGameControl data={data} />}
          />
          <Route
            path="/question-result"
            element={<QuestionsResult data={data} />}
          />
          <Route path="/final-result" element={<FinalResult data={data} />} />
          <Route
            path="/player-questions"
            element={<PlayerQuestions data={data} />}
          />
          <Route path="/player-result" element={<PlayerResult data={data} />} />
        </Route>

        <Route
          element={
            <AppLayout spreadItems={false} />
          }
        >
          <Route
            path="/host-waiting/:id"
            element={
              <HostWaitingpage
                leaderboard={data?.leaderboard}
              />
            }
          />
          <Route
            path="/player-waiting"
            element={
              <PlayerWaiting
                leaderboard={data?.leaderboard}
                status={data?.game?.status}
              />
            }
          />
          <Route
            path="/create-quiz"
            element={<HostCreateQuiz setIsStarted={setIsStarted} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
