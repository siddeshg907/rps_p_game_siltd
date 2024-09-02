import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username && password) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some((user) => user.username === username);

      if (userExists) {
        setAlert({ message: 'Username already exists. Please choose a different username.', type: 'error' });
      } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        setAlert({ message: 'Registration successful. Redirecting to login...', type: 'success' });
        setTimeout(() => navigate('/login'), 2000); 
      }
    } else {
      setAlert({ message: 'Please fill in both fields.', type: 'error' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Register</h2>
        {alert && <Alert message={alert.message} type={alert.type} />}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Register
        </button>
        <div className="mt-4 text-center">
          <a
            href="/login"
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Already a user? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
