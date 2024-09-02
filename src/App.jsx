import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import Pomodoro from "./Pages/Pomodoro";
import RPSGame from "./Pages/RPSGame";
import Home from "./Pages/Home";

function App() {
  const PrivateRoute = ({ element }) => {
    return localStorage.getItem("isAuthenticated") ? (
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
        <Route
          path="/rps-game"
          element={<PrivateRoute element={<RPSGame />} />}
        />
        <Route
          path="/pomodoro"
          element={<PrivateRoute element={<Pomodoro />} />}
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
