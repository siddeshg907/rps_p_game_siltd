import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Import audio files
import startSoundPath from '../assets/Start.mp3';
import beepSoundPath from '../assets/beep.mp3';
import breakSoundPath from '../assets/break.mp3';


const Pomodoro = () => {
  const [workDuration, setWorkDuration] = useState(25 * 60); // 25 minutes
  const [breakDuration, setBreakDuration] = useState(5 * 60); // 5 minutes
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // Create audio objects
  const startSound = useRef(new Audio(startSoundPath)).current;
  const beepSound = useRef(new Audio(beepSoundPath)).current;
  const breakSound = useRef(new Audio(breakSoundPath)).current;

  useEffect(() => {
    setTimeLeft(isBreak ? breakDuration : workDuration);
  }, [workDuration, breakDuration, isBreak]);

  useEffect(() => {
    if (isRunning) {
      startSound.play().catch(e => console.log('Start sound failed:', e));
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            if (isBreak) {
              breakSound.play().catch(e => console.log('Break sound failed:', e));
              setTimeLeft(workDuration);
              setIsBreak(false);
            } else {
              beepSound.play().catch(e => console.log('Beep sound failed:', e));
              setTimeLeft(breakDuration);
              setIsBreak(true);
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

  const progress = (100 - (timeLeft / (isBreak ? breakDuration : workDuration)) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <h2 className="text-3xl font-bold mb-4">{isBreak ? 'Break Time!' : 'Work Time!'}</h2>
      <div className="w-48 h-48 mb-6">
        <CircularProgressbar
          value={progress}
          text={formatTime(timeLeft)}
          styles={buildStyles({
            pathColor: isBreak ? '#f56565' : '#48bb78',
            textColor: '#333',
            trailColor: '#e2e8f0',
          })}
        />
      </div>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleStartStop}
          className={`px-6 py-3 rounded-lg shadow-md transition duration-300 ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
        >
          Reset
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Work Duration (minutes):</label>
          <input
            type="number"
            min="1"
            value={workDuration / 60}
            onChange={(e) => setWorkDuration(Number(e.target.value) * 60)}
            className="border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-2">Break Duration (minutes):</label>
          <input
            type="number"
            min="1"
            value={breakDuration / 60}
            onChange={(e) => setBreakDuration(Number(e.target.value) * 60)}
            className="border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
