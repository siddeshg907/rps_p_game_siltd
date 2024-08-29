import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Pomodoro from './Pages/Pomodoro';
import RPSGame from './Pages/RPSGame';
import Home from './Pages/Home';

function App() {
  // Attempt to parse `isAuthenticated`, defaulting to false if parsing fails
  const isAuth = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      {isAuth ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/rps-game" element={<RPSGame />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          {/* Redirect from root to home */}
          <Route path="/" element={<Navigate to="/home" />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
