import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import Home from './pages/Home/Home';
import Game from './pages/Game/Game';

function App() {
  return (
    <BrowserRouter basename="/football-manager">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
