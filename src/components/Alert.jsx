import React from 'react';

const Alert = ({ message, type }) => {
  let bgColor, textColor;

  switch (type) {
    case 'success':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }

  return (
    <div className={`p-4 mb-4 rounded-lg ${bgColor} ${textColor}`}>
      {message}
    </div>
  );
};

export default Alert;
