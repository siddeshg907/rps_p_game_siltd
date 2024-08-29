// utils.js

import { FaHandPaper, FaHandRock, FaHandScissors } from "react-icons/fa";

// Define the choices for Rock, Paper, Scissors
export const choices = [
    { name: 'rock', icon: <FaHandRock size={60} className="text-gray-700" />, borderColor: 'border-red-500' },
    { name: 'paper', icon: <FaHandPaper size={60} className="text-gray-700" />, borderColor: 'border-blue-500' },
    { name: 'scissors', icon: <FaHandScissors size={60} className="text-gray-700" />, borderColor: 'border-yellow-500' }
  ];
  
  // Function to determine the outcome of the game
  export const determineOutcome = (playerChoice, computerChoice) => {
    const outcomes = {
      rock: { rock: 'Draw', paper: 'Lose', scissors: 'Win' },
      paper: { rock: 'Win', paper: 'Draw', scissors: 'Lose' },
      scissors: { rock: 'Lose', paper: 'Win', scissors: 'Draw' }
    };
  
    const result = outcomes[playerChoice][computerChoice];
    let explanation = '';
  
    switch (result) {
      case 'Win':
        explanation = `You win! ${capitalize(playerChoice)} beats ${capitalize(computerChoice)}.`;
        break;
      case 'Lose':
        explanation = `You lose. ${capitalize(computerChoice)} beats ${capitalize(playerChoice)}.`;
        break;
      case 'Draw':
        explanation = `It's a draw! You both chose ${capitalize(playerChoice)}.`;
        break;
      default:
        explanation = 'Unexpected outcome.';
    }
  
    return { result, explanation };
  };
  
  // Utility function to capitalize the first letter of a string
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  