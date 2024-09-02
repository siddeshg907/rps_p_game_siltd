import React from "react";

const Scoreboard = ({ scores }) => (
  <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-xl mb-8 p-4 bg-transparent text-white rounded-lg border-4 border-gray-400">
    <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
      <span className="text-xl md:text-2xl font-bold">ROCK</span>
      <span className="text-xl md:text-2xl font-bold">PAPER</span>
      <span className="text-xl md:text-2xl font-bold">SCISSORS</span>
    </div>
    <div className="flex flex-col bg-white rounded-lg items-center text-sm md:text-xl text-gray-900 font-bold p-2">
      <h1 className="p-1 font-bold text-lg md:text-xl text-blue-500">SCORE</h1>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <div className="p-1 text-center">
          <div className="font-bold text-green-500 text-base md:text-lg">
            Wins:
          </div>
          <div className="text-base md:text-lg">{scores.win}</div>
        </div>
        <div className="p-1 text-center">
          <div className="font-bold text-red-500 text-base md:text-lg">
            Losses:
          </div>
          <div className="text-base md:text-lg">{scores.lose}</div>
        </div>
        <div className="p-1 text-center">
          <div className="font-bold text-yellow-500 text-base md:text-lg">
            Draws:
          </div>
          <div className="text-base md:text-lg">{scores.draw}</div>
        </div>
      </div>
    </div>
  </div>
);

export default Scoreboard;
