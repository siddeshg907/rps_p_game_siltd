import React from 'react';
import { useNavigate } from 'react-router-dom';
import rpsImage from '../assets/rps.jpeg'; 
import pomodoroImage from '../assets/pomodoro.jpeg'; 

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-3xl text-blue-500 font-bold mb-4 text-center">Welcome, {currentUser}!</h2>
        <p className="text-lg font-bold mb-6 text-center">Select an option below:</p>
        <div className="flex flex-col items-center space-y-4">
          <div
            onClick={goToRPSGame}
            className="cursor-pointer w-full max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img src={rpsImage} alt="Rock Paper Scissors" className="w-full h-40 object-cover" />
            <div className="p-4 text-center bg-blue-500 text-white">
              <h3 className="text-lg font-semibold">Rock, Paper, Scissors Game</h3>
            </div>
          </div>
          <div
            onClick={goToPomodoroApp}
            className="cursor-pointer w-full max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img src={pomodoroImage} alt="Pomodoro App" className="w-full h-40 object-cover" />
            <div className="p-4 text-center bg-green-500 text-white">
              <h3 className="text-lg font-semibold">Pomodoro App</h3>
            </div>
          </div>
        </div>
        <div className=" mt-8 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
      </div>
    </div>
  );
};

export default Home;
