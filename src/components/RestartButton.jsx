import React from 'react';
import { FaRedo } from 'react-icons/fa';

const RestartButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 py-2 px-6 text-xl font-semibold text-white bg-red-600 rounded-full shadow-lg hover:bg-red-500 transition-colors duration-300"
  >
    <FaRedo size={20} className="inline-block mr-2" />
    Restart
  </button>
);

export default RestartButton;
