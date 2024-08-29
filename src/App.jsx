import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Pomodoro from './Pages/Pomodoro';
import RPSGame from './Pages/RPSGame';
import Home from './Pages/Home';

function PrivateRoute({ children }) {
  return localStorage.getItem('isAuthenticated') ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path="/rps-game" element={
        <PrivateRoute>
          <RPSGame />
        </PrivateRoute>
      } />
      <Route path="/pomodoro" element={
        <PrivateRoute>
          <Pomodoro />
        </PrivateRoute>
      } />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
