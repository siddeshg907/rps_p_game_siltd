import React from 'react';

const ChoiceButton = ({ onClick, icon, borderColor }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center p-4 bg-white rounded-full shadow-lg border-8 ${borderColor} transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300`}
    style={{ width: '100px', height: '100px' }} // Adjust size if needed
  >
    <div className="flex items-center justify-center w-full h-full">
      {icon}
    </div>
  </button>
);

export default ChoiceButton;
