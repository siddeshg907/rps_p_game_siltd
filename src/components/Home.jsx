import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const currentUser = localStorage.getItem('currentUser');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const goToRPSGame = () => {
    navigate('/rps-game');
  };

  const goToPomodoroApp = () => {
    navigate('/pomodoro');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-4">Welcome, {currentUser}!</h2>
      <p className="text-lg mb-6">Select an option below:</p>
      <div className="space-x-4">
        <button
          onClick={goToRPSGame}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Rock, Paper, Scissors Game
        </button>
        <button
          onClick={goToPomodoroApp}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Pomodoro App
        </button>
      </div>
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
