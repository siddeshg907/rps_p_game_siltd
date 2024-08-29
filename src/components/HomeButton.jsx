import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/home')}
      className="absolute top-4 right-4 text-white hover:text-gray-300 transition duration-300"
    >
      <FaHome size={24} />
    </button>
  );
};

export default HomeButton;
