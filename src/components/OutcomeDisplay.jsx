import React from 'react';
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa';

const getChoiceIcon = (choiceName) => {
  const icons = {
    rock: <FaHandRock size={60} className="text-gray-700" />,
    paper: <FaHandPaper size={60} className="text-gray-700" />,
    scissors: <FaHandScissors size={60} className="text-gray-700" />,
  };
  return icons[choiceName] || null;
};

const OutcomeDisplay = ({ outcome, playerChoice, computerChoice, explanation }) => (
  <div className="text-center mb-4">
    <div className="flex flex-col items-center mb-4 space-y-4">
      <div className="flex items-center space-x-8">
        <div className="text-center">
          <p className="text-xl font-semibold">YOU PICKED</p>
          <div className="flex justify-center">{getChoiceIcon(playerChoice)}</div>
        </div>
        <p className="text-3xl font-extrabold">vs</p>
        <div className="text-center">
          <p className="text-xl font-semibold">BOT PICKED</p>
          <div className="flex justify-center">{getChoiceIcon(computerChoice)}</div>
        </div>
      </div>
      <div className='bg-transparent rounded-lg border-4 border-dashed p-4'>
        <p
          className={`text-4xl font-extrabold mb-4 ${
            outcome === 'Win' ? 'text-green-400' : outcome === 'Lose' ? 'text-red-400' : 'text-yellow-400'
          }`}
        >
          {outcome === 'Win' ? 'WIN 🎉' : outcome === 'Lose' ? 'LOSE 👎' : 'DRAW'}
        </p>
        <p className="text-lg font-medium text-white-500">{explanation}</p>
      </div>
    </div>
  </div>
);

export default OutcomeDisplay;
