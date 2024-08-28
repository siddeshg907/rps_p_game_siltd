import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert'; // Make sure the path is correct

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', username); // Store the current user's username
      navigate('/home');
    } else {
      setAlert({ message: 'Invalid credentials. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
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
          onClick={handleLogin}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <a
            href="/register"
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
