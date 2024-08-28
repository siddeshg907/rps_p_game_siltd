import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import RPSGame from './components/RPSGame'; // Create this component
import Pomodoro from './components/Pomodoro'; // Create this component

function App() {
  const PrivateRoute = ({ element }) => {
    return localStorage.getItem('isAuthenticated') ? (
      element
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/rps-game" element={<PrivateRoute element={<RPSGame />} />} />
        <Route path="/pomodoro" element={<PrivateRoute element={<Pomodoro />} />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
