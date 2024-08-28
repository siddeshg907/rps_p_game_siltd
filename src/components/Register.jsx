import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username && password) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some((user) => user.username === username);

      if (userExists) {
        alert('Username already exists. Please choose a different username.');
      } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        navigate('/login');
      }
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
