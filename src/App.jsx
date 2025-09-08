import React from 'react';
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


const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-custom text-white">
        <main>
          <Routes>
            <Route path="/" element={<HostLoby />} />
            <Route path="/create-quiz" element={<HostCreateQuiz />} />
            <Route path="/host-waiting/:id" element={<HostWaitingpage />} />
            <Route path="/host-questions" element={<HostGameControl />} />
            <Route path="/question-result" element={<QuestionsResult />} />
            <Route path="/player-join/:code" element={<PlayerJoinPage />} />
            <Route path="/player-join" element={<PlayerJoinPage />} />
            <Route path="/player-waiting" element={<PlayerWaiting />} />
            <Route path="/player-questions" element={<PlayerQuestions />} />
            <Route path="/player-result" element={<PlayerResult />} />
            <Route path="/final-result" element={<FinalResult />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
