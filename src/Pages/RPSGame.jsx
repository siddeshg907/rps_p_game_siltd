import React, { useState, useEffect } from 'react';

import { choices, determineOutcome } from '../components/utils.jsx'; 
import Scoreboard from '../components/Scoreboard';
import ChoiceButton from '../components/ChoiceButton';
import OutcomeDisplay from '../components/OutcomeDisplay';
import RestartButton from '../components/RestartButton';
import HomeButton from '../components/HomeButton';

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
    const randomChoice = choices[Math.floor(Math.random() * choices.length)].name;
    const { result, explanation } = determineOutcome(choice, randomChoice);

    setPlayerChoice(choice);
    setComputerChoice(randomChoice);
    setOutcome(result);
    setExplanation(explanation);

    setScores((prevScores) => {
      const updatedScores = { ...prevScores, [result.toLowerCase()]: prevScores[result.toLowerCase()] + 1 };
      localStorage.setItem('rps-scores', JSON.stringify(updatedScores));
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 relative">
      <HomeButton />
      <Scoreboard scores={scores} />

      {/* Triangle Button Layout */}
      <div className={`relative w-full max-w-sm h-64 ${outcome ? 'hidden' : 'block'}`}>
        {choices.map((choice, index) => (
          <div key={choice.name} className={`absolute ${index === 0 ? 'bottom-0 left-0' : index === 1 ? 'top-0 left-1/2 transform -translate-x-1/2' : 'bottom-0 right-0'}`}>
            <ChoiceButton
              onClick={() => handleChoice(choice.name)}
              icon={choice.icon}
              borderColor={choice.borderColor}
            />
          </div>
          
        ))}
        
      </div>
      {!outcome&&<p className='text-3xl font-bold'>CHOOSE ONE</p>}

      {outcome && (
        <>
          <OutcomeDisplay
            outcome={outcome}
            playerChoice={playerChoice}
            computerChoice={computerChoice}
            explanation={explanation}
          />
          <div className="flex space-x-4 mb-16">
            {choices.map((choice) => (
              <ChoiceButton
                key={choice.name}
                onClick={() => handleChoice(choice.name)}
                icon={choice.icon}
                borderColor={choice.borderColor}
              />
            ))}
          </div>
        </>
      )}

      <RestartButton onClick={handleRestart} />
    </div>
  );
};

export default RPSGame;
