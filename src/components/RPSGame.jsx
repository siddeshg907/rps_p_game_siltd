import React, { useState, useEffect } from 'react';

const determineOutcome = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) 
    return { result: 'Draw', explanation: `${playerChoice} vs ${computerChoice}` };

  const winningConditions = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };

  if (winningConditions[playerChoice] === computerChoice) {
    return { result: 'Win', explanation: `${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)} beats ${computerChoice}` };
  } else {
    return { result: 'Lose', explanation: `${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${playerChoice}` };
  }
};

const choices = ['rock', 'paper', 'scissors'];

const RPSGame = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [outcome, setOutcome] = useState('');
  const [explanation, setExplanation] = useState('');
  const [scores, setScores] = useState({
    win: 0,
    lose: 0,
    draw: 0,
  });

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('rps-scores'));
    if (storedScores) {
      setScores(storedScores);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rps-scores', JSON.stringify(scores));
  }, [scores]);

  const handleChoice = (choice) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    const { result, explanation } = determineOutcome(choice, randomChoice);

    setPlayerChoice(choice);
    setComputerChoice(randomChoice);
    setOutcome(result);
    setExplanation(explanation);

    setScores(prevScores => {
      const updatedScores = { ...prevScores, [result.toLowerCase()]: prevScores[result.toLowerCase()] + 1 };
      localStorage.setItem('rps-scores', JSON.stringify(updatedScores)); // Update localStorage directly
      return updatedScores;
    });
  };

  const handleRestart = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setOutcome('');
    setExplanation('');
    setScores({ win: 0, lose: 0, draw: 0 });
    localStorage.removeItem('rps-scores');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Rock, Paper, Scissors</h1>
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => handleChoice(choice)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {choice.charAt(0).toUpperCase() + choice.slice(1)}
            </button>
          ))}
        </div>
        {outcome && (
          <div className="text-center mb-4">
            <p className="text-lg font-semibold mb-2">{`You chose ${playerChoice}`}</p>
            <p className="text-lg font-semibold mb-2">{`Computer chose ${computerChoice}`}</p>
            <p className={`text-xl font-bold ${outcome === 'Win' ? 'text-green-600' : outcome === 'Lose' ? 'text-red-600' : 'text-gray-600'}`}>{outcome}</p>
            <p className="text-md text-gray-700">{explanation}</p>
          </div>
        )}
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Restart Game
        </button>
      </div>
      <div className="text-center mt-6">
        <h2 className="text-xl font-bold mb-2">Scoreboard</h2>
        <div className="text-lg">
          <p>Wins: {scores.win}</p>
          <p>Losses: {scores.lose}</p>
          <p>Draws: {scores.draw}</p>
        </div>
      </div>
    </div>
  );
};

export default RPSGame;
