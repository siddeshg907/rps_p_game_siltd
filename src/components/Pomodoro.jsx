import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaPlay, FaPause, FaRedo, FaHome, FaClock, FaCoffee } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


import startSoundPath from '../assets/Start.mp3';
import beepSoundPath from '../assets/beep.mp3';
import breakSoundPath from '../assets/break.mp3';

const Pomodoro = () => {
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60); 
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showWorkInput, setShowWorkInput] = useState(false);
  const [showBreakInput, setShowBreakInput] = useState(false);
  const navigate = useNavigate();

  
  const startSound = new Audio(startSoundPath);
  const beepSound = new Audio(beepSoundPath);
  const breakSound = new Audio(breakSoundPath);

  useEffect(() => {
    setTimeLeft(isBreak ? breakDuration : workDuration);
  }, [workDuration, breakDuration, isBreak]);

  useEffect(() => {
    if (isRunning) {
      if (!isBreak) {
        startSound.play().catch(e => console.log('Start sound failed:', e));
      }
      
      const intervalId = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 1 && !isBreak) {
            beepSound.play().catch(e => console.log('Beep sound failed:', e));
          }

          if (prevTime <= 0) {
            if (isBreak) {
              setIsBreak(false);
              setTimeLeft(workDuration);
            } else {
              breakSound.play().catch(e => console.log('Break sound failed:', e));
              setIsBreak(true);
              setTimeLeft(breakDuration);
            }
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning, isBreak, workDuration, breakDuration]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? breakDuration : workDuration);
  };

  const progress = 100 - (timeLeft / (isBreak ? breakDuration : workDuration)) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-4 relative">
      <button
        onClick={() => navigate('/home')}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition duration-300"
      >
        <FaHome size={24} />
      </button>
      <h2 className="text-4xl font-bold mb-6">{isBreak ? 'Break Time!' : 'Work Time!'}</h2>
      <div className="w-64 h-64 mb-8">
        <CircularProgressbar
          value={progress}
          text={formatTime(timeLeft)}
          styles={buildStyles({
            pathColor: isBreak ? '#f56565' : '#48bb78',
            textColor: '#fff',
            trailColor: '#d4d4d4',
            textSize: '24px',
          })}
        />
      </div>
      <div className="flex space-x-6 mb-8">
        <button
          onClick={handleStartStop}
          className={`px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ${isRunning ? 'bg-red-600' : 'bg-green-600'}`}
        >
          {isRunning ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-600 px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <FaRedo size={24} />
        </button>
      </div>
      <div className="flex space-x-4 w-64">
        <div
          className="relative flex items-center justify-center bg-white text-gray-800 rounded-lg p-2 w-full cursor-pointer"
          onClick={() => setShowWorkInput(!showWorkInput)}
        >
          <FaClock size={50} className="text-indigo-600" />
          {showWorkInput && (
            <div className="absolute top-full mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-3 w-full">
              <input
                type="number"
                min="1"
                value={workDuration / 60}
                onClick={(e) => e.stopPropagation()} 
                onChange={(e) => setWorkDuration(Number(e.target.value) * 60)}
                className="w-full p-2 text-gray-800 rounded-lg focus:outline-none"
              />
              <span className="ml-2">min</span>
            </div>
          )}
        </div>
        <div
          className="relative flex items-center justify-center bg-white text-gray-800 rounded-lg p-3 w-full cursor-pointer"
          onClick={() => setShowBreakInput(!showBreakInput)}
        >
          <FaCoffee size={50} className="text-indigo-600" />
          {showBreakInput && (
            <div className="absolute top-full mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-3 w-full">
              <input
                type="number"
                min="1"
                value={breakDuration / 60}
                onClick={(e) => e.stopPropagation()} 
                onChange={(e) => setBreakDuration(Number(e.target.value) * 60)}
                className="w-full p-2 text-gray-800 rounded-lg focus:outline-none"
              />
              <span className="ml-2">min</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
