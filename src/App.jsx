import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HostCreateQuiz from './pages/Host/HostCreateQuiz';
import HostLoby from './pages/Host/HostLoby';
import HostQuestions from './pages/Host/HostQuestions';
import HostWaitingpage from './pages/Host/HostWaitingpage';
import PlayerJoinPage from './pages/player/Playerjoin';
import PlayerWaiting from './pages/player/playerWaiting';


const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-teal-800 text-white">
        <main>
          <Routes>
            <Route path="/" element={<HostLoby />} />
            <Route path="/create-quiz" element={<HostCreateQuiz />} />
            <Route path="/host-waiting/:id" element={<HostWaitingpage />} />
            <Route path="/host-questions" element={<HostQuestions />} />
            <Route path="/player-join" element={<PlayerJoinPage />} />
            <Route path="/player-join/:code" element={<PlayerJoinPage />} />
            <Route path="/player-waiting" element={<PlayerWaiting />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
